import { RigidBody, vec3 } from "@react-three/rapier";

export const DiceService = {
  jump: function (cube, isOnFloor) {
    cube.current.wakeUp();
    cube.current.applyImpulse({ x: 0, y: 8, z: -200 });
    cube.current.setRotation(vec3({ x: 5, y: 6, z: 7 }));
    isOnFloor.current = false;
  },
  respawn: function (cube) {
    cube.current.setTranslation(vec3({ x: 0, y: 2, z: 38 }));
    cube.current.setLinvel(vec3({ x: 0, y: 0, z: 0 }));
    cube.current.setRotation(
      vec3({ x: Math.random(), y: Math.random(), z: Math.random() })
    );
  },
};

export const diceFaceMap = {
  D1: 6,
  D2: 9,
  D3: 3,
  D4: 12,
  D5: 18,
  D6: 15,
  D7: null,
};
