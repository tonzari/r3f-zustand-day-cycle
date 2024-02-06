import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useRef } from "react"

export default function RotateByCursor({children}) {
    const group = useRef()
  
    useFrame((state, delta) => {
      easing.dampE(
        group.current.rotation, 
        [state.pointer.y / 150, -state.pointer.x / 50, 0],
        0.13,
        delta
        )
    })
    
    return (
      <group ref={group}>
        {children}
      </group>
    )
  }
  