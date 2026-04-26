/**
 * MSNC Homepage - The Editorial Pitch Deck Architecture
 * Flow: Hook -> Context -> Strategy -> Vision -> Traction -> Ask -> Validation
 */

import { Metadata } from 'next'
import { Suspense } from 'react'
import { getPartners, getEvents, getBlogs } from '@/lib/payload'
import { fallbackPartners, fallbackEvents, fallbackBlogs } from '@/lib/fallbacks'
import { getUiCopy, normalizeSiteLocale } from '@/lib/site-copy'
import Hero from '@/components/sections/Hero'
import TheChallenge from '@/components/sections/TheChallenge'
import StrategicPillars from '@/components/sections/StrategicPillars'
import GlobalImpact from '@/components/sections/GlobalImpact'
import EventPreview from '@/components/sections/EventPreview'
import GetInvolved from '@/components/sections/GetInvolved'
import PartnerMarquee from '@/components/sections/PartnerMarquee'
import Contact from '@/components/sections/Contact'
import { HomeSkeleton } from '@/components/ui/PageSkeleton'

export const metadata: Metadata = {
  title: "Home | Mulenge Scholars' Network Canada",
  description:
    'Empowering Banyamulenge youth across Canada through mentorship, academic guidance, and leadership development.',
}

export const dynamic = 'force-dynamic'
export const revalidate = 10

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const copy = getUiCopy(normalizeSiteLocale(locale))

  return (
    <main className="overflow-x-hidden bg-white selection:bg-slate-900 selection:text-white">
      <Hero />

      <Suspense fallback={<HomeSkeleton />}>
        <DataSections
          locale={locale}
          strategyLabel={copy.pages.strategySummary}
          upcomingEventsLabel={copy.pages.upcomingEvents}
          networkLabel={copy.pages.networkLabel}
          networkHeading={copy.pages.networkHeading}
        />
      </Suspense>
    </main>
  )
}

async function DataSections({
  locale,
  strategyLabel,
  upcomingEventsLabel,
  networkLabel,
  networkHeading,
}: {
  locale: string
  strategyLabel: string
  upcomingEventsLabel: string
  networkLabel: string
  networkHeading: string
}) {
  let partners = fallbackPartners
  let upcomingEvents = fallbackEvents
  let recentBlogs = fallbackBlogs

  try {
    const [pData, eData, bData] = await Promise.all([
      getPartners(20).catch(() => null),
      getEvents({ upcoming: true, limit: 3, locale }).catch(() => null),
      getBlogs(3, locale).catch(() => null),
    ])

    if (pData) partners = pData
    if (eData) upcomingEvents = eData
    if (bData) recentBlogs = bData
  } catch (error) {
    console.error('Payload Fetch Error on Home:', error)
  }

  return (
    <>
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center gap-3 rounded-2xl bg-slate-50 p-6 text-lg font-bold text-slate-900 transition-all hover:bg-slate-100 [&[open]]:bg-white [&[open]]:shadow-sm">
          <span className="h-4 w-4 rounded-full bg-blue-600 transition-all group-hover:scale-110" />
          <span>{strategyLabel}</span>
          <span className="ml-auto transition-transform group-hover:translate-x-1">›</span>
        </summary>
        <div className="mt-4 p-6 pt-0">
          <TheChallenge />
          <StrategicPillars />
        </div>
      </details>

      <GlobalImpact />

      {upcomingEvents && upcomingEvents.length > 0 && (
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-3 rounded-2xl border-t border-slate-200 bg-[#FAFAFA] p-6 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50 [&[open]]:bg-white [&[open]]:shadow-sm">
            <span className="h-4 w-4 rounded-full bg-blue-600 transition-all group-hover:scale-110" />
            <span>
              {upcomingEventsLabel} ({upcomingEvents.length})
            </span>
            <span className="ml-auto transition-transform group-hover:translate-x-1">›</span>
          </summary>
          <div className="mt-4 p-6 pt-0">
            <EventPreview events={upcomingEvents} blogs={recentBlogs || []} />
          </div>
        </details>
      )}

      <GetInvolved />

      <section className="overflow-hidden border-t border-slate-200 bg-white py-24">
        <div className="mb-16 w-full px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600">
                {networkLabel}
              </span>
              <h3 className="text-3xl font-black tracking-tighter text-slate-900 md:text-4xl">
                {networkHeading}
                <span className="font-serif italic text-slate-300">.</span>
              </h3>
            </div>
            <div className="mx-12 hidden h-px grow bg-slate-200 lg:block" />
          </div>
        </div>

        <PartnerMarquee partners={partners || []} />
      </section>

      <Contact />
    </>
  )
}
