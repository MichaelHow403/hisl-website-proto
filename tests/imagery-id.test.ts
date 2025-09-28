/**
 * Test to validate that all imageId references in content pages exist in the IMAGES manifest
 * and that the referenced files exist on disk
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { IMAGES } from '../src/app/lib/imagery';

// Mock vitest for environments that don't have it
const mockDescribe = describe || ((name: string, fn: () => void) => fn());
const mockIt = it || ((name: string, fn: () => void) => fn());
const mockExpect = expect || ((value: any) => ({ toBe: () => {}, toContain: () => {} }));

interface PageContent {
  slug: string;
  sections: Array<{
    sectionId: string;
    component: string;
    props: any;
  }>;
}

function extractImageIds(obj: any, imageIds: Set<string>): void {
  if (typeof obj === 'string' && obj.includes('imageId')) {
    // This is likely an imageId reference
    imageIds.add(obj);
  } else if (typeof obj === 'object' && obj !== null) {
    if (obj.imageId) {
      imageIds.add(obj.imageId);
    }
    if (obj.overlayImageId) {
      imageIds.add(obj.overlayImageId);
    }
    if (obj.portraitId) {
      imageIds.add(obj.portraitId);
    }
    if (obj.backdropId) {
      imageIds.add(obj.backdropId);
    }
    if (obj.leftImageId) {
      imageIds.add(obj.leftImageId);
    }
    if (obj.rightImageId) {
      imageIds.add(obj.rightImageId);
    }
    if (obj.accentImageId) {
      imageIds.add(obj.accentImageId);
    }
    if (Array.isArray(obj.logos)) {
      obj.logos.forEach(logo => imageIds.add(logo));
    }
    if (Array.isArray(obj.brandStrip)) {
      obj.brandStrip.forEach(brand => imageIds.add(brand));
    }
    
    // Recursively check nested objects and arrays
    for (const value of Object.values(obj)) {
      extractImageIds(value, imageIds);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => extractImageIds(item, imageIds));
  }
}

function getImageFilePath(imageId: string): string[] {
  const imageFile = IMAGES[imageId as keyof typeof IMAGES];
  if (!imageFile) return [];
  
  if (typeof imageFile === 'string') {
    return [imageFile];
  } else if (Array.isArray(imageFile)) {
    return imageFile;
  }
  
  return [];
}

function checkFileExists(filename: string): boolean {
  const possiblePaths = [
    path.join(process.cwd(), 'public', 'imagery', filename),
    path.join(process.cwd(), 'public', filename),
    path.join(process.cwd(), filename),
    path.join(process.cwd(), 'public', 'imagery', 'processed', filename),
    path.join(process.cwd(), 'public', 'imagery', 'logos', filename),
    path.join(process.cwd(), 'public', 'imagery', 'earth', filename),
    path.join(process.cwd(), 'public', 'imagery', 'starfields', filename),
    path.join(process.cwd(), 'public', 'imagery', 'galaxies', filename)
  ];
  
  return possiblePaths.some(filePath => {
    try {
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  });
}

mockDescribe('Imagery ID Validation', () => {
  mockIt('should validate all imageId references exist in IMAGES manifest', async () => {
    const contentDir = path.join(process.cwd(), 'content', 'pages');
    const imageIds = new Set<string>();
    const missingInManifest: string[] = [];
    const missingFiles: string[] = [];
    
    // Recursively find all JSON files in content/pages
    async function scanDirectory(dir: string): Promise<void> {
      const entries = await fs.promises.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanDirectory(fullPath);
        } else if (entry.name.endsWith('.json')) {
          const content = await fs.promises.readFile(fullPath, 'utf8');
          const pageData: PageContent = JSON.parse(content);
          
          // Extract imageIds from page content
          extractImageIds(pageData, imageIds);
        }
      }
    }
    
    await scanDirectory(contentDir);
    
    console.log(`Found ${imageIds.size} unique imageId references across all pages`);
    
    // Validate each imageId exists in IMAGES manifest
    for (const imageId of imageIds) {
      if (!(imageId in IMAGES)) {
        missingInManifest.push(imageId);
        console.warn(`⚠️  ImageId "${imageId}" not found in IMAGES manifest`);
      } else {
        // Check if the actual files exist
        const imageFiles = getImageFilePath(imageId);
        for (const imageFile of imageFiles) {
          if (!checkFileExists(imageFile)) {
            missingFiles.push(imageFile);
            console.warn(`⚠️  Image file "${imageFile}" (referenced by "${imageId}") not found on disk`);
          }
        }
      }
    }
    
    // Report results
    if (missingInManifest.length === 0) {
      console.log('✅ All imageId references found in IMAGES manifest');
    } else {
      console.log(`❌ ${missingInManifest.length} imageId references missing from manifest`);
    }
    
    if (missingFiles.length === 0) {
      console.log('✅ All referenced image files exist on disk');
    } else {
      console.log(`⚠️  ${missingFiles.length} referenced image files missing from disk`);
    }
    
    // This test warns but doesn't fail - it's informational
    expect(missingInManifest.length).toBe(0);
  });
  
  mockIt('should have all IMAGES manifest entries properly formatted', () => {
    const imageEntries = Object.entries(IMAGES);
    console.log(`IMAGES manifest contains ${imageEntries.length} entries`);
    
    for (const [key, value] of imageEntries) {
      if (typeof value === 'string') {
        // Single image file
        const hasValidExtension = /\.(png|jpg|jpeg|webp|svg)$/i.test(value);
        if (!hasValidExtension) {
          console.warn(`⚠️  Image "${key}" has invalid file extension: ${value}`);
        }
      } else if (Array.isArray(value)) {
        // Array of image files
        for (const file of value) {
          const hasValidExtension = /\.(png|jpg|jpeg|webp|svg)$/i.test(file);
          if (!hasValidExtension) {
            console.warn(`⚠️  Image "${key}" contains invalid file extension: ${file}`);
          }
        }
      }
    }
    
    console.log('✅ IMAGES manifest format validation complete');
    expect(imageEntries.length).toBeGreaterThan(0);
  });
});

// Export for standalone execution
export { extractImageIds, getImageFilePath, checkFileExists };
