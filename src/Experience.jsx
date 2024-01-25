import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import Character from "./Character";
import { Suspense, useEffect } from "react";
import SchedulableSprite from "./SchedulableSprite";
import WindowScene from "./WindowScene";
import { updateDayCycle } from './util'
import { useStore } from "./store"



export default function Experience() {
    console.log("experience rerender")

    const startDayCycle = useStore((state)=>state.startDayCycle)
    const setSimulatedTime = useStore((state)=>state.updateSimulatedTime)
    const partOfDayDurationInMs = 21600000 // = day in milliseconds / 4 (part of day count (morning, midday, evening, night)

    useEffect(() => {
        startDayCycle()
        
        const timeoutID = setTimeout(function loop(){
          updateDayCycle()
          setSimulatedTime()
          setTimeout(loop, partOfDayDurationInMs / useStore.getState().speedMultiplier)
        }, partOfDayDurationInMs / useStore.getState().speedMultiplier)
    
        return () => clearTimeout(timeoutID); // Cleanup on unmount
      }, [])

    return <>
        <Perf />

        <OrbitControls />

        <Lights />

        <WindowScene />

        <Suspense>
            <SchedulableSprite
                sprite={'/bmo.png'}
                fps={24}
                columnCount={14}
                rowCount={1}
                startFrame={1}
                endFrame={14}
                loop={false}
                position={[0,5,0]}
                rotation={[0,Math.PI/2,0]}
                scale={10}
                playOnLoad={false}
                partOfDayToAnimate={'morning'}
                lookAtCam
            />
        </Suspense>

        <Suspense>
            <SchedulableSprite
                sprite={'/squidward.png'}
                fps={6}
                columnCount={8}
                rowCount={3}
                startFrame={1}
                endFrame={18}
                loop={false}
                position={[0,3,0]}
                rotation={[0,Math.PI/2,0]}
                scale={8}
                playOnLoad={false}
                partOfDayToAnimate={'midday'}
                lookAtCam
            />
        </Suspense>

        <Suspense>
            <SchedulableSprite
                sprite={'/procreateTest.png'}
                fps={24}
                columnCount={10}
                rowCount={6}
                startFrame={1}
                endFrame={59}
                loop={false}
                position={[0,8,0]}
                rotation={[0,Math.PI/2,0]}
                scale={14}
                playOnLoad={false}
                partOfDayToAnimate={'night'}
                lookAtCam
            />
        </Suspense>
        
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={"lightblue"}/>
        </mesh>
    </>
}