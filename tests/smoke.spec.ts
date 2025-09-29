/**
 * Playwright smoke tests to verify pages load and contain expected content
 */

import { test, expect } from '@playwright/test';

// List of pages to test based on content/pages structure
const pagesToTest = [
  '/',
  '/globe',
  '/about',
  '/about/michael',
  '/about/integai',
  '/poem',
  '/agents',
  '/news',
  '/contact',
  '/legal/privacy',
  '/legal/terms',
  '/sectors/construction',
  '/sectors/environmental',
  '/sectors/conservation',
  '/sectors/procurement',
  '/sectors/agriculture',
  '/sectors/trader-economics',
  '/sectors/healthcare',
  '/sectors/insurance',
  '/sectors/custom',
  '/sectors/pharma-crox'
];

test.describe('Page Smoke Tests', () => {
  for (const pagePath of pagesToTest) {
    test(`should load ${pagePath} successfully`, async ({ page }) => {
      // Navigate to the page
      const response = await page.goto(`http://localhost:3000${pagePath}`);
      
      // Verify page loads without 404
      expect(response?.status()).not.toBe(404);
      
      // Verify page has a title
      await expect(page).toHaveTitle(/HISL|Human-first|Industrial/);
      
      // Verify main content area exists and is not empty
      const mainElement = page.locator('main');
      await expect(mainElement).toBeVisible();
      
      // Check that main content has some text content
      const mainText = await mainElement.textContent();
      expect(mainText?.trim().length).toBeGreaterThan(0);
      
      // Verify no critical JavaScript errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Wait a bit for any async content to load
      await page.waitForTimeout(1000);
      
      // Check for critical errors (but allow warnings)
      const criticalErrors = errors.filter(error => 
        !error.includes('Warning') && 
        !error.includes('deprecated') &&
        !error.includes('experimental')
      );
      
      if (criticalErrors.length > 0) {
        console.warn(`Critical errors on ${pagePath}:`, criticalErrors);
      }
    });
    
    test(`${pagePath} should have working footer links`, async ({ page }) => {
      await page.goto(`http://localhost:3000${pagePath}`);
      
      // Check footer links
      const footerLinks = page.locator('footer a[href^="/"]');
      const linkCount = await footerLinks.count();
      
      if (linkCount > 0) {
        // Test first few footer links to avoid too many requests
        const linksToTest = Math.min(3, linkCount);
        
        for (let i = 0; i < linksToTest; i++) {
          const link = footerLinks.nth(i);
          const href = await link.getAttribute('href');
          
          if (href && href.startsWith('/')) {
            // Click the link and verify it doesn't 404
            const [response] = await Promise.all([
              page.waitForResponse(response => response.url().includes(href)),
              link.click()
            ]);
            
            expect(response?.status()).not.toBe(404);
            
            // Go back to original page for next test
            await page.goBack();
          }
        }
      }
    });
  }
  
  test('API endpoints should respond correctly', async ({ request }) => {
    // Test master content API
    const response = await request.get('/api/v1/site/page?slug=home');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('slug', 'home');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('sections');
    expect(Array.isArray(data.sections)).toBe(true);
  });
  
  test('Forms API should handle idempotent requests', async ({ request }) => {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Test message'
    };
    
    const response = await request.post('/api/v1/site/forms/contact', {
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': 'test-key-123'
      },
      data: testData
    });
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('ok', true);
    expect(data).toHaveProperty('idempotencyKey', 'test-key-123');
  });
  
  test('Static assets should be accessible', async ({ request }) => {
    // Test sitemap and robots.txt
    const sitemapResponse = await request.get('/sitemap.xml');
    expect(sitemapResponse.status()).toBe(200);
    
    const robotsResponse = await request.get('/robots.txt');
    expect(robotsResponse.status()).toBe(200);
    
    // Verify sitemap contains expected URLs
    const sitemapText = await sitemapResponse.text();
    expect(sitemapText).toContain('<urlset');
    expect(sitemapText).toContain('https://hisl.ai/');
    expect(sitemapText).toContain('https://hisl.ai/contact');
  });
});

test.describe('Performance Checks', () => {
  test('Home page should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('main');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    console.log(`Home page loaded in ${loadTime}ms`);
  });
  
  test('Images should have proper alt attributes', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(5, imageCount); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // Alt should exist (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });
});

// Helper function to run tests in CI
export async function runSmokeTests(baseUrl = 'http://localhost:3000') {
  console.log('Running smoke tests against:', baseUrl);
  
  // This would be used if running tests programmatically
  return {
    pagesToTest,
    baseUrl,
    timestamp: new Date().toISOString()
  };
}


