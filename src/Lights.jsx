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
    // const start = useStore((state)=>state.start)
    // const setSimulatedTime = useStore((state)=>state.updateSimulatedTime)
    // const partOfDayDurationInMs = 21600000 // = day in milliseconds / 4 (part of day count (morning, midday, evening, night)

    // useEffect(() => {
    //     start()
    //     const interval = setTimeout(function loop(){
    //       updateDayCycle()
    //       setSimulatedTime()
    //       setTimeout(loop, partOfDayDurationInMs / useStore.getState().speedMultiplier)
    //     }, partOfDayDurationInMs / useStore.getState().speedMultiplier)
    
    //     return () => clearInterval(interval); // Cleanup on unmount
    //   }, [])

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
        <ambientLight intensity={.3} />
        <directionalLight ref={dirLight} position={[-10,10,-10]}/>
    </>
}