import type { Metadata } from 'next'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: [
    {
      url: '/media/favicon.ico',
      rel: 'icon',
    },
  ],
  // viewport/themeColor moved to src/app/viewport.ts for Next.js best practice

  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
    // creator: '@msnccanada', // Disabled per user request (no Twitter)
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'your-google-site-verification-code', // Add if available
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

