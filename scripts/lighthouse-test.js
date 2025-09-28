#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the base URL from command line argument or use default
const baseUrl = process.argv[2] || 'http://localhost:3000';

console.log(`🚀 Running Lighthouse CI against: ${baseUrl}`);

// Create a temporary config for this test
const tempConfig = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        `${baseUrl}/`,
        `${baseUrl}/sectors`,
        `${baseUrl}/agents`,
        `${baseUrl}/docs`
      ],
      settings: {
        chromeFlags: "--no-sandbox --disable-dev-shm-usage"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", {"minScore": 0.85}],
        "categories:accessibility": ["warn", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "server-response-time": ["error", {"maxNumericValue": 200}],
        "first-contentful-paint": ["warn", {"maxNumericValue": 2000}],
        "first-meaningful-paint": ["warn", {"maxNumericValue": 2000}],
        "speed-index": ["warn", {"maxNumericValue": 3000}],
        "total-blocking-time": ["warn", {"maxNumericValue": 300}],
        "interactive": ["warn", {"maxNumericValue": 3000}],
        "uses-optimized-images": "error",
        "uses-text-compression": "error",
        "modern-image-formats": "error",
        "unused-css-rules": "warn",
        "unused-javascript": "warn",
        "efficient-animated-content": "warn",
        "render-blocking-resources": "warn"
      }
    },
    upload: {
      target: "temporary-public-storage"
    }
  }
};

// Write temporary config
const fs = await import('fs');
const tempConfigPath = join(__dirname, '..', 'lighthouse-temp.json');
fs.writeFileSync(tempConfigPath, JSON.stringify(tempConfig, null, 2));

try {
  // Run lighthouse with the temporary config
  execSync(`lhci autorun --config=${tempConfigPath}`, { 
    stdio: 'inherit',
    cwd: join(__dirname, '..')
  });
  
  console.log('✅ Lighthouse CI completed successfully!');
} catch (error) {
  console.error('❌ Lighthouse CI failed:', error.message);
  process.exit(1);
} finally {
  // Clean up temporary config
  try {
    fs.unlinkSync(tempConfigPath);
  } catch (e) {
    // Ignore cleanup errors
  }
}
