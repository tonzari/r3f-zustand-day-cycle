import { Suspense, useEffect, useRef } from "react";
import { Perf } from "r3f-perf";

import Lights from "./Lights";
import { useStore } from "./store";

import AnimatedSpriteMesh from "./AnimatedSprite";
import spriteData from './SpriteData.json'
import { LaundromatModel } from "./LaundromatModel";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { easing } from "maath";
import CameraWithDynamicFov from "./CameraWithDynamicFov";

export default function Experience() {
    console.log("experience rerender")

    // Zustand State
    const setNextEvent   = useStore((state) => state.setNextEvent)
    const clearDayCycle  = useStore((state) => state.clearDayCycle)
    const startClock = useStore((state) => state.startClock)
    const mainCam = useRef()
    let fov = 26.3786

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
        {/* <OrbitControls /> */}

        {/* <PerspectiveCamera
            ref={mainCam}
            makeDefault // This makes it the default camera for the scene
            near={0.01}
            far={150}
            fov={fov}
            position={[-1.7996, 2.092, 7.209]}
            rotation={[0.0925, -0.2937, 0.0164]}
      /> */}

        <CameraWithDynamicFov />

        <Lights />
        {/* <WindowScene /> */}

        <Suspense fallback={null}>
            <LaundromatModel />
        </Suspense>

        <group position={[4,1,0]}>
            {spriteData.map((item, index) =>
                <Suspense key={index}>
                    <AnimatedSpriteMesh
                        sprite={item.sprite}
                        fps={item.fps}
                        columnCount={item.columnCount}
                        rowCount={item.rowCount}
                        startFrame={item.startFrame}
                        endFrame={item.endFrame}
                        position={item.position}
                        scale={item.scale}
                        rotation={[0, Math.PI/0.59, 0]}
                    />
                </Suspense>
            )}
        </group>
    </>
}