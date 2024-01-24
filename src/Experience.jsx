import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import Character from "./Character";
import { Suspense } from "react";
import SchedulableSprite from "./SchedulableSprite";
import WindowScene from "./WindowScene";

export default function Experience() {
    console.log("experience rerender")

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
        
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={"lightblue"}/>
        </mesh>
    </>
}