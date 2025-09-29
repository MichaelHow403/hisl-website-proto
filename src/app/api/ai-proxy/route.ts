import { NextRequest, NextResponse } from 'next/server';

interface AIProvider {
  name: string;
  endpoint: string;
  headers: Record<string, string>;
  body: (prompt: string) => any;
  parseResponse: (data: any) => { content: string; tokens: number; model: string };
}

const providers: AIProvider[] = [
  // IntegAI (Primary)
  {
    name: 'IntegAI',
    endpoint: 'https://api.integai.com/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${process.env.INTEGAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: (prompt: string) => ({
      model: 'integai-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
      stream: false
    }),
    parseResponse: (data: any) => ({
      content: data.choices[0]?.message?.content || '',
      tokens: data.usage?.total_tokens || 0,
      model: data.model || 'integai-chat'
    })
  },
  // Anthropic Claude (Fallback 1)
  {
    name: 'Claude',
    endpoint: 'https://api.anthropic.com/v1/messages',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: (prompt: string) => ({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    }),
    parseResponse: (data: any) => ({
      content: data.content[0]?.text || '',
      tokens: data.usage?.input_tokens + data.usage?.output_tokens || 0,
      model: data.model || 'claude-3-sonnet'
    })
  },
  // Google Gemini (Fallback 2)
  {
    name: 'Gemini',
    endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: (prompt: string) => ({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    }),
    parseResponse: (data: any) => ({
      content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      tokens: data.usageMetadata?.totalTokenCount || 0,
      model: 'gemini-pro'
    })
  }
];

function calculateEnergyUsage(tokens: number): number {
  // Rough estimation: ~0.3 Wh per query base + 0.001 Wh per token
  return 0.3 + (tokens * 0.001);
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    let lastError: Error | null = null;
    let response: any = null;
    let providerUsed = '';

    // Try each provider in order
    for (const provider of providers) {
      try {
        // Skip providers without API keys
        if (provider.name === 'Claude' && !process.env.ANTHROPIC_API_KEY) continue;
        if (provider.name === 'Gemini' && !process.env.GEMINI_API_KEY) continue;
        if (provider.name === 'IntegAI' && !process.env.INTEGAI_API_KEY) continue;

        const apiResponse = await fetch(provider.endpoint, {
          method: 'POST',
          headers: provider.headers,
          body: JSON.stringify(provider.body(prompt))
        });

        if (!apiResponse.ok) {
          throw new Error(`${provider.name} API error: ${apiResponse.status} ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();
        const parsed = provider.parseResponse(data);
        
        response = {
          content: parsed.content,
          tokens: parsed.tokens,
          model: parsed.model,
          provider: provider.name,
          energyUsage: calculateEnergyUsage(parsed.tokens),
          responseTime: Date.now() - startTime
        };
        
        providerUsed = provider.name;
        break;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`${provider.name} failed:`, lastError.message);
        continue;
      }
    }

    if (!response) {
      throw lastError || new Error('All AI providers failed');
    }

    return NextResponse.json({
      success: true,
      data: response
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
