#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Master Content Lock Section 9 - Required image mappings
const REQUIRED_IMAGES = {
  'ai_construction_bridge_banner.png': 'home_hero_main',
  'ai_technology.jpeg': 'home_hero_overlay', 
  'Hard_Hat_ digital_paperwork.jpeg': 'home_problem_main',
  'data_sovereignty_badge.png': 'home_solution_badge',
  'michael_howardbio.jpeg': 'fusion_michael',
  'AI_DNA.png': 'fusion_ai_ethics',
  'HISL_Logo.jpeg': 'footer_logo_hisl',
  'integai_logo.png': 'footer_logo_integai',
  'reach_for_the_stars.png': 'poem_backdrop',
  'raven_muninn.png': 'globe_raven_muninn',
  'raven_huginn.png': 'globe_raven_huginn',
  'earth_globe_realistic.png': 'globe_base',
  'inspiring.jpg': 'footer_accent',
  'creation_AI.png': 'news_motif',
  'compliance_shield_premium.png': 'home_solution_security'
};

const INPUT_DIR = '/home/michael/Public/images';
const OUTPUT_DIR = './public/imagery/processed';
const MANIFEST_PATH = './src/lib/imagery.ts';

async function validateSharpPipeline() {
  console.log('🔍 Sharp Pipeline Validation');
  console.log('============================');
  
  let allValid = true;
  const errors = [];
  const warnings = [];
  
  // 1. Check if source images exist
  console.log('\n📁 Checking source images...');
  try {
    const sourceFiles = await fs.readdir(INPUT_DIR, { recursive: true });
    const imageFiles = sourceFiles.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    for (const [filename, expectedId] of Object.entries(REQUIRED_IMAGES)) {
      const exists = imageFiles.includes(filename);
      if (exists) {
        console.log(`✅ ${filename} → ${expectedId}`);
      } else {
        console.log(`❌ ${filename} → ${expectedId} (MISSING)`);
        errors.push(`Source image missing: ${filename}`);
        allValid = false;
      }
    }
  } catch (error) {
    console.log(`❌ Cannot access source directory: ${INPUT_DIR}`);
    errors.push(`Source directory inaccessible: ${error.message}`);
    allValid = false;
  }
  
  // 2. Check if processed images exist
  console.log('\n🖼️  Checking processed images...');
  try {
    await fs.access(OUTPUT_DIR);
    const processedFiles = await fs.readdir(OUTPUT_DIR);
    
    for (const [filename, imageId] of Object.entries(REQUIRED_IMAGES)) {
      const baseName = path.parse(filename).name;
      const webp1200 = `${baseName}-1200.webp`;
      const webp2400 = `${baseName}-2400.webp`;
      
      const has1200 = processedFiles.includes(webp1200);
      const has2400 = processedFiles.includes(webp2400);
      
      if (has1200 && has2400) {
        console.log(`✅ ${imageId}: ${webp1200}, ${webp2400}`);
      } else {
        console.log(`❌ ${imageId}: Missing processed files`);
        errors.push(`Processed images missing for ${imageId}`);
        allValid = false;
      }
    }
  } catch (error) {
    console.log(`❌ Cannot access processed directory: ${OUTPUT_DIR}`);
    errors.push(`Processed directory inaccessible: ${error.message}`);
    allValid = false;
  }
  
  // 3. Check if manifest exists and is valid
  console.log('\n📄 Checking imagery manifest...');
  try {
    await fs.access(MANIFEST_PATH);
    const manifestContent = await fs.readFile(MANIFEST_PATH, 'utf8');
    
    // Check if it's a valid TypeScript export
    if (!manifestContent.includes('export const IMAGES')) {
      errors.push('Manifest does not export IMAGES constant');
      allValid = false;
    }
    
    if (!manifestContent.includes('export type ImageId')) {
      errors.push('Manifest does not export ImageId type');
      allValid = false;
    }
    
    // Check for required imageIds
    for (const imageId of Object.values(REQUIRED_IMAGES)) {
      if (!manifestContent.includes(`"${imageId}"`)) {
        errors.push(`Manifest missing imageId: ${imageId}`);
        allValid = false;
      } else {
        console.log(`✅ Manifest contains: ${imageId}`);
      }
    }
    
  } catch (error) {
    console.log(`❌ Cannot access manifest: ${MANIFEST_PATH}`);
    errors.push(`Manifest inaccessible: ${error.message}`);
    allValid = false;
  }
  
  // 4. Check for hardcoded image paths in components
  console.log('\n🔍 Checking for hardcoded image paths...');
  try {
    const componentFiles = await findComponentFiles('./src');
    let foundHardcodedPaths = false;
    
    for (const file of componentFiles) {
      const content = await fs.readFile(file, 'utf8');
      
      // Check for forbidden patterns
      const forbiddenPatterns = [
        /src=["\'][^"\']*\.(jpg|jpeg|png|gif|webp|svg)["\']/g,
        /\/images\//g,
        /\/public\/images\//g,
        /import.*from.*["\'][^"\']*\.(jpg|jpeg|png|gif|webp|svg)["\']/g
      ];
      
      for (const pattern of forbiddenPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          console.log(`❌ ${file}: Found hardcoded paths:`, matches);
          errors.push(`${file}: Contains hardcoded image paths`);
          foundHardcodedPaths = true;
          allValid = false;
        }
      }
      
      // Check for missing OptimizedImage imports
      if (content.includes('<img') && !content.includes('OptimizedImage')) {
        console.log(`⚠️  ${file}: Contains <img> tag but no OptimizedImage import`);
        warnings.push(`${file}: Should use OptimizedImage instead of <img>`);
      }
    }
    
    if (!foundHardcodedPaths) {
      console.log('✅ No hardcoded image paths found');
    }
    
  } catch (error) {
    console.log(`❌ Error scanning components: ${error.message}`);
    errors.push(`Component scan failed: ${error.message}`);
    allValid = false;
  }
  
  // 5. Summary
  console.log('\n📊 Validation Summary');
  console.log('====================');
  
  if (allValid) {
    console.log('✅ Sharp pipeline is fully compliant!');
    console.log('✅ All source images exist');
    console.log('✅ All processed images exist');
    console.log('✅ Manifest is valid');
    console.log('✅ No hardcoded paths found');
  } else {
    console.log('❌ Sharp pipeline validation failed!');
    console.log('\nErrors:');
    errors.forEach(error => console.log(`  • ${error}`));
  }
  
  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(warning => console.log(`  • ${warning}`));
  }
  
  if (!allValid) {
    process.exit(1);
  }
}

async function findComponentFiles(dir) {
  const files = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and other irrelevant directories
        if (!['node_modules', '.next', '.git'].includes(entry.name)) {
          const subFiles = await findComponentFiles(fullPath);
          files.push(...subFiles);
        }
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory might not exist, skip silently
  }
  
  return files;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateSharpPipeline().catch(console.error);
}

export { validateSharpPipeline };
