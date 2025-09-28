"use client";

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

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <GlobalHeader />
      
      {/* Hero Section */}
      <HeroCosmic 
        headline="Industrial intelligence that keeps people safe — and operations sustainable"
        subheadline="AI-powered safety systems that protect workers, optimize operations, and ensure compliance across high-risk industries."
        primaryCTA={{
          text: "Start a Demo →",
          href: "#chat"
        }}
        secondaryCTA={{
          text: "Explore Platform →",
          href: "/about"
        }}
      />
      
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time visualization of AI activity across global operations, ensuring every prompt reaches its destination safely and efficiently.
            </p>
          </div>
          
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
