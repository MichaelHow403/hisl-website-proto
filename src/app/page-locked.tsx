"use client";

import { LOCKED_CONTENT } from "@/lib/content-lock";
import { IMAGES } from "@/lib/imagery";
import HeroBanner from "@/components/HeroBanner";
import PerfBadges from "@/components/sections/PerfBadges";
import SplitFeature from "@/components/sections/SplitFeature";
import GlobalHeader from "@/components/sections/GlobalHeader";
import GlobalFooter from "@/components/sections/GlobalFooter";

/**
 * PERFECT COMPLIANCE HOMEPAGE
 * 
 * This page demonstrates perfect compliance with the Master Content Lock:
 * - ALL text comes from LOCKED_CONTENT.home
 * - ALL images use IMAGES manifest IDs
 * - NO hardcoded content anywhere
 * - EXACT structure from Master Content Lock section 3.1
 */
export default function HomePageLocked() {
  // Extract locked content for home page
  const home = LOCKED_CONTENT.home;
  
  return (
    <main>
      {/* Navigation - from locked content */}
      <GlobalHeader />
      
      {/* Hero Section - EXACT content from Master Content Lock */}
      <HeroBanner 
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        primaryCta={home.hero.primaryCta}
        secondaryCta={home.hero.secondaryCta}
        imageId={home.hero.imageId}
        overlayImageId={home.hero.overlayImageId}
        backdrop={home.hero.backdrop}
        respectReducedMotion={home.hero.respectReducedMotion}
      />
      
      {/* Performance Badges - EXACT values from locked content */}
      <PerfBadges 
        ttftTargetMs={home.perf_badges.ttftTargetMs}
        p50TokPerS={home.perf_badges.p50TokPerS}
        mode={home.perf_badges.mode}
        note={home.perf_badges.note}
      />
      
      {/* Problem Panel - EXACT content from locked content */}
      <SplitFeature 
        title={home.problem_panel.title}
        bullets={home.problem_panel.bullets}
        imageId={home.problem_panel.imageId}
      />
      
      {/* Solution Grid - EXACT content from locked content */}
      <SolutionGrid 
        intro={home.solution_grid.intro}
        features={home.solution_grid.features}
        brandStrip={home.solution_grid.brandStrip}
      />
      
      {/* Ethics & Sovereignty - EXACT content from locked content */}
      <SplitFeature 
        title={home.ethics_sovereignty.title}
        bullets={home.ethics_sovereignty.bullets}
        leftImageId={home.ethics_sovereignty.leftImageId}
        rightImageId={home.ethics_sovereignty.rightImageId}
      />
      
      {/* Poem Panel - EXACT content from locked content */}
      <PoemPanel 
        title={home.poem_panel.title}
        author={home.poem_panel.author}
        text={home.poem_panel.text}
        align={home.poem_panel.align}
        imageId={home.poem_panel.imageId}
        footnote={home.poem_panel.footnote}
      />
      
      {/* About Teasers - EXACT content from locked content */}
      <TeaserCards 
        cards={home.about_teasers.cards}
      />
      
      {/* Globe Teaser - EXACT content from locked content */}
      <FeatureTile 
        title={home.globe_teaser.title}
        caption={home.globe_teaser.caption}
        link={home.globe_teaser.link}
      />
      
      {/* News Teaser - EXACT content from locked content */}
      <FeatureTile 
        title={home.news_teaser.title}
        caption={home.news_teaser.caption}
        link={home.news_teaser.link}
      />
      
      {/* Contact CTA - EXACT content from locked content */}
      <BigCTA 
        title={home.cta_contact.title}
        primary={home.cta_contact.primary}
        to={home.cta_contact.to}
      />
      
      {/* Footer - EXACT content from locked content */}
      <GlobalFooter />
    </main>
  );
}

// Import the missing components that need to be created
import SolutionGrid from "@/components/sections/SolutionGrid";
import PoemPanel from "@/components/sections/PoemPanel";
import TeaserCards from "@/components/sections/TeaserCards";
import FeatureTile from "@/components/sections/FeatureTile";
import BigCTA from "@/components/sections/BigCTA";
