export type ImgRole = "hero" | "section" | "badge" | "avatar" | "sprite" | "gallery";

export type ImgMeta = {
  id: string;
  src: string; // public path
  alt: string;
  role: ImgRole;
  aspect?: string; // e.g. "16/9", "4/3", "1/1"
  focal?: [number, number]; // 0..1, x/y focal point for objectPosition
  tags?: string[];
};

export const IMAGES: ImgMeta[] = [
  {
    id: "reach_for_the_stars",
    src: "/imagery/starfields/reach_for_the_stars.png",
    alt: "Silhouette reaching toward a luminous starfield.",
    role: "hero",
    aspect: "16/9",
    focal: [0.45, 0.35],
    tags: ["space", "cta"]
  },
  {
    id: "globe_3d_with_ravens",
    src: "/imagery/earth/globe_3d_with_ravens.png",
    alt: "3D earth with stylized ravens in orbit.",
    role: "section",
    aspect: "16/9",
    focal: [0.56, 0.42],
    tags: ["globe", "brand", "motion"]
  },
  {
    id: "ai_construction_bridge_banner",
    src: "/imagery/processed/ai_construction_bridge_banner.png",
    alt: "Bridge construction scene augmented by AI overlays.",
    role: "section",
    aspect: "21/9",
    focal: [0.6, 0.5],
    tags: ["industry", "engineering"]
  },
  {
    id: "AI_DNA",
    src: "/imagery/processed/AI_DNA.png",
    alt: "Abstract double helix made of circuitry.",
    role: "section",
    aspect: "4/3",
    focal: [0.5, 0.4],
    tags: ["biology", "innovation"]
  },
  {
    id: "human_AI_space",
    src: "/imagery/galaxies/human_AI_space.jpg",
    alt: "Human hand meeting a cosmic energy trail.",
    role: "section",
    aspect: "16/9",
    focal: [0.35, 0.5],
    tags: ["vision"]
  },
  {
    id: "data_sovereignty_badge",
    src: "/imagery/processed/data_sovereignty_badge.png",
    alt: "Data sovereignty badge.",
    role: "badge",
    aspect: "1/1",
    tags: ["trust"]
  },
  {
    id: "compliance_shield",
    src: "/imagery/processed/compliance_shield_premium.png",
    alt: "Premium compliance shield emblem.",
    role: "badge",
    aspect: "1/1",
    tags: ["compliance"]
  },
  {
    id: "michael_headshot",
    src: "/imagery/processed/michael_howardbio.jpeg",
    alt: "Michael Howard, founder portrait.",
    role: "avatar",
    aspect: "1/1",
    tags: ["about"]
  },
  {
    id: "raven_huginn",
    src: "/imagery/processed/raven_huginn.png",
    alt: "Raven crest—Huginn.",
    role: "sprite",
    aspect: "1/1",
    tags: ["brand", "sprite"]
  },
  {
    id: "raven_muninn",
    src: "/imagery/processed/raven_muninn.png",
    alt: "Raven crest—Muninn.",
    role: "sprite",
    aspect: "1/1",
    tags: ["brand", "sprite"]
  },
  // Gallery defaults: anything not explicitly placed goes in the gallery
  {
    id: "ai_technology",
    src: "/imagery/processed/ai_technology.jpeg",
    alt: "Futuristic circuit board and AI interface.",
    role: "gallery",
    aspect: "3/2"
  },
  {
    id: "ireland_landscape",
    src: "/imagery/processed/ireland_landscape.jpg",
    alt: "Green Irish landscape with bright skies.",
    role: "gallery",
    aspect: "3/2"
  },
  {
    id: "earth_globe_realistic",
    src: "/imagery/earth/earth_globe_realistic.png",
    alt: "Realistic Earth globe on black.",
    role: "gallery",
    aspect: "1/1"
  },
  {
    id: "elevation",
    src: "/imagery/processed/elevation.jpg",
    alt: "Climber ascending toward sunlight.",
    role: "gallery",
    aspect: "3/2"
  },
  // Starfield backgrounds
  {
    id: "starfield_cosmic",
    src: "/imagery/starfields/starfield_cosmic.jpg",
    alt: "Deep space starfield with cosmic nebulae.",
    role: "hero",
    aspect: "16/9",
    focal: [0.5, 0.4],
    tags: ["space", "background"]
  },
  {
    id: "galaxy_spiral",
    src: "/imagery/galaxies/galaxy_spiral.jpg",
    alt: "Spiral galaxy with bright core.",
    role: "section",
    aspect: "16/9",
    focal: [0.5, 0.5],
    tags: ["space", "galaxy"]
  }
];

// Helper functions for working with the imagery manifest
export function getImageById(id: string): ImgMeta | undefined {
  return IMAGES.find(img => img.id === id);
}

export function getImagesByRole(role: ImgRole): ImgMeta[] {
  return IMAGES.filter(img => img.role === role);
}

export function getImagesByTag(tag: string): ImgMeta[] {
  return IMAGES.filter(img => img.tags?.includes(tag));
}

export function getHeroImages(): ImgMeta[] {
  return getImagesByRole("hero");
}

export function getSectionImages(): ImgMeta[] {
  return getImagesByRole("section");
}

export function getBadgeImages(): ImgMeta[] {
  return getImagesByRole("badge");
}

export function getSpriteImages(): ImgMeta[] {
  return getImagesByRole("sprite");
}

export function getGalleryImages(): ImgMeta[] {
  return getImagesByRole("gallery");
}
