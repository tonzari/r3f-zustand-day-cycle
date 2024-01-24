import * as THREE from 'three'
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useEffect, useRef } from 'react'
import { useStore } from './store'

/*

This sprite component requires a grid based spritesheet of any column or row count, 
as long as the tiles are uniform in size, and there is no padding/margin.

*/

export default function SchedulableSprite({
    sprite, 
    columnCount, 
    rowCount, 
    startFrame = 1, 
    endFrame, 
    fps = 12, 
    loop = true, 
    playOnLoad = true, 
    clickToPlay = false, 
    allowRetrigger = false, 
    lookAtCam = false, 
    alphaTest = 0.5, 
    partOfDayToAnimate, 
    ...props}) {

    console.log("animated sprite mesh render")
    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
    const texture = useLoader(TextureLoader, sprite)
    const plane = useRef()
    const msPerFrame = 1000 / fps
    const textureHeight = texture.source.data.height
    const textureWidth = texture.source.data.width
    const frameSize = {
        x: textureWidth / columnCount, 
        y: textureHeight / rowCount
    }
    const ratioHeightToWidth = frameSize.y/frameSize.x
    const spriteTileCoords = new THREE.Vector2()
    const scaleMultiplier = props.scale ? props.scale : 1

    let playScheduled = false
    let isPlaying = playOnLoad
    let currentFrame = startFrame
    let nextFrameTimestamp = 0

    // enable wrapping, crop, set first frame
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapt = THREE.RepeatWrapping
    texture.repeat.set(1/columnCount,1/rowCount)
    texture.offset = getSpriteOffsetVec2(spriteTileCoords, startFrame, rowCount, columnCount)
    
    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    function play() {
        isPlaying = true
        currentFrame = startFrame
    }

    function handleClick(e) {
        if(clickToPlay && allowRetrigger || !isPlaying) { play() }
        if(props.onClick) { props.onClick(e) }
    }

    function UpdateSpriteFrame() {  
        texture.offset = getSpriteOffsetVec2(spriteTileCoords, currentFrame, rowCount, columnCount)
        
        if (currentFrame < endFrame) {
            currentFrame++
            return
        }
    
        if (loop) {
            currentFrame = startFrame
            return
        }
        
        // Reset sprite when complete
        isPlaying = false
        plane.current.visible = false
        texture.offset = getSpriteOffsetVec2(spriteTileCoords, startFrame, rowCount, columnCount)

    }

    // HOOKS - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    // 'start'
    useEffect(() => {
        plane.current.scale.set(
            scaleMultiplier,
            scaleMultiplier * ratioHeightToWidth,
            scaleMultiplier
        )
    }, []);
    
    // 'update'
    useFrame((state) => {
        if(lookAtCam) {
            plane.current.lookAt(state.camera.position)
        }

        // Determine frame rate indepent time to update sprite 
        if(isPlaying && window.performance.now() >= nextFrameTimestamp) {
            UpdateSpriteFrame()
            nextFrameTimestamp = window.performance.now() + msPerFrame
        }

        // SCHEDULING: Handle playing based on state from 'store'
        if(useStore.getState().partOfDay == partOfDayToAnimate && !playScheduled) {
            plane.current.visible = true
            console.log(useStore.getState().partOfDay)
            play()
            playScheduled = true
        } else if(useStore.getState().partOfDay !== partOfDayToAnimate) {
            playScheduled = false
        }
    })

    return (
      <>
        <mesh 
            ref={plane} 
            castShadow 
            {...props} 
            onClick={handleClick}
        >
            <planeGeometry />
            <meshStandardMaterial
                map={texture}
                side={THREE.DoubleSide}
                alphaTest={alphaTest}
            />
        </mesh>
      </>
    );
}

// UTILITY FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// getSpriteOffsetVec2 is called from useFrame!
// docs: https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls#%E2%9C%85-better-re-use-object

function getSpriteOffsetVec2(reusableVec2, frameNumber, rows, columns) {
    // Convert framePosition to zero-index
    const index = frameNumber - 1

    // Calculate row and column (0-indexed)
    const row = Math.floor(index / columns)
    const column = index % columns

    // Calculate the size of each tile in percentages
    const tileSizeWidth = 1 / columns
    const tileSizeHeight = 1 / rows

    // Calculate coordinates
    // For x, it's straightforward as the origin is at the bottom left
    const x = column * tileSizeWidth

    // For y, we need to invert the row as the origin is at the bottom
    const y = (rows - 1 - row) * tileSizeHeight

    // Set x and y values to the cached reusable vec2
    reusableVec2.setX(x)
    reusableVec2.setY(y)

    return reusableVec2
}