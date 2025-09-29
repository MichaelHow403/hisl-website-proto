import { NextRequest, NextResponse } from 'next/server';
import { addRequestLog, getRequestLogs } from '../integai-logs/route';

// Geo mapping for IP addresses to coordinates
const geoMapping: Record<string, { lat: number; lng: number; city: string; country: string }> = {
  'local': { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK' },
  '127.0.0.1': { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK' },
  '::1': { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK' },
  '::ffff:127.0.0.1': { lat: 51.5074, lng: -0.1278, city: 'London', country: 'UK' },
  // Add more mappings as needed
  'default': { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'US' }
};

function getGeoLocation(ip: string) {
  // Simple IP to geo mapping (in production, use a proper geolocation service)
  if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return geoMapping['local'];
  }
  
  // Check for specific IP patterns
  if (geoMapping[ip]) {
    return geoMapping[ip];
  }
  
  // Default to New York for unknown IPs
  return geoMapping['default'];
}

function getUserIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // In development, return local
  return 'local';
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const userIP = getUserIP(request);
  const logId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    const body = await request.json();
    const { prompt, metadata } = body;
    
    if (!prompt) {
      throw new Error('Prompt is required');
    }
    
    const apiKey = process.env.INTEGAI_API_KEY;
    if (!apiKey) {
      throw new Error('IntegAI API key not configured');
    }
    
    // Call IntegAI API
    const integaiResponse = await fetch('https://api.integai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'integai-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });
    
    if (!integaiResponse.ok) {
      throw new Error(`IntegAI API error: ${integaiResponse.status} ${integaiResponse.statusText}`);
    }
    
    const integaiData = await integaiResponse.json();
    const responseTime = Date.now() - startTime;
    
    // Log successful request
    const geoLocation = getGeoLocation(userIP);
    addRequestLog({
      id: logId,
      timestamp: new Date().toISOString(),
      userIP,
      endpoint: '/api/integai-proxy',
      responseTime,
      prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''), // Truncate for storage
      metadata: {
        ...metadata,
        geoLocation,
        model: integaiData.model,
        usage: integaiData.usage,
        energyUsage: integaiData.energyUsage || 0.24,
        waterUsage: integaiData.waterUsage || 0.26,
        co2e: integaiData.co2e || 0.03,
        responseLength: integaiData.responseLength || 0
      },
      success: true
    });
    
    return NextResponse.json({
      success: true,
      data: integaiData,
      logId
    });
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log failed request
    const geoLocation = getGeoLocation(userIP);
    addRequestLog({
      id: logId,
      timestamp: new Date().toISOString(),
      userIP,
      endpoint: '/api/integai-proxy',
      responseTime,
      prompt: 'Error occurred',
      metadata: {
        geoLocation,
        error: errorMessage
      },
      success: false,
      error: errorMessage
    });
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      logId
    }, { status: 500 });
  }
}
