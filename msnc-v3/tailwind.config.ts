import type { Config } from 'tailwindcss'

const config: Config = {
  // 1. UPDATED CONTENT: Added admin component paths to ensure dashboard styles compile
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload.config.ts', // Scan Payload config for custom UI
  ],

  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', sm: '2rem', md: '3rem', lg: '5rem' },
      screens: { '2xl': '1400px' },
    },

    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // Brand Blues
        primary: {
          DEFAULT: '#002147', // Locked Navy
          foreground: '#ffffff',
          50: '#e6edf5',
          100: '#b3c5d9',
          500: '#002147',
          600: '#001b3c',
        },

        // MSNC Specific Editorial Tones
        ink: {
          DEFAULT: '#10161c',
          500: '#10161c',
        },

        // Pure Light Theme Neutral
        paper: {
          DEFAULT: '#ffffff',
          50: '#FAFAFA', // Section backgrounds
          100: '#F1F5F9', // Grid lines
        },

        maple: {
          DEFAULT: '#c8181c',
          500: '#c8181c',
          600: '#a91416',
        },
      },

      // 2. EDITORIAL BORDERS: Added "rigid" 2px and 3px widths
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        rigid: '2px', // Semantic naming for thesis lines
        masthead: '3px',
      },

      // 3. THESIS GRID: DISABLED to prevent over-gridding
      backgroundImage: {
        'thesis-grid': /* DISABLED Griddy pattern */ 'none',
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        xs: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0.04em' }],
        sm: ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        base: ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        md: ['1.125rem', { lineHeight: '1.65', letterSpacing: '-0.01em' }],
        lg: ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        xl: ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.015em' }],

        // Refined Display Scale (Natural Case Optimization)
        '2xl': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '3xl': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '4xl': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        '5xl': ['clamp(3rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        '6xl': ['clamp(3.5rem, 8vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        '7xl': ['clamp(4rem, 10vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],

        nav: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        label: ['0.5625rem', { lineHeight: '1', letterSpacing: '0.22em' }],
      },

      spacing: {
        masthead: '4.5rem', // 72px consistent header heights
        grid: '32px', // Grid size naming
      },

      boxShadow: {
        sm: '0 2px 8px -1px rgba(0,33,71,0.06)',
        md: '0 4px 16px -2px rgba(0,33,71,0.08)',
        lg: '0 8px 32px -4px rgba(0,33,71,0.10)',
        xl: '0 16px 48px -8px rgba(0,33,71,0.12)',
        '2xl': '0 28px 64px -12px rgba(0,33,71,0.14)',
        thesis: '0 20px 50px -12px rgba(0,33,71,0.04)', // Soft elevation for light theme
      },

      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)', // Snappy for editorial feel
      },

      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },

  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
