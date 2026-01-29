'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';

interface SpectrophotometerProps {
  position: [number, number, number];
  currentStep: number;
}

export default function Spectrophotometer({ position, currentStep }: SpectrophotometerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const [absorbance, setAbsorbance] = useState(0);
  const { measurements, setMeasurement } = useLabStore();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle pulse when measuring
      if (measuring) {
        const intensity = Math.sin(state.clock.elapsedTime * 8) * 0.05 + 0.95;
        groupRef.current.scale.setScalar(intensity);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  useEffect(() => {
    // Check if we're in measurement step (COD step 8)
    if (currentStep === 8 && !measurements.absorbance) {
      setMeasuring(true);

      // Simulate measurement
      const measurementInterval = setTimeout(() => {
        const randomAbsorbance = 0.3 + Math.random() * 0.4; // Random between 0.3-0.7
        setAbsorbance(randomAbsorbance);
        setMeasurement('absorbance', randomAbsorbance);

        // Calculate COD from absorbance
        const cod = randomAbsorbance * 1000; // Simplified formula
        setMeasurement('cod', cod);

        setMeasuring(false);
      }, 2000);

      return () => clearTimeout(measurementInterval);
    }
  }, [currentStep, measurements.absorbance, setMeasurement]);

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
        <meshStandardMaterial
          color="#f7fafc"
          roughness={0.3}
          metalness={0.7}
          emissive={hovered ? '#e2e8f0' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Top Cover/Lid */}
      <mesh castShadow position={[0, 0.52, -0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.75, 0.04, 0.5]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Sample Chamber (hole for tube) */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#1a202c" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Control Panel */}
      <mesh position={[0, 0.52, 0.2]}>
        <boxGeometry args={[0.5, 0.15, 0.1]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Display Screen */}
      <mesh position={[0, 0.55, 0.26]}>
        <planeGeometry args={[0.25, 0.1]} />
        <meshBasicMaterial
          color={measuring ? '#48bb78' : '#4299e1'}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Display Content */}
      {measuring ? (
        <Text
          position={[0, 0.55, 0.27]}
          fontSize={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Đang đo...
        </Text>
      ) : measurements.absorbance ? (
        <group>
          <Text
            position={[0, 0.57, 0.27]}
            fontSize={0.035}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            Abs: {absorbance.toFixed(3)}
          </Text>
          <Text
            position={[0, 0.53, 0.27]}
            fontSize={0.035}
            color="#90cdf4"
            anchorX="center"
            anchorY="middle"
          >
            600nm
          </Text>
        </group>
      ) : (
        <Text
          position={[0, 0.55, 0.27]}
          fontSize={0.04}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          600nm
        </Text>
      )}

      {/* Wavelength Knob */}
      <mesh castShadow position={[-0.25, 0.5, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
        <meshStandardMaterial color="#4a5568" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Measure Button */}
      <mesh
        castShadow
        position={[0.2, 0.5, 0.25]}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (currentStep === 8 && !measurements.absorbance) {
            setMeasuring(true);
            setTimeout(() => {
              const randomAbsorbance = 0.3 + Math.random() * 0.4;
              setAbsorbance(randomAbsorbance);
              setMeasurement('absorbance', randomAbsorbance);
              const cod = randomAbsorbance * 1000;
              setMeasurement('cod', cod);
              setMeasuring(false);
            }, 2000);
          }
        }}
      >
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial
          color={measuring ? '#48bb78' : '#4299e1'}
          roughness={0.4}
          metalness={0.6}
          emissive={measuring ? '#48bb78' : '#000000'}
          emissiveIntensity={measuring ? 0.5 : 0}
        />
      </mesh>

      {/* Light Source Indicator */}
      {measuring && (
        <group>
          <pointLight position={[0, 0.3, 0]} color="#fafafa" intensity={1} distance={0.3} />
          <mesh position={[0, 0.35, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#fafafa" />
          </mesh>
        </group>
      )}

      {/* Label */}
      <Text
        position={[0, 0.65, 0]}
        fontSize={0.07}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Spectro
      </Text>

      {/* Base/Foot */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.05, 0.7]} />
        <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.4} />
      </mesh>
    </group>
  );
}
