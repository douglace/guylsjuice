"use client";

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Bottle3D from "./Bottle3D";
import { products } from "@/lib/products";

interface BottleCarousel3DProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

function Scene({ activeIndex, onSelect }: BottleCarousel3DProps) {
  const bottleProducts = products.filter((p) => p.id !== "shots-detox");
  const count = bottleProducts.length;
  const radius = 3;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 3, -3]} intensity={0.4} color="#f59e0b" />

      <Environment preset="studio" />

      {bottleProducts.map((product, i) => {
        const angle =
          ((i - activeIndex) / count) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Bottle3D
            key={product.id}
            color={product.color}
            name={product.name}
            active={i === activeIndex}
            position={[x, 0, z]}
            onClick={() => onSelect(i)}
          />
        );
      })}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
      />
    </>
  );
}

export default function BottleCarousel3D({
  activeIndex,
  onSelect,
}: BottleCarousel3DProps) {
  return (
    <div className="w-full h-[400px] sm:h-[500px] touch-none">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene activeIndex={activeIndex} onSelect={onSelect} />
      </Canvas>
    </div>
  );
}
