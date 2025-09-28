import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import { generateSEOMetadata } from '@/lib/seo';
import { fetchSafe } from '@/lib/http/fetchSafe';
import { loadMarkdown } from '@/lib/markdown/loadMarkdown';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'HISL News',
  description: 'Stay updated with the latest news, announcements, and insights from HISL AI.',
  slug: 'news',
  keywords: ['HISL news', 'AI news', 'technology updates', 'company announcements', 'industry insights'],
  section: 'News'
}, {
  siteName: 'HISL',
  siteUrl: 'https://hisl.ai',
  defaultImage: '/optimized/hisl-logo-1200.webp',
  twitterHandle: '@HISL_AI',
  author: 'HISL Team'
});

interface NewsItem {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  summary: string;
}

interface NewsResponse {
  success: boolean;
  data?: NewsItem[];
  error?: string;
  fallback?: boolean;
  meta?: {
    topic: string;
    limit: number;
    count: number;
    timestamp: string;
  };
}

// Curated fallback news items
const curatedNewsItems: NewsItem[] = [
  {
    id: 'hisl-website-launch',
    title: 'HISL Website Launch',
    url: '/',
    publishedAt: new Date().toISOString(),
    source: 'HISL',
    summary: 'We\'re excited to announce the launch of our new website featuring comprehensive documentation, interactive demos, and detailed information about our AI solutions.'
  },
  {
    id: 'deepseek-integration',
    title: 'DeepSeek Integration Live',
    url: '/globe',
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    source: 'HISL',
    summary: 'Our new DeepSeek API integration is now live, providing real-time AI capabilities with global activity visualization on our interactive globe.'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization Complete',
    url: '/docs',
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    source: 'HISL',
    summary: 'We\'ve implemented comprehensive performance optimizations including image processing, Lighthouse CI integration, and enhanced SEO capabilities.'
  }
];

async function fetchNews(): Promise<{ response: NewsResponse; isLive: boolean }> {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
  
  // Try to fetch from Grok API with safe fetch
  const result = await fetchSafe(
    `${baseUrl}/api/news/grok?q=AI technology artificial intelligence&limit=10`,
    {
      method: 'GET',
    },
    {
      timeoutMs: 5000,
      retries: 1,
      backoffMs: 1000
    }
  );

  if (result.ok && result.json) {
    return {
      response: result.json,
      isLive: true
    };
  }

  // If Grok fails, try to load from news.md
  const newsMarkdown = await loadMarkdown('docs/news.md');
  if (newsMarkdown) {
    // Parse markdown content into news items (simple implementation)
    const lines = newsMarkdown.content.split('\n').filter(line => line.trim());
    const markdownItems: NewsItem[] = lines
      .filter(line => line.startsWith('## '))
      .map((line, index) => ({
        id: `markdown-${index}`,
        title: line.replace('## ', ''),
        url: '/news',
        publishedAt: new Date().toISOString(),
        source: 'HISL Documentation',
        summary: 'Content from our documentation'
      }));

    if (markdownItems.length > 0) {
      return {
        response: {
          success: true,
          data: markdownItems,
          fallback: true,
          meta: {
            topic: 'HISL Documentation',
            limit: 10,
            count: markdownItems.length,
            timestamp: new Date().toISOString()
          }
        },
        isLive: false
      };
    }
  }

  // Final fallback to curated items
  return {
    response: {
      success: true,
      data: curatedNewsItems,
      fallback: true,
      meta: {
        topic: 'HISL Updates',
        limit: 10,
        count: curatedNewsItems.length,
        timestamp: new Date().toISOString()
      }
    },
    isLive: false
  };
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}

export default async function NewsPage() {
  const { response: newsResponse, isLive } = await fetchNews();
  const hasNews = newsResponse.success && newsResponse.data && newsResponse.data.length > 0;

  // Log development tip if Grok key is missing
  if (process.env.NODE_ENV === 'development' && !process.env.GROK_API_KEY) {
    console.warn('💡 Tip: Add GROK_API_KEY to .env.local to enable live news feed');
  }

  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              HISL News
            </h1>
            <p className="text-xl text-muted">
              Stay updated with the latest news, announcements, and insights from HISL AI.
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="flex items-center justify-between mb-6">
              <h2>News Feed</h2>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isLive 
                    ? 'bg-aiGreen/20 text-aiGreen border border-aiGreen/30' 
                    : 'bg-muted/20 text-muted border border-muted/30'
                }`}>
                  {isLive ? 'Live (Grok)' : 'Offline (fallback)'}
                </div>
                {newsResponse.meta?.count && (
                  <span className="text-sm text-muted">
                    {newsResponse.meta.count} articles
                  </span>
                )}
              </div>
            </div>
            
            {hasNews ? (
              <div className="mb-8">
                <div className="space-y-4">
                  {newsResponse.data?.map((item) => (
                    <article key={item.id} className="bg-panel border border-edge rounded-lg p-6 hover:border-aiGreen/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-text mb-2">
                            <a 
                              href={item.url} 
                              target={item.url.startsWith('http') ? '_blank' : '_self'}
                              rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="hover:text-aiGreen transition-colors"
                            >
                              {item.title}
                            </a>
                          </h3>
                          <p className="text-muted text-sm mb-3">{item.summary}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted">
                        <span className="font-medium">{item.source}</span>
                        <span>{formatTimeAgo(item.publishedAt)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-panel border border-edge rounded-lg p-6 mb-8">
                <div className="text-center">
                  <div className="text-muted mb-4">
                    <svg className="w-12 h-12 mx-auto mb-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-spectral font-bold text-text mb-2">
                    No news available
                  </h3>
                  <p className="text-muted mb-4">
                    We're working on bringing you the latest updates. Check back soon!
                  </p>
                </div>
              </div>
            )}
            
            <h2>Recent Updates</h2>
            <div className="space-y-6">
              <article className="bg-panel border border-edge rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-muted">September 2024</span>
                  <span className="ml-4 px-2 py-1 bg-aiGreen/20 text-aiGreen text-xs rounded">Update</span>
                </div>
                <h3 className="text-xl font-spectral font-bold text-text mb-2">
                  HISL Website Launch
                </h3>
                <p className="text-muted">
                  We're excited to announce the launch of our new website featuring comprehensive 
                  documentation, interactive demos, and detailed information about our AI solutions.
                </p>
              </article>
              
              <article className="bg-panel border border-edge rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-muted">September 2024</span>
                  <span className="ml-4 px-2 py-1 bg-brandGold/20 text-brandGold text-xs rounded">Feature</span>
                </div>
                <h3 className="text-xl font-spectral font-bold text-text mb-2">
                  DeepSeek Integration
                </h3>
                <p className="text-muted">
                  Our new DeepSeek API integration is now live, providing real-time AI capabilities 
                  with global activity visualization on our interactive globe.
                </p>
              </article>
              
              <article className="bg-panel border border-edge rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-muted">September 2024</span>
                  <span className="ml-4 px-2 py-1 bg-focus/20 text-focus text-xs rounded">Technical</span>
                </div>
                <h3 className="text-xl font-spectral font-bold text-text mb-2">
                  Performance Optimization
                </h3>
                <p className="text-muted">
                  We've implemented comprehensive performance optimizations including image processing, 
                  Lighthouse CI integration, and enhanced SEO capabilities.
                </p>
              </article>
            </div>
            
            <h2>Stay Connected</h2>
            <p>
              Want to stay updated with the latest from HISL? Here are a few ways to connect:
            </p>
            <ul>
              <li><strong>Documentation:</strong> Explore our <a href="/docs">comprehensive docs</a> for technical details</li>
              <li><strong>Technology:</strong> Learn about our <a href="/agents">AI agents</a> and <a href="/sectors">sector solutions</a></li>
              <li><strong>Interactive Demo:</strong> Try our <a href="/globe">global activity visualization</a></li>
              <li><strong>Contact:</strong> Reach out through our <a href="/contact">contact page</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
