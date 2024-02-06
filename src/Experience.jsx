import { Suspense, useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Lights from "./Lights";
import { useStore } from "./store";

import AnimatedSpriteMesh from "./AnimatedSprite";
import CameraWithDynamicFov from "./CameraWithDynamicFov"
import spriteData from './SpriteData.json'
import { LaundromatModel } from "./LaundromatModel";



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
    const { rotX } = useControls({rotX:0.09})
    const { rotY } = useControls({rotY:-0.26})
    const { rotZ } = useControls({rotZ:0.02})
    const { posX } = useControls({posX:3.85})
    const { posY } = useControls({posY:3.8})
    const { posZ } = useControls({posZ:-0.2})
    const { meshScale } = useControls({meshScale: 2.3})

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

        //testMesh.current.lookAt(mainCam.current.position)
        //console.log(testMesh.current.rotation.x, testMesh.current.rotation.y, testMesh.current.rotation.z)
        
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


        <RotateByCursor>
         {/* <OrbitControls /> */}
         
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

            <group 
                position={[posX,posY,posZ]}
                rotation={[rotX, rotY, rotZ]}
                scale={meshScale}
            >
                {spriteData.map((item, index) =>
                    <Suspense key={index}>
                        <AnimatedSpriteMesh
                            sprite={item.sprite}
                            fps={item.fps}
                            columnCount={item.columnCount}
                            rowCount={item.rowCount}
                            startFrame={item.startFrame}
                            endFrame={item.endFrame}
                        />
                    </Suspense>
                )}
            </group>
        </RotateByCursor>

       
    </>
}