import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Lights from "./Lights";
import WindowScene from "./WindowScene";
import { useStore } from "./store";

import AnimatedSpriteMesh from "./AnimatedSprite";
import spriteData from './SpriteData.json'

export default function Experience() {
    console.log("experience rerender")

    const startDayCycle  = useStore((state) => state.startDayCycle)
    const updateDayCycle = useStore((state) => state.updateDayCycle)
    const setNextEvent   = useStore((state) => state.setNextEvent)
    const clearDayCycle  = useStore((state) => state.clearDayCycle)
    const startClock = useStore((state) => state.startClock)

    useEffect(() => {
        const minDelay = 4000
        const maxDelay = 6000
        let eventDelay = minDelay
        let simulatedDelay = eventDelay / useStore.getState().speedMultiplier
        let timeoutIdEventScheduler

        function runEventInterval() {
            eventDelay = Math.floor(Math.random() * (maxDelay - minDelay) + minDelay)
            simulatedDelay = eventDelay / useStore.getState().speedMultiplier
            setNextEvent(simulatedDelay)
            timeoutIdEventScheduler = setTimeout(runEventInterval, simulatedDelay)
        }

        startClock()
        startDayCycle()
        updateDayCycle()
        runEventInterval()

        // Cleanup recursive timeouts
        return () => {
            clearTimeout(timeoutIdEventScheduler)
            clearDayCycle()
        } 
      }, [])

    return <>
        <Perf />
        <OrbitControls />
        <Lights />
        <WindowScene />

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
                    rotation={[0, Math.PI/2, 0]}
                />
            </Suspense>
        )}
    </>
}