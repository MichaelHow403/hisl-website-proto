import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./docs/**/*.{md,mdx}"
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
        xl: '0.9rem',
        '2xl': '1rem',
        '3xl': '1.5rem'
      },
      maxWidth: {
        wrap: '1200px'
      },
      spacing: {
        '18': '4.5rem'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#a8b8d6', // muted
            h1: {
              color: '#d4af37', // brandGold
              fontFamily: 'Spectral, serif',
              fontSize: '3rem', // 3xl
              fontWeight: '700',
              lineHeight: '1.1',
              marginTop: '0',
              marginBottom: '1.5rem',
            },
            h2: {
              color: '#d4af37', // brandGold
              fontFamily: 'Spectral, serif',
              fontSize: '2.25rem', // 2xl
              fontWeight: '600',
              lineHeight: '1.2',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#e8f0ff', // text
              fontFamily: 'Spectral, serif',
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              color: '#e8f0ff', // text
              fontFamily: 'Spectral, serif',
              fontSize: '1.25rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            p: {
              color: '#a8b8d6', // muted
              lineHeight: '1.8', // Better line-height for body text
              marginTop: '0',
              marginBottom: '1.25rem',
            },
            a: {
              color: '#d4af37', // brandGold
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              '&:hover': {
                textDecoration: 'underline',
                color: '#e8f0ff', // text
                textDecorationThickness: '2px',
                textUnderlineOffset: '2px',
              },
            },
            strong: {
              color: '#e8f0ff', // text
              fontWeight: '600',
            },
            code: {
              color: '#d4af37', // brandGold
              backgroundColor: '#0a0f1a', // Darker background
              padding: '0.375rem 0.75rem', // Better padding
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid #1e2a42', // edge
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#0a0f1a', // Darker background for code blocks
              border: '1px solid #1e2a42', // edge
              borderRadius: '0.75rem',
              padding: '2rem', // Better padding
              overflow: 'auto',
              color: '#a8b8d6', // muted
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              borderRadius: '0',
              fontSize: '0.875rem',
              color: '#e8f0ff', // text color for better contrast
            },
            blockquote: {
              borderLeft: '6px solid #d4af37', // brandGold - left border accent
              backgroundColor: '#0f1828', // panel
              padding: '1.5rem 2rem',
              borderRadius: '0.5rem',
              fontStyle: 'italic',
              color: '#a8b8d6', // muted
              margin: '1.5rem 0',
              position: 'relative',
              '&::before': {
                content: '"❝"',
                color: '#d4af37',
                fontSize: '2rem',
                position: 'absolute',
                top: '-0.5rem',
                left: '1rem',
                lineHeight: '1',
              },
            },
            ul: {
              color: '#a8b8d6', // muted
              paddingLeft: '1.5rem',
            },
            ol: {
              color: '#a8b8d6', // muted
              paddingLeft: '1.5rem',
            },
            li: {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
              lineHeight: '1.6',
            },
            hr: {
              borderColor: '#1e2a42', // edge
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'thead th': {
              backgroundColor: '#0f1828', // panel
              color: '#d4af37', // brandGold
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '600',
              borderBottom: '1px solid #1e2a42', // edge
            },
            'tbody td': {
              padding: '0.75rem',
              borderBottom: '1px solid #1e2a42', // edge
              color: '#a8b8d6', // muted
            },
            'tbody tr:hover': {
              backgroundColor: '#0f1828', // panel
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
