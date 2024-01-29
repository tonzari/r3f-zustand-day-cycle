import { Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import Lights from "./Lights";
import SchedulableSprite from "./SchedulableSprite";
import WindowScene from "./WindowScene";
import { useStore } from "./store";

import AnimatedSpriteMesh from "./AnimatedSprite";
import spriteData from './SpriteData.json'

export default function Experience() {
    console.log("experience rerender")

    const startDayCycle = useStore((state)=>state.startDayCycle)
    const setSimulatedTime = useStore((state)=>state.updateSimulatedTime)
    const setNextEventTime = useStore((state)=>state.setNextEvent)

    const partOfDayDurationInMs = 21600000 // = day in milliseconds / 4 (part of day count (morning, midday, evening, night)

    useEffect(() => {
        startDayCycle()
        
        // Set a timeout to repeatedly update the day cycle. Recursive loop.
        // the speedMultiplier can be edited in realtime so must be accessed before scheduling the next loop
        const timeoutIdDayCycle = setTimeout(setSimulatedTime, partOfDayDurationInMs / useStore.getState().speedMultiplier)
        
    
        const minDelay = 3000
        const maxDelay = 4000
        let eventDelay = minDelay
        let simulatedDelay = eventDelay / useStore.getState().speedMultiplier
        let timeoutIdEventScheduler

        // Recursive!
        function runEventScheduler() {
            eventDelay = Math.floor(Math.random() * maxDelay)
            eventDelay = eventDelay > minDelay ? eventDelay : minDelay
            simulatedDelay = eventDelay / useStore.getState().speedMultiplier
            
            setNextEventTime(simulatedDelay)
            
            timeoutIdEventScheduler = setTimeout(runEventScheduler, simulatedDelay)
        }

        runEventScheduler()

        // Cleanup on recursive timeouts
        return () => {
            clearTimeout(timeoutIdDayCycle)
            clearTimeout(timeoutIdEventScheduler)
        } 
      }, [])

    return <>
        <Perf />
        <OrbitControls />
        <Lights />
        <WindowScene />

        {spriteData.map((item, index)=>
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
                />
            </Suspense>
        )}
    </>
}