// /src/app/lib/imagery.ts (authoritative mapping used by UI components)
export const IMAGES = {
  // Home — Hero
  home_hero_main: "ai_construction_bridge_banner.png",
  home_hero_overlay: "ai_technology.jpeg",

  // Home — Problem
  home_problem_main: "Hard_Hat_digital_paperwork.jpeg",

  // Home — Solution
  home_solution_badge: "data_sovereignty_badge.png",
  home_solution_security: "compliance_shield_premium.png",
  home_solution_glyphs: ["globe.svg", "file.svg", "window.svg"],
  home_solution_logos: ["HISL_Logo.jpeg", "integai_logo.png"],

  // Home — Fusion (Ethics)
  fusion_michael: "michael_howardbio.jpeg",
  fusion_ai_ethics: "AI_DNA.png",

  // Home — Poem
  poem_backdrop: "reach_for_the_stars.png",

  // Home — About teasers
  about_teaser_michael: "michael_howardbio.jpeg",
  about_teaser_integai: "integai_logo.png",

  // Globe page (modular assembly)
  globe_base: "earth_globe_realistic.png",
  globe_raven_huginn: "raven_huginn.png",
  globe_raven_muninn: "raven_muninn.png",

  // News
  news_motif: "FeatherPNG",

  // About Michael
  about_michael_portrait: "michael_howardbio.jpeg",
  about_michael_timeline: "ireland_landscape.jpg",

  // About IntegAI
  about_integai_main: "integai_logo.png",

  // Footer / Contact
  footer_accent: "huma_AI-space.jpg",
  footer_logo_hisl: "HISL_Logo.jpeg",
  footer_logo_integai: "integai_logo.png",
} as const;
export type ImageId = keyof typeof IMAGES;
