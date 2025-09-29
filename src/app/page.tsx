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
          author="The Craftsman's Creed"
          text="Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought"
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
              thumb="ai_brain_network"
              caption="Live data streams and insights"
            />
            <FeatureTile 
              title="Safety Analytics"
              link="/sectors"
              thumb="data_sovereignty_badge"
              caption="Industry-specific safety metrics"
            />
          </div>
        </div>
      </section>
      
      <GlobalFooter />
    </main>
  );
}
