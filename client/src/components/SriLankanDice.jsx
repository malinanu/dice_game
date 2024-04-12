import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function SriLankanDice(props) {
  const { nodes, materials } = useGLTF("./model/dice/Dice.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
}

useGLTF.preload("./model/dice/Dice.gltf");
