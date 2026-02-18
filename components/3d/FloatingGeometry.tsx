'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';

function GlowSphere({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color="#a78bfa"
        wireframe
        transparent
        opacity={0.03}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 80;
  const ref = useRef<any>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function FloatingGeometry() {
  const mainRef = useRef<any>(null);

  useFrame((state) => {
    if (mainRef.current) {
      mainRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      mainRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group>
      <ParticleField />
      <GridPlane />
      
      {/* Main hero element — subtler to complement floating tech icons */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={mainRef} position={[2, 0.2, -1]} scale={1.4}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshDistortMaterial
            color="#a78bfa"
            distort={0.15}
            speed={1}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.45}
          />
        </mesh>
      </Float>

      {/* Accent spheres */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <GlowSphere position={[-3, 1.5, -2]} color="#06b6d4" scale={0.4} />
      </Float>
      <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.4}>
        <GlowSphere position={[4, -1.5, -3]} color="#f59e0b" scale={0.25} />
      </Float>
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <GlowSphere position={[-2, -2, 1]} color="#a78bfa" scale={0.15} />
      </Float>
    </group>
  );
}
