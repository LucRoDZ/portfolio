'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float } from '@react-three/drei';
import { Suspense } from 'react';
import { FloatingGeometry } from './FloatingGeometry';

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        
        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <FloatingGeometry />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
