export const IMAGERY_MANIFEST = {
  earth_realistic: {
    src: '/imagery/earth/earth-globe-realistic.png',
    alt: 'Realistic Earth globe rendering'
  },
  earth_daymap: {
    src: '/imagery/earth/earth-daymap.jpg', 
    alt: 'Earth daytime satellite view'
  },
  earth_base: {
    src: '/imagery/earth/earth.jpg',
    alt: 'Earth from space'
  },
  space_background: {
    src: '/imagery/space/huma-ai-space.jpg',
    alt: 'AI space background with neural networks'
  },
  creation_ai: {
    src: '/imagery/space/creation-ai.png',
    alt: 'AI creation visualization'
  },
  hisl_logo: {
    src: '/imagery/logos/hisl-logo.jpeg',
    alt: 'HISL company logo'
  },
  integai_logo: {
    src: '/imagery/logos/integai-logo.png',
    alt: 'IntegAI platform logo'
  },
  sovereignty_badge: {
    src: '/imagery/badges/data-sovereignty-badge.png',
    alt: 'Data sovereignty compliance badge'
  },
  ireland_landscape: {
    src: '/imagery/landscapes/ireland-landscape.jpg',
    alt: 'Irish landscape'
  },
  globe_with_ravens: {
    src: '/imagery/composite/globe-3d-with-ravens.png',
    alt: 'Earth globe with Huginn and Muninn ravens'
  }
} as const;

export type AssetId = keyof typeof IMAGERY_MANIFEST;
