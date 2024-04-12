import { Canvas, extend } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Box, Loader } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { DiceService, diceFaceMap } from "./services/DiceService";
import { SriLankanDice } from "./components/SriLankanDice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu } from "./components/Menu";
import * as THREE from "three";
import "./index.css";

extend({ Div: THREE.Object3D });

function DiceApp() {
  const cube = useRef();
  const isOnFloor = useRef(true);
  const cube_holder = useRef();
  const D1 = useRef();
  const D2 = useRef();
  const D3 = useRef();
  const D4 = useRef();
  const D5 = useRef();
  const D6 = useRef();
  const D7 = useRef();

  const [deviceHeight, setDeviceHeight] = useState(0);
  const [elementWidth, setElementWidth] = useState(450);
  const [collidedValue, setCollidedValue] = useState(null);
  const [collidedNumber, setCollidedNumber] = useState(null);

  const handleJump = () => {
    DiceService.jump(cube, isOnFloor, cube_holder);
  };

  const handleRespawn = () => {
    DiceService.respawn(cube);
  };

  /**
   * Audio
   */

  const playAudio = (Path) => {
    const audio = new Audio(`./Sounds/Tick.mp3`);
    audio.play();
  };

  const createCuboidCollider = (
    args,
    ref,
    position,
    colliderName,
    collidedNumber
  ) => (
    <CuboidCollider
      args={args}
      ref={ref}
      position={position}
      onCollisionEnter={(e) => {
        if (e.colliderObject.name === colliderName) {
          setCollidedNumber(collidedNumber);
        }
        playAudio();
      }}
    />
  );
  const CuboidColliders = () => {
    const colliderData = [
      {
        args: [1.4, 1.4, 0.0],
        ref: D6,
        position: [0, 0, 1.5],
        colliderName: "floor",
        collidedNumber: diceFaceMap.D6,
      },
      {
        args: [1.4, 0.0, 1.4],
        ref: D5,
        position: [0, 1.5, 0],
        colliderName: "floor",
        collidedNumber: diceFaceMap.D5,
      },
      {
        args: [0.0, 1.4, 1.4],
        ref: D4,
        position: [1.5, 0, 0],
        colliderName: "floor",
        collidedNumber: diceFaceMap.D4,
      },
      {
        args: [1.4, 1.4, 0.0],
        ref: D1,
        position: [0, 0, -1.5],
        colliderName: "floor",
        collidedNumber: diceFaceMap.D1,
      },
      {
        args: [1.4, 0.0, 1.4],
        ref: D3,
        position: [0, -1.5, 0],
        colliderName: "floor",
        collidedNumber: diceFaceMap.D3,
      },
      {
        args: [0.0, 1.4, 1.4],
        ref: D2,
        position: [-1.5, 0, 0],
        colliderName: "floor",
        collidedNumber: diceFaceMap.D2,
      },
      {
        args: [1.4, 1.4, 0.0],
        ref: D6,
        position: [0, 0, 1.5],
        colliderName: "cube_holder",
        collidedNumber: diceFaceMap.D7,
      },
      {
        args: [1.4, 0.0, 1.4],
        ref: D5,
        position: [0, 1.5, 0],
        colliderName: "cube_holder",
        collidedNumber: diceFaceMap.D7,
      },
      {
        args: [0.0, 1.4, 1.4],
        ref: D4,
        position: [1.5, 0, 0],
        colliderName: "cube_holder",
        collidedNumber: diceFaceMap.D7,
      },
      {
        args: [1.4, 1.4, 0.0],
        ref: D1,
        position: [0, 0, -1.5],
        colliderName: "cube_holder",
        collidedNumber: diceFaceMap.D7,
      },
      {
        args: [1.4, 0.0, 1.4],
        ref: D3,
        position: [0, -1.5, 0],
        colliderName: "cube_holder",
        collidedNumber: diceFaceMap.D7,
      },
      {
        args: [0.0, 1.4, 1.4],
        ref: D2,
        position: [-1.5, 0, 0],
        colliderName: "cube_holder",
        collidedNumber: diceFaceMap.D7,
      },
    ];

    return colliderData.map((data, index) =>
      createCuboidCollider(
        data.args,
        data.ref,
        data.position,
        data.colliderName,
        data.collidedNumber
      )
    );
  };

  useEffect(() => {
    const updateHeight = () => {
      setDeviceHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth <= 450) {
        setElementWidth(window.innerWidth);
      } else {
        setElementWidth(450);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <>
      <div style={{ width: `${elementWidth}px`, height: `${deviceHeight}px` }}>
        <Canvas
          shadows
          camera={{ position: [0, 12, 50], fov: 30 }}
          size={{ width: `${elementWidth}px`, height: `${deviceHeight}px` }}
        >
          <ambientLight intensity={0.01} />
          <OrbitControls enabled={false} />
          <Suspense>
            <Physics>
              <RigidBody
                position={[0, 1, 40]}
                type="fixed"
                name="cube_holder"
                ref={cube_holder}
                friction={0}
              >
                <Box args={[10, 1, 10]} />
              </RigidBody>

              <Experience
                cube={cube}
                collidedNumber={collidedNumber}
                isOnFloor={isOnFloor}
              >
                <RigidBody
                  rotation={[Math.PI / 4, Math.PI / 4, Math.PI / 4]}
                  position={[0, 2, 38]}
                  scale={[0.5, 0.5, 0.5]}
                  name="diceBody"
                  ref={cube}
                  onCollisionEnter={(e) => {
                    if (e.colliderObject.name === "floor") {
                      setTimeout(() => {
                        setCollidedValue(1);
                      }, 3000);
                    } else if (e.colliderObject.name === "cube_holder") {
                      setTimeout(() => {
                        setCollidedValue(0);
                      }, 0);
                    }
                  }}
                >
                  <CuboidColliders />
                  <SriLankanDice scale={[45, 45, 45]} />
                </RigidBody>
              </Experience>
            </Physics>
          </Suspense>
        </Canvas>
      </div>
      <Menu
        jump={handleJump}
        respawn={handleRespawn}
        collidedValue={collidedNumber}
        collided={collidedValue}
      />
      <Loader />
    </>
  );
}

export default DiceApp;
