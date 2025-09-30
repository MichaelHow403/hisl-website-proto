'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface DataCenter {
  lat: number;
  lng: number;
  label: string;
  energy: number;
  renewable: number;
}

export default function RealisticGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dataCenters, setDataCenters] = useState<DataCenter[]>([]);
  
  const earthTexture = useLoader(THREE.TextureLoader, '/imagery/earth/earth.jpg');

  useEffect(() => {
    fetch('/data/globe-datacenters-processed.json')
      .then(r => r.json())
      .then(data => setDataCenters(data.dataCenters || []))
      .catch(console.error);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Earth sphere with data center dots as children */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshPhongMaterial map={earthTexture} shininess={5} />
        
        {/* Data center dots positioned on Earth surface */}
        {dataCenters.map((dc, i) => {
          const phi = (90 - dc.lat) * (Math.PI / 180);
          const theta = (dc.lng + 180) * (Math.PI / 180);
          const radius = 2.02;
          const x = -radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          
          return (
            <mesh key={i} position={[x, y, z]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshBasicMaterial color={dc.renewable > 50 ? '#39d7c9' : '#d4af37'} />
            </mesh>
          );
        })}
      </mesh>
    </group>
  );
}
