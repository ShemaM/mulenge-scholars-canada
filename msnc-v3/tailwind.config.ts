import type { Config } from "tailwindcss";

/**
 * ═══════════════════════════════════════════════════════════════
 * MSNC DESIGN SYSTEM — tailwind.config.ts
 * ═══════════════════════════════════════════════════════════════
 *
 * RULE: Every value used in any component comes from this file.
 *       No component may contain raw hex, px, ms, or cubic-bezier.
 *
 * COLOR PALETTE — derived directly from logo-original.png:
 *
 *   NAVY   #002147  ← dominant wordmark + book deep spine
 *   OCEAN  #005490  ← book mid-layer, figure body
 *   SKY    #0369a1  ← existing secondary (close to #0c549c)
 *   STEEL  #3c84b4  ← book mid-page highlight
 *   MIST   #78b4d8  ← book outer page shimmer
 *   CLOUD  #84c0e4  ← lightest book highlight
 *   INK    #10161c  ← dark figure silhouette
 *   MAPLE  #c8181c  ← Canadian flag red
 *   GOLD   #e4d131  ← DRC star yellow
 *   WHITE  #ffffff  ← logo page white / page whites
 *
 *   Semantic UI additions (not in logo but required by system):
 *   SUCCESS  green family
 *   WARNING  amber family (warm yellow, distinct from GOLD)
 *   DANGER   deeper red, distinct from MAPLE CTA
 *
 * ═══════════════════════════════════════════════════════════════
 */

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    // ── Container ────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", sm: "2rem", md: "3rem", lg: "5rem" },
      screens: { "2xl": "1400px" },
    },

    extend: {
      // ── Colors ───────────────────────────────────────────────────────────
      // All sourced from logo. Semantic roles mapped to CSS vars in globals.css.
      colors: {
        // shadcn/radix integration — CSS var bridging
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // ── BRAND BLUES (all from logo scan) ──────────────────────────────
        primary: {
          DEFAULT:    "hsl(var(--primary))",      // #002147 navy
          foreground: "hsl(var(--primary-foreground))",
          // Tonal steps — use instead of opacity tricks
          50:  "#e6edf5",   // near-white tint for hover washes
          100: "#b3c5d9",
          200: "#80a0bf",
          300: "#4d7aa5",
          400: "#26558a",
          500: "#002147",   // base navy — wordmark, deep spine
          600: "#001b3c",
          700: "#001531",
          800: "#000e1f",
          900: "#00070e",
        },

        ocean: {
          // #005490 — book mid-layer, figure body fill
          DEFAULT: "#005490",
          50:  "#e6f0f8",
          100: "#b3d0e8",
          200: "#80b0d7",
          300: "#4d90c7",
          400: "#2670b8",
          500: "#005490",
          600: "#00477a",
          700: "#003963",
          800: "#002b4d",
          900: "#001d36",
        },

        sky: {
          // #0369a1 — existing secondary, close to #0c549c from logo
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50:  "#e6f3fb",
          100: "#b3d9f4",
          200: "#80bfec",
          300: "#4da5e5",
          400: "#268bdd",
          500: "#0369a1",
          600: "#025888",
          700: "#02476e",
          800: "#013655",
          900: "#01253b",
        },

        steel: {
          // #3c84b4 — book mid-page highlights
          DEFAULT: "#3c84b4",
          50:  "#eef5fa",
          100: "#cce1f1",
          200: "#a9cce8",
          300: "#87b8de",
          400: "#64a3d5",
          500: "#3c84b4",
          600: "#326e97",
          700: "#27597a",
          800: "#1d435d",
          900: "#122d40",
        },

        mist: {
          // #78b4d8 — lighter book shimmer
          DEFAULT: "#78b4d8",
          50:  "#f0f8fc",
          100: "#d5ebf5",
          200: "#b9dded",
          300: "#9ecfe6",
          400: "#8bc1de",
          500: "#78b4d8",
          600: "#5698bf",
          700: "#3d7ca5",
          800: "#27608b",
          900: "#154471",
        },

        cloud: {
          // #84c0e4 — lightest book highlight / hero backgrounds
          DEFAULT: "#84c0e4",
          50:  "#f2f9fd",
          100: "#d9eef8",
          200: "#bfe2f2",
          300: "#a5d6ec",
          400: "#95cbe8",
          500: "#84c0e4",
          600: "#5eaad7",
          700: "#3a93ca",
          800: "#267dbc",
          900: "#1667ae",
        },

        // ── NEUTRALS ──────────────────────────────────────────────────────
        ink: {
          // #10161c — dark figure silhouette, high-contrast text
          DEFAULT: "#10161c",
          50:  "#eceef0",
          100: "#c5cad0",
          200: "#9ea6af",
          300: "#77828e",
          400: "#586470",
          500: "#10161c",
          600: "#0d1218",
          700: "#0a0e13",
          800: "#060a0d",
          900: "#030507",
        },

        neutral: {
          // Warm-tinted to harmonise with navy
          50:  "#F9F6F1",
          100: "#F0ECE4",
          200: "#E1D9CC",
          300: "#C3B8A8",
          400: "#A09180",
          500: "#7D6E5F",
          600: "#5A5048",
          700: "#3D3630",
          800: "#241F1A",
          900: "#100D0A",
        },

        // ── CANADIAN MAPLE RED ─────────────────────────────────────────────
        // From Canada flag in logo: #c8181c
        // Used for: CTAs, donate button, "Support Us", primary actions
        // NOT used for: danger/error states (separate token below)
        maple: {
          DEFAULT: "#c8181c",
          50:  "#fde8e8",
          100: "#f9bcbc",
          200: "#f48f8f",
          300: "#ef6262",
          400: "#ea3535",
          500: "#c8181c",
          600: "#a91416",
          700: "#8b1011",
          800: "#6c0c0d",
          900: "#4e0808",
        },

        // ── DRC GOLD ───────────────────────────────────────────────────────
        // From DRC star in logo: #e4d131
        // Used for: highlights, badges, achievement markers, featured tags
        gold: {
          DEFAULT: "#e4d131",
          50:  "#fdfce6",
          100: "#f9f5b3",
          200: "#f5ed80",
          300: "#ede552",
          400: "#e7db3a",
          500: "#e4d131",
          600: "#c2b12a",
          700: "#a09122",
          800: "#7e711a",
          900: "#5c5112",
        },

        // ── SEMANTIC STATUS (UI only — not brand colors) ───────────────────
        // These are DISTINCT from brand colors to avoid confusion.
        // success ≠ any logo color
        // warning ≠ gold (gold is brand achievement, warning is system alert)
        // danger ≠ maple (maple is CTA, danger is destructive action)

        success: {
          DEFAULT: "#16803c",
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          500: "#16803c",
          600: "#15803d",
          700: "#166534",
          foreground: "#ffffff",
        },

        warning: {
          DEFAULT: "#d97706",
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          500: "#d97706",
          600: "#b45309",
          700: "#92400e",
          foreground: "#ffffff",
        },

        danger: {
          // Deeper, more alarming red — clearly distinct from maple CTA
          DEFAULT: "#991b1b",
          50:  "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          500: "#991b1b",
          600: "#7f1d1d",
          700: "#6b0000",
          foreground: "#ffffff",
        },

        // accent: kept for shadcn compat, maps to maple in globals.css
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },

      // ── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },

      // Fluid type scale — SINGLE SOURCE OF TRUTH for all text sizes.
      // Every h1/h2/h3/p/label in every component uses these.
      // No component may define its own font-size.
      fontSize: {
        // ── UI micro
        "2xs": ["0.625rem",  { lineHeight: "1rem",    letterSpacing: "0.05em"  }], // 10px labels
        "xs":  ["0.75rem",   { lineHeight: "1.125rem", letterSpacing: "0.04em" }], // 12px
        "sm":  ["0.8125rem", { lineHeight: "1.25rem",  letterSpacing: "0.01em" }], // 13px
        // ── Body
        "base":["1rem",      { lineHeight: "1.6",      letterSpacing: "0"      }], // 16px
        "md":  ["1.125rem",  { lineHeight: "1.65",     letterSpacing: "-0.01em"}], // 18px body
        "lg":  ["1.25rem",   { lineHeight: "1.6",      letterSpacing: "-0.01em"}], // 20px
        "xl":  ["1.5rem",    { lineHeight: "1.4",      letterSpacing: "-0.015em"}], // 24px
        // ── Display — fluid clamp() — same across ALL pages
        "2xl": ["clamp(1.5rem,  3vw,  2.25rem)", { lineHeight: "1.2",  letterSpacing: "-0.02em" }], // h3 ~36px
        "3xl": ["clamp(2rem,    4vw,  3rem)",    { lineHeight: "1.1",  letterSpacing: "-0.025em"}], // h2 ~48px
        "4xl": ["clamp(2.5rem,  5vw,  4rem)",    { lineHeight: "1.05", letterSpacing: "-0.03em" }], // h1 ~64px
        "5xl": ["clamp(3rem,    6vw,  5rem)",    { lineHeight: "1",    letterSpacing: "-0.035em"}], // hero h1
        "6xl": ["clamp(3.5rem,  8vw,  6.5rem)",  { lineHeight: "0.95", letterSpacing: "-0.04em" }], // mega/display
        "7xl": ["clamp(4rem,   10vw,  8rem)",    { lineHeight: "0.92", letterSpacing: "-0.045em"}], // super hero
        // ── Utility display
        "nav":    ["0.6875rem", { lineHeight: "1",  letterSpacing: "0.16em"  }], // 11px navbar links
        "label":  ["0.5625rem", { lineHeight: "1",  letterSpacing: "0.22em"  }], // 9px section labels
        "tag":    ["0.5rem",    { lineHeight: "1",  letterSpacing: "0.35em"  }], // 8px mega taglines
      },

      // ── Spacing ──────────────────────────────────────────────────────────
      // Tailwind 0-96 intact. Additions for editorial/component gaps.
      spacing: {
        "4.5": "1.125rem",  // 18px
        "13":  "3.25rem",   // 52px  — mobile CTA height
        "15":  "3.75rem",   // 60px  — mega arrow badge
        "18":  "4.5rem",    // 72px  — navbar height transparent
        "22":  "5.5rem",    // 88px  — mobile drawer pt
        "26":  "6.5rem",
        "42":  "10.5rem",
        "68":  "17rem",
        "76":  "19rem",
        "88":  "22rem",
        "100": "25rem",
        "112": "28rem",
        "120": "30rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
        "192": "48rem",
      },

      // ── Border Radius (3 tokens only) ────────────────────────────────────
      // Eliminates the 5+ arbitrary values in current codebase.
      borderRadius: {
        none:    "0",
        sm:      "0.375rem",   //  6px — inline tags, micro badges
        DEFAULT: "0.75rem",    // 12px — form inputs, small cards
        lg:      "var(--radius)", // 16px — main cards, modals (CSS var)
        xl:      "1.5rem",     // 24px — large panels, sheets
        full:    "9999px",     // pills, avatars, circular icons
      },

      // ── Shadows (semantic named scale) ──────────────────────────────────
      // Replaces all inline box-shadow strings in components.
      boxShadow: {
        // Elevation
        "xs":    "0 1px 2px 0 rgba(0,33,71,0.04)",
        "sm":    "0 2px 8px -1px rgba(0,33,71,0.06)",
        "md":    "0 4px 16px -2px rgba(0,33,71,0.08), 0 2px 6px -1px rgba(0,33,71,0.04)",
        "lg":    "0 8px 32px -4px rgba(0,33,71,0.10), 0 4px 12px -2px rgba(0,33,71,0.06)",
        "xl":    "0 16px 48px -8px rgba(0,33,71,0.12), 0 6px 20px -4px rgba(0,33,71,0.08)",
        "2xl":   "0 28px 64px -12px rgba(0,33,71,0.14), 0 10px 28px -6px rgba(0,33,71,0.08)",
        // Semantic
        "brand": "0 20px 50px -12px rgba(0,33,71,0.08)",
        "nav":   "0 1px 0 rgba(0,33,71,0.06), 0 6px 24px rgba(0,33,71,0.05)",
        "mega":  "0 28px 64px rgba(0,33,71,0.11), 0 8px 24px rgba(0,33,71,0.06)",
        // CTA states (donate / primary action buttons)
        "cta":            "0 4px 20px rgba(0,0,0,0.16)",
        "cta-hover":      "0 8px 28px rgba(0,0,0,0.22)",
        "cta-primary":    "0 4px 18px rgba(0,33,71,0.28)",
        "cta-primary-hover": "0 8px 28px rgba(0,33,71,0.38)",
        "cta-maple":      "0 4px 18px rgba(200,24,28,0.30)",
        "cta-maple-hover":"0 8px 28px rgba(200,24,28,0.40)",
        // Focus ring
        "focus":    "0 0 0 3px rgba(3,105,161,0.35)",
        "focus-red":"0 0 0 3px rgba(200,24,28,0.35)",
        "none":     "none",
      },

      // ── Motion (single source — no ad-hoc ms in components) ─────────────
      transitionDuration: {
        "fast":     "150ms",  // micro: bg, border color
        "base":     "200ms",  // standard: text color, opacity
        "moderate": "300ms",  // button lift, pill active
        "slow":     "400ms",  // mega panel, navbar solid
        "glacial":  "500ms",  // overlays, page-level
      },

      transitionTimingFunction: {
        // Replaces all cubic-bezier() strings in components
        "spring":   "cubic-bezier(0.34, 1.56, 0.64, 1)",   // bouncy: underline reveal, arrow spin
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",        // snappy decel: drawer, mega, panels
        "in-expo":  "cubic-bezier(0.7, 0, 0.84, 0)",        // snappy accel: exit animations
        "smooth":   "cubic-bezier(0.4, 0, 0.2, 1)",         // material: hover transitions
      },

      // ── Animation ────────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up-out": {
          "0%":   { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-8px)" },
        },
        "marquee": {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wash-up": {
          "0%":   { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(3,105,161,0.4)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(3,105,161,0)" },
        },
      },
      animation: {
        "fade-up":      "fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":      "fade-in 0.3s ease both",
        "slide-down":   "slide-down 0.22s cubic-bezier(0.16,1,0.3,1) both",
        "slide-up-out": "slide-up-out 0.2s cubic-bezier(0.7,0,0.84,0) both",
        "marquee":      "marquee 40s linear infinite",
        "pulse-ring":   "pulse-ring 2s ease-in-out infinite",
        // Stagger helpers (apply via style={{ animationDelay }})
        "fade-up-1":    "fade-up 0.4s 0.1s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-2":    "fade-up 0.4s 0.2s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-3":    "fade-up 0.4s 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "fade-up-4":    "fade-up 0.4s 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;