'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import LabScene from './LabScene';
import { useLabStore } from '@/lib/store';

interface LabCanvasProps {
  module: 'COD' | 'BOD';
  currentStep: number;
}

export default function LabCanvas({ module, currentStep }: LabCanvasProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true }}
        className="bg-gradient-to-b from-blue-900/20 to-gray-900/40"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, 10, -5]} intensity={0.5} color="#87ceeb" />
          <pointLight position={[10, 5, -10]} intensity={0.3} color="#ffd700" />

          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />

          {/* Controls */}
          <OrbitControls
            makeDefault
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={0}
            maxAzimuthAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 2}
            minDistance={5}
            maxDistance={15}
            target={[0, 1, 0]}
          />

          {/* Environment */}
          <Environment preset="studio" />

          {/* Grid Floor */}
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6b7280"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#9ca3af"
            fadeDistance={15}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid
          />

          {/* Lab Scene */}
          <LabScene module={module} currentStep={currentStep} />
        </Suspense>
      </Canvas>

      {/* Loading Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white/50 text-sm">Virtual Lab Environment</div>
      </div>

      {/* Instructions Overlay */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm">
        <div className="flex items-center gap-2">
          <span className="text-blue-400">🖱️</span>
          <span>Click để chọn | Drag để di chuyển | Scroll để zoom</span>
        </div>
      </div>
    </div>
  );
}
