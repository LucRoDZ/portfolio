'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import { FloatingGeometry } from './FloatingGeometry';

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#a78bfa" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#06b6d4" />
        <pointLight position={[3, -5, 2]} intensity={0.15} color="#f59e0b" />
        
        <Suspense fallback={null}>
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </div>
  );
}
