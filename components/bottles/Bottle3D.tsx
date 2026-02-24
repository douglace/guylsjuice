"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface Bottle3DProps {
  color: string;
  name: string;
  active: boolean;
  position: [number, number, number];
  onClick: () => void;
}

export default function Bottle3D({
  color,
  name,
  active,
  position,
  onClick,
}: Bottle3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetScale = active ? 1.3 : 0.9;
  const targetY = active ? 0.3 : 0;

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.08
    );
    if (active) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* Bottle body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 1.8, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Bottle neck */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[0.15, 0.3, 0.5, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.15, 32]} />
        <meshStandardMaterial color="#16a34a" roughness={0.3} />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0.1, 0.41]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial color="white" opacity={0.9} transparent />
      </mesh>

      {/* Name on label */}
      {active && (
        <Text
          position={[0, 0.1, 0.43]}
          fontSize={0.1}
          color="#14532d"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {name}
        </Text>
      )}

      {/* Liquid level indicator */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.33, 0.38, 1.0, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.4}
          roughness={0.0}
        />
      </mesh>
    </group>
  );
}
