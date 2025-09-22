"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HISL Globe — Prompt Journeys Made Visible",
  description:
    "Explore the HISL prompt globe: see where your queries go, how energy is used, and why sovereignty matters.",
};

function Globe() {
  return (
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial 
        color="#4a90e2" 
        roughness={0.1} 
        metalness={0.1}
      />
    </Sphere>
  );
}

function EnergyBadge() {
  const baseWh = 0.3;
  const per100TokWh = 0.1;
  const tokens = 150; // Example token count
  const co2FactorKgPerKWh = 0.233;
  
  const totalWh = baseWh + (tokens / 100) * per100TokWh;
  const co2e = (totalWh / 1000) * co2FactorKgPerKWh;
  
  return (
    <div className="bg-panel border border-edge rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-aiGreen">Energy Usage</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted">Base consumption:</span>
          <span className="text-text">{baseWh} Wh</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Per 100 tokens:</span>
          <span className="text-text">{per100TokWh} Wh</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Current tokens:</span>
          <span className="text-text">{tokens}</span>
        </div>
        <hr className="border-edge" />
        <div className="flex justify-between font-semibold">
          <span className="text-text">Total energy:</span>
          <span className="text-brandGold">{totalWh.toFixed(2)} Wh</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className="text-text">CO₂ equivalent:</span>
          <span className="text-brandGold">{(co2e * 1000).toFixed(2)} mg</span>
        </div>
      </div>
    </div>
  );
}

export default function GlobePage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="py-16">
        <div className="container-wrap">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-spectral font-semibold mb-6">
              Where your prompts go
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Watch how a prompt travels through your sovereign stack—no hidden 
              detours to "free" model farms. See estimated energy per interaction 
              and its carbon equivalent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Globe Visualization */}
            <div className="bg-panel border border-edge rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Sovereign AI Globe
              </h2>
              <div className="aspect-square w-full max-w-md mx-auto">
                <Canvas camera={{ position: [0, 0, 3] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Suspense fallback={null}>
                    <Globe />
                  </Suspense>
                  <OrbitControls enablePan={false} />
                </Canvas>
              </div>
              <p className="text-sm text-muted text-center mt-4">
                Interactive 3D visualization of prompt routing through the IntegAI stack
              </p>
            </div>

            {/* Controls and Info */}
            <div className="space-y-8">
              {/* Prompt Console */}
              <div className="bg-panel border border-edge rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-aiGreen">Prompt Console</h3>
                <textarea 
                  className="w-full bg-bg border border-edge rounded-lg p-4 text-text placeholder-muted resize-none"
                  rows={4}
                  placeholder="Ask anything…"
                  defaultValue="Explain how sovereign AI differs from cloud-based AI services."
                />
                <div className="flex justify-between items-center mt-4">
                  <select className="bg-bg border border-edge rounded-lg px-3 py-2 text-text">
                    <option>Gemma fast-path</option>
                    <option>Mistral-7B fallback</option>
                  </select>
                  <button className="btn btn-gold px-6 py-2">
                    Process
                  </button>
                </div>
              </div>

              {/* Energy Badge */}
              <EnergyBadge />

              {/* Prompt Arc Visualization */}
              <div className="bg-panel border border-edge rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-aiGreen">Prompt Flow</h3>
                <div className="space-y-3">
                  {[
                    "Prompt → Planner",
                    "Planner → Retriever", 
                    "Retriever → Judge",
                    "Judge → Executor",
                    "Executor → Publisher"
                  ].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-aiGreen" />
                      <span className="text-sm text-muted">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Disclaimer */}
              <div className="bg-edge/30 border border-edge rounded-xl p-4">
                <p className="text-sm text-muted">
                  Demo runs locally/offline by default; online adapters are gated by policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
