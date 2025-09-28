'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import GlobeErrorBoundary from '@/components/globe/GlobeErrorBoundary';

// Dynamic import with SSR disabled for the Globe component
const Globe = dynamic(() => import('@/components/globe/Globe'), { 
  ssr: false,
  loading: () => (
    <div className="h-[70vh] w-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-brandGold text-lg mb-2">Loading Globe...</div>
        <div className="text-muted">Initializing 3D visualization</div>
      </div>
    </div>
  )
});

export default function GlobePage() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    content: string;
    tokens: number;
    model: string;
    provider: string;
    energyUsage: number;
    responseTime: number;
  } | null>(null);
  const [aiProvider, setAiProvider] = useState<string>('');

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
          responseTime: 0,
          tokens: 0,
          model: 'error'
        });
        setAiProvider('Error');
      }
    } catch (error) {
      setResponse({
        content: 'Sorry, I encountered an error processing your request.',
        provider: 'Error',
        energyUsage: 0,
        responseTime: 0,
        tokens: 0,
        model: 'error'
      });
      setAiProvider('Error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <GlobalHeader />
      
      <div className="container-wrap py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            WHERE YOUR PROMPTS GO
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Your prompts route through our sovereign infrastructure, processed locally in Ireland
          </p>
        </div>

        {/* Professional Prompt Interface */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Ask about sovereign AI architecture..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitPrompt()}
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-lg">
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
              <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">
                  Response from {response.provider}:
                </div>
                <div className="text-white whitespace-pre-wrap">
                  {response.content}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Globe Visualization with Loading Overlay */}
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
              <Globe isProcessing={isLoading} />
            </Suspense>
          </GlobeErrorBoundary>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}