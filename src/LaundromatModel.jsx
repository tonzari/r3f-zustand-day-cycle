/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from 'three'
import React, { useEffect, useRef, useState } from "react"
import { MeshRefractionMaterial, Reflector, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useStore } from "./store"
import { MeshReflectorMaterial } from '@react-three/drei'
 
export function LaundromatModel(props) {
  console.log("laundromat model rerendered")
  const { nodes, materials } = useGLTF("models/Laundromat_24_ad.glb")
  const minuteHand = useRef()
  const hourHand = useRef()
  const [hovered, setHovered] = useState(false)

  const setFocusedObject = useStore((state)=>state.setFocusedObject)
  
  let lastMinute = null
  let lastHour = null

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  useFrame(()=>{

      // clock animation! move this to another component
      lastMinute = useStore.getState().simulatedTime.getMinutes()
      lastHour = useStore.getState().simulatedTime.getHours()

      minuteHand.current.rotation.set(
        0,
        THREE.MathUtils.lerp(minuteHand.current.rotation.y, ((Math.PI/30) * (-lastMinute + 12)), 0.2), // 12 is an offset correction from the orig model rotation
        0
      ) 
      
  
      hourHand.current.rotation.set(
        0,
        THREE.MathUtils.lerp(hourHand.current.rotation.y, ((Math.PI/6) * (-lastHour + 3)), 0.2),
        0
      )
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Cylinder"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={nodes.Cylinder.material}
        position={[0.613, 3.253, 0.231]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <group
        name="Washing_Machines"
        position={[-2.015, 2.462, 0.147]}
        rotation={[0, 0.012, 0]}
      >
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials["Washing Machines"]}
        />
        <mesh
          name="Cube004_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials["Washing Machine Interior"]}
        />
        <mesh
          name="Cube004_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials["Washing Machines.001"]}
        />
      </group>
      <mesh
        name="Clothes_Basket"
        castShadow
        receiveShadow
        geometry={nodes.Clothes_Basket.geometry}
        material={materials["Clothes Basket"]}
        position={[0.028, 3.245, 0.27]}
        rotation={[-0.032, 0.455, 0]}
      >
        <mesh
          name="Clothes"
          castShadow
          receiveShadow
          geometry={nodes.Clothes.geometry}
          material={materials["Blank Difuse Material"]}
          position={[-0.092, 0.088, 0.039]}
          rotation={[0, -0.455, 0]}
          scale={0.315}
        />
      </mesh>
      <group
        onClick={()=>{
          console.log("clock!!!")
          setFocusedObject('clock')
        }}
        onPointerOver={()=>{
          setHovered(true)
        }}
        onPointerLeave={()=>{
          setHovered(false)
        }}
        name="Clock"
        position={[-0.631, 3.975, -0.496]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.062}
      >
        <mesh
          name="Cylinder002_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_1.geometry}
          material={materials["Clock Border"]}
        />
        <mesh
          name="Cylinder002_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_2.geometry}
          material={materials["Clock BG"]}
        />
        <mesh
          name="Cylinder001"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials["Clock Hands"]}
          position={[0, -0.002, 0]}
          rotation={[Math.PI, -0.437, Math.PI]}
        >
          <mesh
            ref={hourHand}
            name="Cylinder003"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003.geometry}
            material={materials["Clock Hands"]}
            position={[0, -0.002, 0]}
            rotation={[-Math.PI, 0.226, -Math.PI]}
            scale={1.403}
          >
            
          </mesh>
          <mesh
              ref={minuteHand}
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials["Clock Hands"]}
              rotation={[Math.PI, 0, Math.PI]}
              scale={0.733}
            />
        </mesh>
      </group>
      <mesh
        name="Poster"
        castShadow
        receiveShadow
        geometry={nodes.Poster.geometry}
        material={materials.Posters}
        position={[1.281, 4.3, -0.501]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Poster001"
        castShadow
        receiveShadow
        geometry={nodes.Poster001.geometry}
        material={materials.Posters}
        position={[0.769, 4.475, -0.498]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="Poster002"
        castShadow
        receiveShadow
        geometry={nodes.Poster002.geometry}
        material={materials.Posters}
        position={[-2.254, 3.969, 4.162]}
        rotation={[Math.PI / 2, 0, -1.622]}
        scale={1.801}
      />
      <group
        name="Torus001"
        position={[-0.097, 2.483, 0.608]}
        rotation={[Math.PI / 2, 0, -0.188]}
      >
        <mesh
          name="Torus001_1"
          castShadow
          receiveShadow
          geometry={nodes.Torus001_1.geometry}
          material={materials["Machine Lid"]}
        />
        <mesh
          name="Torus001_2"
          castShadow
          receiveShadow
          geometry={nodes.Torus001_2.geometry}
        />
      </group>
      <group
        name="Torus002"
        position={[0.666, 2.48, 0.608]}
        rotation={[Math.PI / 2, 0, -2.541]}
      >
        <mesh
          name="Torus007"
          castShadow
          receiveShadow
          geometry={nodes.Torus007.geometry}
          material={materials["Machine Lid"]}
        />
        <mesh
          name="Torus007_1"
          castShadow
          receiveShadow
          geometry={nodes.Torus007_1.geometry}
        />
      </group>
      <group
        name="Torus003"
        position={[-0.955, 2.488, 0.608]}
        rotation={[Math.PI / 2, 0, -0.697]}
      >
        <mesh
          name="Torus008"
          castShadow
          receiveShadow
          geometry={nodes.Torus008.geometry}
          material={materials["Machine Lid"]}
        />
        <mesh
          name="Torus008_1"
          castShadow
          receiveShadow
          geometry={nodes.Torus008_1.geometry}
        />
      </group>
      <group
        name="Torus004"
        position={[-1.792, 2.494, 0.608]}
        rotation={[Math.PI / 2, 0, -0.736]}
      >
        <mesh
          name="Torus009"
          castShadow
          receiveShadow
          geometry={nodes.Torus009.geometry}
          material={materials["Machine Lid"]}
        />
        <mesh
          name="Torus009_1"
          castShadow
          receiveShadow
          geometry={nodes.Torus009_1.geometry}
        />
      </group>

      <mesh
        name="Gumball"
        castShadow
        receiveShadow
        geometry={nodes.Gumball.geometry}
        position={[1.311, 3.067, -0.136]}
        rotation={[0.013, 0.004, -0.042]}
        scale={1.131}
      />
      <mesh
        name="Gumball001"
        castShadow
        receiveShadow
        geometry={nodes.Gumball001.geometry}
        position={[1.386, 3.077, -0.124]}
        rotation={[0.013, 0.004, -0.042]}
        scale={1.131}
      />
      <mesh
        name="Gumball002"
        castShadow
        receiveShadow
        geometry={nodes.Gumball002.geometry}
        position={[1.35, 3.093, -0.143]}
        rotation={[0.013, 0.004, -0.042]}
        scale={1.131}
      />
      <mesh
        name="Gumball003"
        castShadow
        receiveShadow
        geometry={nodes.Gumball003.geometry}
        position={[1.268, 3.068, -0.163]}
        rotation={[0.013, 0.004, -0.042]}
        scale={1.131}
      />
      <mesh
        name="Gumball004"
        castShadow
        receiveShadow
        geometry={nodes.Gumball004.geometry}
        position={[1.334, 3.171, -0.212]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball005"
        castShadow
        receiveShadow
        geometry={nodes.Gumball005.geometry}
        position={[1.316, 3.125, -0.2]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball006"
        castShadow
        receiveShadow
        geometry={nodes.Gumball006.geometry}
        position={[1.405, 3.118, -0.18]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball007"
        castShadow
        receiveShadow
        geometry={nodes.Gumball007.geometry}
        position={[1.369, 3.149, -0.21]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball008"
        castShadow
        receiveShadow
        geometry={nodes.Gumball008.geometry}
        position={[1.256, 3.066, -0.206]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball009"
        castShadow
        receiveShadow
        geometry={nodes.Gumball009.geometry}
        position={[1.268, 3.104, -0.146]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball010"
        castShadow
        receiveShadow
        geometry={nodes.Gumball010.geometry}
        position={[1.281, 3.134, -0.117]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball011"
        castShadow
        receiveShadow
        geometry={nodes.Gumball011.geometry}
        position={[1.368, 3.055, -0.017]}
        rotation={[-1.763, 0.179, 0.394]}
        scale={1.131}
      />
      <mesh
        name="Gumball012"
        castShadow
        receiveShadow
        geometry={nodes.Gumball012.geometry}
        position={[1.312, 3.052, -0.067]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball013"
        castShadow
        receiveShadow
        geometry={nodes.Gumball013.geometry}
        position={[1.318, 3.073, -0.021]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball014"
        castShadow
        receiveShadow
        geometry={nodes.Gumball014.geometry}
        position={[1.398, 3.054, -0.063]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball015"
        castShadow
        receiveShadow
        geometry={nodes.Gumball015.geometry}
        material={materials.Gumballs}
        position={[1.353, 3.048, -0.061]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball016"
        castShadow
        receiveShadow
        geometry={nodes.Gumball016.geometry}
        material={materials.Gumballs}
        position={[1.27, 3.082, 0.013]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball017"
        castShadow
        receiveShadow
        geometry={nodes.Gumball017.geometry}
        material={materials.Gumballs}
        position={[1.264, 3.092, -0.038]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball018"
        castShadow
        receiveShadow
        geometry={nodes.Gumball018.geometry}
        material={materials.Gumballs}
        position={[1.3, 3.128, -0.023]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball019"
        castShadow
        receiveShadow
        geometry={nodes.Gumball019.geometry}
        material={materials.Gumballs}
        position={[1.425, 3.099, -0.009]}
        rotation={[0.032, -0.319, -1.322]}
        scale={1.131}
      />
      <mesh
        name="Gumball020"
        castShadow
        receiveShadow
        geometry={nodes.Gumball020.geometry}
        material={materials.Gumballs}
        position={[1.241, 3.078, -0.275]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball021"
        castShadow
        receiveShadow
        geometry={nodes.Gumball021.geometry}
        material={materials.Gumballs}
        position={[1.264, 3.105, -0.248]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Gumball022"
        castShadow
        receiveShadow
        geometry={nodes.Gumball022.geometry}
        material={materials.Gumballs}
        position={[1.448, 3.089, -0.158]}
        rotation={[-1.611, -0.107, -0.894]}
        scale={1.131}
      />
      <mesh
        name="Cylinder004"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={nodes.Cylinder004.material}
        position={[0.513, 3.027, 0.413]}
      />
      <mesh
        name="Plane"
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.Posters}
        position={[1.322, 3.2, 0.122]}
        rotation={[Math.PI / 2, 0, -0.018]}
        scale={1.078}
      />
      <group
        name="prop_gumball"
        position={[1.321, 3.14, 0.003]}
        rotation={[0, 0.016, 0]}
        scale={0.864}
      >
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
        />
        <mesh
          name="Cube001_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
        />
        <mesh
          name="Cube001_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
        />
      </group>
      <group
        name="prop_soap"
        position={[0.664, 3.051, 0.246]}
        rotation={[0, 0.09, 0]}
        scale={0.375}
      >
        <mesh
          name="Plane004"
          castShadow
          receiveShadow
          geometry={nodes.Plane004.geometry}
          material={materials["Soap Bottle"]}
        />
        <mesh
          name="Plane004_1"
          castShadow
          receiveShadow
          geometry={nodes.Plane004_1.geometry}
          material={materials["Soap Bottle Cap"]}
        />
      </group>
      <group
        name="prop_legs"
        position={[2.5, 2.458, 0.35]}
        rotation={[0, 0.309, 0]}
        scale={0.571}
      >
        <mesh
          name="Vert"
          castShadow
          receiveShadow
          geometry={nodes.Vert.geometry}
          material={materials["Chair Legs"]}
        />
        <mesh
          name="Vert_1"
          castShadow
          receiveShadow
          geometry={nodes.Vert_1.geometry}
          material={materials.Chair}
        />
      </group>
      <group
        name="prop_legs001"
        position={[2.898, 2.458, 1.147]}
        rotation={[0, 0.114, 0]}
        scale={0.571}
      >
        <mesh
          name="Vert002"
          castShadow
          receiveShadow
          geometry={nodes.Vert002.geometry}
          material={materials["Chair Legs"]}
        />
        <mesh
          name="Vert002_1"
          castShadow
          receiveShadow
          geometry={nodes.Vert002_1.geometry}
          material={materials.Chair}
        />
      </group>
      <mesh
        name="Sky"
        castShadow
        receiveShadow
        geometry={nodes.Sky.geometry}
        material={materials["Material.001"]}
        position={[26.685, 3.199, -34.265]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        name="BG_Building"
        castShadow
        receiveShadow
        geometry={nodes.BG_Building.geometry}
        material={materials["BG Building"]}
        position={[20.454, 6.606, -30.157]}
      />
      <mesh
        name="BG_Building001"
        castShadow
        receiveShadow
        geometry={nodes.BG_Building001.geometry}
        material={materials["BG Building"]}
        position={[28.612, 3.851, -32.637]}
        scale={1.516}
      />
      <mesh
        name="Plane003"
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
      >
        {/* 
        
        MATERIAL EDITED for depth issue

        */}
        <meshStandardMaterial />
      </mesh>

      <mesh
        name="Plane003_1"
        castShadow
        receiveShadow
        geometry={nodes.Plane003_1.geometry}
       material={materials["Floor Tiles - Dark"]}
      >
        </mesh>
      <mesh
        name="Plane003_2"
        castShadow
        receiveShadow
        geometry={nodes.Plane003_2.geometry}
        material={materials["Floor Tiles - Light"]}
      >
      </mesh>
      <mesh
        name="Plane003_3"
        castShadow
        receiveShadow
        geometry={nodes.Plane003_3.geometry}
        material={materials["Building - Light Accents"]}
      />
    </group>
  );
}

useGLTF.preload("/Laundromat_24_ad.glb");
