import { WindowModel } from "./WindowModel";

export default function WindowScene() {

    return <>
        <group >
            <mesh scale={[1,20,20]} position={[4,-7,0]}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh scale={[1,20,20]} position={[4,26,0]}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh scale={[1,100,20]} position={[4,0,15]}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh scale={[1,100,20]} position={[4,0,-13]}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh scale={[100,1,100]} position={[0,-5,0]}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <WindowModel scale={0.2}/>
        </group>
    </>
}