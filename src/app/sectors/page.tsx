import { getMarkdownPage } from '@/lib/markdown';
import { generateSEOMetadata, extractSEOFromFrontmatter } from '@/lib/seo';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Sectors',
  description: 'Explore HISL AI solutions across different sectors including construction, pharma, environmental, and more.',
  slug: 'sectors',
  keywords: ['AI sectors', 'construction AI', 'pharma AI', 'environmental AI', 'compliance', 'sustainability'],
  section: 'Solutions'
}, {
  siteName: 'HISL',
  siteUrl: 'https://hisl.ai',
  defaultImage: '/optimized/hisl-logo-1200.webp',
  twitterHandle: '@HISL_AI',
  author: 'HISL Team'
});

export default async function SectorsPage() {
  // Try to get the master_text page which contains sector information
  const page = await getMarkdownPage('master_text');
  
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              Sectors
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              HISL delivers sovereign AI solutions across multiple sectors, tailored to specific industry needs and compliance requirements.
            </p>
          </div>
          
          {/* Sectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Construction',
                description: 'EHS, Project Management, BIM/Design agents for site safety, scheduling, and blueprint analysis.',
                icon: '🏗️'
              },
              {
                title: 'Environmental',
                description: 'ESG and Sustainability agents for emissions tracking, biodiversity monitoring, and lifecycle analysis.',
                icon: '🌱'
              },
              {
                title: 'Conservation / SPAB',
                description: 'Heritage Preservation and Planning Approvals agents for restoration and permit workflows.',
                icon: '🏛️'
              },
              {
                title: 'Pharma (CROx)',
                description: 'QA and Clinical R&D Orchestrator agents for GMP compliance, audit preparation, and protocol co-pilot.',
                icon: '🧬'
              },
              {
                title: 'Public Procurement',
                description: 'Procurement and Anti-Corruption agents for tender evaluation, compliance, and transparency.',
                icon: '📋'
              },
              {
                title: 'Agriculture',
                description: 'Crop Monitoring and Agri-Supply agents for soil monitoring, yield optimization, and logistics.',
                icon: '🌾'
              },
              {
                title: 'Trader / Economics',
                description: 'Market Signals and Risk & Portfolio agents for market aggregation and hedging strategies.',
                icon: '📈'
              },
              {
                title: 'Healthcare / Pet Care',
                description: 'Clinical Workflow and Pet Care agents for health notes, triage, and treatment planning.',
                icon: '🏥'
              },
              {
                title: 'Insurance',
                description: 'Ops and Fraud Detection agents for claims processing, policy administration, and anomaly detection.',
                icon: '🛡️'
              },
              {
                title: 'Custom',
                description: 'Bespoke orchestration and sector-specific customization with callback learning capabilities.',
                icon: '⚙️'
              }
            ].map((sector) => (
              <div key={sector.title} className="p-6 bg-panel border border-edge rounded-lg hover:border-brandGold transition-colors">
                <div className="text-3xl mb-4">{sector.icon}</div>
                <h3 className="text-xl font-semibold text-text mb-3">{sector.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{sector.description}</p>
              </div>
            ))}
          </div>
          
          {/* Additional Content from master_text if available */}
          {page && (
            <div className="mt-12">
              <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
                Technical Overview
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