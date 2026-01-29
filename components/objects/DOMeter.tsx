'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';

interface DOMeterProps {
  position: [number, number, number];
  currentStep: number;
}

export default function DOMeter({ position, currentStep }: DOMeterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const probeRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const [doValue, setDoValue] = useState(0);
  const { measurements, setMeasurement } = useLabStore();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle pulse when measuring
      if (measuring) {
        const intensity = Math.sin(state.clock.elapsedTime * 6) * 0.03 + 0.97;
        groupRef.current.scale.setScalar(intensity);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }

    // Animate probe when measuring
    if (probeRef.current && measuring) {
      probeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 4) * 0.05;
    }
  });

  useEffect(() => {
    // Check if we're in measurement steps (BOD steps 4 or 7)
    if ((currentStep === 4 && !measurements.do0) || (currentStep === 7 && !measurements.do5)) {
      setMeasuring(true);

      // Simulate measurement
      const measurementInterval = setTimeout(() => {
        const randomDO = 6 + Math.random() * 4; // Random between 6-10 mg/L
        setDoValue(randomDO);

        if (currentStep === 4) {
          setMeasurement('do0', randomDO);
        } else {
          setMeasurement('do5', randomDO);
          // Calculate BOD5
          const do0 = measurements.do0 || 7;
          const bod5 = do0 - randomDO;
          setMeasurement('bod5', bod5 * 100); // Scale for demonstration
        }

        setMeasuring(false);
      }, 2000);

      return () => clearTimeout(measurementInterval);
    }
  }, [currentStep, measurements.do0, measurements.do5, measurements.do0, setMeasurement]);

  const getCurrentDO = () => {
    if (currentStep === 7 && measurements.do5 !== undefined) {
      return measurements.do5;
    }
    if (currentStep === 4 && measurements.do0 !== undefined) {
      return measurements.do0;
    }
    return doValue;
  };

  const currentDO = getCurrentDO();

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main Body */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.25]} />
        <meshStandardMaterial
          color="#f7fafc"
          roughness={0.3}
          metalness={0.7}
          emissive={hovered ? '#e2e8f0' : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* Display Screen */}
      <mesh position={[0, 0.45, 0.14]}>
        <planeGeometry args={[0.2, 0.12]} />
        <meshBasicMaterial
          color={measuring ? '#48bb78' : '#1a202c'}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Display Content */}
      {measuring ? (
        <Text
          position={[0, 0.45, 0.15]}
          fontSize={0.04}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Đang đo...
        </Text>
      ) : currentDO > 0 ? (
        <group>
          <Text
            position={[0, 0.48, 0.15]}
            fontSize={0.05}
            color="#48bb78"
            anchorX="center"
            anchorY="middle"
          >
            {currentDO.toFixed(1)}
          </Text>
          <Text
            position={[0, 0.42, 0.15]}
            fontSize={0.025}
            color="#68d391"
            anchorX="center"
            anchorY="middle"
          >
            mg/L
          </Text>
        </group>
      ) : (
        <Text
          position={[0, 0.45, 0.15]}
          fontSize={0.03}
          color="#718096"
          anchorX="center"
          anchorY="middle"
        >
          DO
        </Text>
      )}

      {/* Control Buttons */}
      <mesh
        castShadow
        position={[0, 0.2, 0.14]}
        onPointerDown={(e) => {
          e.stopPropagation();
          if ((currentStep === 4 && !measurements.do0) || (currentStep === 7 && !measurements.do5)) {
            setMeasuring(true);
            setTimeout(() => {
              const randomDO = 6 + Math.random() * 4;
              setDoValue(randomDO);

              if (currentStep === 4) {
                setMeasurement('do0', randomDO);
              } else {
                setMeasurement('do5', randomDO);
                const do0 = measurements.do0 || 7;
                const bod5 = do0 - randomDO;
                setMeasurement('bod5', bod5 * 100);
              }

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

      {/* Probe/Wand */}
      <group position={[0, 0.6, 0.1]}>
        {/* Probe Body */}
        <mesh ref={probeRef} castShadow position={[0, 0.15, 0]} rotation={[0.3, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#4a5568" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Probe Tip (Sensor) */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.015, 0.05, 8]} />
          <meshStandardMaterial
            color={measuring ? '#48bb78' : '#e53e3e'}
            emissive={measuring ? '#48bb78' : '#000000'}
            emissiveIntensity={measuring ? 0.5 : 0}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Cable */}
        <mesh position={[0, 0.3, 0]}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0.1, -0.05),
                new THREE.Vector3(0, 0.15, -0.1),
              ]),
              8,
              0.01,
              8,
              false,
            ]}
          />
          <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>

      {/* Label */}
      <Text
        position={[0, 0.65, 0]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        DO Meter
      </Text>

      {/* Base/Foot */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[0.5, 0.05, 0.35]} />
        <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Measurement Indicator */}
      {measuring && (
        <pointLight position={[0, 0, 0.2]} color="#48bb78" intensity={0.5} distance={0.3} />
      )}
    </group>
  );
}
