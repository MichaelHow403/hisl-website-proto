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
    <main className="min-h-screen bg-white text-gray-900">
      <GlobalHeader />
      
      {/* Hero Section */}
      <HeroCosmic 
        headline="AI + Human... with soul."
        subheadline="Enterprise-grade AI platform built to amplify human capability, ensure compliance, and drive sustainable innovation across industries."
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
      <section className="section-spacing bg-gray-50">
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
      <section className="section-spacing bg-gray-50">
        <AgentsMatrix 
          sectors={["Construction", "Environmental", "Conservation", "Pharma (CROx)", "Public Procurement", "Agriculture", "Trader/Economics", "Healthcare/Pet", "Insurance", "Custom"]}
          cta="Explore agents"
        />
      </section>

      {/* Platform Features */}
      <section className="section-spacing">
        <div className="container-wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureTile 
              title="Interactive Platform"
              link="/globe"
              thumb="globe_3d_with_ravens"
              caption="3D visualization and analytics"
            />
            <FeatureTile 
              title="Real-time Intelligence"
              link="/news"
              thumb="starfield_cosmic"
              caption="Live data streams and insights"
            />
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="section-spacing bg-gray-50">
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
      <section className="section-spacing bg-gray-50">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Cutting-edge AI infrastructure built for enterprise scale and reliability
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
