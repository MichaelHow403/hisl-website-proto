'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';

// Dynamically import RealisticGlobe to avoid SSR issues
const RealisticGlobe = dynamic(() => import('../RealisticGlobe'), { ssr: false });
const ShootingStars = dynamic(() => import('./ShootingStars'), { ssr: false });

interface GlobeClientProps {
  isLoading?: boolean;
}

export default function GlobeClient({ isLoading = false }: GlobeClientProps) {
  return (
    <div className={`relative w-full h-[600px] md:h-[800px] bg-bg/50 rounded-2xl border border-edge overflow-hidden backdrop-blur-sm ${
      isLoading ? 'ring-2 ring-aiGreen/30 shadow-glow' : 'shadow-glow'
    }`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <Stars 
            radius={300}
            depth={80}
            count={8000}
            factor={6}
            saturation={0}
            fade
            speed={0.3}
          />
          
          <ShootingStars />
          
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