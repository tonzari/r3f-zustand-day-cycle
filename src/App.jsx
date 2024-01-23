import { Canvas } from "@react-three/fiber"
import Experience from "./Experience"

function App() {
  console.log("app rerender")
  return <>
    <Canvas>
      <color attach="background" args={['black']} />
      <Experience 
        camera={{near:0.01, far:10}}
        shadows
        gl={{ preserveDrawingBuffer: true }}
        eventSource={document.getElementById('root')}
        eventPrefix="client"
      />
    </Canvas>
  </>
}

export default App