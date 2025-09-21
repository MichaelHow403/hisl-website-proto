import GlobalHeader from "@/components/sections/GlobalHeader";
import HeroCosmic from "@/components/sections/HeroCosmic";
import PerfBadges from "@/components/sections/PerfBadges";
import ApiContractsStrip from "@/components/sections/ApiContractsStrip";
import AgentsMatrix from "@/components/sections/AgentsMatrix";
import FeatureTile from "@/components/sections/FeatureTile";
import SplitFeature from "@/components/sections/SplitFeature";
import BigCTA from "@/components/sections/BigCTA";
import GlobalFooter from "@/components/sections/GlobalFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <HeroCosmic />
      
      <PerfBadges 
        ttftTargetMs={800}
        p50TokPerS={40}
        mode="offline-first"
      />
      
      <ApiContractsStrip 
        endpoints={["/v1/site/page", "/v1/site/seo", "/v1/site/forms/{id}"]}
        note="immutable contracts"
      />
      
      <AgentsMatrix 
        sectors={[
          "Construction",
          "Environmental", 
          "Conservation",
          "Pharma (CROx)",
          "Procurement",
          "Agriculture",
          "Trader/Economics",
          "Healthcare/Pet",
          "Insurance",
          "Custom"
        ]}
        cta="Explore agents"
      />
      
      <div className="py-16">
        <div className="container-wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureTile 
              title="Where your prompts go"
              link="/globe"
              thumb="globe_3d_with_ravens"
              caption="R3F globe + energy badge"
              description="Watch how a prompt travels through your sovereign stack—no hidden detours to 'free' model farms."
            />
            
            <FeatureTile 
              title="Live News & Trends"
              link="/news"
              thumb="ai_technology"
              caption="Realtime stream"
              description="Signals, not noise. A curated window onto trends that matter to builders, clients, and teams."
            />
          </div>
        </div>
      </div>
      
      <SplitFeature 
        title="Sovereign by design"
        bullets={[
          "Offline-first orchestration with local RAG",
          "Agentic graph (9-core) for transparent decision-making", 
          "Immutable artifacts (.integpkg) for full auditability"
        ]}
        link="/about/integai"
        imageId="human_AI_space"
      />
      
      <BigCTA 
        title="Build with IntegAI"
        subtitle="Ready to experience sovereign AI that amplifies human capability while respecting compliance and sustainability?"
        primary="Talk to us"
        to="/contact"
        secondary="Explore the platform"
        secondaryTo="/about/integai"
      />
      
      <GlobalFooter />
    </main>
  );
}
