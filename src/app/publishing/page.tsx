import { notFound } from 'next/navigation';
import { getMarkdownPage } from '@/lib/markdown';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarkdownPage('publishing');
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
  
  return {
    title: page.title,
    description: page.description || `Learn about ${page.title} at HISL`,
    keywords: page.frontmatter.keywords || [],
    openGraph: {
      title: page.title,
      description: page.description || `Learn about ${page.title} at HISL`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description || `Learn about ${page.title} at HISL`,
    },
  };
}

export default async function PublishingPage() {
  const page = await getMarkdownPage('publishing');
  
  if (!page) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-xl text-muted">
                {page.description}
              </p>
            )}
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.htmlContent }}
          />
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
