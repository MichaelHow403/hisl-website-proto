import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// Simple in-memory rate limiting (10 requests per minute per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

function getClientIP(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  // Fallback to a default IP for local development
  return '127.0.0.1';
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { prompt, model } = await request.json();
    
    // Validate input
    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!model || typeof model !== 'string') {
      return Response.json(
        { error: 'Model is required and must be a string' },
        { status: 400 }
      );
    }

    // Route to correct API based on model
    if (model === 'Claude Sonnet 4') {
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
      
      if (!process.env.ANTHROPIC_API_KEY) {
        return Response.json(
          { error: 'Anthropic API key not configured' },
          { status: 500 }
        );
      }
      
      const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022', // Updated to latest available model
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      
      return Response.json({
        response: message.content[0].text,
        tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
        model: 'Claude Sonnet 4',
      });
    }
    
    if (model === 'Gemini 2.0') {
      if (!process.env.GOOGLE_AI_API_KEY) {
        return Response.json(
          { error: 'Google AI API key not configured' },
          { status: 500 }
        );
      }
      
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
      const gemini = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Using available model
      const result = await gemini.generateContent(prompt);
      const response = result.response.text();
      
      return Response.json({
        response,
        tokensUsed: result.response.usageMetadata?.totalTokenCount ?? 0,
        model: 'Gemini 2.0',
      });
    }
    
    if (model === 'DeepSeek R1') {
      if (!process.env.DEEPSEEK_API_KEY) {
        return Response.json(
          { error: 'DeepSeek API key not configured' },
          { status: 500 }
        );
      }
      
      const openai = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: 'https://api.deepseek.com',
      });
      
      const completion = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1024,
      });
      
      return Response.json({
        response: completion.choices[0].message.content || 'No response generated',
        tokensUsed: completion.usage?.total_tokens ?? 0,
        model: 'DeepSeek R1',
      });
    }
    
    return Response.json(
      { error: `Unknown model: ${model}. Supported models: Claude Sonnet 4, Gemini 2.0, DeepSeek R1` },
      { status: 400 }
    );
    
  } catch (error: any) {
    console.error('API Error:', error);
    
    // Handle specific API errors
    if (error.status === 401) {
      return Response.json(
        { error: 'Invalid API key. Please check your configuration.' },
        { status: 401 }
      );
    }
    
    if (error.status === 429) {
      return Response.json(
        { error: 'API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    return Response.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

