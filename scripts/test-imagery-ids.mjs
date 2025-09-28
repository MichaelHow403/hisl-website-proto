#!/usr/bin/env node
/**
 * Standalone script to test imagery ID validation
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Read the IMAGES manifest
async function readImagesManifest() {
  const imageryPath = path.join(projectRoot, 'src', 'app', 'lib', 'imagery.ts');
  const content = await fs.readFile(imageryPath, 'utf8');
  
  // Extract the IMAGES object using regex
  const match = content.match(/export const IMAGES = ({[\s\S]*?}) as const/);
  if (!match) {
    throw new Error('Could not parse IMAGES manifest');
  }
  
  // Evaluate the object (safe since it's from our own file)
  const IMAGES = eval(`(${match[1]})`);
  return IMAGES;
}

// Extract imageIds from content pages
function extractImageIds(obj, imageIds) {
  if (typeof obj === 'object' && obj !== null) {
    if (obj.imageId) imageIds.add(obj.imageId);
    if (obj.overlayImageId) imageIds.add(obj.overlayImageId);
    if (obj.portraitId) imageIds.add(obj.portraitId);
    if (obj.backdropId) imageIds.add(obj.backdropId);
    if (obj.leftImageId) imageIds.add(obj.leftImageId);
    if (obj.rightImageId) imageIds.add(obj.rightImageId);
    if (obj.accentImageId) imageIds.add(obj.accentImageId);
    if (Array.isArray(obj.logos)) obj.logos.forEach(logo => imageIds.add(logo));
    if (Array.isArray(obj.brandStrip)) obj.brandStrip.forEach(brand => imageIds.add(brand));
    
    for (const value of Object.values(obj)) {
      extractImageIds(value, imageIds);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => extractImageIds(item, imageIds));
  }
}

// Check if file exists
function checkFileExists(filename) {
  const possiblePaths = [
    path.join(projectRoot, 'public', 'imagery', filename),
    path.join(projectRoot, 'public', filename),
    path.join(projectRoot, filename),
    path.join(projectRoot, 'public', 'imagery', 'processed', filename),
    path.join(projectRoot, 'public', 'imagery', 'logos', filename),
    path.join(projectRoot, 'public', 'imagery', 'earth', filename),
    path.join(projectRoot, 'public', 'imagery', 'starfields', filename),
    path.join(projectRoot, 'public', 'imagery', 'galaxies', filename)
  ];
  
  return possiblePaths.some(filePath => {
    try {
      return require('fs').existsSync(filePath);
    } catch {
      return false;
    }
  });
}

async function main() {
  console.log('🔍 Testing imagery ID validation...\n');
  
  try {
    // Read IMAGES manifest
    const IMAGES = await readImagesManifest();
    console.log(`✅ Loaded IMAGES manifest with ${Object.keys(IMAGES).length} entries`);
    
    // Scan content pages
    const contentDir = path.join(projectRoot, 'content', 'pages');
    const imageIds = new Set();
    
    async function scanDirectory(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.name.endsWith('.json')) {
          const content = await fs.readFile(fullPath, 'utf8');
          const pageData = JSON.parse(content);
          extractImageIds(pageData, imageIds);
        }
      }
    }
    
    await scanDirectory(contentDir);
    console.log(`✅ Found ${imageIds.size} unique imageId references across all pages`);
    
    // Validate each imageId
    let missingInManifest = 0;
    let missingFiles = 0;
    
    for (const imageId of imageIds) {
      if (!(imageId in IMAGES)) {
        console.log(`❌ ImageId "${imageId}" not found in IMAGES manifest`);
        missingInManifest++;
      } else {
        const imageFiles = IMAGES[imageId];
        const filesToCheck = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
        
        for (const imageFile of filesToCheck) {
          if (typeof imageFile === 'string' && !imageFile.endsWith('.svg')) {
            if (!checkFileExists(imageFile)) {
              console.log(`⚠️  Image file "${imageFile}" (referenced by "${imageId}") not found on disk`);
              missingFiles++;
            }
          }
        }
      }
    }
    
    // Summary
    console.log('\n📊 Summary:');
    console.log(`  Total imageIds: ${imageIds.size}`);
    console.log(`  Missing from manifest: ${missingInManifest}`);
    console.log(`  Missing files: ${missingFiles}`);
    
    if (missingInManifest === 0 && missingFiles === 0) {
      console.log('\n✅ All imagery references are valid!');
    } else {
      console.log('\n⚠️  Some imagery references have issues');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();

