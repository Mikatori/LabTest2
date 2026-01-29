'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LabTableProps {
  position: [number, number, number];
}

export default function LabTable({ position }: LabTableProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <group position={position}>
      {/* Table Top */}
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[6, 0.1, 3]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Table Legs */}
      <mesh castShadow position={[-2.5, 0.375, 1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[2.5, 0.375, 1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[-2.5, 0.375, -1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[2.5, 0.375, -1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} />
      </mesh>

      {/* Safety Signs on Table */}
      <mesh position={[2.5, 0.85, 1.2]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.8} />
      </mesh>
      <mesh position={[2.5, 0.85, 1.21]} rotation={[0, -Math.PI / 4, 0]}>
        <planeGeometry args={[0.28, 0.18]} />
        <meshBasicMaterial color="#000" />
      </mesh>
    </group>
  );
}
