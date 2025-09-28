'use client';

import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import GlobeErrorBoundary from '@/components/globe/GlobeErrorBoundary';

// Dynamic import with SSR disabled for the Globe component
const Globe = dynamic(() => import('@/components/globe/Globe'), { 
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-brandGold text-lg mb-2">Loading Globe...</div>
        <div className="text-muted">Initializing 3D visualization</div>
      </div>
    </div>
  )
});

export default function GlobePage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
            DeepSeek Activity Globe
          </h1>
          <p className="text-xl text-muted">
            Real-time visualization of DeepSeek API requests from around the world.
          </p>
        </div>
        
        <GlobeErrorBoundary>
          <Suspense fallback={
            <div className="h-[70vh] w-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-brandGold text-lg mb-2">Loading textures...</div>
                <div className="text-muted">Preparing 3D Earth</div>
              </div>
            </div>
          }>
            <Globe />
          </Suspense>
        </GlobeErrorBoundary>
      </div>
      
      <GlobalFooter />
    </main>
  );
}