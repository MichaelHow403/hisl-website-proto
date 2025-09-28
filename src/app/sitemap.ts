/**
 * Next.js dynamic sitemap generator
 * Reads from /content/pages and generates sitemap programmatically
 */

import fs from 'fs';
import path from 'path';

interface PageData {
  slug: string;
  title: string;
  sections?: any[];
}

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Priority mapping based on page importance
const getPriority = (slug: string): number => {
  if (slug === 'home') return 1.0;
  if (slug === 'news') return 0.8;
  if (slug === 'globe' || slug === 'agents') return 0.7;
  if (slug.startsWith('about/') || slug === 'contact') return 0.6;
  if (slug.startsWith('sectors/')) return 0.6;
  if (slug.startsWith('legal/')) return 0.3;
  return 0.5;
};

// Change frequency mapping
const getChangeFrequency = (slug: string): SitemapEntry['changeFrequency'] => {
  if (slug === 'news') return 'daily';
  if (slug === 'home') return 'weekly';
  if (slug.startsWith('sectors/') || slug === 'agents') return 'monthly';
  if (slug.startsWith('legal/') || slug === 'poem') return 'yearly';
  return 'monthly';
};

async function getAllPages(): Promise<PageData[]> {
  const pages: PageData[] = [];
  const contentDir = path.join(process.cwd(), 'content', 'pages');
  
  async function scanDirectory(dir: string, basePath = ''): Promise<void> {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath, path.join(basePath, entry.name));
      } else if (entry.name.endsWith('.json')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const pageData: PageData = JSON.parse(content);
          pages.push(pageData);
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error);
        }
      }
    }
  }
  
  if (fs.existsSync(contentDir)) {
    await scanDirectory(contentDir);
  }
  
  return pages;
}

export default async function sitemap(): Promise<SitemapEntry[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hisl.ai';
  const pages = await getAllPages();
  
  const sitemapEntries: SitemapEntry[] = pages.map(page => {
    // Convert slug to URL path
    let urlPath = page.slug;
    if (urlPath === 'home') {
      urlPath = '';
    }
    
    return {
      url: `${baseUrl}/${urlPath}`,
      lastModified: new Date(),
      changeFrequency: getChangeFrequency(page.slug),
      priority: getPriority(page.slug),
    };
  });
  
  // Add additional static pages that might not be in content/pages
  const additionalPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.1,
    },
    {
      url: `${baseUrl}/robots.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    }
  ];
  
  // Combine and sort by priority (highest first)
  const allEntries = [...sitemapEntries, ...additionalPages].sort((a, b) => b.priority - a.priority);
  
  // Log for debugging
  console.log(`Generated sitemap with ${allEntries.length} entries`);
  
  return allEntries;
}
