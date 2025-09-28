import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import PerfBadges from "@/components/sections/PerfBadges";
import ApiContractsStrip from "@/components/sections/ApiContractsStrip";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import type { Metadata } from "next";
import Img from "@/components/Img";

export const metadata: Metadata = {
  title: "IntegAI — Sovereign Offline-First Orchestrator",
  description:
    "IntegAI powers the HISL site: one API, nine agents, sovereign by design. Secure, performant, future‑proof.",
};

export default async function AboutIntegAI() {
  const mdxPath = path.join(process.cwd(), 'src/content/about/integai.mdx');
  const mdxSource = await fs.readFile(mdxPath, 'utf8');

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="py-16">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-spectral font-semibold mb-6">
                Sovereign AI, built for trust
              </h1>
              <p className="text-xl text-muted max-w-2xl mx-auto">
                IntegAI is an offline-first orchestration platform for your website and operations.
                The site calls one surface — /api/v1/site/* — and IntegAI handles the rest. No direct third-party calls from the site.
              </p>
            </div>

            {/* MDX Content */}
            <div className="prose prose-lg max-w-none">
              <MDXRemote source={mdxSource} />
            </div>

            {/* System Diagram */}
            <section className="mt-16">
              <h2 className="text-3xl font-spectral font-semibold mb-6 text-brandGold">
                Architecture Overview
              </h2>
              <div className="bg-panel border border-edge rounded-xl p-8">
                <div className="text-center">
                  <div className="relative aspect-video max-w-2xl mx-auto">
                    <Img name="ai_technology" alt="AI technology visualization" sizes="(max-width: 768px) 100vw, 600px" />
                  </div>
                  <p className="text-sm text-muted mt-4">
                    Browser → NGINX → IntegAI → (Cache | RAG | Adapters) → Artifact Store
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center mt-16">
              <h2 className="text-2xl font-spectral font-semibold mb-4">
                Ready to explore sovereign AI?
              </h2>
              <p className="text-muted mb-8">
                Experience the platform that puts humans first and keeps data under your control 
                in construction, pharma, and regulated environments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="btn btn-gold px-8 py-3">
                  Start a conversation
                </a>
                <a href="/about/michael" className="btn btn-ghost px-8 py-3">
                  Meet the founder
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>

      <PerfBadges 
        ttftTargetMs={800}
        p50TokPerS={40}
        mode="offline-first"
      />

      <ApiContractsStrip 
        endpoints={[
          "/v1/site/page", 
          "/v1/site/menu", 
          "/v1/site/search", 
          "/v1/site/seo", 
          "/v1/site/forms/*"
        ]}
        note="stable v1 contracts"
      />
      
      <GlobalFooter />
    </main>
  );
}
