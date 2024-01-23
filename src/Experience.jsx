import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Perf } from "r3f-perf";
import Character from "./Character";

export default function Experience() {
    console.log("experience rerender")

    return <>
        <Perf />

        <OrbitControls />

        <Lights />

        <Character morningPos={-5} nightPos={4}/>
        <Character morningPos={-3} nightPos={1}/>
        
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={"lightblue"}/>
        </mesh>
    </>
}