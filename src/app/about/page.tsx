import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import { generateSEOMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'About HISL',
  description: 'Learn about HISL AI - sovereign AI built to amplify human capability, cut waste, and respect compliance and sustainability.',
  slug: 'about',
  keywords: ['about HISL', 'AI company', 'sovereign AI', 'human-AI collaboration', 'compliance', 'sustainability'],
  section: 'About'
}, {
  siteName: 'HISL',
  siteUrl: 'https://hisl.ai',
  defaultImage: '/optimized/hisl-logo-1200.webp',
  twitterHandle: '@HISL_AI',
  author: 'HISL Team'
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              About HISL
            </h1>
            <p className="text-xl text-muted">
              Sovereign AI built to amplify human capability, cut waste, and respect compliance and sustainability.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <h2>Our Mission</h2>
            <p>
              HISL is pioneering the next generation of AI that works alongside humans, not against them. 
              We believe in sovereign AI systems that respect data privacy, environmental sustainability, 
              and regulatory compliance while delivering exceptional performance.
            </p>
            
            <h2>Core Principles</h2>
            <ul>
              <li><strong>Human-AI Collaboration:</strong> AI that amplifies human capability rather than replacing it</li>
              <li><strong>Data Sovereignty:</strong> Your data stays under your control</li>
              <li><strong>Sustainability:</strong> Environmentally conscious AI development and deployment</li>
              <li><strong>Compliance:</strong> Built-in adherence to industry regulations and standards</li>
              <li><strong>Transparency:</strong> Clear, explainable AI decision-making processes</li>
            </ul>
            
            <h2>Our Technology</h2>
            <p>
              HISL's 9-core agent graph provides a comprehensive framework for AI systems that can:
            </p>
            <ul>
              <li><strong>Plan</strong> complex tasks and workflows</li>
              <li><strong>Retrieve</strong> relevant information efficiently</li>
              <li><strong>Judge</strong> and evaluate options objectively</li>
              <li><strong>Execute</strong> tasks with precision and reliability</li>
              <li><strong>Remember</strong> context and learn from experience</li>
              <li><strong>Ensure Safety</strong> through built-in safeguards</li>
              <li><strong>Utilize Tools</strong> and integrate with existing systems</li>
              <li><strong>Observe</strong> and monitor performance continuously</li>
              <li><strong>Publish</strong> results and insights transparently</li>
            </ul>
            
            <h2>Industry Applications</h2>
            <p>
              Our AI solutions are tailored for specific sectors including:
            </p>
            <ul>
              <li><strong>Construction:</strong> Project management, safety monitoring, and resource optimization</li>
              <li><strong>Pharmaceuticals:</strong> Drug discovery, regulatory compliance, and quality assurance</li>
              <li><strong>Environmental:</strong> Climate monitoring, sustainability tracking, and green technology</li>
              <li><strong>Finance:</strong> Risk assessment, fraud detection, and regulatory reporting</li>
              <li><strong>Healthcare:</strong> Patient care optimization, diagnostic assistance, and treatment planning</li>
            </ul>
            
            <h2>Get Started</h2>
            <p>
              Ready to experience the future of AI? Explore our <a href="/agents">agent technology</a>, 
              discover <a href="/sectors">sector-specific solutions</a>, or learn more about our 
              <a href="/about/integai">platform capabilities</a>.
            </p>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
