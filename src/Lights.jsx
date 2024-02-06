import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useStore } from "./store"

// an example of how a light system might respond to state changes.
// Slowly interpolate between a few configurations, triggered by entering a new 'partOfDay' like 'evening'

export default function Lights() {
    console.log("Lights rerender")

    const dirLight = useRef()
    const ambLight = useRef()
    const pointLight = useRef()

    useFrame(() => {
        if(useStore.getState().partOfDay === "evening") {
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 4, 0.2)
            dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x,12, 0.2)
        }

        if(useStore.getState().partOfDay === "night") {
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 0, 0.2)
            ambLight.current.intensity = THREE.MathUtils.lerp(ambLight.current.intensity, 0, 0.2)
            pointLight.current.intensity = 5
        } else {
            ambLight.current.intensity = THREE.MathUtils.lerp(ambLight.current.intensity, 1, 0.2)
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 2, 0.2)
            dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x,6, 0.2)
            pointLight.current.intensity = 0
        }
    })  

    return <>
        <ambientLight 
            ref={ambLight}
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
        <pointLight
            ref={pointLight}
            position={[-3,4,2]}
            intensity={1}
            castShadow
            shadow-bias={-.1}
            
        />
    </>
}