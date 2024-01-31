import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"

function App() {
  console.log("app rerender")
  return <>
    <Canvas
      camera={{near:0.01, far:100}}
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