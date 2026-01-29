'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';

interface HeaterProps {
  position: [number, number, number];
  currentStep: number;
}

export default function Heater({ position, currentStep }: HeaterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [isHeating, setIsHeating] = useState(false);
  const { measurements, setMeasurement } = useLabStore();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle pulsing when heating
      if (isHeating) {
        const intensity = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 0.9;
        groupRef.current.scale.setScalar(intensity);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  useEffect(() => {
    // Check if we're in heating step (COD step 6)
    if (currentStep === 6) {
      setIsHeating(true);
      // Simulate heating
      const heatingInterval = setInterval(() => {
        setMeasurement('temperature', 150);
        setTimeout(() => {
          setMeasurement('heatingComplete', true);
          setIsHeating(false);
        }, 3000);
      }, 1000);

      return () => clearInterval(heatingInterval);
    } else {
      setIsHeating(false);
    }
  }, [currentStep, setMeasurement]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#2d3748"
          roughness={0.7}
          metalness={0.3}
          emissive={hovered ? '#4a5568' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Heating Plate */}
      <mesh castShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
        <meshStandardMaterial
          color={isHeating ? '#f56565' : '#4a5568'}
          roughness={0.5}
          metalness={0.7}
          emissive={isHeating ? '#f56565' : '#000000'}
          emissiveIntensity={isHeating ? 0.8 : 0}
        />
      </mesh>

      {/* Heating Coil/Element Pattern */}
      {isHeating && (
        <mesh position={[0, 0.15, 0]}>
          <ringGeometry args={[0.1, 0.25, 32]} />
          <meshBasicMaterial color="#ffd700" transparent opacity={0.8} />
        </mesh>
      )}

      {/* Control Panel */}
      <mesh castShadow position={[0, 0.3, 0.25]}>
        <boxGeometry args={[0.3, 0.2, 0.05]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Display Screen */}
      <mesh position={[0, 0.32, 0.28]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshBasicMaterial
          color={isHeating ? '#48bb78' : '#e53e3e'}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Temperature Display */}
      {isHeating && (
        <Text
          position={[0, 0.32, 0.3]}
          fontSize={0.04}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          150°C
        </Text>
      )}

      {/* Control Knob */}
      <mesh castShadow position={[0, 0.25, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#718096" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Handle */}
      <mesh castShadow position={[0, 0.3, -0.3]}>
        <boxGeometry args={[0.02, 0.05, 0.1]} />
        <meshStandardMaterial color="#4a5568" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 0.45, 0]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Bếp đun
      </Text>

      {/* Status Indicator */}
      {isHeating && (
        <group>
          {/* Glow effect */}
          <pointLight position={[0, 0.5, 0]} color="#f56565" intensity={2} distance={1} />
          <Text
            position={[0, 0.55, 0]}
            fontSize={0.06}
            color="#48bb78"
            anchorX="center"
            anchorY="middle"
          >
            Đang đun...
          </Text>
        </group>
      )}
    </group>
  );
}
