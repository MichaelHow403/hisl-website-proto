'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Sphere } from '@react-three/drei';
import { Group, Mesh, Vector3 } from 'three';
import * as THREE from 'three';

interface DataCenter {
  lat: number;
  lng: number;
  label: string;
  energy: number;
  renewable: number;
  providers: string[];
  hyperscale: number;
  tier: string;
  totalDataCenters: number;
  floorSpace: string;
  growthRate: number;
}

interface GlobeData {
  dataCenters: DataCenter[];
  metadata: {
    totalPowerMW: number;
    avgRenewable: number;
    lastUpdated: string;
  };
}

function DataCenterPoint({ 
  dataCenter, 
  index 
}: { 
  dataCenter: DataCenter; 
  index: number; 
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Convert lat/lng to 3D coordinates on sphere
  const phi = (90 - dataCenter.lat) * (Math.PI / 180);
  const theta = (dataCenter.lng + 180) * (Math.PI / 180);
  const radius = 1.02; // Slightly above the Earth surface
  
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial 
        color={dataCenter.renewable > 50 ? '#00ff88' : '#ff8800'} 
        transparent
        opacity={hovered ? 1 : 0.7}
      />
      {hovered && (
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {dataCenter.label}
          {`\nPower: ${dataCenter.energy}MW`}
          {`\nRenewable: ${dataCenter.renewable}%`}
        </Text>
      )}
    </mesh>
  );
}

function Earth() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial
        map={new THREE.TextureLoader().load('/imagery/earth/earth_globe_realistic.png')}
        bumpMap={new THREE.TextureLoader().load('/imagery/earth/earth_globe_realistic.png')}
        bumpScale={0.1}
      />
    </mesh>
  );
}

function Globe({ data }: { data: GlobeData }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <Earth />
      {data.dataCenters.map((dc, index) => (
        <DataCenterPoint key={index} dataCenter={dc} index={index} />
      ))}
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="text-center">
        <div className="text-brandGold text-lg mb-2">Loading Globe...</div>
        <div className="text-muted">Initializing 3D visualization</div>
      </div>
    </div>
  );
}

export default function GlobeVisualization() {
  const [data, setData] = useState<GlobeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/globe-datacenters-processed.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-red-500 text-xl">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[70vh] bg-black rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
        <Globe data={data} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.5}
          minDistance={2}
          maxDistance={5}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
      </Canvas>
      
      {/* Data overlay */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Global Data Centers</h2>
        <p>Total Capacity: {data.metadata.totalPowerMW.toFixed(0)} MW</p>
        <p>Avg Renewable: {data.metadata.avgRenewable.toFixed(1)}%</p>
        <p>Data Centers: {data.dataCenters.length}</p>
        <p className="text-sm text-gray-300 mt-2">
          Last Updated: {new Date(data.metadata.lastUpdated).toLocaleDateString()}
        </p>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 text-white bg-black/50 p-4 rounded-lg">
        <p className="text-sm">🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Hover points for details</p>
      </div>
    </div>
  );
}

