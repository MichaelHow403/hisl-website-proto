'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { LOCKED_CONTENT } from '@/lib/content-lock';

interface OrbitingRavenProps {
  imageUrl: string;
  radius1: number;
  radius2: number;
  speed: number;
  offset?: number;
}

export default function OrbitingRaven({ 
  imageUrl, 
  radius1, 
  radius2, 
  speed, 
  offset = 0 
}: OrbitingRavenProps) {
  const ref = useRef<THREE.Group>(null);
  const texture = useTexture(imageUrl);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    
    // Figure-8 parametric orbit
    ref.current.position.x = radius1 * Math.cos(t);
    ref.current.position.z = radius2 * Math.sin(2 * t); // Double frequency for figure-8
    ref.current.position.y = Math.sin(t) * 0.3; // Vertical oscillation
  });

  return (
    <Billboard ref={ref}>
      <sprite scale={[0.15, 0.15, 1]}>
        <spriteMaterial 
          map={texture} 
          transparent 
          opacity={0.9}
          color="#d4af37" // Gold tint
        />
      </sprite>
    </Billboard>
  );
}

