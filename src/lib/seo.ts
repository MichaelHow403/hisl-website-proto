import type { Metadata } from 'next';

export interface SEOData {
  title: string;
  description: string;
  slug: string;
  image?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultImage: string;
  twitterHandle?: string;
  author?: string;
}

const defaultConfig: SEOConfig = {
  siteName: 'HISL',
  siteUrl: 'https://hisl.ai',
  defaultImage: '/optimized/hisl-logo-1200.webp',
  twitterHandle: '@HISL_AI',
  author: 'HISL Team'
};

/**
 * Generate comprehensive SEO metadata from frontmatter data
 */
export function generateSEOMetadata(
  seoData: SEOData,
  config: Partial<SEOConfig> = {}
): Metadata {
  const finalConfig = { ...defaultConfig, ...config };
  
  // Clean and format title
  const title = seoData.title || 'HISL';
  const fullTitle = title.includes('HISL') ? title : `${title} | HISL`;
  
  // Clean description
  const description = seoData.description || 
    'Experience sovereign AI built to amplify human capability, cut waste, and respect compliance and sustainability.';
  
  // Generate canonical URL
  const canonicalUrl = `${finalConfig.siteUrl}/${seoData.slug}`;
  
  // Use provided image or fallback to default
  const imageUrl = seoData.image 
    ? seoData.image.startsWith('http') 
      ? seoData.image 
      : `${finalConfig.siteUrl}${seoData.image}`
    : `${finalConfig.siteUrl}${finalConfig.defaultImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: seoData.keywords || [
      'AI',
      'artificial intelligence',
      'sovereign AI',
      'compliance',
      'sustainability',
      'HISL',
      'IntegAI',
      'agents',
      'automation'
    ],
    authors: [{ name: seoData.author || finalConfig.author }],
    creator: seoData.author || finalConfig.author,
    publisher: finalConfig.siteName,
    
    // Open Graph
    openGraph: {
      type: 'article',
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: finalConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: 'en_US',
      ...(seoData.publishedTime && { publishedTime: seoData.publishedTime }),
      ...(seoData.modifiedTime && { modifiedTime: seoData.modifiedTime }),
      ...(seoData.section && { section: seoData.section }),
      ...(seoData.tags && { tags: seoData.tags }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: finalConfig.twitterHandle,
      images: [imageUrl],
    },
    
    // Additional meta tags
    alternates: {
      canonical: canonicalUrl,
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Verification (add your verification codes here)
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  };

  return metadata;
}

/**
 * Generate structured data (JSON-LD) for better SEO
 */
export function generateStructuredData(seoData: SEOData, config: Partial<SEOConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  const canonicalUrl = `${finalConfig.siteUrl}/${seoData.slug}`;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoData.title,
    description: seoData.description,
    url: canonicalUrl,
    datePublished: seoData.publishedTime || new Date().toISOString(),
    dateModified: seoData.modifiedTime || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: seoData.author || finalConfig.author,
      url: finalConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: finalConfig.siteName,
      url: finalConfig.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${finalConfig.siteUrl}${finalConfig.defaultImage}`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    ...(seoData.image && {
      image: {
        '@type': 'ImageObject',
        url: seoData.image.startsWith('http') 
          ? seoData.image 
          : `${finalConfig.siteUrl}${seoData.image}`,
      },
    }),
    ...(seoData.keywords && {
      keywords: seoData.keywords.join(', '),
    }),
    ...(seoData.section && {
      articleSection: seoData.section,
    }),
  };

  return structuredData;
}

/**
 * Helper to extract SEO data from markdown frontmatter
 */
export function extractSEOFromFrontmatter(frontmatter: any, slug: string): SEOData {
  return {
    title: frontmatter.title || frontmatter.headline || '',
    description: frontmatter.description || frontmatter.summary || '',
    slug: frontmatter.slug || slug,
    image: frontmatter.image || frontmatter.og_image || frontmatter.cover_image,
    keywords: frontmatter.keywords || frontmatter.tags || [],
    author: frontmatter.author || frontmatter.writer,
    publishedTime: frontmatter.date || frontmatter.published || frontmatter.created,
    modifiedTime: frontmatter.updated || frontmatter.modified,
    section: frontmatter.section || frontmatter.category,
    tags: frontmatter.tags || frontmatter.categories || [],
  };
}

/**
 * Generate sitemap data for dynamic routes
 */
export function generateSitemapEntry(seoData: SEOData, config: Partial<SEOConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };
  const lastmod = seoData.modifiedTime || seoData.publishedTime || new Date().toISOString();
  
  return {
    url: `${finalConfig.siteUrl}/${seoData.slug}`,
    lastmod,
    changefreq: 'weekly' as const,
    priority: 0.8,
  };
}
