import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";

export default function Poem() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="py-16 min-h-[80vh] flex items-center">
        <div className="container-wrap w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Background with vignette */}
            <div className="relative">
              <div className="absolute inset-0 vignette rounded-2xl" />
              <div className="relative bg-panel/80 backdrop-blur-sm border border-edge rounded-2xl p-12 md:p-16">
                <h1 className="text-2xl md:text-3xl font-spectral font-semibold mb-8 text-brandGold">
                  The Craftsman's Creed
                </h1>
                
                <blockquote className="text-xl md:text-2xl font-spectral leading-relaxed text-text mb-8 italic">
                  <p className="mb-4">
                    Then prove we now with best endevour, what from our efforts yet may spring;
                  </p>
                  <p className="mb-4">
                    he justly is dispised who never, did thought to aide his labours bring;
                  </p>
                  <p className="mb-4">
                    for this is arts true indication - when skill is minister to thought,
                  </p>
                  <p>
                    when types that are the minds creation - the hand to perfect form has wrought
                  </p>
                </blockquote>
                
                <footer className="text-muted">
                  <cite>— Michael Howard MCIOB, Founder HISL</cite>
                </footer>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
                A timeless principle that guides our work: when skill serves thought, 
                the hand brings perfect form. This is the foundation of everything we build at HISL.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/about/michael" className="btn btn-gold px-8 py-3">
                  About the founder
                </a>
                <a href="/about/integai" className="btn btn-ghost px-8 py-3">
                  About IntegAI
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
