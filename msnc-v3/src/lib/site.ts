/**
 * SITE URL CONFIGURATION
 * Uses environment variable for production flexibility (Vercel deployment)
 * Fallback to production URL for development
 */
const DEFAULT_SITE_URL = 'https://mulengescholars.org'

// Use NEXT_PUBLIC_SITE_URL env var if available, otherwise fallback to default
// This allows seamless deployment between preview, staging, and production
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL

export const SITE_NAME = "Mulenge Scholars' Network Canada"
export const SITE_SHORT_NAME = 'MSNC'
export const SITE_DESCRIPTION =
  'Empowering Banyamulenge youth across Canada through mentorship, academic guidance, leadership development, and community support.'
