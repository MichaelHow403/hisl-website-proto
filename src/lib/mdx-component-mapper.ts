import { loadMDXContent, parseMDXForComponent } from './mdx-content';

/**
 * MDX to Component Mapping
 * Maps numbered MDX files to their corresponding React components
 */
export const MDX_COMPONENT_MAP = {
  '01-hero': 'HeroCosmic',
  '02-capabilities': 'SplitFeature', // Problem section
  '03-features': 'FeatureGrid', // Solution features
  '04-ethos': 'PoemPanel', // The craftsman's creed
  '05-globe-teaser': 'FeatureTile', // Globe teaser
  '05-chat-preview': 'PromptConsole', // Chat preview
  '06-projects-matrix': 'AgentsMatrix', // Projects/sectors matrix
  '08-where-your-prompts-go': 'GlobeSection', // Globe visualization
  '97-wireframe-ia': 'InfoArchitecture', // Information architecture
  '98-where-your-prompts-go': 'GlobeSection', // Duplicate globe section
  '99-footer': 'GlobalFooter', // Footer
  '99-website-schema': 'SchemaInfo' // Website schema info
} as const;

/**
 * Load MDX content for a specific component
 */
export function loadMDXForComponent(mdxFile: string) {
  try {
    const mdxContent = loadMDXContent(mdxFile);
    return parseMDXForComponent(mdxContent);
  } catch (error) {
    console.error(`Error loading MDX for ${mdxFile}:`, error);
    return null;
  }
}

/**
 * Get all MDX files that should be rendered on the home page
 */
export function getHomePageMDXFiles(): string[] {
  return [
    '01-hero',
    '02-capabilities', 
    '03-features',
    '04-ethos',
    '05-globe-teaser',
    '06-projects-matrix',
    '08-where-your-prompts-go',
    '99-footer'
  ];
}

/**
 * Get component props from MDX content
 */
export function getComponentPropsFromMDX(mdxFile: string, componentType: string) {
  const mdxData = loadMDXForComponent(mdxFile);
  if (!mdxData) return {};

  switch (componentType) {
    case 'HeroCosmic':
      return {
        headline: mdxData.title,
        subheadline: mdxData.subtitle,
        primaryCTA: mdxData.cta,
        imageId: mdxData.media?.src ? 'home_hero_main' : undefined
      };
    
    case 'SplitFeature':
      return {
        title: mdxData.title,
        subtitle: mdxData.subtitle,
        bullets: extractBulletsFromContent(mdxData.content)
      };
    
    case 'FeatureGrid':
      return {
        title: mdxData.title,
        subtitle: mdxData.subtitle,
        features: extractFeaturesFromContent(mdxData.content)
      };
    
    case 'PoemPanel':
      return {
        title: mdxData.title,
        author: mdxData.subtitle,
        text: extractPoemText(mdxData.content)
      };
    
    case 'FeatureTile':
      return {
        title: mdxData.title,
        caption: mdxData.subtitle,
        link: mdxData.cta?.href || '/globe'
      };
    
    case 'AgentsMatrix':
      return {
        title: mdxData.title,
        subtitle: mdxData.subtitle,
        sectors: extractSectorsFromContent(mdxData.content)
      };
    
    case 'GlobalFooter':
      return {
        title: mdxData.title,
        subtitle: mdxData.subtitle
      };
    
    default:
      return {
        title: mdxData.title,
        subtitle: mdxData.subtitle,
        content: mdxData.content
      };
  }
}

/**
 * Extract bullet points from MDX content
 */
function extractBulletsFromContent(content: string): string[] {
  const bullets: string[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      // Extract the main point
      const mainPoint = trimmed.replace('### ', '');
      bullets.push(mainPoint);
    } else if (trimmed.startsWith('- ')) {
      // Extract sub-bullets
      const subPoint = trimmed.replace('- ', '');
      bullets.push(subPoint);
    }
  }
  
  return bullets;
}

/**
 * Extract features from MDX content
 */
function extractFeaturesFromContent(content: string): Array<{title: string, desc: string}> {
  const features: Array<{title: string, desc: string}> = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- **') && trimmed.includes('** —')) {
      const match = trimmed.match(/- \*\*(.+?)\*\* — (.+)/);
      if (match) {
        features.push({
          title: match[1],
          desc: match[2]
        });
      }
    }
  }
  
  return features;
}

/**
 * Extract poem text from MDX content
 */
function extractPoemText(content: string): string {
  // Remove markdown formatting and extract the poem
  return content
    .replace(/^> /gm, '') // Remove blockquote markers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold formatting
    .replace(/<div[^>]*>.*?<\/div>/g, '') // Remove div tags
    .trim();
}

/**
 * Extract sectors from MDX content
 */
function extractSectorsFromContent(content: string): string[] {
  // This would need to be customized based on the actual content structure
  return ['Construction', 'Environmental', 'Conservation', 'Pharma', 'Agriculture', 'Healthcare', 'Insurance', 'Custom'];
}
