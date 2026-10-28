"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

function NeuralCore({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, connections } = useMemo(() => {
    const nodeCount = 28;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.8;
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    const connections: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 1.4) {
          connections.push([nodes[i], nodes[j]]);
        }
      }
    }
    return { nodes, connections };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15 + mouse.current.x * 0.4;
    groupRef.current.rotation.x = mouse.current.y * 0.25;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <Sphere key={i} position={pos} args={[0.04, 8, 8]}>
          <meshStandardMaterial
            color={i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#8b5cf6" : "#6366f1"}
            emissive={i % 3 === 0 ? "#0891b2" : "#4c1d95"}
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#22d3ee"
          opacity={0.25}
          transparent
          lineWidth={0.5}
        />
      ))}
      <mesh>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0284c7"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
    </group>
  );
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#8b5cf6" />
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <NeuralCore mouse={mouse} />
      </Float>
    </>
  );
}

export function NeuralNetworkScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
