import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import Character from "./Character";
import { Suspense } from "react";
import AnimatedSpriteMesh from "./AnimatedSpriteMesh";

export default function Experience() {
    console.log("experience rerender")

    return <>
        <Perf />

        <OrbitControls />

        <Lights />

        <Character morningPos={-5} nightPos={4}/>
        <Character morningPos={-3} nightPos={1}/>
        <Suspense>
            <AnimatedSpriteMesh
                sprite={'/bmo.png'}
                fps={24}
                columnCount={14}
                rowCount={1}
                startFrame={1}
                endFrame={14}
                loop={false}
                position={[2,0.7,3]}
                scale={3}
                playOnLoad={false}
                partOfDayToAnimate={'morning'}
            />
        </Suspense>

        <Suspense>
            <AnimatedSpriteMesh
                sprite={'/squidward.png'}
                fps={6}
                columnCount={8}
                rowCount={3}
                startFrame={1}
                endFrame={18}
                loop={false}
                position={[0,0.7,3]}
                scale={0.6}
                playOnLoad={false}
                partOfDayToAnimate={'midday'}
            />
        </Suspense>
        
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={"lightblue"}/>
        </mesh>
    </>
}