"use client";

import { useState } from 'react';
import GlobalHeader from "@/components/sections/GlobalHeader";
import HeroCosmic from "@/components/sections/HeroCosmic";
import PerfBadges from "@/components/sections/PerfBadges";
import ApiContractsStrip from "@/components/sections/ApiContractsStrip";
import AgentsMatrix from "@/components/sections/AgentsMatrix";
import FeatureTile from "@/components/sections/FeatureTile";
import SplitFeature from "@/components/sections/SplitFeature";
import PoemPanel from "@/components/sections/PoemPanel"; // Import PoemPanel
import BigCTA from "@/components/sections/BigCTA";
import GlobalFooter from "@/components/sections/GlobalFooter";
import Img from "@/components/Img"; // Import the new Img component
import { POEM_LOCK, getLockedPoemText } from "@/lib/poem-lock"; // Import POEM_LOCK and getLockedPoemText
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import GlobeErrorBoundary from '@/components/globe/GlobeErrorBoundary';

// Dynamic import with SSR disabled for the Globe component
const Globe = dynamic(() => import('@/components/globe/Globe'), { 
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-amber-400 text-lg mb-2">Loading Globe...</div>
        <div className="text-gray-400">Initializing 3D visualization</div>
      </div>
    </div>
  )
});

// Note: Metadata is handled by layout.tsx since this is now a client component

export default function Home() {
  const poemText = getLockedPoemText();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    content: string;
    provider: string;
    energyUsage: number;
    responseTime: number;
  } | null>(null);
  const [aiProvider, setAiProvider] = useState<string>('');

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse(null);
    setAiProvider('Processing...');
    
    try {
      const res = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.data);
        setAiProvider(data.data.provider);
      } else {
        setResponse({
          content: 'Sorry, I encountered an error processing your request.',
          provider: 'Error',
          energyUsage: 0,
          responseTime: 0
        });
        setAiProvider('Error');
      }
    } catch (error) {
      setResponse({
        content: 'Sorry, I encountered an error processing your request.',
        provider: 'Error',
        energyUsage: 0,
        responseTime: 0
      });
      setAiProvider('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <GlobalHeader />
      
      {/* Hero Section */}
      <HeroCosmic 
        headline="Industrial intelligence that keeps people safe — and operations sustainable."
        subheadline="HISL combines on-site sensing with AI you control to prevent incidents, boost throughput, and cut emissions — even when the network doesn't cooperate."
        primaryCTA={{
          text: "Book a demo",
          href: "#demo"
        }}
        secondaryCTA={{
          text: "Download the brief",
          href: "#brief"
        }}
      />

      {/* Three-Column Problem Section */}
      <section className="section-spacing bg-gray-800">
        <div className="container-wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400 mb-4">
                Blind spots create risks.
              </div>
              <div className="text-lg text-gray-300">
                Identify hazards before they escalate.
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-4">
                Operational drift costs money.
              </div>
              <div className="text-lg text-gray-300">
                Tune processes with real-time insight.
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-4">
                Sustainability is fragmented.
              </div>
              <div className="text-lg text-gray-300">
                Measure and improve what matters.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Performance Metrics Section */}
      <section className="section-spacing bg-gray-800">
        <PerfBadges 
          ttftTargetMs={800}
          p50TokPerS={40}
          mode="offline-first"
        />
      </section>

      {/* API Contracts Section */}
      <section className="section-spacing">
        <ApiContractsStrip 
          endpoints={["/v1/site/page", "/v1/site/seo", "/v1/site/forms/{id}"]}
          note="immutable contracts"
        />
      </section>

      {/* Industry Sectors Section */}
      <section className="section-spacing bg-gray-800">
        <AgentsMatrix 
          sectors={["Construction", "Environmental", "Conservation", "Pharma (CROx)", "Public Procurement", "Agriculture", "Trader/Economics", "Healthcare/Pet", "Insurance", "Custom"]}
          cta="Explore agents"
        />
      </section>

      {/* Globe Section - WHERE YOUR PROMPTS GO */}
      <section className="section-spacing bg-gray-800">
        <div className="container-wrap">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              WHERE YOUR PROMPTS GO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your prompts route through our sovereign infrastructure, processed locally in Ireland
            </p>
          </div>
          
          {/* Interactive Prompt Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ask IntegAI anything..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitPrompt()}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                  />
                </div>
                <button 
                  onClick={handleSubmitPrompt}
                  disabled={isLoading || !prompt.trim()}
                  className="btn btn-gold px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Submit Prompt'}
                </button>
              </div>

              {/* AI Provider Indicator */}
              {aiProvider && (
                <div className="mb-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      aiProvider === 'DeepSeek' ? 'bg-blue-400' :
                      aiProvider === 'Claude' ? 'bg-orange-400' :
                      aiProvider === 'Gemini' ? 'bg-green-400' :
                      aiProvider === 'Processing...' ? 'bg-amber-400 animate-pulse' :
                      'bg-red-400'
                    }`}></div>
                    <span className="text-sm text-gray-300">
                      {isLoading ? 'Processing...' : `Powered by ${aiProvider}`}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Status Indicators */}
              <div className="flex flex-wrap gap-6 justify-center items-center text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Dublin Data Center ✓</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>
                    {response ? `Est. ${response.energyUsage.toFixed(2)} Wh` : 'Est. 0.3 Wh per query'}
                  </span>
                </div>
                {response && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{response.responseTime}ms response time</span>
                  </div>
                )}
              </div>

              {/* Response Display */}
              {response && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">
                    Response from {response.provider}:
                  </div>
                  <div className="text-white whitespace-pre-wrap">
                    {response.content}
                  </div>
                </div>
              )}
            </div>
            
            {/* Globe Visualization */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <div className="text-amber-400 text-lg mb-2">Processing your prompt...</div>
                    <div className="text-gray-400">Routing through AI infrastructure</div>
                  </div>
                </div>
              )}
              <GlobeErrorBoundary>
                <Suspense fallback={
                  <div className="h-[70vh] w-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-amber-400 text-lg mb-2">Loading textures...</div>
                      <div className="text-gray-400">Preparing 3D Earth</div>
                    </div>
                  </div>
                }>
                  <Globe />
                </Suspense>
              </GlobeErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="section-spacing">
        <div className="container-wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureTile 
              title="Real-time Intelligence"
              link="/news"
              thumb="starfield_cosmic"
              caption="Live data streams and insights"
            />
            <FeatureTile 
              title="Safety Analytics"
              link="/sectors"
              thumb="ai_technology"
              caption="Industry-specific safety metrics"
            />
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="section-spacing bg-gray-800">
        <PoemPanel 
          title={POEM_LOCK.title}
          author="— Michael Howard MCIOB, Founder HISL"
          text={poemText}
        />
      </section>

      {/* Core Principles */}
      <section className="section-spacing">
        <SplitFeature 
          title="Sovereign by design"
          bullets={["Offline-first architecture", "Agentic graph (9-core)", "Immutable artifacts"]}
          link="/about/integai"
        />
      </section>
      
      {/* Technology Showcase */}
      <section className="section-spacing bg-gray-800">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Industrial Safety Technology
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Advanced AI infrastructure built for industrial safety and operational excellence
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Img
                name="AI_DNA"
                alt="Abstract double helix made of circuitry representing AI DNA"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
              <Img 
                name="ai_technology" 
                alt="AI technology visualization"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="section-spacing">
        <BigCTA 
          title="Build with IntegAI"
          primary="Talk to us"
          to="/contact"
        />
      </section>
      
      <GlobalFooter />
    </main>
  );
}
