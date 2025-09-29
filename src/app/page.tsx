"use client";

import { useState, useEffect } from 'react';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import HeroCosmic from '@/components/sections/HeroCosmic';
import PerfBadges from '@/components/sections/PerfBadges';
import ApiContractsStrip from '@/components/sections/ApiContractsStrip';
import AgentsMatrix from '@/components/sections/AgentsMatrix';
import FeatureTile from '@/components/sections/FeatureTile';
import SplitFeature from '@/components/sections/SplitFeature';
import BigCTA from '@/components/sections/BigCTA';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* 1. nav_primary_v1: GlobalHeader */}
      <GlobalHeader />
      
      {/* 2. hero_cosmic_v1: HeroCosmic */}
      <HeroCosmic
        title="Sovereign AI, built on the ground — for the ground."
        subtitle="I'm Michael Howard MCIOB, a hands-on Chartered Construction Manager working in the field, delivering projects in pharma, energy, and manufacturing. I founded HISL and built our platform IntegAI because the tools I needed didn't exist: AI that works inside regulated environments, cuts downtime, and drives sustainability — without leaking data to the cloud or breaking compliance."
        primaryCta={{ label: "Book a Demo", to: "/contact" }}
        secondaryCta={{ label: "Where your prompts go", to: "/globe" }}
        backdrop="starfield"
        lqip={true}
        respectReducedMotion={true}
      />

      {/* 3. perf_badges_v1: PerfBadges */}
      <PerfBadges
        ttftTargetMs={800}
        p50TokPerS={40}
        mode="offline-first"
        note="Fast-path Gemma via llama.cpp; Mistral‑7B Q4_0 fallback"
      />

      {/* 4. api_contracts_v1: ApiContractsStrip */}
      <ApiContractsStrip
        endpoints={["/v1/site/page", "/v1/site/seo", "/v1/site/forms/{id}"]}
        note="Immutable v1 contracts."
      />

      {/* 5. agents_matrix_v1: AgentsMatrix */}
      <AgentsMatrix
        sectors={["Construction", "Environmental", "Conservation", "Pharma (CROx)", "Procurement", "Agriculture", "Trader/Economics", "Healthcare/Pet", "Insurance", "Custom"]}
        cta="Explore agents"
      />

      {/* 6. globe_teaser_v1: FeatureTile */}
      <section className="section-spacing">
        <div className="container-wrap">
          <FeatureTile
            title="Where your prompts go"
            link="/globe"
            thumb="globe_base"
            caption="R3F globe + energy badge"
          />
        </div>
      </section>

      {/* 7. news_teaser_v1: FeatureTile */}
      <section className="section-spacing">
        <div className="container-wrap">
          <FeatureTile
            title="Live News & Trends"
            link="/news"
            thumb="news_motif"
            caption="Realtime stream"
          />
        </div>
      </section>

      {/* 8. ethics_sovereignty_v1: SplitFeature */}
      <SplitFeature
        title="Sovereign by design."
        bullets={[
          "Agentic graph with human gates (Judge, Safety).",
          "Strict enterprise policy: no online fetch without explicit allow.",
          "Traceable outputs with provenance and audit trails."
        ]}
        leftImageId="fusion_michael"
        rightImageId="fusion_ai_ethics"
        link="/about/integai"
      />

      {/* 9. cta_contact_v1: BigCTA */}
      <BigCTA
        title="Build with IntegAI"
        primary="Talk to us"
        to="/contact"
      />

      {/* 10. footer_v1: GlobalFooter */}
      <GlobalFooter />
    </main>
  );
}