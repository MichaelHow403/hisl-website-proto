import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const keys = {
    deepseek: !!process.env.DEEPSEEK_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY
  };

  const availableProviders = Object.entries(keys)
    .filter(([_, available]) => available)
    .map(([provider, _]) => provider);

  return NextResponse.json({
    success: true,
    keys,
    availableProviders,
    message: `Found ${availableProviders.length} configured AI providers: ${availableProviders.join(', ')}`
  });
}
