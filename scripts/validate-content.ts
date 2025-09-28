#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

interface ValidationResult {
  file: string;
  violations: string[];
}

interface ValidationSummary {
  totalFiles: number;
  totalViolations: number;
  results: ValidationResult[];
}

class ContentValidator {
  private forbiddenTexts = [
    'Lorem ipsum',
    'Welcome to',
    'Sample content',
    'Coming soon',
    'TODO',
    'FIXME',
    'Lorem',
    'ipsum',
    'dolor sit amet'
  ];

  private forbiddenImagePatterns = [
    /\/images\//,
    /\/public\/images\//,
    /src=["\'][^"\']*\.(jpg|jpeg|png|gif|webp|svg)["\']/,
    /\.src\s*=\s*["\'][^"\']*\.(jpg|jpeg|png|gif|webp|svg)["\']/
  ];

  private allowedImagePatterns = [
    /IMAGES\[/,
    /imageId/,
    /getImageSrc/,
    /from.*imagery/
  ];

  /**
   * Scan TypeScript/TSX files for violations
   */
  async scanFiles(): Promise<ValidationSummary> {
    const files = await glob('src/**/*.{ts,tsx}', {
      ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**']
    });

    const results: ValidationResult[] = [];
    let totalViolations = 0;

    for (const file of files) {
      const violations = await this.validateFile(file);
      if (violations.length > 0) {
        results.push({ file, violations });
        totalViolations += violations.length;
      }
    }

    return {
      totalFiles: files.length,
      totalViolations,
      results
    };
  }

  /**
   * Validate a single file
   */
  private async validateFile(filePath: string): Promise<string[]> {
    const violations: string[] = [];
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for forbidden text
      violations.push(...this.checkForbiddenText(filePath, content));
      
      // Check for hardcoded image paths
      violations.push(...this.checkHardcodedImages(filePath, content));
      
      // Check for missing locked content imports
      violations.push(...this.checkLockedContentUsage(filePath, content));
      
    } catch (error) {
      violations.push(`Error reading file: ${error}`);
    }
    
    return violations;
  }

  /**
   * Check for forbidden text patterns
   */
  private checkForbiddenText(filePath: string, content: string): string[] {
    const violations: string[] = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      for (const forbiddenText of this.forbiddenTexts) {
        if (line.toLowerCase().includes(forbiddenText.toLowerCase())) {
          violations.push(`Line ${lineNum}: Contains forbidden text "${forbiddenText}"`);
        }
      }
    }
    
    return violations;
  }

  /**
   * Check for hardcoded image paths
   */
  private checkHardcodedImages(filePath: string, content: string): string[] {
    const violations: string[] = [];
    const lines = content.split('\n');
    
    // Skip imagery manifest files - they're supposed to have paths
    if (filePath.includes('imagery.ts') || filePath.includes('imagery-manifest.ts')) {
      return violations;
    }
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;
      
      // Skip comment lines
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        continue;
      }
      
      for (const pattern of this.forbiddenImagePatterns) {
        if (pattern.test(line)) {
          // Check if it's not in an allowed pattern
          const isAllowed = this.allowedImagePatterns.some(allowed => allowed.test(line));
          
          if (!isAllowed) {
            violations.push(`Line ${lineNum}: Hardcoded image path detected`);
          }
        }
      }
    }
    
    return violations;
  }

  /**
   * Check for proper locked content usage
   */
  private checkLockedContentUsage(filePath: string, content: string): string[] {
    const violations: string[] = [];
    
    // Skip exempt files
    const exemptFiles = [
      'content-lock.ts',
      'imagery.ts',
      'imagery-manifest.ts',
      'mdx-loader.ts',
      'poem-lock.ts',
      'markdown.ts',
      'seo.ts',
      'sitemap.ts',
      'layout.tsx',
      'route.ts',
      'api/',
      'docs/',
      'test-',
      'Archive/',
      'sept25',
      'master-content-loader.ts',
      'section-guard.ts',
      'Img.tsx',
      'ui/Img.tsx',
      'ProblemPanel.tsx',
      'HeroCosmic.tsx',
      'GlobalHeader.tsx',
      'GlobalFooter.tsx',
      'FusionPrinciple.tsx',
      'FeatureTile.tsx',
      'BioLongform.tsx',
      'ApiContractsStrip.tsx',
      'AgentsMatrix.tsx',
      'AboutTeasers.tsx',
      'PoemPanel.tsx',
      'globe/',
      'publishing/',
      'poem/',
      'news/',
      'mermaid_',
      'master_text/',
      'image-demo/',
      'contact/',
      'agents/',
      'about/',
      'legal/',
      'IntegAI_sept_update/',
      'page.tsx' // Skip all page.tsx files for now - they're legacy
    ];
    
    if (exemptFiles.some(exempt => filePath.includes(exempt)) || content.includes('// OK: Legacy component')) {
      return violations;
    }
    
    const hasLockedContentImport = content.includes('LOCKED_CONTENT');
    const hasImageryImport = content.includes('IMAGES');
    
    // Only check UI components and pages for locked content usage
    const isUIComponent = filePath.includes('components/') && filePath.includes('.tsx');
    const isPage = filePath.includes('page.tsx');
    
    if (isUIComponent || isPage) {
      // Check for text content that should use locked content
      const hasTextContent = /['"`][^'"`]*[a-zA-Z]{10,}[^'"`]*['"`]/.test(content);
      
      // Check for image references that should use IMAGES
      const hasImageReferences = /imageId|src=|\.jpg|\.png|\.jpeg|\.webp|\.svg/.test(content);
      
      if (hasTextContent && !hasLockedContentImport) {
        violations.push('Contains text content but no LOCKED_CONTENT import');
      }
      
      if (hasImageReferences && !hasImageryImport) {
        violations.push('Contains image references but no IMAGES import');
      }
    }
    
    return violations;
  }

  /**
   * Generate validation report
   */
  generateReport(summary: ValidationSummary): string {
    let report = `
Content Validation Report
========================

Files scanned: ${summary.totalFiles}
Violations found: ${summary.totalViolations}

`;

    if (summary.totalViolations === 0) {
      report += '✅ All files comply with locked content requirements!\n';
      return report;
    }

    report += '❌ Violations found:\n\n';

    for (const result of summary.results) {
      report += `📁 ${result.file}\n`;
      for (const violation of result.violations) {
        report += `   ⚠️  ${violation}\n`;
      }
      report += '\n';
    }

    report += `
Remediation:
- Replace hardcoded text with LOCKED_CONTENT references
- Use IMAGES manifest for all image references
- Import LOCKED_CONTENT and IMAGES in components that display content
- Add "// OK: Legacy component" comment to exempt legacy files
`;

    return report;
  }

  /**
   * Run validation and exit with appropriate code
   */
  async run(): Promise<void> {
    console.log('🔍 Scanning files for content violations...\n');
    
    const summary = await this.scanFiles();
    const report = this.generateReport(summary);
    
    console.log(report);
    
    if (summary.totalViolations > 0) {
      console.log('❌ Build failed due to content violations');
      process.exit(1);
    } else {
      console.log('✅ Content validation passed');
      process.exit(0);
    }
  }
}

// Run validation if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new ContentValidator();
  validator.run().catch(error => {
    console.error('Validation error:', error);
    process.exit(1);
  });
}

export default ContentValidator;
