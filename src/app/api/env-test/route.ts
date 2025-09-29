import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test if environment variables are accessible
    const hasIntegAI = !!process.env.INTEGAI_API_KEY;
    const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
    const hasGemini = !!process.env.GEMINI_API_KEY;
    
    return NextResponse.json({
      success: true,
      message: "Environment test successful",
      keys: {
        INTEGAI_API_KEY: hasIntegAI ? "✓ Set" : "✗ Missing",
        ANTHROPIC_API_KEY: hasAnthropic ? "✓ Set" : "✗ Missing", 
        GEMINI_API_KEY: hasGemini ? "✓ Set" : "✗ Missing"
      },
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

