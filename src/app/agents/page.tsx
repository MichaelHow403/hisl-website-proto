import { getImage } from '@/app/lib/imagery';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';

function HoneycombAgent({ 
  position, 
  agent 
}: { 
  position: string; 
  agent: { name: string; icon: string; desc: string; sector?: string }
}) {
  return (
    <a 
      href="/agents/deploy"
      className={`absolute ${position} group cursor-pointer z-10 block`}
      style={{ width: '12%', aspectRatio: '1' }}
    >
      {/* Hover trigger area (larger than visual) */}
      <div className="absolute inset-0 -m-6" />
      
      {/* Icon/Label */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
          {agent.icon}
        </span>
        <span className="text-[10px] font-medium text-text/60 group-hover:text-brandGold transition-colors text-center">
          {agent.name}
        </span>
      </div>
      
      {/* Tooltip - appears on hover */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50">
        <div className="rounded-xl border-2 border-brandGold/50 bg-panel/98 backdrop-blur-xl p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{agent.icon}</span>
            <div>
              <h3 className="font-semibold text-brandGold text-base">
                {agent.name}
              </h3>
              {agent.sector && (
                <p className="text-xs text-aiGreen">{agent.sector}</p>
              )}
            </div>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-3">
            {agent.desc}
          </p>
          <div className="text-xs text-brandGold font-medium">
            Click to Deploy Agent →
          </div>
        </div>
      </div>
    </a>
  );
}

export default function AgentsPage() {
  const coreAgents = [
    { name: "Planner", icon: "🎯", desc: "Analyzes query, determines required tools & data sources, proposes execution steps with latency budgets", position: "top-[5%] left-1/2 -translate-x-1/2" },
    { name: "Retriever", icon: "🔍", desc: "Dense + graph retrieval from Chroma & Neo4j. Hybrid rerank by score + graph prior.", position: "top-[22%] left-[18%]" },
    { name: "Judge", icon: "⚖️", desc: "Validates context sufficiency, assigns trust scores, triggers HITL gates when needed", position: "top-[22%] right-[18%]" },
    { name: "Executor", icon: "⚡", desc: "Runs LLM inference (Gemma fast-path → Mistral-7B fallback), generates draft outputs", position: "top-[48%] left-[5%]" },
    { name: "Memory", icon: "🧠", desc: "Persists summaries, embeddings, graph edges to Postgres & Neo4j for future retrieval", position: "top-[48%] left-1/2 -translate-x-1/2" },
    { name: "Safety", icon: "🛡️", desc: "Applies policy profile, redacts PII, gates online access via allow_online flag", position: "top-[48%] right-[5%]" },
    { name: "Tools", icon: "🔧", desc: "Broker for MinIO, Chroma, Neo4j, Vault. Enforces timeouts, retries, scope checks", position: "bottom-[22%] left-[18%]" },
    { name: "Observer", icon: "👁️", desc: "Emits structured telemetry to Langfuse/Phoenix. PII redacted by default.", position: "bottom-[22%] right-[18%]" },
    { name: "Publisher", icon: "📦", desc: "Packages substantial outputs as .integpkg to MinIO. Invalidates caches, emits URLs.", position: "bottom-[5%] left-1/2 -translate-x-1/2" }
  ];

  return (
    <main className="min-h-screen bg-bg">
      <GlobalHeader />
      
      {/* Hero */}
      <section className="relative py-20 md:py-28 border-b border-edge overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img src={getImage('ai_construction')} alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        
        <div className="relative container-wrap text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-aiGreen/30 bg-aiGreen/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-aiGreen font-medium">9-Core Agent Graph</span>
          </div>
          
          <h1 className="font-spectral text-[clamp(36px,5.5vw,64px)] font-bold mb-6">
            Sovereign agents tailored to your needs
          </h1>
          
          <p className="text-[18px] leading-relaxed text-muted max-w-2xl mx-auto">
            HISL's offline-first orchestration architecture. Hover over each hexagon to explore agent roles.
          </p>
        </div>
      </section>

      {/* Honeycomb Interactive Visualization */}
      <section className="py-20 md:py-32 relative">
        <div className="container-wrap">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-4">
              The 9-Core Agent Architecture
            </h2>
            <p className="text-[17px] text-muted max-w-2xl mx-auto">
              Memory, safety, and audit trails are baked into every agent's core DNA.
            </p>
          </div>
          
          {/* Honeycomb Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-square">
              {/* Base honeycomb image */}
              <img 
                src={getImage('honeycomb_agents')} 
                alt="Agent Honeycomb Architecture" 
                className="w-full h-full object-contain"
              />
              
              {/* Interactive agent overlays */}
              {coreAgents.map((agent) => (
                <HoneycombAgent key={agent.name} position={agent.position} agent={agent} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-edge bg-panel/20">
        <div className="container-wrap text-center">
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-4">
            Build with IntegAI
          </h2>
          <p className="text-[17px] text-muted max-w-2xl mx-auto mb-8">
            Deploy sovereign agents in your regulated operations.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/agents/deploy" className="btn btn-gold">Deploy Agents</a>
            <a href="/contact" className="btn btn-ghost">Request Demo</a>
            <a href="/globe" className="btn btn-ghost">See the Architecture</a>
          </div>
        </div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}