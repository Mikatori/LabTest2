'use client';

import { useRef, useState } from 'react';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

interface CODTubeProps {
  position: [number, number, number];
  currentStep: number;
  isCapped?: boolean;
  liquidColor?: string;
}

export default function CODTube({
  position,
  currentStep,
  isCapped = false,
  liquidColor = '#ff8c00',
}: CODTubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (currentStep === 5 && !isCapped) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Tube Body */}
      <Cylinder
        args={[0.08, 0.08, 0.3, 32, 1, true]}
        castShadow
        position={[0, 0.15, 0]}
        rotation={isShaking ? [Math.sin(Date.now() * 0.05) * 0.1, 0, 0] : [0, 0, 0]}
      >
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          side={THREE.DoubleSide}
          emissive={hovered ? '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </Cylinder>

      {/* Liquid */}
      <Cylinder
        args={[0.075, 0.075, 0.2, 32]}
        position={[0, 0.1, 0]}
        rotation={isShaking ? [Math.sin(Date.now() * 0.05) * 0.1, 0, 0] : [0, 0, 0]}
      >
        <meshStandardMaterial
          color={liquidColor}
          transparent
          opacity={0.7}
          roughness={0.2}
        />
      </Cylinder>

      {/* Rim */}
      <mesh position={[0, 0.3, 0]}>
        <torusGeometry args={[0.08, 0.01, 16, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Cap */}
      {isCapped && (
        <mesh position={[0, 0.32, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 32]} />
          <meshStandardMaterial
            color="#2d3748"
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>
      )}

      {/* Selection Indicator */}
      {selected && (
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      )}

      {/* Hover Effect */}
      {hovered && !selected && (
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ffff00" />
        </mesh>
      )}
    </group>
  );
}
