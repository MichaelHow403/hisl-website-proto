import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patterns to remove (case-insensitive)
const REMOVE_PATTERNS = [
  // AI/Builder specific terms
  /acceptance/gi,
  /criteria/gi,
  /SHIP/gi,
  /DECISION/gi,
  /BLOCKER/gi,
  
  // Special characters and markers
  /<<|>>/g,
  /【|】/g,
  
  // Builder instructions
  /cite/gi,
  /copy-paste/gi,
  /wireframe/gi,
  /build instructions/gi,
  
  // Demo/example markers
  /example:/gi,
  /demo-only/gi,
  /demo only/gi,
];

// Patterns for lines to completely remove
const REMOVE_LINE_PATTERNS = [
  /^\s*acceptance\s*$/gi,
  /^\s*criteria\s*$/gi,
  /^\s*SHIP\s*$/gi,
  /^\s*DECISION\s*$/gi,
  /^\s*BLOCKER\s*$/gi,
  /^\s*<<.*>>\s*$/g,
  /^\s*【.*】\s*$/g,
  /^\s*example:\s*$/gi,
  /^\s*demo-only\s*$/gi,
  /^\s*demo only\s*$/gi,
];

// Patterns for blocks to remove (multiline)
const REMOVE_BLOCK_PATTERNS = [
  // Example blocks
  /Example:\s*[\s\S]*?(?=\n\n|\n[A-Z]|\n\d+\)|\n-{3,}|\n\*{3,}|$)/gi,
  /Demo-only:\s*[\s\S]*?(?=\n\n|\n[A-Z]|\n\d+\)|\n-{3,}|\n\*{3,}|$)/gi,
  /Demo only:\s*[\s\S]*?(?=\n\n|\n[A-Z]|\n\d+\)|\n-{3,}|\n\*{3,}|$)/gi,
];

interface CleanStats {
  filesProcessed: number;
  linesRemoved: number;
  patternsRemoved: number;
  blocksRemoved: number;
}

function cleanMarkdownContent(content: string): { cleaned: string; stats: Partial<CleanStats> } {
  let cleaned = content;
  let linesRemoved = 0;
  let patternsRemoved = 0;
  let blocksRemoved = 0;

  // Remove blocks first
  for (const pattern of REMOVE_BLOCK_PATTERNS) {
    const matches = cleaned.match(pattern);
    if (matches) {
      blocksRemoved += matches.length;
      cleaned = cleaned.replace(pattern, '');
    }
  }

  // Split into lines for line-by-line processing
  const lines = cleaned.split('\n');
  const cleanedLines: string[] = [];

  for (const line of lines) {
    let shouldRemoveLine = false;
    let processedLine = line;

    // Check if entire line should be removed
    for (const pattern of REMOVE_LINE_PATTERNS) {
      if (pattern.test(line)) {
        shouldRemoveLine = true;
        linesRemoved++;
        break;
      }
    }

    if (!shouldRemoveLine) {
      // Remove patterns from the line
      for (const pattern of REMOVE_PATTERNS) {
        const matches = processedLine.match(pattern);
        if (matches) {
          patternsRemoved += matches.length;
          processedLine = processedLine.replace(pattern, '');
        }
      }

      // Clean up extra whitespace
      processedLine = processedLine.replace(/\s+/g, ' ').trim();
      
      // Only add non-empty lines
      if (processedLine) {
        cleanedLines.push(processedLine);
      } else {
        linesRemoved++;
      }
    }
  }

  // Join lines and clean up multiple consecutive empty lines
  cleaned = cleanedLines.join('\n').replace(/\n{3,}/g, '\n\n');

  return {
    cleaned,
    stats: {
      linesRemoved,
      patternsRemoved,
      blocksRemoved
    }
  };
}

async function cleanMarkdownFiles(): Promise<void> {
  console.log('🧹 Starting markdown cleanup...');
  
  const docsDir = path.join(__dirname, '..', 'docs');
  const stats: CleanStats = {
    filesProcessed: 0,
    linesRemoved: 0,
    patternsRemoved: 0,
    blocksRemoved: 0
  };

  try {
    const files = await fs.readdir(docsDir);
    const mdFiles = files.filter(file => file.endsWith('.md'));

    console.log(`📁 Found ${mdFiles.length} markdown files to process\n`);

    for (const file of mdFiles) {
      const filePath = path.join(docsDir, file);
      console.log(`Processing: ${file}`);

      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const { cleaned, stats: fileStats } = cleanMarkdownContent(content);

        // Only write back if content changed
        if (cleaned !== content) {
          await fs.writeFile(filePath, cleaned, 'utf-8');
          console.log(`  ✅ Cleaned: ${file}`);
          
          // Update stats
          stats.filesProcessed++;
          stats.linesRemoved += fileStats.linesRemoved || 0;
          stats.patternsRemoved += fileStats.patternsRemoved || 0;
          stats.blocksRemoved += fileStats.blocksRemoved || 0;

          // Show what was removed
          if (fileStats.linesRemoved) console.log(`    📝 Lines removed: ${fileStats.linesRemoved}`);
          if (fileStats.patternsRemoved) console.log(`    🔍 Patterns removed: ${fileStats.patternsRemoved}`);
          if (fileStats.blocksRemoved) console.log(`    📦 Blocks removed: ${fileStats.blocksRemoved}`);
        } else {
          console.log(`  ⏭️  No changes needed: ${file}`);
        }

      } catch (error) {
        console.error(`  ❌ Error processing ${file}:`, error);
      }
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`📊 Summary:`);
    console.log(`   Files processed: ${stats.filesProcessed}`);
    console.log(`   Lines removed: ${stats.linesRemoved}`);
    console.log(`   Patterns removed: ${stats.patternsRemoved}`);
    console.log(`   Blocks removed: ${stats.blocksRemoved}`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    process.exit(1);
  }
}

// Run the cleanup
cleanMarkdownFiles().catch(console.error);
