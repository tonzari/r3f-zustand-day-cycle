import { useGLTF } from "@react-three/drei";

export function WindowModel(props) {
  const { nodes } = useGLTF("/window.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rod_End_1_lambert2_0.geometry}
      >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rod_End_2_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rod_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring1_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring2_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring3_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring4_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ring5_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rod_Back_1_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rod_Back_2_lambert2_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_2_lambert3_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Curtain_1_lambert3_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame2_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame3_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame4_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame5_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame6_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame7_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame8_blinn1_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame9_blinn1_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame10_blinn1_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame11_blinn1_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame1_blinn1_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Window_Frame_lambert7_0.geometry}
        >
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}

useGLTF.preload("/window.glb");
