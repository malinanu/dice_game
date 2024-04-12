import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Bg(props) {
  const { nodes, materials } = useGLTF("./model/bg/bg.gltf");
  return (
    <group {...props} dispose={null}>
      <group position={[-0.019, 1.008, 0.083]}>
        <mesh geometry={nodes.Plane.geometry} material={materials.Wood} />
        <mesh geometry={nodes.Plane_1.geometry} material={materials.None} />
        <mesh geometry={nodes.Plane_2.geometry} material={materials.phong1SG} />
        <mesh geometry={nodes.Plane_3.geometry} material={materials.Rope} />
      </group>
    </group>
  );
}

useGLTF.preload("./model/bg/bg.gltf");
