import { getMarkdownPage } from '@/lib/markdown';
import { generateSEOMetadata, extractSEOFromFrontmatter } from '@/lib/seo';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Agents',
  description: 'Discover HISL\'s 9-core agent graph: Planner, Retriever, Judge, Executor, Memory, Safety, Tools, Observer, and Publisher.',
  slug: 'agents',
  keywords: ['AI agents', 'agent graph', 'Planner', 'Retriever', 'Judge', 'Executor', 'Memory', 'Safety', 'Tools', 'Observer', 'Publisher'],
  section: 'Technology'
}, {
  siteName: 'HISL',
  siteUrl: 'https://hisl.ai',
  defaultImage: '/optimized/hisl-logo-1200.webp',
  twitterHandle: '@HISL_AI',
  author: 'HISL Team'
});

export default async function AgentsPage() {
  // Try to get the master_text page which contains agent information
  const page = await getMarkdownPage('master_text');
  
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              Agents
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              HISL's 9-core agent graph orchestrates sovereign AI with precision, safety, and human oversight.
            </p>
          </div>
          
          {/* Core Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: 'Planner',
                description: 'Decomposes requests and maintains plan DAG with retries and timeouts.',
                icon: '📋'
              },
              {
                name: 'Retriever',
                description: 'Hybrid retrieval via Chroma + Neo4j with MMR/top-k and freshness filters.',
                icon: '🔍'
              },
              {
                name: 'Judge',
                description: 'Verifies groundedness and routes to Safety on risk detection.',
                icon: '⚖️'
              },
              {
                name: 'Executor',
                description: 'Tool use and function-calling with back-pressure awareness.',
                icon: '⚡'
              },
              {
                name: 'Memory',
                description: 'Ephemeral and durable memory with redaction rules.',
                icon: '🧠'
              },
              {
                name: 'Safety',
                description: 'LlamaGuard2, prompt-injection checks, and policy gates.',
                icon: '🛡️'
              },
              {
                name: 'Tools',
                description: 'Local connectors for file IO, search, and vector queries.',
                icon: '🔧'
              },
              {
                name: 'Observer',
                description: 'Emits OTel traces and Langfuse spans for observability.',
                icon: '👁️'
              },
              {
                name: 'Publisher',
                description: 'Writes artifacts to .integpkg/MinIO with provenance.',
                icon: '📤'
              }
            ].map((agent) => (
              <div key={agent.name} className="p-6 bg-panel border border-edge rounded-lg hover:border-brandGold transition-colors">
                <div className="text-3xl mb-4">{agent.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-3">{agent.name}</h3>
                <p className="text-muted text-sm leading-relaxed">{agent.description}</p>
              </div>
            ))}
          </div>
          
          {/* Agent Architecture Diagram */}
          <div className="mb-12 p-8 bg-panel border border-edge rounded-lg">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6 text-center">
              Agent Orchestration Flow
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <div className="px-4 py-2 bg-brandGold/10 border border-brandGold rounded">Request</div>
              <div className="text-muted">→</div>
              <div className="px-4 py-2 bg-panel border border-edge rounded">Planner</div>
              <div className="text-muted">→</div>
              <div className="px-4 py-2 bg-panel border border-edge rounded">Retriever</div>
              <div className="text-muted">→</div>
              <div className="px-4 py-2 bg-panel border border-edge rounded">Judge</div>
              <div className="text-muted">→</div>
              <div className="px-4 py-2 bg-panel border border-edge rounded">Executor</div>
              <div className="text-muted">→</div>
              <div className="px-4 py-2 bg-brandGold/10 border border-brandGold rounded">Response</div>
            </div>
            <div className="mt-4 text-center text-sm text-muted">
              <div>Memory, Safety, Tools, Observer, and Publisher support the entire flow</div>
            </div>
          </div>
          
          {/* Additional Content from master_text if available */}
          {page && (
            <div className="mt-12">
              <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
                Technical Details
              </h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: page.htmlContent }}
              />
            </div>
          )}
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}