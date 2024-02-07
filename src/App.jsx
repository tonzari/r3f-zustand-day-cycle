import { Canvas, useFrame } from "@react-three/fiber"
import Experience from "./Experience"
import Effects from "./Effects"
// fov: 26.3786


function App() {
  console.log("app rerender")

  return <>
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <color attach="background" args={['black']} />
      <Experience />

      <Effects />

    </Canvas>
  </>
}

export default App