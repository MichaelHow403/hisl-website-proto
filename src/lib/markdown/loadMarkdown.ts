import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface MarkdownContent {
  title?: string;
  description?: string;
  content: string;
  frontmatter: Record<string, any>;
}

/**
 * Load markdown content from a file
 */
export async function loadMarkdown(filePath: string): Promise<MarkdownContent | null> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      content,
      frontmatter
    };
  } catch (error) {
    console.error(`Error loading markdown from ${filePath}:`, error);
    return null;
  }
}

/**
 * Parse markdown content into HTML (simple implementation)
 */
export function parseMarkdownToHtml(content: string): string {
  // Simple markdown parsing - in a real app you'd use a proper markdown parser
  return content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.*)$/gim, '<p>$1</p>');
}
