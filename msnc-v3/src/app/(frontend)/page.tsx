/**
 * MSNC Homepage - The Editorial Pitch Deck Architecture
 * Flow: Hook -> Context -> Strategy -> Vision -> Traction -> Ask -> Validation
 */

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
  description: 'Empowering Banyamulenge youth across Canada through mentorship, academic guidance, and leadership development.',
}

// Revalidate every 10 seconds for fresh CMS content
export const dynamic = 'force-dynamic'
export const revalidate = 10

export default async function HomePage() {
  let partners = fallbackPartners
  let upcomingEvents = fallbackEvents
  let recentBlogs = fallbackBlogs

  try {
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
    <main className="overflow-x-hidden bg-white selection:bg-slate-900 selection:text-white">
      
      {/* 1. THE HOOK: Editorial Thesis Intro */}
      <Hero />

      {/* 2. THE PROBLEM & SOLUTION: Split-screen Context */}
      <TheChallenge />

      {/* 3. THE STRATEGY: Image-led Strategic Pillars */}
      <StrategicPillars />

      {/* 4. THE VISION: Growth Perspective */}
      <GlobalImpact />

      {/* 5. TRACTION: Safe Render of Events & Blogs */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="relative bg-[#FAFAFA] z-20 py-24 border-t border-slate-200">
          <EventPreview events={upcomingEvents} blogs={recentBlogs || []} />
        </section>
      )}

      {/* 6. THE ASK: Action Slats */}
      <GetInvolved />

      {/* 7. VALIDATION: Global Network Marquee */}
      <section className="py-24 bg-white overflow-hidden border-t border-slate-200">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-600 block mb-4">
                Our Network
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                Trusted By Global Institutions<span className="text-slate-300 font-serif italic">.</span>
              </h3>
            </div>
            <div className="h-px bg-slate-200 grow mx-12 hidden lg:block" />
          </div>
        </div>
        
        <PartnerMarquee partners={partners || []} />
      </section>

      {/* 8. CONTACT: Final Anchor */}
      <section id="contact" className="bg-white">
        <Contact />
      </section>
      
    </main>
  )
}