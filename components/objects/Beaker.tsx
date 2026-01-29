'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface BeakerProps {
  position: [number, number, number];
  scale?: [number, number, number];
  liquidColor?: string;
  label?: string;
  volume?: number;
}

export default function Beaker({
  position,
  scale = [1, 1, 1],
  liquidColor = '#87ceeb',
  label = '',
  volume = 50,
}: BeakerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  useFrame((state) => {
    if (groupRef.current && selected) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setSelected(!selected)}
    >
      {/* Glass Body */}
      <Cylinder
        args={[0.3, 0.25, 0.5, 32]}
        castShadow
        position={[0, 0.25, 0]}
      >
        <meshStandardMaterial
          color={liquidColor}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          emissive={hovered ? liquidColor : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </Cylinder>

      {/* Liquid */}
      <Cylinder
        args={[0.28, 0.23, 0.3, 32]}
        position={[0, 0.15, 0]}
      >
        <meshStandardMaterial
          color={liquidColor}
          transparent
          opacity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </Cylinder>

      {/* Rim */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
          roughness={0.1}
        />
      </mesh>

      {/* Spout */}
      <mesh position={[0.3, 0.45, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Label */}
      {label && (
        <mesh position={[0, 0.1, -0.26]}>
          <planeGeometry args={[0.2, 0.1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
        </mesh>
      )}

      {/* Selection Indicator */}
      {selected && (
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      )}

      {/* Hover Effect */}
      {hovered && !selected && (
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      )}
    </group>
  );
}
