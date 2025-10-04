import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MDXContent {
  frontmatter: Record<string, any>;
  content: string;
}

/**
 * Load MDX content from numbered files in project root
 * @param filename - The filename without .mdx extension (e.g., '01-hero')
 * @returns Parsed frontmatter and content
 */
export function loadMDXContent(filename: string): MDXContent {
  const filePath = path.join(process.cwd(), `${filename}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`MDX file not found: ${filePath}`);
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return { frontmatter: data, content };
}

/**
 * Load all numbered MDX files from project root
 * @returns Array of all MDX content files
 */
export function loadAllMDXContent(): MDXContent[] {
  const files = fs.readdirSync(process.cwd())
    .filter(file => file.match(/^\d{2}-.*\.mdx$/))
    .sort(); // Sort by filename to maintain order

  return files.map(file => {
    const filename = file.replace('.mdx', '');
    return loadMDXContent(filename);
  });
}

/**
 * Extract title from MDX content (from frontmatter or first heading)
 */
export function extractTitle(mdxContent: MDXContent): string {
  if (mdxContent.frontmatter.title) {
    return mdxContent.frontmatter.title;
  }
  
  // Extract from first heading in content
  const headingMatch = mdxContent.content.match(/^#\s+(.+)$/m);
  return headingMatch ? headingMatch[1] : '';
}

/**
 * Extract subtitle from MDX content (from frontmatter kicker or first paragraph)
 */
export function extractSubtitle(mdxContent: MDXContent): string {
  if (mdxContent.frontmatter.kicker) {
    return mdxContent.frontmatter.kicker;
  }
  
  // Extract from first paragraph
  const paragraphMatch = mdxContent.content.match(/^[^#\n].+$/m);
  return paragraphMatch ? paragraphMatch[0].trim() : '';
}

/**
 * Extract CTA information from MDX content
 */
export function extractCTA(mdxContent: MDXContent): { label: string; href: string } | null {
  if (mdxContent.frontmatter.ctaLabel && mdxContent.frontmatter.ctaHref) {
    return {
      label: mdxContent.frontmatter.ctaLabel,
      href: mdxContent.frontmatter.ctaHref
    };
  }
  return null;
}

/**
 * Extract media information from MDX content
 */
export function extractMedia(mdxContent: MDXContent): { type: string; src: string; alt: string } | null {
  if (mdxContent.frontmatter.media) {
    return mdxContent.frontmatter.media;
  }
  return null;
}

/**
 * Parse MDX content into structured data for components
 */
export function parseMDXForComponent(mdxContent: MDXContent) {
  return {
    title: extractTitle(mdxContent),
    subtitle: extractSubtitle(mdxContent),
    cta: extractCTA(mdxContent),
    media: extractMedia(mdxContent),
    content: mdxContent.content,
    frontmatter: mdxContent.frontmatter
  };
}





