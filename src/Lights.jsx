import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import {updateDayCycle} from './util'
import useStore from "./store"

export default function Lights() {
    console.log("Lights rerender")

    const dirLight = useRef()
    const start = useStore((state)=>state.start)

    useEffect(() => {
        start()
        const interval = setTimeout(function loop(){
          updateDayCycle()
          setTimeout(loop, 21600000 / useStore.getState().speedMultiplier)
        }, 21600000 / useStore.getState().speedMultiplier)
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, [])

    useFrame(() => {
        if(useStore.getState().partOfDay === "night" || useStore.getState().partOfDay === "evening") {
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 0.5, 0.2)
            dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x, 8, 0.2)
        } else {
            dirLight.current.intensity = THREE.MathUtils.lerp(dirLight.current.intensity, 10, 0.2)
            dirLight.current.position.x = THREE.MathUtils.lerp(dirLight.current.position.x, -12, 0.2)
        }
    })  


    return <>
        <directionalLight ref={dirLight} position={[3,3,3]}/>
    </>
}