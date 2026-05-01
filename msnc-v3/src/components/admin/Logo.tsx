// src/components/Logo.tsx
import type { SVGProps } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

interface LogoProps {
  /** Render as a link back to home */
  asLink?: boolean
  /** Additional className on root element */
  className?: string
  /** Width of the wordmark in px; height scales proportionally */
  width?: number
  /** Override the icon fill color (CSS colour value or var) */
  iconColor?: string
  /** Override the wordmark fill color */
  textColor?: string
}

/**
 * MSNC Logo
 * ─────────────────────────────────────────────────────────────────────────
 * • Vector SVG — crisp at any resolution (retina, print)
 * • Dual-element: maple-leaf-and-graduation-cap monogram + wordmark
 * • Fully accessible: role="img" + <title> for screen readers
 * • Responsive: scales via width prop or CSS width override
 * • Brand colours applied via CSS variables so dark-mode themes work
 * ─────────────────────────────────────────────────────────────────────────
 */
export function Logo({
  asLink = false,
  className,
  width = 180,
  iconColor = 'var(--color-brand-navy)',
  textColor = 'var(--color-brand-navy)',
}: LogoProps) {
  const aspectRatio = 180 / 48
  const height = Math.round(width / aspectRatio)

  const svg = (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="msnc-logo-title"
      className={clsx('shrink-0', className)}
    >
      <title id="msnc-logo-title">Mulenge Scholars' Network Canada</title>

      {/* ── Icon Mark ── */}
      {/* Graduation cap silhouette */}
      <g fill={iconColor}>
        {/* Board */}
        <polygon points="24,6 44,16 24,26 4,16" />
        {/* Left tassel drop */}
        <rect x="4" y="16" width="3" height="14" rx="1.5" />
        <circle cx="5.5" cy="31" r="2.5" />
        {/* Right tassel drop */}
        <rect x="37" y="16" width="3" height="14" rx="1.5" />
        <circle cx="38.5" cy="31" r="2.5" />
        {/* Stage / diploma roll */}
        <rect x="14" y="26" width="20" height="10" rx="5" />
      </g>

      {/* Maple leaf accent (small, top-right of cap) */}
      <path
        d="M38 9 L39.3 6.5 L40 9 L42.5 8.4 L41.3 10.5 L44 11 L41.8 12.8 L42.5 15.5 L40 14 L38 15.5 L38.7 12.8 L36.5 11 L39 10.5 Z"
        fill="var(--color-brand-red, #c0392b)"
      />

      {/* ── Wordmark ── */}
      <text
        x="52"
        y="21"
        fontFamily="var(--font-display, 'Georgia, serif')"
        fontWeight="700"
        fontSize="14"
        fill={textColor}
        letterSpacing="0.02em"
      >
        MSNC
      </text>
      <text
        x="52"
        y="35"
        fontFamily="var(--font-body, 'system-ui, sans-serif')"
        fontWeight="400"
        fontSize="9"
        fill={textColor}
        opacity="0.75"
        letterSpacing="0.04em"
      >
        Mulenge Scholars' Network Canada
      </text>
    </svg>
  )

  if (asLink) {
    return (
      <Link href="/" aria-label="MSNC – Go to homepage">
        {svg}
      </Link>
    )
  }

  return svg
}