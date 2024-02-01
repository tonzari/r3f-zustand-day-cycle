import * as THREE from 'three'
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import { useEffect, useRef } from 'react'
import { useStore } from './store'
import { usePageVisibility } from './usePageVisibility'

export default function AnimatedSpriteMesh({
    sprite, 
    columnCount, 
    rowCount, 
    startFrame, 
    endFrame, 
    fps, 
    loop = false, 
    playOnLoad = false, 
    clickToPlay = false, 
    allowRetrigger = false, 
    lookAtCam = false, 
    alphaTest = 0.5, 
    ...props }) {

    console.log("animated sprite mesh render")
    
    // VARIABLES - - - - - - - - - - - - - - - - - - - - 
    
    const texture = useLoader(TextureLoader, sprite)
    const plane = useRef()
    const msPerFrame = 1000 / fps
    const spriteTileCoords = new THREE.Vector2()
    const lastPlayedSpriteRef = useRef(null)

    let currentSprite = useStore.getState().currentSprite
    let isPlaying = playOnLoad
    let currentFrame = startFrame
    let nextFrameTime = 0
    
    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - 

    function play() {
        if(!allowRetrigger && isPlaying) return
        playAudio()
        plane.current.visible = true
        isPlaying = true
        currentFrame = startFrame
        lastPlayedSpriteRef.current = currentSprite
    }

    function playAudio() {
        const audioSrc = useStore.getState().currentSprite.audio
        if (audioSrc) {
            const audio = new Audio(audioSrc)
            audio.playbackRate = useStore.getState().speedMultiplier
    
            // Event listener for successful audio loading
            audio.addEventListener('canplaythrough', () => {
                audio.play()
            }, { once: true })
    
            // Error handling for audio loading
            audio.addEventListener('error', () => {
                console.warn(`Could not load audio file at ${audioSrc}`)
            }, { once: true })
        }
    }

    function handleClick(e) {
        //if(clickToPlay && allowRetrigger || clickToPlay && !isPlaying) { play() }
        if(props.onClick) { props.onClick(e) }
    }

    function updateSpriteFrame() {
        // update frames based on time, not useFrame fps  
        
        if(isPlaying && window.performance.now() >= nextFrameTime) {
            texture.offset = getSpriteOffsetVec2(spriteTileCoords, currentFrame, rowCount, columnCount)

            if (currentFrame < endFrame) {
                currentFrame++
            } else if (loop) {
                currentFrame = startFrame
            } else {
                isPlaying = false
                plane.current.visible = false
                texture.offset = getSpriteOffsetVec2(spriteTileCoords, startFrame, rowCount, columnCount)
            }

            nextFrameTime = (window.performance.now() + msPerFrame) / useStore.getState().speedMultiplier
        }
    }

    const handleUserLeavesTab = () => {
        plane.current.visible = false
        isPlaying = false
    }

    const handleUserReturnsToTab = () => {
        plane.current.visible = false
        isPlaying = false
    }

    // HOOKS - - - - - - - - - - - - - - - - - - - - - - 

    // stop sprites when user leaves tab/window
    usePageVisibility(handleUserReturnsToTab, handleUserLeavesTab)

    // 'initialize'
    useEffect(() => {
        const textureHeight = texture.source.data.height
        const textureWidth = texture.source.data.width
        const frameSize = {
            x: textureWidth / columnCount, 
            y: textureHeight / rowCount
        }
        const ratioHeightToWidth = frameSize.y/frameSize.x
        const scaleMultiplier = props.scale ? props.scale : 1

        plane.current.scale.set(
            scaleMultiplier,
            scaleMultiplier * ratioHeightToWidth,
            scaleMultiplier
        )

        // enable wrapping, crop, set first frame
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapt = THREE.RepeatWrapping
        texture.repeat.set(1/columnCount,1/rowCount)
        texture.offset = getSpriteOffsetVec2(spriteTileCoords, startFrame, rowCount, columnCount)
    
        plane.current.visible = false
        isPlaying = false
    }, [])

    // 'update'
    useFrame((state) => {
        if(lookAtCam) { plane.current.lookAt(state.camera.position) }

        currentSprite = useStore.getState().currentSprite

        if (currentSprite !== lastPlayedSpriteRef.current && currentSprite.sprite === sprite) {
            play()
        } else if (currentSprite.sprite !== sprite) {
            lastPlayedSpriteRef.current = null
            plane.current.visible = false
        }

        updateSpriteFrame()
    })

    return (
      <>
        <mesh 
            ref={plane} 
            castShadow
            receiveShadow
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
    )
}



// UTILITY FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// getSpriteOffsetVec2 is called from useFrame!
// so, set up a THREE.vector2 in outer scope to reuse and set within function, 
// as opossed to re-creating the vec2
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

