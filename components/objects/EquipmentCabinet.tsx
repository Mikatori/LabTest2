'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';

interface EquipmentCabinetProps {
  position: [number, number, number];
  module: 'COD' | 'BOD';
}

export default function EquipmentCabinet({ position, module }: EquipmentCabinetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { hasGloves, hasGoggles, toggleGloves, toggleGoggles } = useLabStore();

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1];
    }
  });

  const handleEquipmentClick = (equipmentType: string) => {
    if (equipmentType === 'gloves') {
      toggleGloves();
    } else if (equipmentType === 'goggles') {
      toggleGoggles();
    }
  };

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
      <mesh position={[-0.5, 0.75, 0.44]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#ffd700" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Safety Equipment - Gloves */}
      <group
        position={[-0.3, 0.65, 0]}
        onClick={(e) => {
          e.stopPropagation();
          handleEquipmentClick('gloves');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          (e.object as THREE.Mesh).scale.setScalar(1.1);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          (e.object as THREE.Mesh).scale.setScalar(1);
        }}
      >
        {/* Gloves Box */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.15, 0.15]} />
          <meshStandardMaterial
            color={hasGloves ? '#48bb78' : '#e53e3e'}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
        {/* Gloves Icon/Shape */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Safety Equipment - Goggles */}
      <group
        position={[0.3, 0.65, 0]}
        onClick={(e) => {
          e.stopPropagation();
          handleEquipmentClick('goggles');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          (e.object as THREE.Mesh).scale.setScalar(1.1);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          (e.object as THREE.Mesh).scale.setScalar(1);
        }}
      >
        {/* Goggles Box */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.1, 0.15]} />
          <meshStandardMaterial
            color={hasGoggles ? '#48bb78' : '#e53e3e'}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
        {/* Goggles Lenses */}
        <mesh position={[-0.06, 0.06, 0.08]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#63b3ed" transparent opacity={0.6} />
        </mesh>
        <mesh position={[0.06, 0.06, 0.08]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial color="#63b3ed" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Pipette */}
      <group position={[0, 0.65, 0]}>
        {/* Pipette Body */}
        <mesh castShadow position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.015, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Pipette Tip */}
        <mesh castShadow position={[0.07, 0.05, 0]} rotation={[0, 0, Math.PI / 6]}>
          <coneGeometry args={[0.015, 0.08, 8]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Cabinet Label */}
      <Text
        position={[0, 1.55, 0]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        TỦ DỤNG CỤ
      </Text>

      {/* Safety Indicators */}
      {hasGloves && (
        <Text
          position={[-0.3, 0.9, 0.1]}
          fontSize={0.08}
          color="#48bb78"
          anchorX="center"
          anchorY="middle"
        >
          ✓
        </Text>
      )}
      {hasGoggles && (
        <Text
          position={[0.3, 0.9, 0.1]}
          fontSize={0.08}
          color="#48bb78"
          anchorX="center"
          anchorY="middle"
        >
          ✓
        </Text>
      )}
    </group>
  );
}
