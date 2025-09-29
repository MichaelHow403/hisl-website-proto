"use client";

import { useState, useEffect } from 'react';
import GlobalHeader from "@/components/sections/GlobalHeader";
import HeroCosmic from "@/components/sections/HeroCosmic";
import PerfBadges from "@/components/sections/PerfBadges";
import ApiContractsStrip from "@/components/sections/ApiContractsStrip";
import AgentsMatrix from "@/components/sections/AgentsMatrix";
import FeatureTile from "@/components/sections/FeatureTile";
import FeatureGrid from "@/components/sections/FeatureGrid";
import EnhancedFeatureGrid from "@/components/sections/EnhancedFeatureGrid";
import TeaserCards from "@/components/sections/TeaserCards";
import SplitFeature from "@/components/sections/SplitFeature";
import EnhancedSplitFeature from "@/components/sections/EnhancedSplitFeature";
import PoemPanel from "@/components/sections/PoemPanel"; // Import PoemPanel
import BigCTA from "@/components/sections/BigCTA";
import GlobalFooter from "@/components/sections/GlobalFooter";
import OptimizedImage from "@/components/OptimizedImage"; // Import the Sharp-optimized component
import { POEM_LOCK, getLockedPoemText } from "@/lib/poem-lock"; // Import POEM_LOCK and getLockedPoemText
import { LOCKED_CONTENT } from "@/lib/content-lock"; // Import LOCKED_CONTENT
import { loadHybridHomeContent } from "@/lib/hybrid-content-loader"; // Import hybrid content loader
import { loadMasterSectionsClient } from "@/app/lib/master-content-loader";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import GlobeErrorBoundary from '@/components/globe/GlobeErrorBoundary';

// Dynamic import with SSR disabled for the Globe component
const Globe = dynamic(() => import('@/components/globe/Globe'), { 
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-amber-400 text-lg mb-2">Loading Globe...</div>
        <div className="text-gray-400">Initializing 3D visualization</div>
      </div>
    </div>
  )
});

// Note: Metadata is handled by layout.tsx since this is now a client component

export default function Home() {
  const poemText = getLockedPoemText();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    content: string;
    provider: string;
    energyUsage: number;
    responseTime: number;
  } | null>(null);
  const [aiProvider, setAiProvider] = useState<string>('');
  const [hybridSections, setHybridSections] = useState<any[]>([]);

  // Load hybrid content on component mount
  useEffect(() => {
    loadHybridHomeContent().then(sections => {
      setHybridSections(sections);
    });
  }, []);

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse(null);
    setAiProvider('Processing...');
    
    try {
      const res = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.data);
        setAiProvider(data.data.provider);
      } else {
        setResponse({
          content: 'Sorry, I encountered an error processing your request.',
          provider: 'Error',
          energyUsage: 0,
          responseTime: 0
        });
        setAiProvider('Error');
      }
    } catch (error) {
      setResponse({
        content: 'Sorry, I encountered an error processing your request.',
        provider: 'Error',
        energyUsage: 0,
        responseTime: 0
      });
      setAiProvider('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <GlobalHeader />
      
      {/* Hero Section - From 01-hero.mdx */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage 
            imageId="home_hero_main"
            alt="Construction bridge and digital intelligence overlay"
            className="w-full h-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 container-wrap text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Sovereign AI, built on the ground — for the ground.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            I'm <strong>Michael Howard MCIOB</strong>, a hands-on Chartered Construction Manager working in the field, delivering projects in pharma, energy, and manufacturing.
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto">
            I founded <strong>HISL</strong> and built our platform <strong>IntegAI</strong> because the tools I needed didn't exist: AI that works inside regulated environments, cuts downtime, and drives sustainability — without leaking data to the cloud or breaking compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-gold px-8 py-4 text-lg font-semibold">
              Book a Demo
            </a>
            <a href="/globe" className="btn btn-ghost px-8 py-4 text-lg font-semibold">
              Where your prompts go
            </a>
          </div>
        </div>
      </section>
      
      {/* Problem Panel - From 02-capabilities.mdx */}
      <section className="section-spacing bg-gray-800">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">From pain points to practical outcomes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Blind spots create risks</h3>
              <p className="text-lg mb-4">Identify hazards before they occur.</p>
              <p className="text-gray-300">On-site sensing + AI oversight reveal weak signals early — from safety non-conformances to asset drift.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Inefficiency drains resources</h3>
              <p className="text-lg mb-4">Optimize performance in-line.</p>
              <p className="text-gray-300">Continuous tuning keeps throughput high, resources lean, and downtime low across teams and shifts.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Sustainability is fragmented</h3>
              <p className="text-lg mb-4">Measure what matters.</p>
              <p className="text-gray-300">Track impact, cut waste, and prove emissions reductions with evidence that stands up to audit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Grid - From 03-features.mdx */}
      <section className="section-spacing">
        <div className="container-wrap">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technology with sovereignty at its core</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">ComplianceGuard</h3>
              <p className="text-gray-300">GDPR/NIS2 monitoring with human-readable evidence.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">DataSovereign</h3>
              <p className="text-gray-300">Local-first processing keeps sensitive data in-region.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">PrivacyShield</h3>
              <p className="text-gray-300">Encrypted channels, hardened agent comms.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">AuditTrail</h3>
              <p className="text-gray-300">Immutable logs with prompt/response hashing.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">EthicsCore</h3>
              <p className="text-gray-300">Human-aligned decision rules with escalation paths.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">SecureComms</h3>
              <p className="text-gray-300">Enforced encryption and access control.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">DocuGenie</h3>
              <p className="text-gray-300">Document intelligence tailored for regulated industries.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold mb-3">BuildLens</h3>
              <p className="text-gray-300">Construction ops insight: RAMS, QA/QC, handover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Render Hybrid Sections */}
      {hybridSections.map((section, index) => {
        switch (section.component) {
          case 'HeroCosmic':
            return (
              <HeroCosmic
                key={index}
                headline={section.props.headline}
                subheadline={section.props.subheadline}
                primaryCTA={section.props.primaryCTA}
                secondaryCTA={section.props.secondaryCTA}
                imageId={section.props.imageId}
                overlayImageId={section.props.overlayImageId}
                expandedContent={section.props.expandedContent}
                mdxContent={section.props.mdxContent}
              />
            );
          case 'SplitFeature':
            return (
              <EnhancedSplitFeature
                key={index}
                title={section.props.title}
                bullets={section.props.bullets}
                imageId={section.props.imageId}
                leftImageId={section.props.leftImageId}
                rightImageId={section.props.rightImageId}
                detailedExplanations={section.props.detailedExplanations}
                mdxContent={section.props.mdxContent}
              />
            );
          case 'FeatureGrid':
            return (
              <EnhancedFeatureGrid
                key={index}
                intro={section.props.intro}
                features={section.props.features}
                brandStrip={section.props.brandStrip}
                enhancedFeatures={section.props.enhancedFeatures}
                mdxContent={section.props.mdxContent}
              />
            );
          case 'PoemPanel':
            return (
              <section key={index} className="section-spacing bg-gray-800">
                <PoemPanel
                  title={section.props.title}
                  author={section.props.author}
                  text={section.props.text}
                  align={section.props.align}
                  imageId={section.props.imageId}
                  footnote={section.props.footnote}
                />
              </section>
            );
          case 'TeaserCards':
            return (
              <section key={index} className="section-spacing bg-gray-800">
                <div className="container-wrap">
                  <TeaserCards cards={section.props.cards} />
                </div>
              </section>
            );
          case 'FeatureTile':
            return (
              <section key={index} className="section-spacing">
                <FeatureTile
                  title={section.props.title}
                  caption={section.props.caption}
                  link={section.props.link}
                />
              </section>
            );
          case 'BigCTA':
            return (
              <section key={index} className="section-spacing">
                <BigCTA
                  title={section.props.title}
                  primary={section.props.primary}
                  to={section.props.to}
                />
              </section>
            );
          default:
            return null;
        }
      })}

      {/* Additional Interactive Sections */}
      {/* Performance Metrics Section - perf_badges_v1 */}
      <section className="section-spacing bg-gray-800">
        <PerfBadges 
          ttftTargetMs={800}
          p50TokPerS={40}
          mode="offline-first"
          note="Fast-path Gemma via llama.cpp; Mistral‑7B Q4_0 fallback"
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
      <section className="section-spacing bg-gray-800">
        <AgentsMatrix 
          sectors={["Construction", "Environmental", "Conservation", "Pharma (CROx)", "Public Procurement", "Agriculture", "Trader/Economics", "Healthcare/Pet", "Insurance", "Custom"]}
          cta="Explore agents"
        />
      </section>

      {/* Globe Section - WHERE YOUR PROMPTS GO */}
      <section className="section-spacing bg-gray-800">
        <div className="container-wrap">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              WHERE YOUR PROMPTS GO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your prompts route through our sovereign infrastructure, processed locally in Ireland
            </p>
          </div>
          
          {/* Interactive Prompt Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Ask IntegAI anything..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmitPrompt()}
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                  />
                </div>
                <button 
                  onClick={handleSubmitPrompt}
                  disabled={isLoading || !prompt.trim()}
                  className="btn btn-gold px-8 py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Submit Prompt'}
                </button>
              </div>

              {/* AI Provider Indicator */}
              {aiProvider && (
                <div className="mb-4 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      aiProvider === 'DeepSeek' ? 'bg-blue-400' :
                      aiProvider === 'Claude' ? 'bg-orange-400' :
                      aiProvider === 'Gemini' ? 'bg-green-400' :
                      aiProvider === 'Processing...' ? 'bg-amber-400 animate-pulse' :
                      'bg-red-400'
                    }`}></div>
                    <span className="text-sm text-gray-300">
                      {isLoading ? 'Processing...' : `Powered by ${aiProvider}`}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Status Indicators */}
              <div className="flex flex-wrap gap-6 justify-center items-center text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Dublin Data Center ✓</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span>
                    {response ? `Est. ${response.energyUsage.toFixed(2)} Wh` : 'Est. 0.3 Wh per query'}
                  </span>
                </div>
                {response && (
                  <div className="flex items-center gap-2 text-blue-400">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>{response.responseTime}ms response time</span>
                  </div>
                )}
              </div>

              {/* Response Display */}
              {response && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">
                    Response from {response.provider}:
                  </div>
                  <div className="text-white whitespace-pre-wrap">
                    {response.content}
                  </div>
                </div>
              )}
            </div>
            
            {/* Globe Visualization */}
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <div className="text-amber-400 text-lg mb-2">Processing your prompt...</div>
                    <div className="text-gray-400">Routing through AI infrastructure</div>
                  </div>
                </div>
              )}
              <GlobeErrorBoundary>
                <Suspense fallback={
                  <div className="h-[70vh] w-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-amber-400 text-lg mb-2">Loading textures...</div>
                      <div className="text-gray-400">Preparing 3D Earth</div>
                    </div>
                  </div>
                }>
                  <Globe />
                </Suspense>
              </GlobeErrorBoundary>
            </div>
          </div>
        </div>
      </section>

      {/* Poem Section - Engineering with human dignity */}
      <section className="section-spacing bg-gray-800">
        <PoemPanel
          title="Engineering with human dignity"
          author="— Family verse, adapted"
          text="Then prove we now with best endeavour, What from our efforts yet may spring; He justly is despised who never Did thought to aid his labours bring; For this is Art's true indication, When skill is minister to thought, When types that are the mind's creation — The hand to perfect form has wrought."
          align="center"
          imageId="poem_backdrop"
          footnote="Locked verbatim; guarded by SHA‑256 in build."
        />
      </section>

      {/* Platform Features */}
      <section className="section-spacing">
        <div className="container-wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureTile 
              title="Real-time Intelligence"
              link="/news"
              thumb="home_hero_overlay"
              caption="Live data streams and insights"
            />
            <FeatureTile 
              title="Safety Analytics"
              link="/sectors"
              thumb="home_solution_security"
              caption="Industry-specific safety metrics"
            />
          </div>
        </div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}
