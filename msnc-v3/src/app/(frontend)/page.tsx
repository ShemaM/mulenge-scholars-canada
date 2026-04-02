import { Metadata } from 'next';
import { 
  fallbackPartners, 
  fallbackScholarships, 
  fallbackTestimonials 
} from '@/lib/fallbacks';

// Section Components
import Hero from '@/components/sections/Hero';
import StatsGrid from '@/components/sections/StatsGrid';
import Features from '@/components/sections/Features';
import Programs from '@/components/sections/Programs';
import Services from '@/components/sections/Services';
import ScholarshipList from '@/components/sections/ScholarshipList';
import Testimonials from '@/components/sections/Testimonials';
import EventPreview from '@/components/sections/EventPreview';
import PartnerMarquee from '@/components/sections/PartnerMarquee';
import CTA_Split from '@/components/sections/CTA_Split';
import Contact from '@/components/sections/Contact';
// Ensure global styles are imported for Tailwind and custom fonts/colors

// Note: When you are ready for live data, import these:
// import { getSiteSettings, getEvents, getPrograms } from '@/lib/payload';

export const metadata: Metadata = {
  title: 'Home | MSNC',
  description: 'Empowering Mulenge youth through education, mentorship, and leadership development.',
};

/**
 * MSNC v3 HOMEPAGE
 * Modern Editorial Layout for the Mulenge Scholars' Network Canada
 */
export default function HomePage() {
  
  // 1. DATA ORCHESTRATION 
  // We use fallbacks here to keep the dev server lightning fast and error-free.
  const settings = {
    heroTitle: "Empowering Mulenge Youth Through Education.",
    featuredQuote: "MSNC showed me I belonged. They helped me navigate the system.",
    youthEmpowered: '500',
    successRate: '94',
  };

  const fallbackEvents = [
    { 
      id: '1', 
      title: 'Leadership Summit 2026', 
      date: '2026-06-15', 
      excerpt: 'Empowering next generation leaders...',
      _status: 'published'
    },
    { 
      id: '2', 
      title: 'Scholarship Awards', 
      date: '2026-05-20', 
      excerpt: 'Celebrating academic excellence...',
      _status: 'published'
    },
  ];

  const fallbackPrograms = [
    { id: '1', title: 'Academic Support', description: 'University prep & tutoring', order: 1, _status: 'published' },
    { id: '2', title: 'Leadership Training', description: 'Soft skills & public speaking', order: 2, _status: 'published' },
    { id: '3', title: 'Mentorship Network', description: '1:1 guidance from professionals', order: 3, _status: 'published' },
  ];

  return (
    <main className="overflow-x-hidden bg-white selection:bg-sky-100 selection:text-sky-900">
      
      {/* --- HERO SECTION --- */}
      <Hero settings={settings} />

      {/* --- IMPACT TICKER --- */}
      <div className="relative h-24 bg-white flex items-center overflow-hidden pointer-events-none select-none border-y border-slate-50">
        <span className="absolute left-0 text-[10vh] font-black text-slate-50 uppercase tracking-tighter whitespace-nowrap -ml-20 animate-pulse">
          Impact through data • Impact through data • Impact through data • Impact through data
        </span>
      </div>

      {/* --- STATS SECTION --- */}
      <section className="relative py-24 md:py-32 bg-white">
        <StatsGrid settings={settings} />
      </section>

      <div className="relative h-16 w-full bg-slate-50 -skew-y-1 origin-left z-0" />

      {/* --- FEATURES / CORE VALUES --- */}
      <section className="relative py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-6">
           <Features />
        </div>
      </section>

      {/* --- DECORATIVE DIVIDER --- */}
      <div className="flex justify-center items-center py-16 bg-white">
        <div className="h-px w-full bg-slate-100" />
        <div className="px-8 flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-sky-400/20" />
          ))}
        </div>
        <div className="h-px w-full bg-slate-100" />
      </div>

      {/* --- PROGRAMS ROADMAP --- */}
      <section className="relative py-24 md:py-40 bg-white">
        <Programs items={fallbackPrograms as any} />
      </section>

      {/* --- EDITORIAL QUOTE --- */}
      <div className="bg-slate-900 py-24 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500 via-transparent to-transparent" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="italic text-3xl md:text-5xl font-display text-white/90 leading-tight max-w-4xl mx-auto tracking-tight">
            "{settings.featuredQuote}"
          </p>
        </div>
      </div>

      {/* --- SERVICES & SCHOLARSHIPS --- */}
      <section className="relative py-24 md:py-32 bg-white">
        <Services />
        <div className="h-32 md:h-48" />
        <ScholarshipList scholars={fallbackScholarships} />
      </section>

      {/* --- TESTIMONIALS (The Museum Gallery) --- */}
      <section className="relative">
        <Testimonials data={fallbackTestimonials} />
      </section>

      {/* --- EVENTS PREVIEW --- */}
      <section className="relative py-24 md:py-40 bg-white rounded-t-[5rem] -mt-20 z-20 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.05)]">
        <EventPreview events={fallbackEvents as any} />
      </section>

      {/* --- PARTNER MARQUEE --- */}
      <section className="relative py-24 bg-slate-50 overflow-hidden border-y border-slate-100">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-4">Our Network</span>
          <h3 className="text-2xl font-display font-bold text-slate-900">Trusted By Global Institutions</h3>
        </div>
        <PartnerMarquee partners={fallbackPartners} />
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="relative">
         <CTA_Split />
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="relative py-24 md:py-40 bg-white">
        <Contact />
      </section>

    </main>
  );
}