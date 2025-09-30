// /src/app/lib/imagery.ts
export const IMAGES = {
  // Logos
  integai_logo: "/imagery/logos/integai-logo.png",
  hisl_logo: "/imagery/logos/hisl-logo.jpeg",
  
  // Backgrounds
  hero_space: "/imagery/galaxies/human_AI_space.jpg",
  hero_construction: "/imagery/processed/ai_construction_bridge_banner-1200.webp",
  ai_construction: "/imagery/processed/ai_construction_bridge_banner-1200.webp",
  
  // Globe
  earth_realistic: "/imagery/earth/earth_globe_realistic.png",
  raven_huginn: "/imagery/earth/raven_huginn.png",
  raven_muninn: "/imagery/earth/raven_muninn.png",
  
  // Badges & Icons
  sovereignty_badge: "/imagery/badges/data-sovereignty-badge.png",
  ai_dna: "/imagery/processed/AI_DNA-1200.webp",
  creation_ai: "/imagery/processed/creation_AI.png",
  ireland_landscape: "/imagery/processed/ireland_landscape.jpg",
  inspiring: "/imagery/processed/inspiring.jpg",
  
  // Home page images
  hard_hat_digital: "/imagery/processed/Hard_Hat_ digital_paperwork-1200.webp",
  feather: "/imagery/processed/FeatherPNG.png",
  starfield_poem: "/imagery/starfields/reach_for_the_stars.png",
  michael_portrait: "/imagery/processed/michael_howardbio.jpeg",
  
  // Social icons
  linkedin_icon: "/imagery/logos/linkedin-icon.png",
  substack_icon: "/imagery/logos/substack-icon.png",
  
  // Agent architecture
  honeycomb_agents: "/imagery/processed/hexagonal_honeycomb.png",
  
      // Sector imagery
      ai_brain_network: "/imagery/processed/ai_brain_network-1200.webp",
      friendship: "/imagery/processed/friendship-1200.webp", 
      data_sovereignty_badge: "/imagery/processed/data_sovereignty_badge-1200.webp",
      
      // Contact page imagery
      friendship_contact: "/imagery/processed/friendship.png",
      ai_brain_contact: "/imagery/processed/ai_brain_network.png",
      hard_hat_contact: "/imagery/processed/Hard_Hat_digital_paperwork.jpeg",
  
} as const;

export type ImageId = keyof typeof IMAGES;

export function getImage(id: ImageId): string {
  return IMAGES[id] || '/imagery/earth/earth_fallback.jpg';
}