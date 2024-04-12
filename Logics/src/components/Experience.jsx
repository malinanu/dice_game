import { Text, Environment, Plane, Image } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Bg } from "./Bg";
import { TextureLoader } from "three/src/loaders/TextureLoader";

export const Experience = ({ children, collidedNumber }) => {
  const floor = useRef();
  const [colorMap, normalMap, bg] = useLoader(TextureLoader, [
    "./src/assets/images/ground2.jpg",
    "./src/assets/images/NormalMap.png",
    "./src/assets/images/BG_2.png",
  ]);

  return (
    <>
      <Number />
      <Environment preset="sunset" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.01}
        castShadow
        color={"#fdfbd3"}
      />

      <RigidBody
        position={[0, -6, 0]}
        type="fixed"
        name="floor"
        ref={floor}
        friction={4}
      >
        <mesh>
          <Plane
            scale={[50, 50, 1]}
            position={[0, 1, 0]}
            rotation-x={(Math.PI * 3) / 2}
          >
            <meshStandardMaterial
              normalMap={normalMap}
              map={colorMap}
              color="C2B0AC"
            />
          </Plane>
        </mesh>
      </RigidBody>

      <RigidBody position={[0, -6, 0]} type="fixed" name="bg">
        <mesh>
          <Plane
            scale={[43.2 / 2 + 5, 93 / 2, 1]}
            position={[0, 3.2, -20]}
            rotation-x={Math.PI * 2}
          >
            <meshStandardMaterial map={bg} />
          </Plane>
        </mesh>
      </RigidBody>

      <RigidBody
        position={[-0.2, -2.7, -5]}
        scale={[5, 5, 4]}
        type="fixed"
        name="chalk_board"
      >
        <Text position={[0, 2.1, -1.3]} fontSize={0.35}>
          {collidedNumber || (
            <div style={{ backgroundColor: "black" }}>
              <Image
                url="./src/assets/images/72ppi/logo_black.png"
                scale={[0.9, 0.6, 0.001]}
                position={[0, 0.05, 0]}
              />
            </div>
          )}
        </Text>
      </RigidBody>

      <RigidBody
        position={[-8, 0, 0]}
        type="fixed"
        name="left_wall"
        friction={2}
      >
        <CuboidCollider args={[1, 15, 15]} />
      </RigidBody>

      <RigidBody
        position={[8, 0, 0]}
        type="fixed"
        name="right_wall"
        friction={2}
      >
        <CuboidCollider args={[1, 15, 15]} />
      </RigidBody>

      <RigidBody
        position={[0, -1, -7.5]}
        rotation={[-0.14, 0, 0]}
        type="fixed"
        name="dice_board"
        friction={6}
      >
        <CuboidCollider args={[2, 4, 0.3]} />
      </RigidBody>

      <RigidBody
        position={[0, 2, -16]}
        colliders={false}
        type="fixed"
        name="back_wall"
        friction={2}
      >
        <CuboidCollider args={[10, 10, 1]} />
      </RigidBody>

      <RigidBody colliders={false} type></RigidBody>

      <RigidBody
        position={[0, 0, 12]}
        type="fixed"
        name="front_wall"
        friction={2}
      >
        <CuboidCollider args={[14, 5, 1]} position={[0, -4, 0]} />
      </RigidBody>

      {children}

      <Bg
        scale={[22, 22, 22]}
        position={[0, -5, 5]}
        rotation-x={(Math.PI * 3) / 2}
      />
    </>
  );
};
