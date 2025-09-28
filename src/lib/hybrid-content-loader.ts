import { LOCKED_CONTENT } from './content-lock';
import { loadMDXContent, parseMDXForComponent } from './mdx-content';

/**
 * Hybrid Content Loader
 * Combines Master Content Lock structure with rich MDX content
 * Master Content Lock = Framework + Key Messages
 * MDX Files = Rich Content Details
 */

export interface HybridSection {
  // Master Content Lock structure
  sectionId: string;
  component: string;
  props: any;
  
  // MDX enrichment
  mdxContent?: {
    title: string;
    subtitle: string;
    content: string;
    frontmatter: Record<string, any>;
  };
}

/**
 * Load hybrid content for home page sections
 */
export async function loadHybridHomeContent(): Promise<HybridSection[]> {
  const sections: HybridSection[] = [];

  // 1. Hero Section - hero_industrial_v1 + 01-hero.mdx
  try {
    const heroMDX = loadMDXContent('01-hero');
    const heroData = parseMDXForComponent(heroMDX);
    
    sections.push({
      sectionId: 'hero_industrial_v1',
      component: 'HeroCosmic',
      props: {
        // Master Content Lock structure
        headline: LOCKED_CONTENT.home.hero.title,
        subheadline: LOCKED_CONTENT.home.hero.subtitle,
        primaryCTA: LOCKED_CONTENT.home.hero.primaryCta,
        secondaryCTA: LOCKED_CONTENT.home.hero.secondaryCta,
        imageId: LOCKED_CONTENT.home.hero.imageId,
        overlayImageId: LOCKED_CONTENT.home.hero.overlayImageId,
        // MDX enrichment
        mdxContent: heroData,
        expandedContent: heroData.content
      }
    });
  } catch (error) {
    console.error('Error loading hero MDX:', error);
    // Fallback to Master Content Lock only
    sections.push({
      sectionId: 'hero_industrial_v1',
      component: 'HeroCosmic',
      props: LOCKED_CONTENT.home.hero
    });
  }

  // 2. Problem Panel - problem_panel_v1 + 02-capabilities.mdx
  try {
    const capabilitiesMDX = loadMDXContent('02-capabilities');
    const capabilitiesData = parseMDXForComponent(capabilitiesMDX);
    
    sections.push({
      sectionId: 'problem_panel_v1',
      component: 'SplitFeature',
      props: {
        // Master Content Lock structure
        title: LOCKED_CONTENT.home.problem.title,
        bullets: LOCKED_CONTENT.home.problem.bullets,
        imageId: LOCKED_CONTENT.home.problem.imageId,
        // MDX enrichment
        mdxContent: capabilitiesData,
        detailedExplanations: extractDetailedExplanations(capabilitiesData.content)
      }
    });
  } catch (error) {
    console.error('Error loading capabilities MDX:', error);
    sections.push({
      sectionId: 'problem_panel_v1',
      component: 'SplitFeature',
      props: LOCKED_CONTENT.home.problem
    });
  }

  // 3. Solution Grid - solution_grid_v1 + 03-features.mdx
  try {
    const featuresMDX = loadMDXContent('03-features');
    const featuresData = parseMDXForComponent(featuresMDX);
    
    sections.push({
      sectionId: 'solution_grid_v1',
      component: 'FeatureGrid',
      props: {
        // Master Content Lock structure
        intro: LOCKED_CONTENT.home.solution.intro,
        features: LOCKED_CONTENT.home.solution.features,
        brandStrip: LOCKED_CONTENT.home.solution.brandStrip,
        // MDX enrichment
        mdxContent: featuresData,
        enhancedFeatures: enhanceFeaturesWithMDX(LOCKED_CONTENT.home.solution.features, featuresData.content)
      }
    });
  } catch (error) {
    console.error('Error loading features MDX:', error);
    sections.push({
      sectionId: 'solution_grid_v1',
      component: 'FeatureGrid',
      props: LOCKED_CONTENT.home.solution
    });
  }

  // 4. Ethics Section - ethics_sovereignty_v1 + 04-ethos.mdx
  try {
    const ethosMDX = loadMDXContent('04-ethos');
    const ethosData = parseMDXForComponent(ethosMDX);
    
    sections.push({
      sectionId: 'ethics_sovereignty_v1',
      component: 'SplitFeature',
      props: {
        // Master Content Lock structure
        title: LOCKED_CONTENT.home.ethics.title,
        bullets: LOCKED_CONTENT.home.ethics.bullets,
        leftImageId: LOCKED_CONTENT.home.ethics.leftImageId,
        rightImageId: LOCKED_CONTENT.home.ethics.rightImageId,
        // MDX enrichment
        mdxContent: ethosData,
        philosophicalContent: ethosData.content,
        craftsmanPrinciples: extractCraftsmanPrinciples(ethosData.content)
      }
    });
  } catch (error) {
    console.error('Error loading ethos MDX:', error);
    sections.push({
      sectionId: 'ethics_sovereignty_v1',
      component: 'SplitFeature',
      props: LOCKED_CONTENT.home.ethics
    });
  }

  // 5. Poem Panel - poem_panel_v1 (keep as is - locked verbatim)
  sections.push({
    sectionId: 'poem_panel_v1',
    component: 'PoemPanel',
    props: {
      title: "",
      author: "The Craftsman's Creed",
      text: "Then prove we now with best endevour, what from our efforts yet may spring; he justly is dispised who never, did thought to aide his labours bring; for this is arts true indication - when skill is minister to thought, when types that are the minds creation - the hand to perfect form has wrought",
      align: "center",
      imageId: "poem_backdrop",
      footnote: "Locked verbatim; guarded by SHA‑256 in build."
    }
  });

  // 6. About Teasers - about_teasers_v1
  sections.push({
    sectionId: 'about_teasers_v1',
    component: 'TeaserCards',
    props: LOCKED_CONTENT.home.aboutTeasers
  });

  // 7. Globe Teaser - globe_teaser_v1 + 05-globe-teaser.mdx
  try {
    const globeMDX = loadMDXContent('05-globe-teaser');
    const globeData = parseMDXForComponent(globeMDX);
    
    sections.push({
      sectionId: 'globe_teaser_v1',
      component: 'FeatureTile',
      props: {
        // Master Content Lock structure
        title: LOCKED_CONTENT.home.globeTeaser.title,
        caption: LOCKED_CONTENT.home.globeTeaser.caption,
        link: LOCKED_CONTENT.home.globeTeaser.link,
        // MDX enrichment
        mdxContent: globeData,
        detailedDescription: globeData.content
      }
    });
  } catch (error) {
    console.error('Error loading globe teaser MDX:', error);
    sections.push({
      sectionId: 'globe_teaser_v1',
      component: 'FeatureTile',
      props: LOCKED_CONTENT.home.globeTeaser
    });
  }

  // 8. News Teaser - news_teaser_v1
  sections.push({
    sectionId: 'news_teaser_v1',
    component: 'FeatureTile',
    props: LOCKED_CONTENT.home.newsTeaser
  });

  // 9. Contact CTA - cta_contact_v1
  sections.push({
    sectionId: 'cta_contact_v1',
    component: 'BigCTA',
    props: LOCKED_CONTENT.home.ctaContact
  });

  return sections;
}

/**
 * Extract detailed explanations from capabilities MDX content
 */
function extractDetailedExplanations(content: string): Record<string, string> {
  const explanations: Record<string, string> = {};
  const lines = content.split('\n');
  
  let currentSection = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      currentSection = trimmed.replace('### ', '');
    } else if (trimmed && currentSection) {
      explanations[currentSection] = (explanations[currentSection] || '') + trimmed + ' ';
    }
  }
  
  return explanations;
}

/**
 * Enhance features with MDX content
 */
function enhanceFeaturesWithMDX(lockedFeatures: any[], mdxContent: string): any[] {
  const mdxFeatures = extractFeaturesFromMDX(mdxContent);
  
  return lockedFeatures.map(lockedFeature => {
    const mdxFeature = mdxFeatures.find(mf => 
      mf.title.toLowerCase().includes(lockedFeature.title.toLowerCase().split(' ')[0]) ||
      lockedFeature.title.toLowerCase().includes(mf.title.toLowerCase().split(' ')[0])
    );
    
    return {
      ...lockedFeature,
      // Keep locked structure but enhance with MDX details
      enhancedDesc: mdxFeature ? mdxFeature.desc : lockedFeature.desc,
      technicalDetails: mdxFeature ? mdxFeature.technicalDetails : undefined
    };
  });
}

/**
 * Extract features from MDX content
 */
function extractFeaturesFromMDX(content: string): any[] {
  const features: any[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- **') && trimmed.includes('** —')) {
      const match = trimmed.match(/- \*\*(.+?)\*\* — (.+)/);
      if (match) {
        features.push({
          title: match[1],
          desc: match[2],
          technicalDetails: match[2] // Could be enhanced with more parsing
        });
      }
    }
  }
  
  return features;
}

/**
 * Extract craftsman principles from ethos MDX content
 */
function extractCraftsmanPrinciples(content: string): string[] {
  const principles: string[] = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('> ')) {
      principles.push(trimmed.replace('> ', ''));
    }
  }
  
  return principles;
}
