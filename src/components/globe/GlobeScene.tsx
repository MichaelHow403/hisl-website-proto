'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';

// FIXED: Lazy load components that use Three.js to avoid SSR issues
const RealisticGlobe = dynamic(() => import('../RealisticGlobe'), { ssr: false });

export default function GlobeScene() {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-bg rounded-xl overflow-hidden border border-edge">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <Stars 
            radius={300} 
            depth={60} 
            count={5000} 
            factor={4} 
            fade 
            speed={0.5}
          />
          
          <RealisticGlobe />
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            autoRotate={false}
            makeDefault
          />
        </Suspense>
      </Canvas>
      
      {/* Overlay stats */}
      <div className="absolute bottom-4 left-4 bg-panel/90 backdrop-blur px-4 py-2 rounded-lg border border-edge">
        <p className="text-xs text-muted">
          🌍 <span className="text-brandGold">Offline-first</span> infrastructure
        </p>
      </div>
    </div>
  );
}
