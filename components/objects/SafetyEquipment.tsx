'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';

interface SafetyEquipmentProps {
  position: [number, number, number];
  hasGloves: boolean;
  hasGoggles: boolean;
}

export default function SafetyEquipment({ position, hasGloves, hasGoggles }: SafetyEquipmentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { toggleGloves, toggleGoggles } = useLabStore();

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1];
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Stand/Base */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 0.4, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Top Platform */}
      <mesh castShadow position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 16]} />
        <meshStandardMaterial color="#718096" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Gloves Station */}
      <group
        position={[-0.15, 0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          toggleGloves();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Gloves Base */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.12]} />
          <meshStandardMaterial
            color={hasGloves ? '#48bb78' : '#e53e3e'}
            roughness={0.5}
            metalness={0.3}
            emissive={hasGloves ? '#48bb78' : '#e53e3e'}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Gloves Icon/Representation */}
        <group>
          {/* Left Glove */}
          <mesh position={[-0.03, 0.08, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.02, 0.06, 0.02]} />
            <meshStandardMaterial color={hasGloves ? '#48bb78' : '#cbd5e0'} />
          </mesh>
          {/* Right Glove */}
          <mesh position={[0.03, 0.08, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.02, 0.06, 0.02]} />
            <meshStandardMaterial color={hasGloves ? '#48bb78' : '#cbd5e0'} />
          </mesh>

          {/* Fingers */}
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh
              key={i}
              position={[0.03 + i * 0.008, 0.12, 0]}
              rotation={[0, 0, 0.3]}
            >
              <boxGeometry args={[0.006, 0.02, 0.006]} />
              <meshStandardMaterial color={hasGloves ? '#48bb78' : '#cbd5e0'} />
            </mesh>
          ))}
        </group>

        {/* Status Indicator */}
        {hasGloves && (
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#48bb78" />
          </mesh>
        )}
      </group>

      {/* Goggles Station */}
      <group
        position={[0.15, 0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          toggleGoggles();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Goggles Base */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.08, 0.1]} />
          <meshStandardMaterial
            color={hasGoggles ? '#48bb78' : '#e53e3e'}
            roughness={0.5}
            metalness={0.3}
            emissive={hasGoggles ? '#48bb78' : '#e53e3e'}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Goggles Frame */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.02]} />
          <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Left Lens */}
        <mesh position={[-0.03, 0.06, 0.02]}>
          <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
          <meshStandardMaterial
            color="#63b3ed"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.9}
            emissive={hasGoggles ? '#63b3ed' : '#000000'}
            emissiveIntensity={hasGoggles ? 0.3 : 0}
          />
        </mesh>

        {/* Right Lens */}
        <mesh position={[0.03, 0.06, 0.02]}>
          <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
          <meshStandardMaterial
            color="#63b3ed"
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.9}
            emissive={hasGoggles ? '#63b3ed' : '#000000'}
            emissiveIntensity={hasGoggles ? 0.3 : 0}
          />
        </mesh>

        {/* Strap */}
        <mesh position={[0, 0.08, 0]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[0.05, 0.005, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#4a5568" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Status Indicator */}
        {hasGoggles && (
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color="#48bb78" />
          </mesh>
        )}
      </group>

      {/* Label */}
      <Text
        position={[0, 0.65, 0]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Đồ bảo hộ
      </Text>

      {/* Glow effect when items are equipped */}
      {(hasGloves || hasGoggles) && (
        <pointLight position={[0, 0.5, 0]} color="#48bb78" intensity={0.5} distance={0.5} />
      )}

      {/* Instructions on hover */}
      {hovered && !hasGloves && !hasGoggles && (
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.06}
          color="#faf089"
          anchorX="center"
          anchorY="middle"
        >
          Click để trang bị
        </Text>
      )}
    </group>
  );
}
