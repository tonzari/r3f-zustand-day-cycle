import { Suspense, useEffect } from "react";
import { Perf } from "r3f-perf";

import Lights from "./Lights";
import { useStore } from "./store";

import AnimatedSpriteMesh from "./AnimatedSprite";
import spriteData from './SpriteData.json'
import { LaundromatModel } from "./LaundromatModel";

export default function Experience() {
    console.log("experience rerender")

    // Zustand State
    const updateDayCycle = useStore((state) => state.updateDayCycle)
    const setNextEvent   = useStore((state) => state.setNextEvent)
    const clearDayCycle  = useStore((state) => state.clearDayCycle)
    const startClock = useStore((state) => state.startClock)

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
        startClock()            //  ticks once a second. updates 'real time'
        updateDayCycle()        //  updates the global state text 'morning, midday, evening, night'
        setTimeout(() => {
            runEventInterval()
        }, 3000);
        
        
        // Cleanup recursive timeouts
        return () => {
            clearTimeout(timeoutIdEventScheduler)
            clearDayCycle()
        } 
      }, [])

    return <>
        <Perf position={'bottom-left'}/>
        {/* <OrbitControls /> */}

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