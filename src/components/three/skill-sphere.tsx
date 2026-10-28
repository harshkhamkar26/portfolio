"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import type { SkillCategory } from "@/lib/data/skills";

function SkillOrb({
  category,
  position,
  index,
}: {
  category: SkillCategory;
  position: [number, number, number];
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime + index) * 0.08;
    ref.current.scale.setScalar(hovered ? 1.15 : 1);
  });

  return (
    <group position={position}>
      <Sphere
        ref={ref}
        args={[0.45, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={category.color}
          emissive={category.color}
          emissiveIntensity={hovered ? 1.2 : 0.4}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
      <Html position={[0, -0.75, 0]} center>
        <span className="whitespace-nowrap text-[10px] font-medium text-zinc-300">
          {category.name}
        </span>
      </Html>
    </group>
  );
}

function SkillScene({ categories }: { categories: SkillCategory[] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  const positions: [number, number, number][] = [
    [-1.8, 0.3, 0],
    [-0.9, -0.5, 0.8],
    [0, 0.6, 0],
    [0.9, -0.4, -0.6],
    [1.8, 0.2, 0.3],
    [0, -0.8, -0.8],
  ];

  return (
    <group ref={groupRef}>
      {categories.map((cat, i) => (
        <SkillOrb
          key={cat.id}
          category={cat}
          position={positions[i] ?? [0, 0, 0]}
          index={i}
        />
      ))}
    </group>
  );
}

export function SkillSphereCanvas({
  categories,
}: {
  categories: SkillCategory[];
}) {
  return (
    <div className="h-[420px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#8b5cf6" />
        <Suspense fallback={null}>
          <SkillScene categories={categories} />
        </Suspense>
      </Canvas>
    </div>
  );
}
