import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { Perf } from "r3f-perf";

export default function Experience() {
    console.log("experience rerender")

    return <>
        <Perf />

        <OrbitControls />

        <Lights />
        
        <mesh>
            <sphereGeometry />
            <meshStandardMaterial color={"lightblue"}/>
        </mesh>
    </>
}