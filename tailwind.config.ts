import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        spectral: ['Spectral', 'serif'],
      },
      colors: {
        bg: '#0b1220',
        panel: '#0f1828',
        edge: '#1e2a42',
        text: '#e8f0ff',
        muted: '#a8b8d6',
        brandGold: '#d4af37',
        aiGreen: '#39d7c9',
        focus: '#9ec5ff',
        danger: '#ff6b6b',
        ok: '#34d399'
      },
      boxShadow: {
        glow: '0 0 40px rgba(57,215,201,.25)',
        focus: '0 0 0 3px rgba(158,197,255,.45)',
      },
      borderRadius: {
        xl: '0.9rem'
      },
      maxWidth: {
        wrap: '1200px'
      },
      spacing: {
        '18': '4.5rem'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
