import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import { getImage } from '@/app/lib/imagery';

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-bg">
      <GlobalHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 border-b border-edge overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src={getImage('ai_construction')} 
            alt="" 
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/70 to-bg" />
        </div>
        
        <div className="relative container-wrap text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-brandGold/30 bg-brandGold/10 backdrop-blur-sm mb-6">
            <span className="text-sm text-brandGold font-medium">Live Intelligence</span>
          </div>
          
          <h1 className="font-spectral text-[clamp(36px,5.5vw,64px)] font-bold mb-6">
            Live News & Trends
          </h1>
          
          <p className="text-[18px] leading-relaxed text-muted max-w-2xl mx-auto mb-4">
            Signal over noise
          </p>
          
          <p className="text-[16px] leading-relaxed text-muted/80 max-w-3xl mx-auto">
            Sovereign AI-filtered news coming soon. Our 9-core agent architecture will provide real-time industry intelligence across HISL's target sectors.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 md:py-28">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-aiGreen/20 to-brandGold/20 flex items-center justify-center text-3xl">
                📰
              </div>
              <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-6">
                Sovereign AI News Intelligence
              </h2>
              <p className="text-[17px] text-muted leading-relaxed max-w-2xl mx-auto">
                Our news aggregation system will filter and categorize industry-relevant content using our 9-core agent architecture.
              </p>
            </div>

            {/* Planned Categories */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="rounded-2xl border border-edge bg-panel/60 p-6 backdrop-blur">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-aiGreen/20 to-brandGold/20 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <h3 className="text-lg font-semibold text-brandGold mb-3">
                  Latest AI Developments
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Real-time updates on AI breakthroughs, regulatory changes, and technological advances relevant to industrial applications.
                </p>
              </div>

              <div className="rounded-2xl border border-edge bg-panel/60 p-6 backdrop-blur">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brandGold/20 to-aiGreen/20 flex items-center justify-center text-2xl">
                  🏗️
                </div>
                <h3 className="text-lg font-semibold text-aiGreen mb-3">
                  Innovative Leaders & Sovereign Platforms
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Industry leaders, platform innovations, and sovereign AI infrastructure developments across construction, pharma, and environmental sectors.
                </p>
              </div>

              <div className="rounded-2xl border border-edge bg-panel/60 p-6 backdrop-blur">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-aiGreen/20 to-brandGold/20 flex items-center justify-center text-2xl">
                  🌱
                </div>
                <h3 className="text-lg font-semibold text-text mb-3">
                  Data Center Energy & Sustainability
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Energy efficiency, renewable power, carbon footprint, and sustainability initiatives in data center and AI infrastructure.
                </p>
              </div>
            </div>

            {/* Technical Overview */}
            <div className="rounded-2xl border border-edge bg-panel/40 p-8 backdrop-blur">
              <h3 className="text-xl font-semibold text-brandGold mb-4">
                How It Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-3 rounded-lg bg-aiGreen/20 flex items-center justify-center text-aiGreen font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-text mb-2">Multi-Source Collection</h4>
                  <p className="text-muted">Aggregates from trusted news sources using our 9-core agent architecture</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-3 rounded-lg bg-brandGold/20 flex items-center justify-center text-brandGold font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-text mb-2">AI-Powered Filtering</h4>
                  <p className="text-muted">Relevance scoring and categorization using Claude, Gemini, and DeepSeek</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-3 rounded-lg bg-aiGreen/20 flex items-center justify-center text-aiGreen font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-text mb-2">Sovereign Delivery</h4>
                  <p className="text-muted">Offline-first, auditable news intelligence for regulated industries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-panel/20 border-t border-edge">
        <div className="container-wrap text-center">
          <h2 className="text-[clamp(28px,4vw,42px)] font-semibold mb-4">
            Explore Our Platform
          </h2>
          <p className="text-[17px] text-muted max-w-2xl mx-auto mb-8">
            While we build the news intelligence system, explore our other platform features.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="/" className="btn btn-gold px-8 py-3 text-base font-semibold">
              Return to Home
            </a>
            <a href="/globe" className="btn btn-ghost px-8 py-3 text-base">
              Try the Globe Demo
            </a>
          </div>
        </div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}