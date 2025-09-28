import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MDXContent {
  slug: string;
  content: string;
  frontmatter: Record<string, any>;
}

/**
 * Load MDX file by filename (without .mdx extension)
 * Looks in the project root for numbered MDX files like 01-hero.mdx
 */
export async function loadMDX(filename: string): Promise<MDXContent | null> {
  try {
    const filePath = path.join(process.cwd(), `${filename}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      console.warn(`MDX file not found: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    return {
      slug: filename,
      content,
      frontmatter
    };
  } catch (error) {
    console.error(`Error loading MDX file ${filename}:`, error);
    return null;
  }
}

/**
 * Load all numbered MDX files from project root
 */
export async function loadAllMDX(): Promise<MDXContent[]> {
  try {
    const files = fs.readdirSync(process.cwd())
      .filter(file => file.match(/^\d{2}-.*\.mdx$/))
      .map(file => file.replace('.mdx', ''))
      .sort(); // Sort by filename to maintain order

    const contents = await Promise.all(
      files.map(filename => loadMDX(filename))
    );

    return contents.filter((content): content is MDXContent => content !== null);
  } catch (error) {
    console.error(`Error loading MDX files:`, error);
    return [];
  }
}

/**
 * Load MDX content for a specific page by looking for numbered files
 */
export async function loadPageMDX(pageSlug: string): Promise<MDXContent[]> {
  try {
    const files = fs.readdirSync(process.cwd())
      .filter(file => file.match(/^\d{2}-.*\.mdx$/))
      .map(file => file.replace('.mdx', ''))
      .sort();

    const contents = await Promise.all(
      files.map(filename => loadMDX(filename))
    );

    return contents.filter((content): content is MDXContent => content !== null);
  } catch (error) {
    console.error(`Error loading MDX files for page ${pageSlug}:`, error);
    return [];
  }
}

