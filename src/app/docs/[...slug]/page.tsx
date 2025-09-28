import { notFound } from 'next/navigation';
import { getMarkdownPage, getAllMarkdownSlugs } from '@/lib/markdown';
import { generateSEOMetadata, extractSEOFromFrontmatter, generateStructuredData } from '@/lib/seo';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string[];
  };
}

// Generate static params for all markdown files
export async function generateStaticParams() {
  const slugs = getAllMarkdownSlugs();
  
  return slugs.map((slug) => ({
    slug: [slug],
  }));
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.join('/');
  const page = await getMarkdownPage(slug);
  
  if (!page) {
    return {
      title: 'Page Not Found | HISL',
      description: 'The requested page could not be found.',
    };
  }
  
  // Extract SEO data from frontmatter
  const seoData = extractSEOFromFrontmatter(page.frontmatter, slug);
  
  // Generate comprehensive SEO metadata
  return generateSEOMetadata(seoData, {
    siteName: 'HISL',
    siteUrl: 'https://hisl.ai',
    defaultImage: '/optimized/hisl-logo-1200.webp',
    twitterHandle: '@HISL_AI',
    author: 'HISL Team'
  });
}

export default async function DocsPage({ params }: PageProps) {
  const slug = params.slug.join('/');
  const page = await getMarkdownPage(slug);
  
  if (!page) {
    notFound();
  }
  
  // Generate structured data for SEO
  const seoData = extractSEOFromFrontmatter(page.frontmatter, slug);
  const structuredData = generateStructuredData(seoData, {
    siteName: 'HISL',
    siteUrl: 'https://hisl.ai',
    defaultImage: '/optimized/hisl-logo-1200.webp',
    twitterHandle: '@HISL_AI',
    author: 'HISL Team'
  });
  
  return (
    <main className="min-h-screen bg-bg text-text">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
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
