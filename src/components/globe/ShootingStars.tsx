'use client';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShootingStar {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

export default function ShootingStars() {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<ShootingStar[]>([]);
  const timerRef = useRef(0);

  useEffect(() => {
    // Initialize with no stars
    starsRef.current = [];
  }, []);

  useFrame((state, delta) => {
    timerRef.current += delta;

    // Spawn new star every 8-15 seconds
    if (timerRef.current > (8 + Math.random() * 7)) {
      timerRef.current = 0;
      const angle = Math.random() * Math.PI * 2;
      const star: ShootingStar = {
        position: new THREE.Vector3(
          Math.cos(angle) * 50,
          (Math.random() - 0.5) * 20,
          Math.sin(angle) * 50
        ),
        velocity: new THREE.Vector3(
          -Math.cos(angle) * 30,
          (Math.random() - 0.7) * 15,
          -Math.sin(angle) * 30
        ),
        life: 0,
        maxLife: 0.8 + Math.random() * 0.4
      };
      starsRef.current.push(star);
    }

    // Update existing stars
    starsRef.current = starsRef.current.filter(star => {
      star.life += delta;
      star.position.add(star.velocity.clone().multiplyScalar(delta));
      return star.life < star.maxLife;
    });
  });

  return (
    <group ref={groupRef}>
      {starsRef.current.map((star, i) => {
        const opacity = 1 - (star.life / star.maxLife);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  star.position.x, star.position.y, star.position.z,
                  star.position.x - star.velocity.x * 0.3,
                  star.position.y - star.velocity.y * 0.3,
                  star.position.z - star.velocity.z * 0.3
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" transparent opacity={opacity} linewidth={2} />
          </line>
        );
      })}
    </group>
  );
}

