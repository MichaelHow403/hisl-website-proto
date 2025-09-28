import { NextRequest, NextResponse } from 'next/server';

interface AIResponse {
  content: string;
  tokens: number;
  model: string;
  provider: string;
  energyUsage: number;
  responseTime: number;
}

async function callDeepSeek(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DeepSeek API key not configured');
  }

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const tokens = data.usage?.total_tokens || 0;
  
  return {
    content: data.choices[0]?.message?.content || '',
    tokens,
    model: data.model || 'deepseek-chat',
    provider: 'DeepSeek',
    energyUsage: 0.3 + (tokens * 0.001), // Base 0.3 Wh + 0.001 Wh per token
    responseTime: 0 // Will be set by caller
  };
}

async function callAnthropic(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Anthropic API key not configured');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const tokens = (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);
  
  return {
    content: data.content[0]?.text || '',
    tokens,
    model: data.model || 'claude-3-sonnet',
    provider: 'Claude',
    energyUsage: 0.3 + (tokens * 0.001),
    responseTime: 0
  };
}

async function callGemini(prompt: string): Promise<AIResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not configured');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const tokens = data.usageMetadata?.totalTokenCount || 0;
  
  return {
    content: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
    tokens,
    model: 'gemini-pro',
    provider: 'Gemini',
    energyUsage: 0.3 + (tokens * 0.001),
    responseTime: 0
  };
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json({
        success: false,
        error: 'Prompt is required'
      }, { status: 400 });
    }

    let response: AIResponse | null = null;
    let lastError: Error | null = null;

    // Try providers in order: DeepSeek → Anthropic → Gemini
    const providers = [
      { name: 'DeepSeek', fn: callDeepSeek },
      { name: 'Anthropic', fn: callAnthropic },
      { name: 'Gemini', fn: callGemini }
    ];

    for (const provider of providers) {
      try {
        response = await provider.fn(prompt);
        response.responseTime = Date.now() - startTime;
        break;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        console.warn(`${provider.name} failed:`, lastError.message);
        continue;
      }
    }

    if (!response) {
      return NextResponse.json({
        success: false,
        error: lastError?.message || 'All AI providers failed'
      }, { status: 500 });
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

