import { NextRequest, NextResponse } from 'next/server';

interface GrokNewsItem {
  id: string;
  title: string;
  url: string;
  publishedAt: string;
  source: string;
  summary: string;
}

interface GrokApiResponse {
  news: Array<{
    id: string;
    title: string;
    url: string;
    published_at: string;
    source: {
      name: string;
    };
    summary?: string;
  }>;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get('q') || 'AI technology artificial intelligence';
    const limit = parseInt(searchParams.get('limit') || '10');

    const grokApiKey = process.env.GROK_API_KEY;
    
    if (!grokApiKey) {
      // Log warning only once in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('GROK_API_KEY is not configured. News feed will show fallback content.');
        console.warn('To enable live news feed, add GROK_API_KEY to your .env.local file');
        console.warn('Get your API key from: https://console.x.ai/');
      }
      
      return NextResponse.json({
        success: false,
        error: 'GROK_API_KEY not configured',
        fallback: true,
        message: 'News service temporarily unavailable'
      }, { 
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    // Call Grok News API
    const grokResponse = await fetch('https://api.x.ai/v1/news/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: topic,
        limit: Math.min(limit, 50), // Cap at 50 for safety
        sort_by: 'relevance',
        time_filter: 'week' // Last week's news
      }),
    });

    if (!grokResponse.ok) {
      const errorData = await grokResponse.json().catch(() => ({}));
      console.error('Grok API error:', grokResponse.status, errorData);
      
      return NextResponse.json({
        success: false,
        error: `Grok API error: ${grokResponse.status}`,
        fallback: true,
        message: 'News service temporarily unavailable'
      }, { 
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }

    const data: GrokApiResponse = await grokResponse.json();
    
    // Normalize the response
    const normalizedNews: GrokNewsItem[] = data.news?.map((item) => ({
      id: item.id || `grok-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
      title: item.title || 'Untitled',
      url: item.url || '#',
      publishedAt: item.published_at || new Date().toISOString(),
      source: item.source?.name || 'Unknown Source',
      summary: item.summary || item.title || 'No summary available'
    })) || [];

    return NextResponse.json({
      success: true,
      data: normalizedNews,
      meta: {
        topic,
        limit,
        count: normalizedNews.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('News API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      fallback: true,
      message: 'News service temporarily unavailable'
    }, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}
