"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotate ring
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    // Float gently
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.6, 0.4, 32, 64]} />
      {/* Premium wireframe structure representing transaction networks */}
      <meshStandardMaterial
        color="#2F6FED"
        wireframe
        roughness={0.1}
        metalness={0.9}
        emissive="#0b1a38"
      />
    </mesh>
  );
}

export default function HeroThreeCanvas() {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-6, -6, -2]} intensity={0.8} color="#E4231D" />
        <pointLight position={[6, 6, 2]} intensity={1} color="#2F6FED" />
        <FloatingTorus />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
