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
import { generateSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "HISL — AI + Human... with Soul",
  description: "Experience sovereign AI built to amplify human capability, cut waste, and respect compliance and sustainability.",
  slug: "",
  keywords: ["AI", "artificial intelligence", "sovereign AI", "compliance", "sustainability", "HISL", "IntegAI", "human-AI collaboration"],
  section: "Home"
}, {
  siteName: "HISL",
  siteUrl: "https://hisl.ai",
  defaultImage: "/optimized/hisl-logo-1200.webp",
  twitterHandle: "@HISL_AI",
  author: "HISL Team"
});

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
        thumb="globe_3d_with_ravens"
        caption="R3F globe + energy badge"
      />

      {/* News Teaser */}
      <FeatureTile 
        title="Live News & Trends"
        link="/news"
        thumb="starfield_cosmic"
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
      
      {/* Example of using the Img component */}
      <section className="py-16 bg-panel">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-spectral font-bold text-brandGold mb-6">
              Optimized Images with Sharp
            </h2>
            <p className="text-xl text-muted mb-8">
              Example of using the &lt;Img&gt; component with Sharp-optimized images
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Img
          name="AI_DNA"
          alt="Abstract double helix made of circuitry representing AI DNA"
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
        />
              <Img 
                name="ai_technology" 
                alt="AI technology visualization"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
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
