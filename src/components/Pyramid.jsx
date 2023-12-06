import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Merged } from "@react-three/drei";

function Pyramid({ positions }) {
  const group = useRef();
  // Function to position spheres in a pyramid shape
  const arrangeSpheres = () => {
    return positions.map((position, index) =>
      position.coordinates.map((item, index) => (
        <mesh key={index} position={[item.x - item.z*0.5, item.z*-1 + 3.6, item.y - item.z*0.5 ]}>
          <sphereGeometry args={[0.5, 32, 32, 32]} />
          <meshStandardMaterial color={position.color} />
        </mesh>
      ))
    )
  };

  // Update function to rotate the pyramid
  useFrame(() => {
    group.current.rotation.y += 0.01;
  });

  return <group ref={group}>{arrangeSpheres()}</group>;
}

export default Pyramid;
