'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ResultPanelProps {
  response: string | null;
  model: string | null;
  timestamp: string | null;
  isLoading: boolean;
}

export default function ResultPanel({ response, model, timestamp, isLoading }: ResultPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showProvenance, setShowProvenance] = useState(false);

  const hasContent = response || isLoading;
  const shouldShow = hasContent || isExpanded;

  const handleProvenanceClick = () => {
    console.log('Provenance data:', { response, model, timestamp });
    setShowProvenance(!showProvenance);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <article className="rounded-2xl border border-edge bg-panel/60 p-5 md:p-6 backdrop-blur">
      {/* Header */}
      <div 
        className="flex justify-between items-center cursor-pointer hover:bg-panel/80 transition-colors rounded-lg p-2 -m-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-aiGreen"></div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted font-semibold">
              {model ? `${model} Response` : 'AI Analysis'}
            </div>
            {timestamp && (
              <div className="text-xs text-muted">
                {formatTimestamp(timestamp)}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {response && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleProvenanceClick();
              }}
              className="btn-ghost text-sm px-3 py-1"
            >
              View provenance
            </button>
          )}
          <div className={`transform transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}>
            <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          shouldShow ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mt-4">
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 bg-edge/50 animate-pulse rounded"></div>
              <div className="h-4 bg-edge/50 animate-pulse rounded"></div>
              <div className="h-3 bg-edge/50 animate-pulse rounded"></div>
            </div>
          ) : response ? (
            <div className="relative">
              {/* Vignette overlay for long responses */}
              {response.length > 500 && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-panel/60 rounded-lg z-10"></div>
              )}
              <div className="prose prose-invert max-w-none max-h-96 overflow-y-auto scroll-smooth">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h1 className="text-brandGold font-semibold text-xl mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-brandGold font-semibold text-lg mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-brandGold font-semibold text-base mb-2">{children}</h3>,
                    p: ({ children }) => <p className="text-[17px] leading-relaxed mb-4">{children}</p>,
                    blockquote: ({ children }) => (
                      <blockquote className="text-sm text-muted border-l-2 border-aiGreen/30 pl-3 mt-2">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="bg-panel/80 px-2 py-1 rounded text-xs font-mono text-brandGold">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-panel/80 p-4 rounded-lg overflow-x-auto text-xs font-mono">
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-[17px] leading-relaxed">{children}</li>,
                  }}
                >
                  {response}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-[17px] leading-relaxed text-muted">
                Submit a prompt above to see AI analysis
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
