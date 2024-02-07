import { Suspense, useEffect, useRef } from "react";
import { Billboard, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Lights from "./Lights";
import { useStore } from "./store";

import AnimatedSpriteMesh from "./AnimatedSprite"
import CameraWithDynamicFov from "./CameraWithDynamicFov"
import spriteData from './SpriteData.json'
import { LaundromatModel } from "./LaundromatModel"



import { useControls } from 'leva'
import RotateByCursor from "./RotateByCursor";

export default function Experience() {
    console.log("experience rerender")

    // Zustand State
    const setNextEvent   = useStore((state) => state.setNextEvent)
    const clearDayCycle  = useStore((state) => state.clearDayCycle)
    const startClock = useStore((state) => state.startClock)
    const mainCam = useRef()
    const testMesh = useRef()
    const fov = 26.3786
    const checkerPattern = useTexture('/checker.png')

    // LEVA controls
    // const { rotX } = useControls({rotX:0.09})
    // const { rotY } = useControls({rotY:-0.26})
    // const { rotZ } = useControls({rotZ:0.02})
    // const { posX } = useControls({posX:3.85})
    // const { posY } = useControls({posY:3.8})
    // const { posZ } = useControls({posZ:-0.2})
    // const { meshScale } = useControls({meshScale: 2.3})

    const rotX = 0.09
    const rotY = -0.2
    const rotZ = 0.02
    const posX = 3.85
    const posY = 3.8
    const posZ = -0.2
    const meshScale = 2.3

    // init
    useEffect(() => {
        const minDelay = 4000
        const maxDelay = 6000
        let eventDelay = minDelay
        let timeoutIdEventScheduler

        function runEventInterval() {
            eventDelay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay)
            setNextEvent(eventDelay)
            timeoutIdEventScheduler = setTimeout(runEventInterval, eventDelay)
        }

        // Start your machines! Wash!
        startClock() //  ticks once a second. updates 'real time', 'simulated time', and 'part of day'
        setTimeout(() => {
            runEventInterval()
        }, 3000)

        // Cleanup recursive timeouts
        return () => {
            clearTimeout(timeoutIdEventScheduler)
            clearDayCycle()
            removeEventListener('resize')
        } 
      }, [])

    return <>
        <Perf position={'bottom-left'}/>

        <CameraWithDynamicFov />

        {/* <PerspectiveCamera
            makeDefault
            ref={mainCam}
            near={0.01}
            far={150}
            fov={fov}
            position={[-1.7996, 2.092, 7.209]}
            rotation={[0.0925, -0.2937, 0.0164]}
        /> */}

         {/* <OrbitControls /> */}

        <RotateByCursor>
         <Lights />

            {/* 

                Sprite Sheet Mesh

                // LEVA controls - values to compensate for camera distortion

                const { rotX } = useControls({rotX:0.09})
                const { rotY } = useControls({rotY:-0.26})
                const { rotZ } = useControls({rotZ:0.02})
                const { posX } = useControls({posX:3.85})
                const { posY } = useControls({posY:3.8})
                const { posZ } = useControls({posZ:-0.2})
                const { meshScale } = useControls({meshScale: 2.3})

            */}


            {/* <mesh
                scale={meshScale}
                position={[posX,posY,posZ]}
                rotation={[rotX, rotY, rotZ]}
                renderOrder={1000000}
                ref={testMesh}
            >
                <planeGeometry />
                <meshStandardMaterial 
                    // depthTest={false}
                    // depthWrite={false}
                    map={checkerPattern}
                />
            </mesh> */}

            <Suspense fallback={null}>
                <LaundromatModel />
            </Suspense>

            {/* <mesh position={[0, 1.96, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <planeGeometry />
                <MeshReflectorMaterial
                    blur={[400, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={15}
                    depthScale={1}
                    minDepthThreshold={0.85}
                    color="#DDD"
                    metalness={0.6}
                    roughness={1}
                />
            </mesh> */}

            <group position={[posX,posY,posZ]}>
                {spriteData.map((item, index) =>
               
                    <Suspense key={index}>
                         <Billboard>
                        <AnimatedSpriteMesh
                            sprite={item.sprite}
                            fps={item.fps}
                            columnCount={item.columnCount}
                            rowCount={item.rowCount}
                            startFrame={item.startFrame}
                            endFrame={item.endFrame}
                            scale={item.scale}
                        />
                        </Billboard>
                    </Suspense>
                
                )}
            </group>
        </RotateByCursor>

       
    </>
}