'use client';

import { useRef, useState } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface BODBottleProps {
  position: [number, number, number];
  currentStep: number;
  isCapped?: boolean;
  liquidColor?: string;
}

export default function BODBottle({
  position,
  currentStep,
  isCapped = false,
  liquidColor = '#87ceeb',
}: BODBottleProps) {
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
      {/* Bottle Body */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.12, 0.4, 32, 1, true]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.1}
          side={THREE.DoubleSide}
          emissive={hovered ? '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Liquid */}
      <Cylinder
        args={[0.14, 0.11, 0.35, 32]}
        position={[0, 0.2, 0]}
      >
        <meshStandardMaterial
          color={liquidColor}
          transparent
          opacity={0.5}
          roughness={0.2}
        />
      </Cylinder>

      {/* Neck */}
      <Cylinder
        args={[0.04, 0.04, 0.1, 16]}
        position={[0, 0.45, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
        />
      </Cylinder>

      {/* Rim */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.045, 0.01, 16, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Cap */}
      {isCapped && (
        <mesh position={[0, 0.53, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.06, 32]} />
          <meshStandardMaterial
            color="#2d3748"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      )}

      {/* Selection Indicator */}
      {selected && (
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      )}

      {/* Label */}
      <mesh position={[0, 0.2, -0.12]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
