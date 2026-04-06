/**
 * MSNC Workshops & Community Engagement (Editorial Deep-Dive)
 * ─────────────────────────────────────────────────────────────────────────
 * STRATEGIC NARRATIVE:
 * • Hero: Focuses on the "Safe Space" concept from the client PDF.
 * • The Pillars: Academic, Career, and Student Life presented as a premium triad.
 * • Global Link: Highlights the virtual/in-person hybrid delivery.
 * • Production: Full SEO Metadata, responsive editorial scales, and high-end animations.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, Star, Briefcase, Heart, 
  ArrowLeft, ArrowRight, Video, 
  Globe2, Lightbulb, MessageCircle, 
  Sparkles, ShieldCheck
} from 'lucide-react';
import Container from '@/components/ui/Container';

// ─── Metadata & SEO ───────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Workshops & Community Engagement | MSNC',
  description: 'Interactive, culturally grounded workshops for Banyamulenge youth. Bridging the gap in academic success, career development, and student well-being.',
  keywords: ['Banyamulenge youth', 'MSNC workshops', 'refugee student support Canada', 'academic success workshops', 'career development youth'],
};

const FOCUS_TRACKS = [
  {
    title: "Academic Success",
    tag: "Excellence",
    desc: "Navigating a new education system shouldn't be a solo journey. We provide strategies for exam preparation, study techniques, and decoding Canadian academic expectations.",
    icon: Lightbulb,
    accent: "text-[#4A90D9]",
    bg: "bg-[#EEF5FD]"
  },
  {
    title: "Career Development",
    tag: "Prosperity",
    desc: "We bridge the gap between classroom learning and professional reality through industry panels, resume clinics, and networking with seasoned professionals.",
    icon: Briefcase,
    accent: "text-[#6F4763]",
    bg: "bg-[#FAF7F9]"
  },
  {
    title: "Student Life & Well-being",
    tag: "Belonging",
    desc: "Dedicated to the holistic scholar. We facilitate sessions on mental health, cultural identity, and peer support to ensure a strong sense of community.",
    icon: Heart,
    accent: "text-red-500",
    bg: "bg-red-50/50"
  }
];

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4A90D9]';

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#4A90D9]/10">
      
      {/* ════════════════════════════════════════════════════════════
          EDITORIAL HERO: THE SANCTUARY
      ════════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-[#F8FAFC]">
        {/* Visual Metaphor: Blue and Plum orbs merging */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4A90D9]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#6F4763]/5 blur-[120px] pointer-events-none" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[15vw] font-black text-slate-900/[0.02] font-display select-none pointer-events-none">
          EXCHANGE
        </div>

        <Container className="relative z-10">
          <Link 
            href="/programs" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#4A90D9] transition-all mb-16"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Pillars
          </Link>

          <div className="max-w-4xl space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#4A90D9]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#002147]">
                Pillar 01: Cultural & Academic Exchange
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-[#002147] font-display leading-[0.95] tracking-tighter">
              Creating <br />
              <em className="not-italic text-[#4A90D9]">Safe Spaces</em> to Grow.
            </h1>

            <div className="max-w-2xl border-l-4 border-[#4A90D9]/30 pl-8">
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                "Our workshops tear down the wall between students and the complex Canadian system, creating rooms where identities are celebrated and knowledge flows freely."
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CORE TRACKS: THE TRIAD
      ════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {FOCUS_TRACKS.map((track, i) => (
              <article key={i} className="group p-10 md:p-12 rounded-[3rem] border border-slate-100 bg-white hover:border-[#4A90D9]/20 hover:shadow-[0_20px_50px_rgba(0,33,71,0.04)] transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl ${track.bg} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                  <track.icon className={`w-7 h-7 ${track.accent}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${track.accent} mb-4 block`}>
                  Track: {track.tag}
                </span>
                <h3 className="text-3xl font-black text-[#002147] font-display mb-6">
                  {track.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {track.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          DELIVERY: BEYOND THE CLASSROOM
      ════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#FAF7F9] border-y border-[#6F4763]/10">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-[#002147] font-display tracking-tight leading-tight">
                Global Connection. <br />
                <span className="text-[#6F4763]">Local Impact.</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Education knows no distance. We leverage technology and local hubs to ensure every Banyamulenge scholar can access our network regardless of their location.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF5FD] flex items-center justify-center">
                    <Video className="w-5 h-5 text-[#4A90D9]" />
                  </div>
                  <span className="font-bold text-[#002147]">Interactive Virtual Summits</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F9] flex items-center justify-center">
                    <Globe2 className="w-5 h-5 text-[#6F4763]" />
                  </div>
                  <span className="font-bold text-[#002147]">Regional In-Person Hubs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                  <div className="absolute inset-0 bg-[#002147]/40 flex items-center justify-center group-hover:bg-[#002147]/20 transition-all">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                       <MessageCircle className="w-8 h-8 text-[#4A90D9]" />
                    </div>
                  </div>
                  {/* High quality placeholder until real media is added */}
                  <div className="w-full h-full bg-slate-200 animate-pulse" /> 
               </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA: THE SUMMONS
      ════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 bg-white text-center">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-black text-[#002147] font-display tracking-tight leading-tight">
              Ready to <em className="not-italic text-[#4A90D9]">elevate</em> <br /> your journey?
            </h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Our sessions create engaging spaces for scholars to learn, connect, and thrive. Join our next scheduled gathering.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Link 
                href="/events" 
                className={`inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#002147] text-white font-bold hover:bg-[#4A90D9] shadow-xl shadow-[#4A90D9]/10 transition-all duration-300 group ${FOCUS_BASE}`}
              >
                Browse Next Sessions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link 
                href="/join" 
                className={`inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white border border-slate-200 text-[#002147] font-bold hover:border-[#4A90D9]/30 transition-all duration-300 group ${FOCUS_BASE}`}
              >
                Apply as Scholar
              </Link>
            </div>

            <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002147]">Safe Environment</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002147]">Peer Support</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002147]">Culturally Grounded</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#002147]">Leadership Focus</span>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}