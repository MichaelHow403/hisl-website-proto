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
import { POEM_LOCK, getLockedPoemText } from "@/lib/poem-lock"; // Import POEM_LOCK and getLockedPoemText
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HISL — AI + Human... with Soul",
  description:
    "Experience sovereign AI built to amplify human capability, cut waste, and respect compliance and sustainability.",
};

export default function Home() {
  const poemText = getLockedPoemText();

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      {/* Hero Section */}
      <HeroCosmic 
        headline="AI + Human... with soul."
        subheadline="This is a demonstration of what one human, augmented by AI, can achieve. Sovereign AI tailored to you."
        primaryCTA={{
          text: "Start a Demo →",
          href: "#chat"
        }}
        secondaryCTA={{
          text: "Learn about AI prompts →",
          href: "/globe"
        }}
      />
      
      {/* Performance Badges */}
      <PerfBadges 
        ttftTargetMs={800}
        p50TokPerS={40}
        mode="offline-first"
      />

      {/* API Contracts Strip */}
      <ApiContractsStrip 
        endpoints={["/v1/site/page", "/v1/site/seo", "/v1/site/forms/{id}"]}
        note="immutable contracts"
      />

      {/* Agents Matrix */}
      <AgentsMatrix 
        sectors={["Construction", "Environmental", "Conservation", "Pharma (CROx)", "Public Procurement", "Agriculture", "Trader/Economics", "Healthcare/Pet", "Insurance", "Custom"]}
        cta="Explore agents"
      />

      {/* Globe Teaser */}
      <FeatureTile 
        title="Where your prompts go"
        link="/globe"
        thumb="globe.webp"
        caption="R3F globe + energy badge"
      />

      {/* News Teaser */}
      <FeatureTile 
        title="Live News & Trends"
        link="/news"
        thumb="trends.webp"
        caption="Realtime stream"
      />

      {/* Poem Panel */}
      <PoemPanel 
        title={POEM_LOCK.title}
        author="— Michael Howard MCIOB, Founder HISL"
        text={poemText}
      />

      {/* Ethics & Sovereignty Split Feature */}
      <SplitFeature 
        title="Sovereign by design"
        bullets={["Offline-first", "Agentic graph (9-core)", "Immutable artifacts"]}
        link="/about/integai"
      />
      
      {/* Contact CTA */}
      <BigCTA 
        title="Build with IntegAI"
        primary="Talk to us"
        to="/contact"
      />
      
      <GlobalFooter />
    </main>
  );
}
