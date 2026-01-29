'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface PipetteProps {
  position: [number, number, number];
  currentStep: number;
  volume?: number;
}

export default function Pipette({ position, currentStep, volume = 0 }: PipetteProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setSelected(!selected)}
    >
      {/* Main Body */}
      <Cylinder
        args={[0.02, 0.02, 0.3, 16]}
        castShadow
        position={[0, 0.15, 0]}
      >
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.3}
          metalness={0.5}
          emissive={hovered ? '#4a5568' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Cylinder>

      {/* Tip */}
      <Cylinder
        args={[0.01, 0.005, 0.08, 16]}
        castShadow
        position={[0, -0.04, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          roughness={0.1}
        />
      </Cylinder>

      {/* Bulb */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#e53e3e"
          roughness={0.4}
        />
      </mesh>

      {/* Liquid inside */}
      {volume > 0 && (
        <Cylinder
          args={[0.015, 0.015, volume * 0.05, 16]}
          position={[0, 0.1, 0]}
        >
          <meshStandardMaterial
            color="#87ceeb"
            transparent
            opacity={0.7}
          />
        </Cylinder>
      )}

      {/* Selection Indicator */}
      {selected && (
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      )}

      {/* Hover Effect */}
      {hovered && !selected && (
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      )}
    </group>
  );
}
