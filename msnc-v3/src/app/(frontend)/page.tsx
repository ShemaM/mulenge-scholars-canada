import { Metadata } from 'next';
import { getPartners, getEvents, getBlogs } from '@/lib/payload';
import { fallbackPartners, fallbackEvents, fallbackBlogs } from '@/lib/fallbacks';

import Hero from '@/components/sections/Hero';
import TheChallenge from '@/components/sections/TheChallenge';
import StrategicPillars from '@/components/sections/StrategicPillars';
import GlobalImpact from '@/components/sections/GlobalImpact';
import EventPreview from '@/components/sections/EventPreview';
import GetInvolved from '@/components/sections/GetInvolved';
import PartnerMarquee from '@/components/sections/PartnerMarquee';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: "Home | Mulenge Scholars' Network Canada",
  description: 'Empowering Banyamulenge youth across Canada.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [partners, upcomingEvents, recentBlogs] = await Promise.all([
    getPartners(20).catch(() => fallbackPartners),
    getEvents({ upcoming: true, limit: 3 }).catch(() => fallbackEvents),
    getBlogs(3).catch(() => fallbackBlogs),
  ]);

  return (
    <main className="overflow-x-hidden bg-white selection:bg-[#4A90D9]/20">
      <Hero />
      <TheChallenge />
      <StrategicPillars />
      <GlobalImpact />
      
      {/* NO UPCOMING CHAPTERS FIX: Only renders if events exist */}
      {upcomingEvents && upcomingEvents.length > 0 && (
        <section className="relative bg-white z-20 py-24">
          <EventPreview events={upcomingEvents} blogs={recentBlogs || []} /> 
        </section>
      )}

      <GetInvolved />
      
      <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="mb-16 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4A90D9] block mb-4">Our Network</span>
          <h3 className="text-2xl font-display font-black text-[#002147]">Trusted By Global Institutions</h3>
        </div>
        <PartnerMarquee partners={partners || []} />
      </section>
      
      <section id="contact" className="py-24 bg-white border-t border-slate-100">
        <Contact />
      </section>
    </main>
  );
}