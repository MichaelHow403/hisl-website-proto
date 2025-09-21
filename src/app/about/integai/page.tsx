import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import PerfBadges from "@/components/sections/PerfBadges";
import ApiContractsStrip from "@/components/sections/ApiContractsStrip";

export default function AboutIntegAI() {
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
                The site calls one surface — /api/v1/site/* — and IntegAI handles the rest.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-16">
              <section>
                <h2 className="text-3xl font-spectral font-semibold mb-6 text-brandGold">
                  What it is
                </h2>
                <p className="text-muted leading-relaxed text-lg mb-6">
                  IntegAI is an offline-first orchestration platform for your website and 
                  operations. The site calls one surface — /api/v1/site/* — and IntegAI handles 
                  the rest. No direct third-party calls from the site.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-spectral font-semibold mb-6 text-brandGold">
                  How it thinks
                </h2>
                <p className="text-muted leading-relaxed text-lg mb-8">
                  A disciplined 9-role agent graph (Planner, Retriever, Judge, Executor, 
                  Memory, Safety, Tools, Observer, Publisher) routes work cache → local RAG → 
                  adapter, with latency and observability baked in. Local RAG leverages 
                  Chroma + Neo4j.
                </p>
                
                <div className="bg-panel border border-edge rounded-xl p-8">
                  <h3 className="text-xl font-semibold mb-4 text-aiGreen">
                    9-Role Agent Graph
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "Planner", "Retriever", "Judge", 
                      "Executor", "Memory", "Safety", 
                      "Tools", "Observer", "Publisher"
                    ].map((role) => (
                      <div key={role} className="bg-bg border border-edge rounded-lg p-3 text-center">
                        <span className="text-sm font-medium">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-spectral font-semibold mb-6 text-brandGold">
                  How it ships
                </h2>
                <p className="text-muted leading-relaxed text-lg mb-6">
                  Changes publish as immutable .integpkg artifacts to MinIO with checksums 
                  and provenance. Forms are idempotent by default. SEO, search, and assets 
                  are API-owned, so the site never refactors when backends evolve.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-spectral font-semibold mb-6 text-brandGold">
                  Values: Privacy • Performance • Provenance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-aiGreen/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Privacy</h3>
                    <p className="text-sm text-muted">
                      Your data stays under your control with sovereign-by-design routing
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brandGold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Performance</h3>
                    <p className="text-sm text-muted">
                      Offline-first with cache → local RAG → adapter routing for speed
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-aiGreen/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Provenance</h3>
                    <p className="text-sm text-muted">
                      Immutable .integpkg artifacts with full audit trails
                    </p>
                  </div>
                </div>
              </section>
            </div>
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
