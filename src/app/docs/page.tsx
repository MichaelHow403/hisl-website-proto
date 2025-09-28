import { getAllMarkdownSlugs } from '@/lib/markdown';
import { generateSEOMetadata } from '@/lib/seo';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Documentation',
  description: 'Complete documentation for HISL platform, including guides, specifications, and technical details.',
  slug: 'docs',
  keywords: ['documentation', 'guides', 'HISL', 'IntegAI', 'technical specs', 'API docs'],
  section: 'Documentation'
}, {
  siteName: 'HISL',
  siteUrl: 'https://hisl.ai',
  defaultImage: '/optimized/hisl-logo-1200.webp',
  twitterHandle: '@HISL_AI',
  author: 'HISL Team'
});

// Docs markdown files with clean names for display
const docsFiles = [
  { label: "Master Text", href: "/master_text", description: "Core content and messaging" },
  { label: "Full Style Guide", href: "/full_style_guide_sept25_1", description: "Complete design system guidelines" },
  { label: "HISL Poem Lock Docs", href: "/HISL_Poem_Lock_docs_sept25", description: "Poem lock implementation details" },
  { label: "IntegAI Update", href: "/IntegAI_sept_update", description: "Latest IntegAI platform updates" },
  { label: "Imagery Spec & Gallery", href: "/IntegAI-HISL_Website-Imagery-Spec_and_Gallery_v1_0_2025-09-20", description: "Image specifications and gallery" },
  { label: "Build Specs & Templates", href: "/IntegAI_HISL_Website-Build_Specs-_-Templates_v1_0_2025-09-20_1", description: "Build specifications and templates" },
  { label: "Mermaid Style Guide", href: "/mermaid_style_guide_sept25", description: "Mermaid diagram styling guidelines" },
  { label: "Mermaid Wireframe", href: "/mermaid_wireframe_sept25", description: "Mermaid wireframe specifications" },
  { label: "Mermaid Wireframe (Alt)", href: "/mermaid_wireframe", description: "Alternative Mermaid wireframe" },
  { label: "Publishing Guide", href: "/publishing_sept25", description: "Content publishing guidelines" },
  { label: "Publishing (Alt)", href: "/publishing", description: "Alternative publishing guide" },
  { label: "README", href: "/README_sept25", description: "Project overview and setup" },
  { label: "Storage Solutions", href: "/Storage_solutions_sept25", description: "Storage architecture and solutions" },
  { label: "Website Guide", href: "/website_sept25", description: "Website development guide" },
  { label: "Workflow Guide", href: "/workflow_sept25", description: "Development workflow documentation" }
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              Documentation
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Complete documentation for the HISL platform, including guides, specifications, 
              and technical details to help you understand and implement our solutions.
            </p>
          </div>

          {/* Quick Access */}
          <div className="mb-12">
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/sectors"
                className="p-6 bg-panel border border-edge rounded-lg hover:border-brandGold transition-colors group"
              >
                <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-brandGold transition-colors">
                  Sectors
                </h3>
                <p className="text-muted text-sm">
                  Explore AI solutions across different industry sectors
                </p>
              </Link>
              
              <Link
                href="/agents"
                className="p-6 bg-panel border border-edge rounded-lg hover:border-brandGold transition-colors group"
              >
                <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-brandGold transition-colors">
                  Agents
                </h3>
                <p className="text-muted text-sm">
                  Learn about our 9-core agent graph architecture
                </p>
              </Link>
              
              <Link
                href="/master_text"
                className="p-6 bg-panel border border-edge rounded-lg hover:border-brandGold transition-colors group"
              >
                <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-brandGold transition-colors">
                  Master Text
                </h3>
                <p className="text-muted text-sm">
                  Core content and messaging documentation
                </p>
              </Link>
            </div>
          </div>

          {/* All Documentation */}
          <div>
            <h2 className="text-2xl font-spectral font-semibold text-brandGold mb-6">
              All Documentation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docsFiles.map((doc) => (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="p-6 bg-panel border border-edge rounded-lg hover:border-brandGold transition-colors group"
                >
                  <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-brandGold transition-colors">
                    {doc.label}
                  </h3>
                  <p className="text-muted text-sm">
                    {doc.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
