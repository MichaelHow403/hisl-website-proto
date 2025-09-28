import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface MarkdownFile {
  slug: string;
  title: string;
  description?: string;
  content: string;
  frontmatter: Record<string, any>;
}

export interface MarkdownPage {
  slug: string;
  title: string;
  description?: string;
  content: string;
  frontmatter: Record<string, any>;
  htmlContent: string;
}

const docsDirectory = path.join(process.cwd(), 'docs');

// Get all markdown files from the docs directory
export function getAllMarkdownSlugs(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(docsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

// Get markdown file data by slug
export function getMarkdownBySlug(slug: string): MarkdownFile | null {
  try {
    const fullPath = path.join(docsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || slug.replace(/-/g, ' ').replace(/_/g, ' '),
      description: data.description,
      content,
      frontmatter: data,
    };
  } catch (error) {
    console.error(`Error reading markdown file ${slug}:`, error);
    return null;
  }
}

// Process markdown content to HTML
export async function processMarkdownToHtml(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content);
  
  return processedContent.toString();
}

// Get processed markdown page with HTML content
export async function getMarkdownPage(slug: string): Promise<MarkdownPage | null> {
  const markdownFile = getMarkdownBySlug(slug);
  
  if (!markdownFile) {
    return null;
  }
  
  const htmlContent = await processMarkdownToHtml(markdownFile.content);
  
  return {
    ...markdownFile,
    htmlContent,
  };
}

// Get all markdown pages (for sitemap, etc.)
export async function getAllMarkdownPages(): Promise<MarkdownPage[]> {
  const slugs = getAllMarkdownSlugs();
  const pages: MarkdownPage[] = [];
  
  for (const slug of slugs) {
    const page = await getMarkdownPage(slug);
    if (page) {
      pages.push(page);
    }
  }
  
  return pages;
}
