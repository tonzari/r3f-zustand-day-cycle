import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import useStore from "./store"

export default function Character({morningPos, nightPos}) {
    console.log("Character rerender")

    const groupRef = useRef()

    useFrame(() => {
        if(useStore.getState().partOfDay == 'morning'){
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, morningPos, 0.3)
        } else if(useStore.getState().partOfDay == 'night') {
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, nightPos, 0.3)
        } else {
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, 0.3)
        }

    })

    return <group ref={groupRef}>
        <mesh>
            <meshStandardMaterial />
            <boxGeometry />
        </mesh>
    </group>
}