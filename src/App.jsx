import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"

function App() {
  console.log("app rerender")
  return <>
    <Canvas
      camera={{ near:0.01, far:100, fov: 26.3786,position: [-1.7996, 2.092, 7.209],
      rotation: [0.0925, -0.2937, 0.0164], scale: 0.502}}
      shadows
      gl={{ preserveDrawingBuffer: true }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <color attach="background" args={['black']} />
      <Experience />
    </Canvas>
  </>
}

export default App