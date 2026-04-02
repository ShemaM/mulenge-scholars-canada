import { Metadata } from 'next'
import { 
  getScholars, 
  getPartners, 
  getEvents, 
  getBlogs,
  getPrograms,
  getSiteSettings,
  getTestimonials 
} from '@/lib/payload'

// UI Components
import Hero from '@/components/sections/Hero'
import StatsGrid from '@/components/sections/StatsGrid'
import Features from '@/components/sections/Features'
import Programs from '@/components/sections/Programs'
import Services from '@/components/sections/Services'
import ScholarshipList from '@/components/sections/ScholarshipList'
import Testimonials from '@/components/sections/Testimonials'
import EventPreview from '@/components/sections/EventPreview'
import PartnerMarquee from '@/components/sections/PartnerMarquee'
import CtaSplit from '@/components/sections/CTA_Split' 
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Home | MSNC',
  description: 'Empowering Mulenge youth through education, mentorship, and leadership development.',
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  /**
   * PERFORMANCE ARCHITECTURE:
   * We use Promise.all to fetch all database records in a single round-trip.
   * This drastically reduces Time to First Byte (TTFB).
   */
  const [
    scholars, 
    partners, 
    upcomingEvents, 
    recentBlogs, 
    programs,
    siteSettings,
    testimonials
  ] = await Promise.all([
    getScholars(6),    
    getPartners(20), 
    getEvents({ upcoming: true, limit: 3 }),
    getBlogs(3),
    getPrograms(),
    getSiteSettings(),
    getTestimonials(5) 
  ])

  // Centralized site configuration with strict fallbacks
  const settings = {
    heroTitle: siteSettings?.heroTitle || "Empowering Mulenge Youth Through Education.",
    featuredQuote: siteSettings?.featuredQuote || "MSNC showed me I belonged.",
    youthEmpowered: siteSettings?.youthCount || '500',
    successRate: siteSettings?.successRate || '94',
  }

  // Extract the top featured story for the Hero's dynamic glass card
  const featuredStory = testimonials?.[0] || null

  return (
    <main className="overflow-x-hidden bg-white">
      
      {/* 1. HERO: Fully dynamic, pulling the latest story from Testimonials collection */}
      <Hero settings={settings} featuredStory={featuredStory} />
      
      {/* 2. IMPACT TICKER: Animated marquee for visual momentum */}
      <div className="relative h-24 bg-white flex items-center overflow-hidden border-y border-slate-100">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-[8vh] font-black text-slate-50 uppercase tracking-tighter mx-4 select-none">
              Impact through data • Empowerment through Education • Leadership Excellence • 
            </span>
          ))}
        </div>
      </div>

      {/* 3. METRICS: Visualizing the numbers from Site Settings */}
      <section className="py-24 bg-white">
        <StatsGrid settings={settings} />
      </section>

      {/* 4. FEATURES: Our core value proposition */}
      <section className="py-24 bg-slate-50/50">
        <div className="container-editorial">
          <Features />
        </div>
      </section>

      {/* 5. PROGRAMS: Grid of our academic and mentorship tracks */}
      <section className="py-24 bg-white">
        <Programs data={programs || []} />
      </section>

      {/* 6. EDITORIAL BREAK: Large-scale typography quote */}
      <section className="bg-primary py-32 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-secondary via-transparent to-transparent" />
        <div className="container-editorial text-center relative z-10">
          <blockquote className="italic text-3xl md:text-5xl font-display text-white/95 leading-tight max-w-4xl mx-auto tracking-tight">
            "{featuredStory?.quote || settings.featuredQuote}"
          </blockquote>
        </div>
      </section>

      {/* 7. SCHOLARS & SERVICES: Highlighting the Network's results */}
      <section className="py-24 bg-white">
        <Services />
        <div className="h-px w-full bg-slate-100 my-24" />
        <ScholarshipList scholars={scholars || []} />
      </section>

      {/* 8. TESTIMONIALS: Swiper component using real database docs */}
      <section className="py-24 md:py-40 bg-slate-900 overflow-hidden">
        <Testimonials data={testimonials || []} />
      </section>

      {/* 9. EVENTS & NEWS: Real-time upcoming gathering preview */}
      <section className="bg-white rounded-t-[5rem] -mt-20 z-20 shadow-brand relative">
        <EventPreview events={upcomingEvents || []} blogs={recentBlogs || []} /> 
      </section>

      {/* 10. PARTNERS: Logo marquee of global trusted institutions */}
      <section className="py-24 bg-white overflow-hidden border-y border-slate-100">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-4">Our Network</span>
          <h3 className="text-2xl font-display font-bold text-primary">Trusted By Global Institutions</h3>
        </div>
        <PartnerMarquee partners={partners || []} />
      </section>

      {/* 11. CTA & CONTACT: Conversion points for the footer transition */}
      <CtaSplit /> 
      
      <section id="contact" className="py-24 bg-white">
        <Contact />
      </section>

    </main>
  )
}
