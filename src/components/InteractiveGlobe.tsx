'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Group, Vector3 } from 'three';
import dynamic from 'next/dynamic';
import { LOCKED_CONTENT } from '@/lib/content-lock';
import { IMAGES } from '@/lib/imagery';

// Dynamically import ThreeGlobe to avoid SSR issues
const ThreeGlobe = dynamic(() => import('three-globe'), { ssr: false });

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

function Globe({ data }: { data: GlobeData }) {
  const globeRef = useRef<any>(null);
  const groupRef = useRef<Group>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataCenter | null>(null);

  useEffect(() => {
    if (!globeRef.current || !data.dataCenters.length) return;

    const globe = globeRef.current;
    
    // Configure globe appearance
    globe.globeImageUrl('/imagery/earth/earth_globe_realistic.png');
    globe.bumpImageUrl('/imagery/earth/earth_globe_realistic.png');
    globe.backgroundImageUrl('/imagery/starfields/reach_for_the_stars.png');
    
    // Configure data points
    globe.pointsData(data.dataCenters);
    globe.pointLat('lat');
    globe.pointLng('lng');
    globe.pointColor(() => '#00ff88');
    globe.pointRadius(0.8);
    globe.pointResolution(8);
    
    // Configure arcs (connections between data centers)
    const arcs = data.dataCenters.map((dc, i) => ({
      startLat: dc.lat,
      startLng: dc.lng,
      endLat: data.dataCenters[(i + 1) % data.dataCenters.length].lat,
      endLng: data.dataCenters[(i + 1) % data.dataCenters.length].lng,
      color: ['#00ff88', '#0088ff', '#ff8800'][i % 3]
    }));
    
    globe.arcsData(arcs);
    globe.arcColor('color');
    globe.arcDashLength(0.4);
    globe.arcDashGap(0.2);
    globe.arcDashAnimateTime(2000);
    
    // Add hover interactions
    globe.onPointHover((point: DataCenter | null) => {
      setHoveredPoint(point);
    });
    
    // Auto-rotate
    globe.autoRotate(true);
    globe.autoRotateSpeed(0.5);
    
  }, [data]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <ThreeGlobe ref={globeRef} />
      
      {/* Hovered point info */}
      {hoveredPoint && (
        <Text
          position={[0, 0, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {hoveredPoint.label}
          {`\nPower: ${hoveredPoint.energy}MW`}
          {`\nRenewable: ${hoveredPoint.renewable}%`}
          {`\nProviders: ${hoveredPoint.providers.join(', ')}`}
        </Text>
      )}
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-white text-xl">Loading 3D Globe...</div>
    </div>
  );
}

export default function InteractiveGlobe() {
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
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">Error loading data: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 0, 300], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
          <Globe data={data} />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.8}
            rotateSpeed={0.5}
            minDistance={200}
            maxDistance={500}
          />
          <ambientLight intensity={0.4} />
          <directionalLight position={[1, 1, 1]} intensity={0.8} />
        </Suspense>
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
        <p className="text-sm">🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Click points for details</p>
      </div>
    </div>
  );
}