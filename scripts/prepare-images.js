#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const sourceDirs = [
  path.join(process.cwd(), 'public/imagery/processed'),
  path.join(process.cwd(), 'public/imagery/starfields')
];
const outputDir = path.join(process.cwd(), 'public/optimized');

// Image processing configurations
const configs = {
  '1200': { width: 1200, quality: 85 },
  '2400': { width: 2400, quality: 80 },
  'blur': { width: 20, quality: 20 }
};

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from source directories
function getImageFiles() {
  const allFiles = [];
  
  for (const sourceDir of sourceDirs) {
    if (!fs.existsSync(sourceDir)) {
      console.log('Source directory not found:', sourceDir);
      continue;
    }
    
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
    
    allFiles.push(...imageFiles);
  }
  
  return allFiles;
}

// Process a single image
async function processImage(filename) {
  // Find which source directory contains this file
  let inputPath = null;
  for (const sourceDir of sourceDirs) {
    const testPath = path.join(sourceDir, filename);
    if (fs.existsSync(testPath)) {
      inputPath = testPath;
      break;
    }
  }
  
  if (!inputPath) {
    console.error(`  ✗ File not found: ${filename}`);
    return false;
  }
  
  const baseName = path.parse(filename).name;
  
  console.log(`Processing: ${filename}`);
  
  try {
    // Process each variant
    for (const [variant, config] of Object.entries(configs)) {
      const outputFilename = `${baseName}-${variant}.webp`;
      const outputPath = path.join(outputDir, outputFilename);
      
      await sharp(inputPath)
        .resize(config.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ 
          quality: config.quality,
          effort: 6
        })
        .toFile(outputPath);
      
      console.log(`  ✓ Generated: ${outputFilename}`);
    }
    
    return true;
  } catch (error) {
    console.error(`  ✗ Error processing ${filename}:`, error.message);
    return false;
  }
}

// Main processing function
async function processAllImages() {
  console.log('🖼️  Starting image optimization...\n');
  
  const imageFiles = getImageFiles();
  
  if (imageFiles.length === 0) {
    console.log('No image files found in:', sourceDir);
    return;
  }
  
  console.log(`Found ${imageFiles.length} images to process\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const filename of imageFiles) {
    const success = await processImage(filename);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }
  
  console.log(`\n✅ Processing complete!`);
  console.log(`   Success: ${successCount} images`);
  console.log(`   Errors: ${errorCount} images`);
  console.log(`   Output directory: ${outputDir}`);
  
  // Generate a manifest file for reference
  const manifest = {
    generated: new Date().toISOString(),
    sourceDirs,
    outputDir,
    images: imageFiles.map(filename => {
      const baseName = path.parse(filename).name;
      return {
        original: filename,
        baseName,
        variants: Object.keys(configs).map(variant => ({
          variant,
          filename: `${baseName}-${variant}.webp`,
          path: `/optimized/${baseName}-${variant}.webp`
        }))
      };
    })
  };
  
  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📄 Generated manifest: ${manifestPath}`);
}

// Run the script
processAllImages().catch(console.error);