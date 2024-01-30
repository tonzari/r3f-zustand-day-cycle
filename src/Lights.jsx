import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
//import {updateDayCycle} from './util'
import { useStore } from "./store"

// an example of how a light system might respond to state changes.
// Slowly interpolate between a few configurations, triggered by entering a new 'partOfDay' like 'evening'

export default function Lights() {
    console.log("Lights rerender")

    const dirLight = useRef()
    const shadowCameraDimension = 1000

    // useFrame(() => {
    //     if(useStore.getState().partOfDay === "night" || useStore.getState().partOfDay === "evening") {
    //         dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 0.5, 0.2)
    //         dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x, 8, 0.2)
    //     } else {
    //         dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 10, 0.2)
    //         dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x, -12, 0.2)
    //     }
    // })  


    return <>
        <ambientLight 
            intensity={.3} 
        />
        <directionalLight
            ref={dirLight}
            castShadow
            intensity={4}
            position={[-10,6,1]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.1}
            shadow-camera-far={100}
            shadow-camera-left={-100}
            shadow-camera-right={300}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
        />
    </>
}