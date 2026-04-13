/**
 * MSNC Programs Orchestrator (Executive Revamp)
 * ─────────────────────────────────────────────────────────────────────────
 * INTERACTIVE UPDATES:
 * • Dynamic Navigation: Hover-active program directory.
 * • Data Integrity: Removed unverified stats; focused on the three core PDF pillars.
 * • UX Flow: "Learn More" links now point to specialized sub-pages.
 * • Visuals: High-contrast bento-style layout with sticky sidebars.
 */

import { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import Container from '@/components/ui/Container';
import { getCachedPayload } from '@/lib/payload';
import {
  ArrowRight,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  Calendar,
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Programs & Impact | Mulenge Scholars' Network Canada",
  description: 'Targeted support systems for high school students, adult learners, and global refugee initiatives.',
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Data structure based strictly on the MSNC Document
const STRATEGIC_PILLARS = [
  {
    id: 'workshops',
    slug: 'workshops-community',
    icon: Users,
    title: 'Workshops & Community Engagement',
    summary: 'Interactive sessions focused on academic success, career development, and student life.',
    details: 'These sessions create safe and engaging spaces where youth can learn, connect, and grow through virtual and in-person mentorship.',
    color: 'text-[#4A90D9]',
    bg: 'bg-[#EEF5FD]',
    border: 'border-[#4A90D9]/20'
  },
  {
    id: 'high-school',
    slug: 'high-school-support',
    icon: GraduationCap,
    title: 'High School Support',
    tagline: 'Grades 11 – 12',
    summary: 'Targeted support to help students transition successfully into post-secondary education.',
    details: 'Tutoring, course selection guidance, and hands-on assistance with college and university applications.',
    color: 'text-[#002147]',
    bg: 'bg-[#F8FAFC]',
    border: 'border-[#002147]/10'
  },
  {
    id: 'adult-learning',
    slug: 'adult-learning-pathways',
    icon: Briefcase,
    title: 'Adult Learning & Career Pathways',
    summary: 'Support for adult learners who want to upgrade their education or explore new career opportunities.',
    details: 'Guidance on prerequisite courses, adult education enrollment, and information on skilled trades.',
    color: 'text-[#6F4763]', // Unity Plum blend
    bg: 'bg-[#FAF7F9]',
    border: 'border-[#6F4763]/10'
  }
];

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4A90D9]';

export default async function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#4A90D9]/10">
      
      {/* ─── EDITORIAL HERO SECTION ─── */}
      <section className="relative pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden bg-[#F8FAFC] flex flex-col items-center justify-center text-center mx-auto max-w-5xl">

        {/* Abstract Architectural Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-40" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[25vw] font-black text-slate-900/[0.02] leading-none pointer-events-none select-none font-display">
          PILLARS
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#4A90D9]" />
              <span className="font-bold text-[10px] uppercase tracking-[0.4em] text-[#4A90D9]">Strategic Framework</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-[#002147] font-display leading-[0.9] tracking-tighter">
              Bespoke Paths.<br />
              <em className="not-italic text-[#4A90D9]">Proven Results.</em>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl leading-relaxed border-l-4 border-[#4A90D9]/30 pl-8">
              We move beyond generic aid. Our programs are designed to address the specific systemic barriers faced by Banyamulenge youth in the Canadian education landscape.
            </p>
          </div>
        </Container>
      </section>

      {/* ─── INTERACTIVE PROGRAM EXPLORER ─── */}
      <section className="py-32">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Sticky Sidebar Navigation */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-[#002147] font-display tracking-tight">Core Programs</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Select a pillar to view the strategic intervention we provide for our scholars.
                </p>
              </div>

              <nav className="flex flex-col gap-2" aria-label="Program quick links">
                {STRATEGIC_PILLARS.map((p) => (
                  <a 
                    key={p.id}
                    href={`#${p.id}`}
                    className="group flex items-center justify-between p-5 rounded-2xl border border-slate-100 bg-white hover:border-[#4A90D9]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="font-bold text-[#002147] group-hover:text-[#4A90D9] transition-colors">{p.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#4A90D9] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Vertical Content Flow */}
            <div className="lg:col-span-8 space-y-32">
              {STRATEGIC_PILLARS.map((pillar) => (
                <article 
                  key={pillar.id} 
                  id={pillar.id} 
                  className="group relative scroll-mt-32"
                >
                  <div className={`p-10 md:p-16 rounded-[3rem] ${pillar.bg} border border-transparent transition-all duration-500 hover:shadow-2xl`}>
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                        <pillar.icon className={`w-8 h-8 ${pillar.color}`} />
                      </div>
                      <div>
                        {pillar.tagline && (
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${pillar.color} mb-1 block`}>
                            {pillar.tagline}
                          </span>
                        )}
                        <h3 className="text-3xl md:text-4xl font-black text-[#002147] font-display leading-tight">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-6 mb-12">
                      <p className="text-xl text-[#002147] font-bold leading-snug">
                        {pillar.summary}
                      </p>
                      <p className="text-lg text-slate-600 font-medium leading-relaxed">
                        {pillar.details}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-8 border-t border-black/5">
                      <Link 
                        href={`/programs/${pillar.slug}`}
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#002147] text-white font-bold text-sm hover:bg-[#4A90D9] transition-all shadow-xl shadow-slate-200 group ${FOCUS_BASE}`}
                      >
                        Learn More Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── GLOBAL IMPACT / REBUILDING FUTURES ─── */}
      <section className="py-24 bg-[#002147] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4A90D9_1px,transparent_1px)] [background-size:24px_24px]" />
        <Container className="relative z-10">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-12 md:p-20 rounded-[4rem] text-center max-w-5xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A90D9] text-white text-[10px] font-bold uppercase tracking-widest">
              <Globe className="w-3 h-3" /> Rebuilding Futures
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white font-display tracking-tight leading-none">
              Impacting Beyond <br /> <span className="italic text-[#4A90D9]">Boundaries.</span>
            </h2>
            <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Supporting Banyamulenge youth in refugee camps across Kenya, Uganda, and Burundi with high-demand vocational skills.
            </p>
            <div className="pt-6">
              <Link 
                href="/impact/rebuilding-futures"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#002147] font-bold hover:bg-[#4A90D9] hover:text-white transition-all group"
              >
                Explore Global Initiative
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}