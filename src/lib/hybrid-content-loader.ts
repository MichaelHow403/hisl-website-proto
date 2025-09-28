import { LOCKED_CONTENT } from './content-lock';

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
 * Currently using Master Content Lock only (MDX loading moved to server-side)
 */
export async function loadHybridHomeContent(): Promise<HybridSection[]> {
  const sections: HybridSection[] = [];

  // 1. Hero Section - hero_industrial_v1
  sections.push({
    sectionId: 'hero_industrial_v1',
    component: 'HeroCosmic',
    props: {
      headline: LOCKED_CONTENT.home.hero.title,
      subheadline: LOCKED_CONTENT.home.hero.subtitle,
      primaryCTA: LOCKED_CONTENT.home.hero.primaryCta,
      secondaryCTA: LOCKED_CONTENT.home.hero.secondaryCta,
      imageId: LOCKED_CONTENT.home.hero.imageId,
      overlayImageId: LOCKED_CONTENT.home.hero.overlayImageId,
      // Add expanded content from 01-hero.mdx
      expandedContent: `I founded **HISL** and built our platform **IntegAI** because the tools I needed didn't exist: AI that works inside regulated environments, cuts downtime, and drives sustainability — without leaking data to the cloud or breaking compliance.

**What sets us apart:**
- **Built from the field up** — designed by someone delivering projects daily.
- **Sovereign by design** — data stays under your control, within your jurisdiction.
- **Auditable & ethical** — every run is logged, hashed, and replayable.
- **Energy-aware** — orchestration minimises carbon footprint and shows the true energy cost of AI.
- **Human + AI partnership** — practical expertise amplified by transparent intelligence.`
    }
  });

  // 2. Problem Panel - problem_panel_v1
  sections.push({
    sectionId: 'problem_panel_v1',
    component: 'SplitFeature',
    props: {
      title: LOCKED_CONTENT.home.problem.title,
      bullets: LOCKED_CONTENT.home.problem.bullets,
      imageId: LOCKED_CONTENT.home.problem.imageId
    }
  });

  // 3. Solution Grid - solution_grid_v1
  sections.push({
    sectionId: 'solution_grid_v1',
    component: 'FeatureGrid',
    props: {
      intro: LOCKED_CONTENT.home.solution.intro,
      features: LOCKED_CONTENT.home.solution.features,
      brandStrip: LOCKED_CONTENT.home.solution.brandStrip
    }
  });

  // 4. Ethics Section - ethics_sovereignty_v1
  sections.push({
    sectionId: 'ethics_sovereignty_v1',
    component: 'SplitFeature',
    props: {
      title: LOCKED_CONTENT.home.ethics.title,
      bullets: LOCKED_CONTENT.home.ethics.bullets,
      leftImageId: LOCKED_CONTENT.home.ethics.leftImageId,
      rightImageId: LOCKED_CONTENT.home.ethics.rightImageId
    }
  });

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

  // 7. Globe Teaser - globe_teaser_v1
  sections.push({
    sectionId: 'globe_teaser_v1',
    component: 'FeatureTile',
    props: LOCKED_CONTENT.home.globeTeaser
  });

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
