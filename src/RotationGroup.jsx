import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useRef } from "react"

function CameraRig({children}) {
    
    const camRig = useRef()

    useFrame((state)=>{
        //easing.dampE(camRig.current.rotation, [])
    })

    return <group ref={camRig}>
        { children }
    </group>
}