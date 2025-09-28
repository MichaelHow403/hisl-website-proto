#!/usr/bin/env node
/**
 * Link audit script to crawl internal links and report 404s
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const MAX_CONCURRENT_REQUESTS = 5;
const TIMEOUT_MS = 10000;

// Track results
const results = {
  totalLinks: 0,
  workingLinks: 0,
  brokenLinks: [],
  externalLinks: [],
  errors: []
};

/**
 * Extract all internal links from HTML content
 */
function extractInternalLinks(html, baseUrl) {
  const links = [];
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  let match;
  
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    
    // Skip mailto, tel, and anchor links
    if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      continue;
    }
    
    // Convert relative URLs to absolute
    let absoluteUrl;
    if (href.startsWith('http')) {
      if (href.startsWith(baseUrl)) {
        links.push(href);
      } else {
        results.externalLinks.push(href);
      }
      continue;
    } else if (href.startsWith('/')) {
      absoluteUrl = `${baseUrl}${href}`;
    } else {
      absoluteUrl = `${baseUrl}/${href}`;
    }
    
    links.push(absoluteUrl);
  }
  
  return [...new Set(links)]; // Remove duplicates
}

/**
 * Check if a URL returns a 200 status
 */
async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'HISL-Link-Audit/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    return {
      url,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    return {
      url,
      status: 0,
      ok: false,
      error: error.message
    };
  }
}

/**
 * Process URLs in batches to avoid overwhelming the server
 */
async function processBatch(urls) {
  const promises = urls.map(url => checkUrl(url));
  const results = await Promise.allSettled(promises);
  
  return results.map((result, index) => ({
    url: urls[index],
    ...(result.status === 'fulfilled' ? result.value : {
      status: 0,
      ok: false,
      error: result.reason?.message || 'Unknown error'
    })
  }));
}

/**
 * Get all pages from content/pages directory
 */
async function getAllPages() {
  const pagesDir = path.join(projectRoot, 'content', 'pages');
  const pages = [];
  
  async function scanDirectory(dir, basePath = '') {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDirectory(fullPath, path.join(basePath, entry.name));
      } else if (entry.name.endsWith('.json')) {
        const slug = basePath ? path.join(basePath, entry.name.replace('.json', '')) : entry.name.replace('.json', '');
        pages.push(`/${slug}`);
      }
    }
  }
  
  await scanDirectory(pagesDir);
  return pages;
}

/**
 * Main audit function
 */
async function auditLinks() {
  console.log('🔍 Starting link audit...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Max concurrent requests: ${MAX_CONCURRENT_REQUESTS}`);
  
  try {
    // Get all pages to crawl
    const pages = await getAllPages();
    console.log(`Found ${pages.length} pages to crawl`);
    
    // Add common pages that might not be in content/pages
    const additionalPages = ['/sitemap.xml', '/robots.txt'];
    const allPages = [...pages, ...additionalPages];
    
    const allLinks = new Set();
    
    // Crawl each page and extract links
    console.log('\n📄 Crawling pages for links...');
    for (const page of allPages) {
      try {
        const url = `${BASE_URL}${page}`;
        console.log(`  Crawling: ${page}`);
        
        const response = await fetch(url, {
          headers: { 'User-Agent': 'HISL-Link-Audit/1.0' }
        });
        
        if (response.ok) {
          const html = await response.text();
          const links = extractInternalLinks(html, BASE_URL);
          links.forEach(link => allLinks.add(link));
        } else {
          console.log(`    ⚠️  Page returned ${response.status}: ${page}`);
        }
      } catch (error) {
        console.log(`    ❌ Error crawling ${page}: ${error.message}`);
        results.errors.push({ page, error: error.message });
      }
    }
    
    results.totalLinks = allLinks.size;
    console.log(`\n🔗 Found ${results.totalLinks} unique internal links`);
    
    if (results.totalLinks === 0) {
      console.log('⚠️  No links found to test');
      return;
    }
    
    // Test all links in batches
    console.log('\n🧪 Testing links...');
    const linkArray = Array.from(allLinks);
    
    for (let i = 0; i < linkArray.length; i += MAX_CONCURRENT_REQUESTS) {
      const batch = linkArray.slice(i, i + MAX_CONCURRENT_REQUESTS);
      const batchResults = await processBatch(batch);
      
      for (const result of batchResults) {
        if (result.ok) {
          results.workingLinks++;
        } else {
          results.brokenLinks.push(result);
        }
      }
      
      // Progress indicator
      const processed = Math.min(i + MAX_CONCURRENT_REQUESTS, linkArray.length);
      console.log(`  Progress: ${processed}/${linkArray.length} links tested`);
    }
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    results.errors.push({ error: error.message });
  }
}

/**
 * Generate report
 */
function generateReport() {
  console.log('\n📊 Link Audit Report');
  console.log('='.repeat(50));
  
  console.log(`Total links tested: ${results.totalLinks}`);
  console.log(`Working links: ${results.workingLinks}`);
  console.log(`Broken links: ${results.brokenLinks.length}`);
  console.log(`External links: ${results.externalLinks.length}`);
  console.log(`Errors: ${results.errors.length}`);
  
  if (results.brokenLinks.length > 0) {
    console.log('\n❌ Broken Links:');
    results.brokenLinks.forEach(link => {
      console.log(`  ${link.url} - Status: ${link.status}${link.error ? ` (${link.error})` : ''}`);
    });
  }
  
  if (results.externalLinks.length > 0) {
    console.log('\n🌐 External Links (not tested):');
    results.externalLinks.slice(0, 10).forEach(link => {
      console.log(`  ${link}`);
    });
    if (results.externalLinks.length > 10) {
      console.log(`  ... and ${results.externalLinks.length - 10} more`);
    }
  }
  
  if (results.errors.length > 0) {
    console.log('\n⚠️  Errors:');
    results.errors.forEach(error => {
      if (error.page) {
        console.log(`  ${error.page}: ${error.error}`);
      } else {
        console.log(`  ${error.error}`);
      }
    });
  }
  
  // Summary
  const successRate = results.totalLinks > 0 ? (results.workingLinks / results.totalLinks * 100).toFixed(1) : 0;
  console.log(`\n✅ Success rate: ${successRate}%`);
  
  if (results.brokenLinks.length === 0 && results.errors.length === 0) {
    console.log('🎉 All links are working!');
  } else {
    console.log(`⚠️  Found ${results.brokenLinks.length} broken links and ${results.errors.length} errors`);
  }
}

// Run the audit
if (import.meta.url === `file://${process.argv[1]}`) {
  await auditLinks();
  generateReport();
  
  // Exit with appropriate code
  process.exit(results.brokenLinks.length > 0 ? 1 : 0);
}

export { auditLinks, generateReport };
