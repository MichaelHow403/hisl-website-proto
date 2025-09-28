import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MDXContent {
  slug: string;
  content: string;
  frontmatter: Record<string, any>;
}

export class MDXLoader {
  private contentDir: string;

  constructor(contentDir: string = 'src/content') {
    this.contentDir = contentDir;
  }

  /**
   * Load MDX file by slug
   */
  async loadMDX(slug: string): Promise<MDXContent | null> {
    try {
      const filePath = path.join(process.cwd(), this.contentDir, `${slug}.mdx`);
      
      if (!fs.existsSync(filePath)) {
        return null;
      }

      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);

      return {
        slug,
        content,
        frontmatter
      };
    } catch (error) {
      console.error(`Error loading MDX file ${slug}:`, error);
      return null;
    }
  }

  /**
   * Load all MDX files from a directory
   */
  async loadAllMDX(dir: string = ''): Promise<MDXContent[]> {
    try {
      const dirPath = path.join(process.cwd(), this.contentDir, dir);
      
      if (!fs.existsSync(dirPath)) {
        return [];
      }

      const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.mdx'))
        .map(file => file.replace('.mdx', ''));

      const contents = await Promise.all(
        files.map(slug => this.loadMDX(path.join(dir, slug).replace(/\\/g, '/')))
      );

      return contents.filter((content): content is MDXContent => content !== null);
    } catch (error) {
      console.error(`Error loading MDX files from ${dir}:`, error);
      return [];
    }
  }

  /**
   * Map MDX content to sections based on Master Content Lock structure
   */
  mapMDXToSections(mdxContent: MDXContent): any {
    const { slug, content, frontmatter } = mdxContent;
    
    // Map common MDX files to their corresponding sections
    const sectionMappings: Record<string, string> = {
      'about/michael': 'bio_longform',
      'about/integai': 'intro_platform',
      'hero': 'hero_industrial_v1',
      'capabilities': 'solution_grid_v1',
      'problem': 'problem_panel_v1',
      'ethics': 'ethics_sovereignty_v1',
      'poem': 'poem_panel_v1'
    };

    const sectionId = sectionMappings[slug] || `${slug.replace(/\//g, '_')}_v1`;
    
    return {
      sectionId,
      component: this.getComponentForSection(sectionId),
      props: {
        ...frontmatter,
        content,
        mdx: content.split('\n').filter(line => line.trim())
      }
    };
  }

  /**
   * Get component type based on section ID
   */
  private getComponentForSection(sectionId: string): string {
    const componentMappings: Record<string, string> = {
      'hero_industrial_v1': 'HeroBanner',
      'solution_grid_v1': 'FeatureGrid',
      'problem_panel_v1': 'SplitFeature',
      'ethics_sovereignty_v1': 'SplitFeature',
      'poem_panel_v1': 'PoemPanel',
      'bio_longform': 'BioLongform',
      'intro_platform': 'SplitFeature'
    };

    return componentMappings[sectionId] || 'SectionRenderer';
  }

  /**
   * Load and map MDX content for a specific page
   */
  async loadPageMDX(pageSlug: string): Promise<any[]> {
    const mdxFiles = await this.loadAllMDX(pageSlug);
    return mdxFiles.map(mdx => this.mapMDXToSections(mdx));
  }
}

// Singleton instance
export const mdxLoader = new MDXLoader();
