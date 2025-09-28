#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const docsDir = path.join(process.cwd(), 'docs');
const baseUrl = 'http://localhost:3000';

// Get all markdown files
function getAllMarkdownFiles() {
  if (!fs.existsSync(docsDir)) {
    return [];
  }
  
  const files = fs.readdirSync(docsDir);
  return files.filter(file => file.endsWith('.md'));
}

// Test a single route
async function testRoute(url) {
  try {
    const response = await fetch(url);
    return {
      url,
      status: response.status,
      ok: response.ok
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      error: error.message
    };
  }
}

// Test all routes
async function testAllRoutes() {
  console.log('Testing generated routes...\n');
  
  const markdownFiles = getAllMarkdownFiles();
  const routes = [
    '/',
    '/docs',
    '/sectors',
    '/agents',
    '/about',
    '/globe',
    '/news',
    '/contact'
  ];
  
  // Add individual doc routes
  markdownFiles.forEach(file => {
    const slug = file.replace(/\.md$/, '');
    routes.push(`/docs/${slug}`);
    routes.push(`/${slug}`); // Also test direct routes
  });
  
  const results = [];
  
  for (const route of routes) {
    const url = `${baseUrl}${route}`;
    const result = await testRoute(url);
    results.push(result);
    
    const status = result.ok ? '✅' : '❌';
    console.log(`${status} ${route} - ${result.status}`);
  }
  
  console.log(`\nTest Summary:`);
  console.log(`Total routes tested: ${results.length}`);
  console.log(`Successful: ${results.filter(r => r.ok).length}`);
  console.log(`Failed: ${results.filter(r => !r.ok).length}`);
  
  const failed = results.filter(r => !r.ok);
  if (failed.length > 0) {
    console.log('\nFailed routes:');
    failed.forEach(r => console.log(`  - ${r.url}: ${r.status}`));
  }
}

testAllRoutes().catch(console.error);
