import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getEvents, getBlogs, getScholarStats } from '@/lib/payload'
import { fallbackEvents, fallbackBlogs } from '@/lib/fallbacks'

// Section Components
import Hero from '@/components/sections/Hero'
import TheChallenge from '@/components/sections/TheChallenge'
import StrategicPillars from '@/components/sections/StrategicPillars'
import StatsGrid from '@/components/sections/StatsGrid'
import Programs from '@/components/sections/Programs'
import GlobalImpact from '@/components/sections/GlobalImpact'
import Features from '@/components/sections/Features'
import Testimonials from '@/components/sections/Testimonials'
import EventPreview from '@/components/sections/EventPreview'
import GetInvolved from '@/components/sections/GetInvolved'
import CtaSplit from '@/components/sections/CTA_Split'
import PartnerMarquee from '@/components/sections/PartnerMarquee'
import Contact from '@/components/sections/Contact'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const title       = 'MSNC — Mulenge Scholars Network Canada'
  const description = 'Empowering Banyamulenge youth through mentorship, academic guidance, and leadership development. Supporting scholars across Canada and East Africa.'
  const url         = 'https://mulengescholars.org'

  return {
    title,
    description,
    metadataBase: new URL(url),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
      },
    },
    openGraph: {
      type:        'website',
      url:         `${url}/${locale}`,
      title,
      description,
      siteName:    'Mulenge Scholars Network Canada',
      locale:      locale === 'fr' ? 'fr_CA' : 'en_CA',
      images: [
        {
          url:    `${url}/og-image.jpg`,
          width:  1200,
          height: 630,
          alt:    'MSNC — Mulenge Scholars Network Canada',
        },
      ],
    },
    twitter: {
      card:        'summary_large_image',
      title,
      description,
      images:      [`${url}/og-image.jpg`],
      site:        '@msnccanada',
    },
    keywords: [
      'Banyamulenge',
      'Mulenge scholars',
      'African youth Canada',
      'diaspora education',
      'mentorship Canada',
      'scholarship program',
      'Congolese youth',
      'refugee education',
      'MSNC',
    ],
    robots: {
      index:          true,
      follow:         true,
      googleBot: {
        index:               true,
        follow:              true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet':       -1,
      },
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main className="flex-1 bg-background">
      <Hero />
      <TheChallenge />
      <StrategicPillars />
      <StatsGridWrapper />
      <Programs />
      <GlobalImpact />
      <Features />

      <TestimonialsWrapper locale={locale} />

      <Suspense fallback={<div className="h-96 animate-pulse bg-paper-50" />}>
        <AsyncUpdatesSection locale={locale} />
      </Suspense>

      <GetInvolved />
      <CtaSplit />

      {/* Self-fetching server component — no wrapper needed */}
      <PartnerMarquee />

      <Contact />
    </main>
  )
}

// ─── Async wrappers ───────────────────────────────────────────────────────────

async function AsyncUpdatesSection({ locale }: { locale: string }) {
  const [events, blogs] = await Promise.all([
    getEvents({ upcoming: true, limit: 3, locale }).catch(() => fallbackEvents),
    getBlogs({ limit: 3, locale }).catch(() => fallbackBlogs),
  ])
  return <EventPreview events={events} blogs={blogs} />
}

async function StatsGridWrapper() {
  const stats = await getScholarStats().catch(() => ({
    total: 500,
    active: 42,
    completed: 0,
    successRate: 94,
    locations: 12,
  }))

  const statItems = [
    { id: 'youth', value: `${stats.total}+` },
    { id: 'success', value: `${stats.successRate}%` },
    { id: 'scholarships', value: String(stats.active) },
    { id: 'partners', value: String(stats.locations) },
  ]

  return <StatsGrid stats={statItems} />
}

async function TestimonialsWrapper({ locale }: { locale: string }) {
  // TODO: replace with real Payload testimonials fetcher
  const testimonials = await Promise.resolve(fallbackBlogs.slice(0, 3))
  return <Testimonials data={testimonials as any} />
}