import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Merged } from "@react-three/drei";

function Piece({ position }) {
  const group = useRef();
  // Function to position spheres in a pyramid shape

  const arrangeSpheres = () => {
    return position.coordinates.map((item, index) => (
        <mesh key={index} position={[item.x, item.y, item.z]}>
          <sphereGeometry args={[0.5, 32, 32, 32]} />
          <meshStandardMaterial color={position.color} />
        </mesh>
      ));
  };

  // Update function to rotate the pyramid
  useFrame(() => {
    group.current.rotation.y += 0.01;
  });

  return <group ref={group}>{arrangeSpheres()}</group>;
}

export default Piece;
