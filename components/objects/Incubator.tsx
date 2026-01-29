'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';

interface IncubatorProps {
  position: [number, number, number];
  currentStep: number;
}

export default function Incubator({ position, currentStep }: IncubatorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [isIncubating, setIsIncubating] = useState(false);
  const [temperature, setTemperature] = useState(20);
  const { measurements, setMeasurement } = useLabStore();

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle breathing effect when incubating
      if (isIncubating) {
        const intensity = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + 1;
        groupRef.current.scale.setScalar(intensity);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  useEffect(() => {
    // Check if we're in incubation step (BOD step 6)
    if (currentStep === 6) {
      setIsIncubating(true);
      setTemperature(20);
      setMeasurement('incubatorTemperature', 20);

      // Simulate incubation completion
      const incubationInterval = setTimeout(() => {
        setMeasurement('incubationComplete', true);
        setIsIncubating(false);
      }, 5000);

      return () => clearTimeout(incubationInterval);
    } else {
      setIsIncubating(false);
    }
  }, [currentStep, setMeasurement]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[1, 1.2, 0.8]} />
        <meshStandardMaterial
          color="#e2e8f0"
          roughness={0.4}
          metalness={0.6}
          emissive={hovered ? '#cbd5e0' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.6, 0.41]} castShadow>
        <boxGeometry args={[0.95, 1.15, 0.08]} />
        <meshStandardMaterial
          color="#cbd5e0"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glass Window */}
      <mesh position={[0, 0.7, 0.46]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshStandardMaterial
          color="#a0d2db"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          emissive={isIncubating ? '#48bb78' : '#000000'}
          emissiveIntensity={isIncubating ? 0.3 : 0}
        />
      </mesh>

      {/* Handle */}
      <mesh castShadow position={[0, 0.6, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Control Panel */}
      <mesh position={[0, 1.25, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.1]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Display */}
      <mesh position={[0, 1.28, 0.06]}>
        <planeGeometry args={[0.2, 0.08]} />
        <meshBasicMaterial
          color={isIncubating ? '#48bb78' : '#4299e1'}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Temperature Display */}
      <Text
        position={[0, 1.28, 0.07]}
        fontSize={0.04}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {temperature.toFixed(1)}°C
      </Text>

      {/* Control Buttons */}
      <mesh position={[-0.15, 1.25, 0.06]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0.15, 1.25, 0.06]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Ventilation Grills */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 0.25 + i * 0.08, -0.41]}>
          <boxGeometry args={[0.6, 0.02, 0.02]} />
          <meshStandardMaterial color="#4a5568" roughness={0.7} metalness={0.3} />
        </mesh>
      ))}

      {/* Label */}
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Tủ ủ
      </Text>

      {/* Status Indicator */}
      {isIncubating && (
        <group>
          {/* Cold glow effect */}
          <pointLight position={[0, 1, 0.5]} color="#63b3ed" intensity={1.5} distance={1} />
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.06}
            color="#63b3ed"
            anchorX="center"
            anchorY="middle"
          >
            Đang ủ...
          </Text>
        </group>
      )}

      {/* Interior Light (visible through window) */}
      {isIncubating && (
        <pointLight position={[0, 0.7, 0.2]} color="#fafafa" intensity={0.5} distance={0.5} />
      )}
    </group>
  );
}
