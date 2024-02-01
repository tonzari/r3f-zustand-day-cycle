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

    useFrame(() => {
        if(useStore.getState().partOfDay === "night" || useStore.getState().partOfDay === "evening") {
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 0.5, 0.2)
            dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x, 3, 0.2)
        } else {
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 10, 0.2)
            dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x, 12, 0.2)
        }
    })  

    return <>
        <ambientLight 
            intensity={1}
            color={[1,0.7,0.8]}
        />
        <directionalLight
            ref={dirLight}
            castShadow
            color={[0.8,1,1]}
            intensity={1}
            position={[4,5,3]}
            shadow-mapSize={2048}
            shadow-bias={-.009}
            shadow-camera-near={ 1 }
            shadow-camera-far={ 30 }
            shadow-camera-top={ 30 }
            shadow-camera-right={ 30 }
            shadow-camera-bottom={ -30 }
            shadow-camera-left={ -30 }
        />
    </>
}