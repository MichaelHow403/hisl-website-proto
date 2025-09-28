#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(process.cwd(), 'docs');
const appDir = path.join(process.cwd(), 'src/app');

// Get all markdown files
function getAllMarkdownFiles() {
  if (!fs.existsSync(docsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(docsDir);
  return files.filter(file => file.endsWith('.md'));
}

// Create a route file for each markdown file
function createRouteFile(filename) {
  const slug = filename.replace(/\.md$/, '');
  // Clean slug for URL safety
  const cleanSlug = slug
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  
  const routeDir = path.join(appDir, cleanSlug);
  const pageFile = path.join(routeDir, 'page.tsx');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  // Create the page component
  const pageContent = `import { notFound } from 'next/navigation';
import { getMarkdownPage } from '@/lib/markdown';
import GlobalHeader from '@/components/sections/GlobalHeader';
import GlobalFooter from '@/components/sections/GlobalFooter';
import type { Metadata } from 'next';

// Generate metadata for this page
export async function generateMetadata(): Promise<Metadata> {
  const page = await getMarkdownPage('${slug}');
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
  
  return {
    title: page.title,
    description: page.description || \`Learn about \${page.title} at HISL\`,
    keywords: page.frontmatter.keywords || [],
    openGraph: {
      title: page.title,
      description: page.description || \`Learn about \${page.title} at HISL\`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description || \`Learn about \${page.title} at HISL\`,
    },
  };
}

export default async function ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/[-_]/g, '')}Page() {
  const page = await getMarkdownPage('${slug}');
  
  if (!page) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-bg text-text">
      <GlobalHeader />
      
      <div className="container-wrap py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-spectral font-bold text-brandGold mb-4">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-xl text-muted">
                {page.description}
              </p>
            )}
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: page.htmlContent }}
          />
        </div>
      </div>
      
      <GlobalFooter />
    </main>
  );
}
`;

  fs.writeFileSync(pageFile, pageContent);
  console.log(`Created route: /${cleanSlug} (from ${slug})`);
}

// Main execution
function main() {
  console.log('Generating doc routes...');
  
  const markdownFiles = getAllMarkdownFiles();
  
  if (markdownFiles.length === 0) {
    console.log('No markdown files found in docs directory');
    return;
  }
  
  markdownFiles.forEach(createRouteFile);
  
  console.log(`Generated ${markdownFiles.length} route files`);
}

main();
