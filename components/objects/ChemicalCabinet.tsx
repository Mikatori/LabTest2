'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';
import { CHEMICAL_INFO } from '@/lib/constants';

interface ChemicalCabinetProps {
  position: [number, number, number];
  module: 'COD' | 'BOD';
}

export default function ChemicalCabinet({ position, module }: ChemicalCabinetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { currentStep } = useLabStore();

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1];
    }
  });

  const getCabinetContent = () => {
    if (module === 'COD') {
      return [
        { ...CHEMICAL_INFO.K2CR2O7, position: [-0.3, 0.3, 0] },
        { ...CHEMICAL_INFO.H2SO4_AG2SO4, position: [0, 0.3, 0] },
        { ...CHEMICAL_INFO.WATER_SAMPLE, position: [0.3, 0.3, 0] },
      ];
    } else {
      return [
        { ...CHEMICAL_INFO.WATER_SAMPLE, position: [-0.3, 0.3, 0] },
        { ...CHEMICAL_INFO.NUTRIENT, position: [0, 0.3, 0] },
        { ...CHEMICAL_INFO.MICROORGANISM, position: [0.3, 0.3, 0] },
      ];
    }
  };

  const content = getCabinetContent();

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cabinet Body */}
      <mesh castShadow receiveShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.8]} />
        <meshStandardMaterial
          color="#4a5568"
          roughness={0.3}
          metalness={0.7}
          emissive={hovered ? '#2d3748' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Cabinet Back */}
      <mesh position={[0, 0.75, -0.41]}>
        <boxGeometry args={[1.4, 1.4, 0.05]} />
        <meshStandardMaterial color="#2d3748" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Shelves */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.4, 0.05, 0.7]} />
        <meshStandardMaterial color="#718096" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[1.4, 0.05, 0.7]} />
        <meshStandardMaterial color="#718096" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Glass Door */}
      <mesh position={[0, 0.75, 0.41]}>
        <boxGeometry args={[1.45, 1.45, 0.05]} />
        <meshStandardMaterial
          color="#a0d2db"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Door Handle */}
      <mesh position={[0.5, 0.75, 0.44]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Chemical Bottles */}
      {content.map((chemical, index) => (
        <group key={index} position={[chemical.position[0], chemical.position[1], chemical.position[2]]}>
          {/* Bottle */}
          <mesh castShadow position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
            <meshStandardMaterial
              color={chemical.color}
              transparent
              opacity={0.7}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>

          {/* Bottle Cap */}
          <mesh castShadow position={[0, 0.31, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
            <meshStandardMaterial color="#1a202c" roughness={0.5} metalness={0.7} />
          </mesh>

          {/* Label */}
          <mesh position={[0, 0.15, 0.11]}>
            <planeGeometry args={[0.12, 0.1]} />
            <meshBasicMaterial color="#ffffff" opacity={0.9} transparent />
          </mesh>
        </group>
      ))}

      {/* Cabinet Label */}
      <Text
        position={[0, 1.55, 0]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        TỦ HÓA CHẤT
      </Text>
    </group>
  );
}
