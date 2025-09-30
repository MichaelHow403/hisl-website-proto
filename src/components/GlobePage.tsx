'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';
import OrbitingRaven from './OrbitingRaven';

// Dynamically import RealisticGlobe to avoid SSR issues
const RealisticGlobe = dynamic(() => import('./RealisticGlobe'), { ssr: false });

interface GlobeData {
  dataCenters: any[];
  metadata: {
    totalPowerMW: number;
    avgRenewable: number;
    lastUpdated: string;
  };
}

function GlobeScene({ data }: { data: GlobeData }) {
  return (
    <>
      <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade />
      <RealisticGlobe />
      
      {/* Orbiting Ravens */}
      <OrbitingRaven 
        imageUrl="/imagery/processed/raven_huginn.png"
        radius1={2.5}
        radius2={1.8}
        speed={0.3}
        offset={0}
      />
      <OrbitingRaven 
        imageUrl="/imagery/processed/raven_muninn.png"
        radius1={2.2}
        radius2={2.1}
        speed={0.25}
        offset={Math.PI}
      />
      
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
    </>
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

export default function GlobePage() {
  return (
    <div className="w-full h-[70vh] bg-black rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 300], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <GlobeScene data={null} />
        </Suspense>
      </Canvas>
      
      {/* Data overlay */}
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Global Data Centers</h2>
        <p className="text-sm text-gray-300">
          Interactive 3D visualization of global data center infrastructure
        </p>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 right-4 text-white bg-black/50 p-4 rounded-lg">
        <p className="text-sm">🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Hover points for details</p>
      </div>
    </div>
  );
}
