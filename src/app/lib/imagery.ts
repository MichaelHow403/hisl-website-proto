// /src/app/lib/imagery.ts (authoritative mapping used by UI components)
export const IMAGES = {
  // canonical IDs used by the master
  ai_construction_bridge_banner: "/ai_construction_bridge_banner.png",
  ai_technology: "/ai_technology.jpeg",

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
  // Legacy aliases for filename mismatches
  "ai_construction_bridge_banner": "ai_construction_bridge_banner.png",
  "ai_technology": "ai_technology.jpeg",
  "ai-construction-bridge-banner": "ai_construction_bridge_banner.png",
  "ai technology": "ai_technology.jpeg",
  "HISL_Logo": "HISL_Logo.jpeg",
  "integai_logo": "integai_logo.png",
  "michael_howardbio": "michael_howardbio.jpeg",
  "AI_DNA": "AI_DNA.png",
  "reach_for_the_stars": "reach_for_the_stars.png",
  "huma_AI-space": "huma_AI-space.jpg",
  "ireland_landscape": "ireland_landscape.jpg",
  "earth_globe_realistic": "earth_globe_realistic.png",
  "raven_huginn": "raven_huginn.png",
  "raven_muninn": "raven_muninn.png",
  "FeatherPNG": "FeatherPNG.png",
  "data_sovereignty_badge": "data_sovereignty_badge.png",
  "compliance_shield_premium": "compliance_shield_premium.png",
  "Hard_Hat_digital_paperwork": "Hard_Hat_digital_paperwork.jpeg"
} as const;
export type ImageId = keyof typeof IMAGES;
