/**
 * MSNC Hero Component (Light Theme + Pathfinder Composite)
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THEME & HCI UPDATE:
 * • Content: Exact match with the MSNC client PDF ("Who We Are").
 * • Visuals: Removed the static image entirely. 
 * • Right Column: Replaced with the "Pathfinder" (Option 2). This acts as 
 * an interactive concierge, providing immediate, zero-scroll routing for 
 * High Schoolers, Adult Learners, and Partners.
 * • Includes a "Live Notice" pin to maintain the active, real-time feel.
 * ─────────────────────────────────────────────────────────────────────────
 */

import Link from 'next/link';
import { ArrowRight, Globe, GraduationCap, Briefcase, Compass, BellRing } from 'lucide-react';
import Container from '@/components/ui/Container';
import { getSiteSettings } from '@/lib/payload';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6F4763]';

export default async function Hero() {
  const settings = await getSiteSettings().catch(() => null);

  const stats = [
    { value: settings?.youthEmpowered ?? '500', label: 'Youth Empowered', suffix: '+' },
    { value: '4', label: 'Core Programs', suffix: '' },
    { value: settings?.successRate ?? '94', label: 'Success Rate', suffix: '%' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF7F9] min-h-[95svh] flex flex-col justify-center pt-32 pb-24 selection:bg-[#6F4763]/20" aria-label="Introduction">
      
      {/* ─── Background Architectural Elements (The Synthesis Metaphor) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-multiply" aria-hidden="true">
        {/* DRC Sky Blue Orb (Top Right) */}
        <div className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-[#0369a1]/10 blur-[120px]" />
        
        {/* Canadian Red Orb (Bottom Left) */}
        <div className="absolute top-20 -left-24 h-[600px] w-[600px] rounded-full bg-[#dc2626]/10 blur-[120px]" />
        
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#6F4763_1px,transparent_1px)] opacity-[0.04] [background-size:40px_40px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ════════════════════════════════════════════════════════════
              LEFT: EDITORIAL CONTENT (Exact PDF Match)
          ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#6F4763]/20 bg-white/80 backdrop-blur-sm px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#6F4763] animate-pulse" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6F4763]">
                Mulenge Scholars' Network
              </span>
            </div>

            <div className="space-y-8">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-[#002147] text-balance">
                Empowering <br />
                <em className="not-italic text-[#6F4763]">Youth</em> Across Canada.
              </h1>

              <div className="text-lg text-slate-600 leading-relaxed max-w-xl font-medium border-l-[3px] border-[#6F4763]/30 pl-6 space-y-4">
                <p>
                  Mulenge Scholars' Network Canada (MSNC) is a youth-led organization founded by Banyamulenge students who understand firsthand the challenges of navigating new education systems.
                </p>
                <p>
                  We are dedicated to empowering youth across Canada through mentorship, academic guidance, and leadership development, while fostering a strong sense of community and belonging.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/join?role=mentor"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#002147] text-white text-sm font-bold hover:bg-[#6F4763] shadow-lg hover:shadow-[#6F4763]/20 transition-all duration-300 group ${FOCUS_BASE}`}
              >
                Join the Network
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link 
                href="/about"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-[#002147] text-sm font-bold hover:border-[#6F4763]/30 hover:bg-white shadow-sm transition-all duration-300 group ${FOCUS_BASE}`}
              >
                Our Heritage Story
              </Link>
            </div>

            {/* Dynamic Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="font-display text-3xl md:text-4xl font-black text-[#002147] group-hover:text-[#6F4763] transition-colors duration-500">
                    {stat.value}
                    <span className="text-[#6F4763] text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#6F4763]/70 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT: THE PATHFINDER (Interactive Directory)
          ════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            
            {/* Decorative Offset Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#6F4763]/10 to-[#0369a1]/10 rounded-[3rem] transform rotate-3 scale-105 hidden md:block" />

            {/* Pathfinder Container */}
            <div className="relative bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(111,71,99,0.08)] p-8 md:p-12 w-full max-w-[500px] mx-auto lg:ml-auto">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                 <div>
                   <h2 className="text-3xl font-black text-[#002147] font-display">Pathfinder</h2>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">Quick Routing Directory</p>
                 </div>
                 <div className="h-14 w-14 rounded-2xl bg-[#FAF7F9] border border-[#6F4763]/10 flex items-center justify-center shrink-0">
                   <Compass className="w-7 h-7 text-[#6F4763]" strokeWidth={1.5} />
                 </div>
              </div>

              {/* Path Cards */}
              <nav className="space-y-4" aria-label="Quick directory">
                
                {/* Path 1: High Schoolers */}
                <Link 
                  href="/programs#high-school"
                  className={`group flex items-center gap-5 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#4A90D9]/30 hover:shadow-lg hover:shadow-[#4A90D9]/5 transition-all duration-300 ${FOCUS_BASE}`}
                >
                  <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-[#4A90D9]/30 transition-colors">
                    <GraduationCap className="w-6 h-6 text-[#4A90D9]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#4A90D9] mb-1">For Students</div>
                    <div className="text-lg font-black text-[#002147]">High School Support</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#4A90D9] group-hover:translate-x-1 transition-all" />
                </Link>

                {/* Path 2: Adult Learners */}
                <Link 
                  href="/programs#adult-learning"
                  className={`group flex items-center gap-5 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#6F4763]/30 hover:shadow-lg hover:shadow-[#6F4763]/5 transition-all duration-300 ${FOCUS_BASE}`}
                >
                  <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-[#6F4763]/30 transition-colors">
                    <Briefcase className="w-6 h-6 text-[#6F4763]" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#6F4763] mb-1">For Adults</div>
                    <div className="text-lg font-black text-[#002147]">Vocational Training</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#6F4763] group-hover:translate-x-1 transition-all" />
                </Link>

                {/* Path 3: Global Partners */}
                <Link 
                  href="/impact/rebuilding-futures"
                  className={`group flex items-center gap-5 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-[#002147] hover:border-[#002147] transition-all duration-300 ${FOCUS_BASE}`}
                >
                  <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-white/10 group-hover:bg-white/10 transition-colors">
                    <Globe className="w-6 h-6 text-red-500 group-hover:text-white" />
                  </div>
                  <div className="flex-grow">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-500 group-hover:text-white/70 mb-1">For Partners</div>
                    <div className="text-lg font-black text-[#002147] group-hover:text-white">Rebuilding Futures</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>

              </nav>

              {/* Alert / Notice Board Pin */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#EEF5FD] border border-[#4A90D9]/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#4A90D9]/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/3" />
                  <BellRing className="w-5 h-5 text-[#4A90D9] shrink-0 mt-0.5 relative z-10" />
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#4A90D9] mb-1">Live Update</p>
                    <p className="text-sm font-bold text-[#002147] leading-snug">
                      Fall 2026 Mentorship applications are currently open for Grades 11 and 12.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}