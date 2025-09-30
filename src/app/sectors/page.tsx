import { getImage } from '@/app/lib/imagery';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';

export default function SectorsPage() {
  const sectors = [
    {
      name: "Construction",
      icon: "🏗️",
      description: "EHS monitoring, scheduling intelligence, and BIM/design automation.",
      details: "Site safety & compliance, project PM workflows, blueprint analysis & cost estimation",
      link: "/agents/deploy?sector=construction",
      image: getImage('ai_brain_network')
    },
    {
      name: "Environmental", 
      icon: "🌱",
      description: "ESG reporting, biodiversity tracking, and lifecycle analytics.",
      details: "Emissions monitoring, sustainability metrics, environmental compliance workflows",
      link: "/agents/deploy?sector=environmental",
      image: getImage('friendship')
    },
    {
      name: "Conservation",
      icon: "🏛️", 
      description: "Heritage preservation and planning approval workflows.",
      details: "Restoration planning, asset scanning, permit workflows, SPAB guidance integration",
      link: "/agents/deploy?sector=conservation",
      image: getImage('data_sovereignty_badge')
    },
    {
      name: "Pharma (CROx)",
      icon: "💊",
      description: "Clinical R&D orchestration with protocol co-pilot and recruitment intelligence.",
      details: "GMP compliance, audit preparation, document QC, trial monitoring, regulatory drafting",
      link: "/agents/deploy?sector=pharma-crox",
      image: getImage('ai_brain_network')
    },
    {
      name: "Public Procurement", 
      icon: "📋",
      description: "Transparent tender processes with anti-corruption oversight.",
      details: "Bid evaluation, compliance guardrails, transparency enforcement, anomaly detection",
      link: "/agents/deploy?sector=procurement",
      image: getImage('data_sovereignty_badge')
    },
    {
      name: "Agriculture",
      icon: "🌾",
      description: "Soil monitoring, yield optimization, and supply chain intelligence.",
      details: "Crop monitoring, irrigation optimization, sustainability metrics, logistics planning",
      link: "/agents/deploy?sector=agriculture", 
      image: getImage('friendship')
    },
    {
      name: "Trader / Economics",
      icon: "📈",
      description: "Market signals aggregation and portfolio risk modeling.",
      details: "Equities/FX/commodities analysis, portfolio optimization, hedging strategies",
      link: "/agents/deploy?sector=trader-economics",
      image: getImage('ai_brain_network')
    },
    {
      name: "Healthcare",
      icon: "🏥",
      description: "Clinical workflow optimization and treatment planning aids.",
      details: "Notes summarization, triage workflows, diagnostics assistance, treatment planning",
      link: "/agents/deploy?sector=healthcare",
      image: getImage('friendship')
    },
    {
      name: "Insurance",
      icon: "🛡️",
      description: "Claims processing automation with fraud detection.",
      details: "Policy administration, claims workflow, fraud detection, anomaly flagging",
      link: "/agents/deploy?sector=insurance",
      image: getImage('data_sovereignty_badge')
    },
    {
      name: "Custom",
      icon: "🔧",
      description: "Bespoke orchestration with sector-specific customization.",
      details: "Wizard agents, child agents, callback learning, custom compliance frameworks",
      link: "/agents/deploy?sector=custom",
      image: getImage('ai_brain_network')
    }
  ];

  return (
    <main className="min-h-screen bg-bg">
      <GlobalHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 border-b border-edge overflow-hidden">
        <div className="absolute inset-0 opacity-8">
          <img 
            src={getImage('data_sovereignty_badge')} 
            alt="" 
            className="w-full h-full object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/70 to-bg" />
        </div>
        
        <div className="relative container-wrap text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-brandGold/30 bg-brandGold/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-brandGold font-medium">Regulated Industries</span>
          </div>
          
          <h1 className="font-spectral text-[clamp(36px,5.5vw,64px)] font-bold mb-6">
            Sectors
          </h1>
          
          <p className="text-[18px] leading-relaxed text-muted max-w-2xl mx-auto">
            HISL delivers sovereign AI solutions across multiple sectors, tailored to specific industry needs and compliance requirements.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-20 md:py-28">
        <div className="container-wrap">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sectors.map((sector) => (
              <a 
                key={sector.name}
                href={sector.link}
                className="group relative rounded-2xl border border-edge bg-panel/60 backdrop-blur overflow-hidden hover:border-aiGreen/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-aiGreen/10 transition-all duration-300 cursor-pointer"
              >
                {/* Background image */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
                  <img 
                    src={sector.image} 
                    alt="" 
                    className="w-full h-full object-cover"
                    aria-hidden="true"
                  />
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-aiGreen/20 to-brandGold/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {sector.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text group-hover:text-aiGreen transition-colors mb-1">
                        {sector.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {sector.description}
                  </p>
                  
                  {/* Details */}
                  <p className="text-xs text-muted/70 leading-relaxed mb-4">
                    {sector.details}
                  </p>
                  
                  {/* Deploy Agents CTA */}
                  <div className="flex items-center gap-2 text-sm text-brandGold font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>Deploy Agents</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 opacity-50 group-hover:opacity-100 group-hover:text-aiGreen transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Overview */}
      <section className="py-20 md:py-28 bg-panel/20 border-t border-edge">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-6">
              Technical Overview
            </h2>
            <p className="text-[17px] text-muted leading-relaxed mb-8">
              All sectors run on the same sovereign infrastructure with industry-specific compliance profiles.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-edge bg-panel/60 p-6">
                <h3 className="text-lg font-semibold text-brandGold mb-3">Offline-First</h3>
                <p className="text-sm text-muted">On-premises deployment with air-gap capability for maximum data sovereignty.</p>
              </div>
              <div className="rounded-xl border border-edge bg-panel/60 p-6">
                <h3 className="text-lg font-semibold text-aiGreen mb-3">Compliance DNA</h3>
                <p className="text-sm text-muted">GDPR, NIS2, EU AI Act frameworks built-in with immutable audit trails.</p>
              </div>
              <div className="rounded-xl border border-edge bg-panel/60 p-6">
                <h3 className="text-lg font-semibold text-text mb-3">9-Core Architecture</h3>
                <p className="text-sm text-muted">Deterministic agent graph with human-in-the-loop gates and safety policies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container-wrap text-center">
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-4">
            Build with IntegAI
          </h2>
          <p className="text-[17px] text-muted max-w-2xl mx-auto mb-8">
            Ready to deploy sovereign AI in your regulated sector?
          </p>
          <a href="/contact" className="btn btn-gold">
            Request Demo
          </a>
        </div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}