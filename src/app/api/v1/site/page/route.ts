// /src/app/api/v1/site/page/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  try {
    // Load the content from the JSON file
    const contentPath = path.join(process.cwd(), 'content', 'pages', `${slug}.json`);
    
    if (!fs.existsSync(contentPath)) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error loading page content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}




