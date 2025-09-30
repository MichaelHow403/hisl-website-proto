#!/usr/bin/env node
/**
 * Image optimization script using Sharp
 * Generates WebP variants and LQIP placeholders for all images referenced in IMAGES manifest
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Read the IMAGES manifest
const imageryPath = path.join(projectRoot, 'src', 'app', 'lib', 'imagery.ts');
const imageryContent = await fs.readFile(imageryPath, 'utf8');

// Extract image filenames from the manifest
const imageFiles = [];
const imageMatch = imageryContent.match(/"([^"]+\.(?:png|jpg|jpeg|webp|svg))"/g);
if (imageMatch) {
  imageFiles.push(...imageMatch.map(match => match.slice(1, -1)));
}

// Remove duplicates and filter out SVG files (no optimization needed)
const uniqueImages = [...new Set(imageFiles)].filter(file => !file.endsWith('.svg'));

console.log(`Found ${uniqueImages.length} images to optimize:`);
uniqueImages.forEach(img => console.log(`  - ${img}`));

// Create optimized variants directory
const optimizedDir = path.join(projectRoot, 'public', 'imagery', 'optimized');
await fs.mkdir(optimizedDir, { recursive: true });

// Optimization settings
const widths = [1200, 2400];
const quality = 85;
const lqipQuality = 10;
const lqipWidth = 20;

const results = {
  processed: 0,
  errors: [],
  warnings: []
};

// Process each image
for (const imageFile of uniqueImages) {
  try {
    console.log(`\nProcessing: ${imageFile}`);
    
    // Find the source image in various locations
    const possiblePaths = [
      path.join(projectRoot, 'public', 'imagery', imageFile),
      path.join(projectRoot, imageFile),
      path.join(projectRoot, 'public', imageFile)
    ];
    
    let sourcePath = null;
    for (const possiblePath of possiblePaths) {
      try {
        await fs.access(possiblePath);
        sourcePath = possiblePath;
        break;
      } catch {
        // Continue searching
      }
    }
    
    if (!sourcePath) {
      results.warnings.push(`Source image not found: ${imageFile}`);
      console.log(`  ⚠️  Source not found: ${imageFile}`);
      continue;
    }
    
    const baseName = path.parse(imageFile).name;
    const extension = path.parse(imageFile).ext;
    
    // Generate WebP variants at different widths
    const webpVariants = [];
    for (const width of widths) {
      const outputPath = path.join(optimizedDir, `${baseName}-${width}.webp`);
      
      await sharp(sourcePath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality })
        .toFile(outputPath);
      
      webpVariants.push({
        width,
        path: `/imagery/optimized/${baseName}-${width}.webp`
      });
      
      console.log(`  ✓ Generated: ${baseName}-${width}.webp`);
    }
    
    // Generate LQIP placeholder
    const lqipPath = path.join(optimizedDir, `${baseName}-lqip.webp`);
    const lqipBuffer = await sharp(sourcePath)
      .resize(lqipWidth, null, { withoutEnlargement: true })
      .webp({ quality: lqipQuality })
      .toBuffer();
    
    await fs.writeFile(lqipPath, lqipBuffer);
    console.log(`  ✓ Generated: ${baseName}-lqip.webp`);
    
    // Generate base64 LQIP for inline use
    const base64Lqip = `data:image/webp;base64,${lqipBuffer.toString('base64')}`;
    
    results.processed++;
    
  } catch (error) {
    results.errors.push(`${imageFile}: ${error.message}`);
    console.log(`  ❌ Error processing ${imageFile}: ${error.message}`);
  }
}

// Generate optimized manifest
const optimizedManifest = {
  generated: new Date().toISOString(),
  images: {}
};

// Read original manifest and enhance with optimized paths
for (const [key, value] of Object.entries(JSON.parse(imageryContent.match(/export const IMAGES = ({[\s\S]*?}) as const/)[1]))) {
  if (typeof value === 'string' && !value.endsWith('.svg')) {
    const baseName = path.parse(value).name;
    optimizedManifest.images[key] = {
      original: value,
      optimized: {
        webp: {
          1200: `/imagery/optimized/${baseName}-1200.webp`,
          2400: `/imagery/optimized/${baseName}-2400.webp`
        },
        lqip: {
          webp: `/imagery/optimized/${baseName}-lqip.webp`,
          base64: `data:image/webp;base64,${(await fs.readFile(path.join(optimizedDir, `${baseName}-lqip.webp`))).toString('base64')}`
        }
      }
    };
  } else {
    optimizedManifest.images[key] = value;
  }
}

// Write optimized manifest
const manifestPath = path.join(projectRoot, 'src', 'app', 'lib', 'imagery-optimized.json');
await fs.writeFile(manifestPath, JSON.stringify(optimizedManifest, null, 2));

console.log(`\n📊 Processing Summary:`);
console.log(`  ✓ Processed: ${results.processed} images`);
console.log(`  ⚠️  Warnings: ${results.warnings.length}`);
console.log(`  ❌ Errors: ${results.errors.length}`);

if (results.warnings.length > 0) {
  console.log(`\n⚠️  Warnings:`);
  results.warnings.forEach(warning => console.log(`  - ${warning}`));
}

if (results.errors.length > 0) {
  console.log(`\n❌ Errors:`);
  results.errors.forEach(error => console.log(`  - ${error}`));
}

console.log(`\n✓ Optimized manifest written to: ${manifestPath}`);
console.log(`✓ Optimized images written to: ${optimizedDir}`);




