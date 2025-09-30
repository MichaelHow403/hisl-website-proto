'use client';

import { Suspense, useState } from 'react';
import GlobeClient from '@/components/globe/GlobeClient';
import PromptConsole from '@/components/globe/PromptConsole';
import ResultPanel from '@/components/globe/ResultPanel';
import InlineNote from '@/components/globe/InlineNote';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import { IMAGES, getImage } from '@/app/lib/imagery';

export default function GlobePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [promptResult, setPromptResult] = useState<{
    response: string;
    model: string;
    timestamp: string;
  } | null>(null);
  const [energyData, setEnergyData] = useState({ energyKwh: 0, co2Kg: 0, renewablePercent: 0 });
  return (
    <main className="min-h-screen bg-bg">
      <GlobalHeader />
      
      {/* Page-wide background texture */}
      <div className="fixed inset-0 -z-10 opacity-[0.02] pointer-events-none">
        <img src={getImage('hero_construction')} alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      
      <div className="vignette fixed inset-0 pointer-events-none" aria-hidden="true" />
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background with proper darkening */}
        <div className="absolute inset-0 z-0">
          <img 
            src={getImage('hero_construction')} 
            alt="" 
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3)' }}
          />
          {/* Strong vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
        </div>
        
        {/* Content - Now readable */}
        <div className="relative z-10 container-wrap text-center px-6">
          <div className="inline-block px-4 py-2 rounded-full border border-brandGold/30 bg-brandGold/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-brandGold font-medium">Enterprise Ireland Innovation Voucher</span>
          </div>
          
          <h1 className="font-spectral text-[clamp(40px,6vw,72px)] font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Sovereign AI, built on the ground — 
            <span className="text-brandGold">for the ground.</span>
          </h1>
          
          <p className="mt-6 text-[19px] leading-relaxed text-text max-w-2xl mx-auto">
            On-site. Observable. Auditable. Industrial-grade safety analysis and workflow intelligence that runs offline-first, with full compliance DNA.
          </p>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="/contact" className="btn btn-gold px-8 py-3 text-base font-semibold">
              Start a Demo
            </a>
            <a href="/globe" className="btn btn-ghost px-8 py-3 text-base">
              Explore the Globe
            </a>
          </div>
        </div>
      </section>
      
      {/* Prompt Console Section */}
      <div className="relative py-12 md:py-16">
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-bg/20 to-bg/80" />
          <img 
            src={getImage('ai_construction')} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ 
              objectPosition: 'center 40%',
              filter: 'blur(1px) brightness(0.7)'
            }}
          />
        </div>
        
        <div className="relative container-wrap">
          <div className="max-w-3xl mx-auto rounded-2xl border border-edge bg-panel/85 backdrop-blur-xl p-6 shadow-lg">
            <PromptConsole 
              onSubmit={async (prompt, model) => {
                setIsLoading(true);
                try {
                  const response = await fetch('/api/demo-prompt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, model }),
                  });
                  
                  const data = await response.json();
                  
                  if (data.error) {
                    console.error('API Error:', data.error);
                    alert('Failed to get response: ' + data.error);
                    return;
                  }
                  
                  // Calculate energy based on tokens
                  const energyKwh = 0.3 + (data.tokensUsed / 100) * 0.1;
                  const co2Kg = (energyKwh / 1000) * 0.233;
                  
                  // Update result state
                  setPromptResult({
                    response: data.response,
                    model: data.model,
                    timestamp: new Date().toISOString(),
                  });
                  
                  // Update energy badge (need to add this state)
                  setEnergyData({
                    energyKwh,
                    co2Kg,
                    renewablePercent: 45, // Average from data centers
                  });
                  
                } catch (error) {
                  console.error('Fetch error:', error);
                  alert('Network error');
                } finally {
                  setIsLoading(false);
                }
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      
      {/* Globe Section */}
      <div className="container-wrap py-8 md:py-12 mt-8 md:mt-10">
        <div className="relative max-w-4xl mx-auto">
          {/* Corner accent - ravens */}
          <img 
            src={getImage('raven_huginn')} 
            alt=""
            className="absolute -top-12 -left-12 w-24 h-24 opacity-20 pointer-events-none hidden lg:block z-10"
            aria-hidden="true"
          />
          <img 
            src={getImage('raven_muninn')} 
            alt=""
            className="absolute -top-12 -right-12 w-24 h-24 opacity-20 pointer-events-none hidden lg:block z-10"
            aria-hidden="true"
          />
          
          {/* Globe canvas with enhanced border */}
          <div className="relative rounded-2xl border-2 border-edge overflow-hidden shadow-glow">
            <div className="absolute inset-0 bg-gradient-to-br from-aiGreen/5 to-transparent pointer-events-none" />
            <Suspense fallback={<div>Loading globe...</div>}>
              <GlobeClient isLoading={isLoading} />
            </Suspense>
          </div>
          
          {/* "Online true infrastructure" badge with icon */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-panel/90 backdrop-blur border border-edge rounded-lg px-3 py-2">
            <img src="/imagery/globe_3d_with_ravens.png" alt="" className="w-5 h-5" aria-hidden="true" />
            <span className="text-xs text-muted">Online true infrastructure</span>
          </div>
        </div>
      </div>

      {/* Energy Badge Section */}
      <div className="container-wrap py-8 md:py-12 mt-6">
        <div className="grid grid-cols-3 gap-4 rounded-xl border border-edge bg-panel/60 p-6 backdrop-blur">
          <div className="flex flex-col items-center gap-2">
            <img src={getImage('creation_ai')} alt="" className="w-8 h-8 opacity-80" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wide text-muted">Energy</span>
            <span className="text-2xl font-semibold text-brandGold">{energyData.energyKwh.toFixed(2)} kWh</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={getImage('ireland_landscape')} alt="" className="w-8 h-8 rounded opacity-80" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wide text-muted">CO₂</span>
            <span className="text-2xl font-semibold text-text">{energyData.co2Kg.toFixed(3)} kg</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img src={getImage('inspiring')} alt="" className="w-8 h-8 rounded opacity-80" aria-hidden="true" />
            <span className="text-xs uppercase tracking-wide text-muted">Renewable</span>
            <span className="text-2xl font-semibold text-text">{energyData.renewablePercent.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Response Panel Section */}
      {promptResult?.response && (
        <div className="container-wrap mt-8">
          <div className="max-w-4xl mx-auto rounded-2xl border border-edge bg-panel/60 backdrop-blur overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-edge/50 bg-panel/30">
              <div className="flex items-center gap-3">
                <img 
                  src={getImage('integai_logo')} 
                  alt="IntegAI" 
                  className="h-7 w-auto"
                />
                <span className="text-xs text-muted">Sovereign AI Response</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">Powered by</span>
                <img 
                  src={getImage('hisl_logo')} 
                  alt="HISL" 
                  className="h-6 w-auto"
                />
              </div>
            </div>
            
            <div className="p-5 md:p-6">
              <ResultPanel 
                response={promptResult?.response ?? null}
                model={promptResult?.model ?? null}
                timestamp={promptResult?.timestamp ?? null}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer Section */}
      <div className="container-wrap mt-8 mb-12">
        <div className="max-w-4xl mx-auto flex items-start gap-4 rounded-xl bg-panel/40 border border-edge/50 p-5 backdrop-blur">
          <img 
            src={getImage('sovereignty_badge')} 
            alt="" 
            className="w-12 h-12 flex-shrink-0"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-text mb-1">
              Offline-First Architecture
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Demo runs offline by default; online adapters are policy-gated. 
              All processing occurs on sovereign infrastructure with full audit trails.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-12 border-t border-edge mt-12">
        <div className="container-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            <div className="relative rounded-xl border border-edge bg-panel/60 backdrop-blur p-5 overflow-hidden group hover:border-edge/80 transition-colors">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-8 group-hover:opacity-12 transition-opacity">
                <img 
                  src={getImage('earth_realistic')} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="relative text-xs uppercase tracking-wide text-muted mb-2">Coverage</p>
              <p className="relative text-xl font-semibold text-brandGold">20+ Regions</p>
            </div>
            
            <div className="relative rounded-xl border border-edge bg-panel/60 backdrop-blur p-5 overflow-hidden group hover:border-edge/80 transition-colors">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-8 group-hover:opacity-12 transition-opacity">
                <img 
                  src={getImage('ai_dna')} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="relative text-xs uppercase tracking-wide text-muted mb-2">Providers</p>
              <p className="relative text-xl font-semibold text-aiGreen">AWS • Azure • GCP</p>
            </div>
            
            <div className="relative rounded-xl border border-edge bg-panel/60 backdrop-blur p-5 overflow-hidden group hover:border-edge/80 transition-colors">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 opacity-8 group-hover:opacity-12 transition-opacity">
                <img 
                  src={getImage('sovereignty_badge')} 
                  alt="" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="relative text-xs uppercase tracking-wide text-muted mb-2">Mode</p>
              <p className="relative text-xl font-semibold text-text">Offline-First</p>
            </div>
            
          </div>
        </div>
      </div>

      <GlobalFooter />
    </main>
  );
}