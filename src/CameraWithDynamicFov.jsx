import { PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useStore } from "./store"
import { useRef } from "react"

export default function CameraWithDynamicFov() {
    const mainCam = useRef()
    const fov = 26.3786
    const setFocusedObject = useStore((state)=>state.setFocusedObject)
    // to do: decrease the FOV when screen width is extremely wide and revealing too wide a camera angle

    // remove this! just demoing camera changes. don't set it every frame
    useFrame(()=>{
        if(useStore.getState().focusedObject === "clock") {
            mainCam.current.position.set(-0.6, 4, 0.6)
            mainCam.current.rotation.set(0, 0, 0)
            setTimeout(()=>{
                setFocusedObject('')
                mainCam.current.position.set(-1.7996, 2.092, 7.209)
                mainCam.current.rotation.set(0.0925, -0.2937, 0.0164)
            },3000)
        }
    })

    return (
      <PerspectiveCamera
        makeDefault
        ref={mainCam}
        near={0.01}
        far={150}
        fov={fov}
        position={[-1.7996, 2.092, 7.209]}
        rotation={[0.0925, -0.2937, 0.0164]}
    />
    )
}