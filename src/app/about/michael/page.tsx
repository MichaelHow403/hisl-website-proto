import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";
import Img from "@/components/ui/Img";

export default function AboutMichael() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="py-16">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="w-32 h-32 mx-auto mb-8 relative rounded-full overflow-hidden">
                <Img assetId="michael_headshot" sizes="128px" />
              </div>
              <h1 className="text-4xl md:text-5xl font-spectral font-semibold mb-4">
                From hard-hat to hard-code
              </h1>
              <p className="text-xl text-muted">
                Michael Howard MCIOB, Founder HISL
              </p>
            </div>

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  Builder at heart
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  I started out on the tools as a carpenter—where you quickly learn that 
                  nothing is perfectly square and problem-solving is part of the job. 
                  Measure twice, cut once wasn't advice; it was survival.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  From site to systems
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Wanting to build further, I hopped off the roof and went back to college 
                  for five years, then moved into project controls and lean delivery with 
                  PM Group—using Takt planning and Last Planner to reduce waste and keep 
                  teams flowing.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  Client-side today
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  I now work with Johnson & Johnson Innovative Medicine, delivering projects 
                  in regulated live environments where clarity, compliance, and coordination 
                  are the baseline.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  Human + AI (the practical stance)
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  On the side, I explore how well-designed AI can remove repetitive load, 
                  reduce waste, and still respect compliance and sustainability. It's not 
                  about replacing people—it's about testing how human + AI can actually 
                  build better. I'm currently validating this approach with the Nimbus 
                  Research Centre (MTU), backed by an Enterprise Ireland Innovation Voucher.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  Why I'm cautious and optimistic
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Eighteen months of hands-on trials taught me the difference between hype 
                  and value. In experienced hands, AI becomes a dependable assistant; in 
                  naive use, it creates risk. I built and tested my own stack precisely to 
                  understand the boundaries and keep trust intact.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  Credentials (snapshot)
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  Fully chartered MCIOB; TAKT/lean delivery track record; MSc Planning & 
                  Sustainable Development; Biopharma Processing cert; PM Group graduate 
                  program. (Full CV available on request.)
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-spectral font-semibold mb-4 text-brandGold">
                  Connect
                </h2>
                <p className="text-muted leading-relaxed mb-6">
                  🤝 Conversations welcome on building, compliance, and the future of work—
                  whether with timber, concrete, or code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/contact" className="btn btn-gold px-6 py-3">
                    Get in touch
                  </a>
                  <a href="/about/integai" className="btn btn-ghost px-6 py-3">
                    Learn about IntegAI
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
