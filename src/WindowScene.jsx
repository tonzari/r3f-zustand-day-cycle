import { WindowModel } from "./WindowModel";

export default function WindowScene() {

    return <>
            <mesh 
                scale={[1,20,20]}
                position={[4,-7,0]}
                receiveShadow
                castShadow
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh 
                scale={[1,20,20]}
                position={[4,26,0]}
                receiveShadow
                castShadow
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh 
                scale={[1,100,20]}
                position={[4,0,15]}
                receiveShadow 
                castShadow
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh 
                scale={[1,100,20]}
                position={[4,0,-13]}
                receiveShadow
                castShadow
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            {/* Floor */}
            <mesh 
                scale={[100,1,100]} 
                position={[0,-5,0]} 
                receiveShadow
            >
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <WindowModel castShadow receiveShadow scale={0.2}/>
    </>
}