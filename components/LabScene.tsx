'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { useLabStore } from '@/lib/store';
import LabTable from './objects/LabTable';
import ChemicalCabinet from './objects/ChemicalCabinet';
import EquipmentCabinet from './objects/EquipmentCabinet';
import Heater from './objects/Heater';
import Incubator from './objects/Incubator';
import Spectrophotometer from './objects/Spectrophotometer';
import Beaker from './objects/Beaker';
import Pipette from './objects/Pipette';
import CODTube from './objects/CODTube';
import BODBottle from './objects/BODBottle';
import DOMeter from './objects/DOMeter';
import SafetyEquipment from './objects/SafetyEquipment';

interface LabSceneProps {
  module: 'COD' | 'BOD';
  currentStep: number;
}

export default function LabScene({ module, currentStep }: LabSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { hasGloves, hasGoggles } = useLabStore();

  return (
    <group ref={groupRef}>
      {/* Lab Table */}
      <LabTable position={[0, 0, 0]} />

      {/* Chemical Cabinet - Left */}
      <ChemicalCabinet position={[-4, 0, -2]} module={module} />

      {/* Equipment Cabinet - Right */}
      <EquipmentCabinet position={[4, 0, -2]} module={module} />

      {/* Equipment based on module */}
      {module === 'COD' ? (
        <>
          {/* Heater */}
          <Heater position={[2, 0.75, 0]} currentStep={currentStep} />

          {/* Spectrophotometer */}
          <Spectrophotometer position={[-2, 0.75, 0]} currentStep={currentStep} />

          {/* Beaker with water sample */}
          <Beaker
            position={[0, 0.75, 0]}
            scale={[1, 1, 1]}
            liquidColor="#87ceeb"
            label="Mẫu nước"
          />

          {/* COD Tube */}
          <CODTube
            position={[0.5, 0.75, 0.5]}
            currentStep={currentStep}
          />

          {/* Pipette */}
          <Pipette
            position={[0.3, 1, 0]}
            currentStep={currentStep}
          />
        </>
      ) : (
        <>
          {/* Incubator */}
          <Incubator position={[2, 0.75, 0]} currentStep={currentStep} />

          {/* DO Meter */}
          <DOMeter position={[-2, 0.75, 0]} currentStep={currentStep} />

          {/* Beaker with water sample */}
          <Beaker
            position={[0, 0.75, 0]}
            scale={[1.5, 1, 1.5]}
            liquidColor="#87ceeb"
            label="Mẫu nước"
          />

          {/* BOD Bottle */}
          <BODBottle
            position={[0.5, 0.75, 0.5]}
            currentStep={currentStep}
          />

          {/* Pipette */}
          <Pipette
            position={[0.3, 1, 0]}
            currentStep={currentStep}
          />
        </>
      )}

      {/* Safety Equipment */}
      <SafetyEquipment
        position={[3, 1, 2]}
        hasGloves={hasGloves}
        hasGoggles={hasGoggles}
      />

      {/* Floor with reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#2d3748"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}
