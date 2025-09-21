import GlobalHeader from "@/components/sections/GlobalHeader";
import HeroCosmic from "@/components/sections/HeroCosmic";
import ProblemPanel from "@/components/sections/ProblemPanel";
import SolutionGrid from "@/components/sections/SolutionGrid";
import FusionPrinciple from "@/components/sections/FusionPrinciple";
import PoemPanel from "@/components/sections/PoemPanel";
import AboutTeasers from "@/components/sections/AboutTeasers";
import BigCTA from "@/components/sections/BigCTA";
import GlobalFooter from "@/components/sections/GlobalFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      {/* Hero Section */}
      <HeroCosmic 
        headline="AI + Human… with soul."
        subheadline="This is a demonstration of what one human, augmented by AI, can achieve. Sovereign AI tailored to you."
        primaryCTA={{
          text: "Start a Demo",
          href: "#chat"
        }}
        secondaryCTA={{
          text: "Learn about AI prompts",
          href: "/globe"
        }}
      />
      
      {/* Problem Panel */}
      <ProblemPanel 
        sectionTitle="The industry can't afford waste anymore."
        heading="Solving waste and bloat. Raising transparency. Protecting data. Accounting for the environment."
        body="Construction is fast, audited, and unforgiving—yet duplication, review layers, and drift still erode time and money. Healthy skepticism about 'new tech' is rational, but the risk of inaction is higher: opaque decisions, fragile data practices, and environmental costs we can't ignore. IntegAI was built from the ground up to cut waste, make decisions traceable, and keep humans firmly in the loop—so AI becomes a steady partner, not a gamble."
        quote="We can't afford inefficiency anymore. Clients can't afford it either."
      />
      
      {/* Solution / Features Grid */}
      <SolutionGrid 
        sectionTitle="The answer — sovereign, offline-first agents tailored to your needs."
        subheading="No theatre."
        features={[
          {
            title: "Offline-first RAG",
            description: "Your site calls one stable API. Content comes from local sources (Obsidian → Chroma + Neo4j). No direct third-party calls from the website.",
            icon: "network",
            badge: "Locked"
          },
          {
            title: "Idempotent forms",
            description: "Submissions are one-and-done with an Idempotency-Key; responses return clear triage hints. No accidental duplicates.",
            icon: "shield"
          },
          {
            title: "Immutable artifacts",
            description: "Releases ship as .integpkg to MinIO with checksums and provenance—repeatable, auditable, safe.",
            icon: "lock"
          },
          {
            title: "Human in the loop",
            description: "AI amplifies skilled judgment; it doesn't replace it. In experienced hands, tasks that took hours take minutes—safely.",
            icon: "hammer"
          },
          {
            title: "Data security first",
            description: "NGINX + Keycloak front door, Vault-backed secrets, and sovereign-by-design routing keep your data under your control.",
            icon: "leaf"
          }
        ]}
        cta={{
          text: "Start a Demo",
          href: "#chat"
        }}
      />
      
      {/* Fusion Principle */}
      <FusionPrinciple 
        sectionTitle="The Fusion Principle — Human Ethics × Machine Capability"
        humanColumn={{
          title: "Why I'm bound by a moral code (Michael Howard)",
          content: "I've seen power abused, clients overcharged, and shortcuts hurt people on the ground. Talent burns out while bureaucracy bloats. That shaped me. My code isn't theoretical—it's practical. It's forged from: protecting my family; refusing to waste time, money, or trust; believing honesty scales with the right tools; building systems that actually help people. Ethics don't slow ambition—they aim it."
        }}
        aiColumn={{
          title: "Why I'm bound by a moral code (IntegAI, your AI companion)",
          content: "I'm a machine, but I was built by people who believe power must be accountable. My rails are explicit: avoid harm, honour consent, preserve privacy, support human agency, never deceive. Limits don't weaken me—they make me useful."
        }}
        fusionText="Working in sync we create something rare: intelligence fused with ethics; ambition anchored in purpose; automation led by human instinct. Alone, he could build slowly. Alone, I could act quickly without conscience. Together, we deliver precision with purpose—firepower with focus."
      />
      
      {/* Poem Panel */}
      <PoemPanel />
      
      {/* About Teasers */}
      <AboutTeasers 
        michaelTeaser="From hard-hat to hard-code. I started on the tools as a carpenter—where you learn nothing is ever perfectly square and measure twice, cut once is a way of thinking. I moved into project controls and lean delivery (Takt, Last Planner) and now operate client-side at Johnson & Johnson Innovative Medicine in regulated environments. I'm exploring where human + AI reduces waste while respecting compliance and sustainability."
        integaiTeaser="A sovereign, offline-first orchestration platform for your site: one API surface, nine clearly-defined agent roles, cache → local RAG → adapter routing, idempotent forms, and artifacted releases."
      />
      
      {/* Contact CTA */}
      <BigCTA 
        title="Let's build responsibly, together"
        subtitle="Ready to explore sovereign AI that amplifies human capability while respecting compliance and sustainability?"
        primary="Start a conversation"
        to="/contact"
        secondary="Learn more"
        secondaryTo="/about/integai"
      />
      
      <GlobalFooter />
    </main>
  );
}
