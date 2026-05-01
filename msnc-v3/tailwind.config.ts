import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload.config.ts',
  ],

  theme: {
    /* ── Override (not extend) container — we use .container-editorial instead ── */
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '3rem',
        lg: '5rem',
      },
      screens: { '2xl': '1400px' },
    },

    extend: {
      /* ── Fonts ─────────────────────────────────────────────────────────── */
      fontFamily: {
        sans:    ['var(--font-sans)',    'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia',       'serif'],
        mono:    ['var(--font-mono)',    'ui-monospace',  'monospace'],
      },

      /* ── Brand colors ──────────────────────────────────────────────────── */
      colors: {
        border:     'hsl(var(--border))',
        input:      'hsl(var(--input))',
        ring:       'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50:  '#e6edf5',
          100: '#b3c5d9',
          500: '#002147',
          600: '#001b3c',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        ink: {
          DEFAULT: '#10161c',
          500:     '#10161c',
        },
        paper: {
          DEFAULT: '#ffffff',
          50:      '#fafafa',
          100:     '#f1f5f9',
        },
        maple: {
          DEFAULT: '#c8181c',
          500:     '#c8181c',
          600:     '#a91416',
        },
      },

      /* ── Spacing ───────────────────────────────────────────────────────── */
      spacing: {
        masthead: '4.5rem',  /* 72px — header height token */
        grid:     '2rem',    /* 32px — base grid unit      */
      },

      /* ── Border widths ─────────────────────────────────────────────────── */
      borderWidth: {
        DEFAULT:  '1px',
        '2':      '2px',
        '3':      '3px',
        rigid:    '2px',
        masthead: '3px',
      },

      /* ── Type scale ────────────────────────────────────────────────────── 
         clamp() values on display sizes for fluid type.
         Small utility sizes have explicit tracking built in.
      ─────────────────────────────────────────────────────────────────────── */
      fontSize: {
        '2xs': ['0.625rem',  { lineHeight: '1rem',   letterSpacing: '0.05em'  }],
        xs:    ['0.75rem',   { lineHeight: '1.125rem', letterSpacing: '0.04em' }],
        sm:    ['0.8125rem', { lineHeight: '1.25rem',  letterSpacing: '0.01em' }],
        base:  ['1rem',      { lineHeight: '1.6',      letterSpacing: '0'      }],
        md:    ['1.0625rem', { lineHeight: '1.75',     letterSpacing: '-0.01em'}],
        lg:    ['1.25rem',   { lineHeight: '1.6',      letterSpacing: '-0.01em'}],
        xl:    ['1.5rem',    { lineHeight: '1.4',      letterSpacing: '-0.015em'}],

        '2xl': ['clamp(1.5rem,  3vw, 2rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
        '3xl': ['clamp(2rem,    4vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        '4xl': ['clamp(2.5rem,  5vw, 3.5rem)',  { lineHeight: '1.02', letterSpacing: '-0.03em'  }],
        '5xl': ['clamp(3rem,    6vw, 4.5rem)',   { lineHeight: '1',    letterSpacing: '-0.035em' }],
        '6xl': ['clamp(3.5rem,  8vw, 5.5rem)',   { lineHeight: '0.95', letterSpacing: '-0.04em'  }],
        '7xl': ['clamp(4rem,   10vw, 7rem)',      { lineHeight: '0.92', letterSpacing: '-0.045em' }],

        nav:   ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em'  }],
        label: ['0.5625rem', { lineHeight: '1', letterSpacing: '0.22em'  }],
      },

      /* ── Shadows ───────────────────────────────────────────────────────── */
      boxShadow: {
        sm:     '0 2px 8px -1px rgba(0,33,71,0.06)',
        md:     '0 4px 16px -2px rgba(0,33,71,0.08)',
        lg:     '0 8px 32px -4px rgba(0,33,71,0.10)',
        xl:     '0 16px 48px -8px rgba(0,33,71,0.12)',
        '2xl':  '0 28px 64px -12px rgba(0,33,71,0.14)',
        brand:  '0 20px 40px -12px rgba(0,33,71,0.18)',
        thesis: '0 20px 50px -12px rgba(0,33,71,0.04)',
      },

      /* ── Easing ────────────────────────────────────────────────────────── */
      transitionTimingFunction: {
        spring:    'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo':'cubic-bezier(0.16, 1, 0.3, 1)',
      },

      /* ── Animations (keyframes defined in globals.css) ─────────────────── */
      animation: {
        'fade-up':    'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fade-in 0.4s ease both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'marquee':    'marquee 40s linear infinite',
      },
    },
  },

  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}

export default config