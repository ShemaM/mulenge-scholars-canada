import { Metadata } from 'next'
import { getPartners, getEvents, getBlogs } from '@/lib/payload'
import { fallbackPartners, fallbackEvents, fallbackBlogs } from '@/lib/fallbacks'

import Hero from '@/components/sections/Hero'
import TheChallenge from '@/components/sections/TheChallenge'
import StrategicPillars from '@/components/sections/StrategicPillars'
import GlobalImpact from '@/components/sections/GlobalImpact'
import EventPreview from '@/components/sections/EventPreview'
import GetInvolved from '@/components/sections/GetInvolved'
import PartnerMarquee from '@/components/sections/PartnerMarquee'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: "Home | Mulenge Scholars' Network Canada",
  description: 'Empowering Banyamulenge youth across Canada.',
}

// Change revalidate to a small number (e.g., 10 seconds)
// This allows Vercel to cache the page briefly, preventing infinite spin
export const dynamic = 'force-dynamic'
export const revalidate = 10

export default async function HomePage() {
  // We use individual try/catches instead of a single Promise.all
  // to ensure one slow query doesn't kill the whole experience.

  let partners = fallbackPartners
  let upcomingEvents = fallbackEvents
  let recentBlogs = fallbackBlogs

  try {
    // We fetch them, but we don't let them block the thread indefinitely
    const [pData, eData, bData] = await Promise.all([
      getPartners(20).catch(() => null),
      getEvents({ upcoming: true, limit: 3 }).catch(() => null),
      getBlogs(3).catch(() => null),
    ])

    if (pData) partners = pData
    if (eData) upcomingEvents = eData
    if (bData) recentBlogs = bData
  } catch (e) {
    console.error('Payload Fetch Error on Home:', e)
  }

  return (
    <main className="overflow-x-hidden bg-white selection:bg-[#4A90D9]/20">
      <Hero />
      <TheChallenge />
      <StrategicPillars />
      <GlobalImpact />

      {/* Safe Render: Check length before mapping */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="relative bg-white z-20 py-24">
          <EventPreview events={upcomingEvents} blogs={recentBlogs || []} />
        </section>
      )}

      <GetInvolved />

      <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4A90D9] block mb-4">
            Our Network
          </span>
          <h3 className="text-2xl font-display font-black text-[#002147]">
            Trusted By Global Institutions
          </h3>
        </div>
        {/* Safe fallback for Marquee */}
        <PartnerMarquee partners={partners || []} />
      </section>

      <section id="contact" className="py-24 bg-white border-t border-slate-100">
        <Contact />
      </section>
    </main>
  )
}
