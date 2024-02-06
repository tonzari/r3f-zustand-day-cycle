import { PerspectiveCamera } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useStore } from "./store"
import { useEffect, useRef } from "react"

export default function CameraWithDynamicFov() {
    console.log("Camera Fov component rerender")
    const mainCam = useRef()
    let fov = 26.3786
    const setFocusedObject = useStore((state)=>state.setFocusedObject)

    const viewport  = useThree((state) => state.viewport)

    console.log(viewport.aspect)

    useEffect(() => {
        mainCam.current.position.set(-1.7996, 2.092, 7.209)

        if(viewport.aspect > 3.7) { 
            mainCam.current.fov = 1
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 3.4) { 
            mainCam.current.fov = 15
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 3.1) { 
            mainCam.current.fov = 16
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 2.8) { 
            mainCam.current.fov = 18
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 2.5) { 
            mainCam.current.fov = 20
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 2.1) { 
            mainCam.current.fov = 22
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 1.8) { 
            mainCam.current.fov = 26.3786
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 1.5) { 
            mainCam.current.fov = 30
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 1.3) { 
            mainCam.current.fov = 35
            console.log(2, mainCam.current.fov)
        } else if(viewport.aspect > 1.12) {
            mainCam.current.fov = 40
            console.log(1, mainCam.current.fov)
        } else if(viewport.aspect > 0.9) {
            mainCam.current.fov = 40
            console.log(1, mainCam.current.fov)
            mainCam.current.position.set(-1.5, 2.092, 7.209)
        } else if(viewport.aspect > 0.6){
            mainCam.current.fov = 45
            mainCam.current.position.set(-0.9, 2.092, 7.209)
        } else {
            mainCam.current.fov = 45
            mainCam.current.position.set(-0.1, 2.092, 7.209)
        }

    }, [viewport])

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
            }, 3000)
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