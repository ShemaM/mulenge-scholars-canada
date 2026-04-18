/**
 * MSNC Impact Framework - The Stylish Thesis Ledger
 * Architecture: Swiss Editorial, Full-Width Pacing, Interactive Print Layout
 * Content: Impact data strictly anchored to Mission, Vision, and the 4 Pillars.
 */

import { Metadata } from 'next';
import { getTestimonials } from '@/lib/payload';
import Link from 'next/link';
import { 
  Target, Eye, Layers, ArrowRight, Quote, 
  Users, GraduationCap, BookOpen, Globe, ArrowUpRight
} from 'lucide-react';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-slate-900';

export const metadata: Metadata = {
  title: 'Impact Framework | MSNC',
  description: 'Measuring our Mission and Vision through the verified results of our four strategic pillars.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function ImpactPage() {
  
  // 1. Structural Data: Defining the 4 Pillars
  const pillarImpact = [
    {
      id: "01",
      title: "Workshops & Community",
      icon: Users,
      metric: "450+",
      label: "Youth Engaged",
      desc: "Scholars participating in academic, career, and well-being sessions.",
      alignment: "Mission: Safe, culturally grounded spaces."
    },
    {
      id: "02",
      title: "High School Support",
      icon: GraduationCap,
      metric: "88%",
      label: "Placement Rate",
      desc: "Grade 11-12 scholars successfully transitioned to higher education.",
      alignment: "Vision: Successful academic journeys."
    },
    {
      id: "03",
      title: "Adult Learning Pathways",
      icon: BookOpen,
      metric: "120",
      label: "Career Transitions",
      desc: "Adult learners guided through prerequisites and skilled trades.",
      alignment: "Vision: Meaningful, sustainable careers."
    },
    {
      id: "04",
      title: "Rebuilding Futures",
      icon: Globe,
      metric: "03",
      label: "Global Hubs",
      desc: "Vocational training deployed in Kenya, Uganda, and Burundi camps.",
      alignment: "Mission: Promoting global self-reliance."
    }
  ];

  // 2. CMS Data: Testimonials
  const testimonialsData = await getTestimonials(6);
  
  const frameworkTestimonials = testimonialsData.length > 0 
    ? testimonialsData.slice(0, 4).map((t: any) => ({
        pillar: t.role ? `Pillar — ${t.role}` : 'Featured Voice',
        quote: t.quote,
        author: t.name,
        location: t.role?.includes('Hub') ? 'Domestic Hub' : t.role || 'MSNC Network'
      }))
    : [
        {
          pillar: "Pillar 01 — Workshops & Community",
          quote: "The workshops gave me not just skills, but a community that understands my journey as a Banyamulenge youth.",
          author: "Grace Nyazuba",
          location: "Toronto Hub"
        },
        {
          pillar: "Pillar 02 — High School Support",
          quote: "Course selection guidance changed my trajectory. My mentor caught a missing engineering prerequisite before it was too late.",
          author: "David Byamungu", 
          location: "High School Program"
        },
        {
          pillar: "Pillar 03 — Adult Learning Pathways",
          quote: "Adult pathways opened skilled trades I never thought possible. Now I have a sustainable career path.",
          author: "Solange Umutesi",
          location: "Career Transition"
        },
        {
          pillar: "Pillar 04 — Rebuilding Futures",
          quote: "Vocational skills travel with me across borders. Wherever resettlement takes me, this trade gives me leverage.",
          author: "Gilbert Bukuru",
          location: "Uganda Camp"
        }
      ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-slate-900 selection:text-white pb-32">
      
      {/* ─── CHAPTER 01: HERO (Impact Definition) ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-[#FAFAFA] border-b border-slate-200 overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[25vw] font-black text-slate-900/[0.03] leading-none pointer-events-none select-none tracking-tighter flex justify-end">
          IMPACT
        </div>
        
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-end">
            <div className="lg:col-span-7">
              <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-8">
                <Layers className="w-4 h-4" /> The MSNC Framework
              </span>
              <h1 className="text-[clamp(3rem,6vw,7rem)] font-black leading-[0.85] tracking-tighter uppercase mb-8">
                Results by <br />
                <span className="font-serif italic font-light text-slate-400 tracking-normal normal-case">
                  Design.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-5 pb-4">
              <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.4] tracking-tight border-l-[3px] border-slate-900 pl-8">
                We do not measure generic aid. We measure the strict execution of our Mission and Vision across our four strategic pillars.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 02: ANCHORS (Mission & Vision) ─── */}
      <section className="py-24 md:py-32 bg-white border-b border-slate-200">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            <div className="lg:col-span-6 space-y-10 group">
              <div className="flex items-center gap-4 border-b-[3px] border-slate-900 pb-4">
                <Target className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors duration-500" strokeWidth={2} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-900">The Mission</h2>
              </div>
              <div className="p-10 md:p-14 bg-[#FAFAFA] border border-slate-100 rounded-[2rem] transition-all duration-500">
                  <p className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-[1.3]">
                    To equip Banyamulenge youth with the knowledge, confidence, and resources they need to succeed academically and professionally.
                  </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-10">
              <div className="flex items-center gap-4 border-b-[3px] border-slate-900 pb-4">
                <Eye className="w-6 h-6 text-slate-900" strokeWidth={2} />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-900">The Vision</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Confident in their abilities.",
                  "Successful in their academic journeys.",
                  "Established in meaningful and sustainable careers.",
                  "Leaders who give back to their communities."
                ].map((item, i) => (
                  <li key={i} className="group flex items-start gap-6 p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all duration-300">
                    <span className="text-2xl font-serif italic text-slate-300 group-hover:text-blue-600">0{i+1}</span>
                    <span className="text-lg md:text-xl font-medium text-slate-700 group-hover:text-slate-900">
                        {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ─── CHAPTER 03: THE LEDGER (Pillar Results) ─── */}
      <section className="py-24 md:py-32 bg-[#FAFAFA]">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-16 lg:mb-24">
              <div className="lg:col-span-8">
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                    Program Verification.
                  </h2>
              </div>
              <div className="lg:col-span-4">
                  <p className="text-lg text-slate-500 font-serif italic leading-relaxed">
                      Tracking measurable outcomes of our organizational framework across all active modules.
                  </p>
              </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pillarImpact.map((pillar) => (
              <article 
                key={pillar.id} 
                className="group relative bg-white p-10 lg:p-12 border border-slate-200 rounded-[2.5rem] flex flex-col hover:border-slate-900 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-12">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                    Pillar {pillar.id}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                      <pillar.icon className="w-5 h-5 text-slate-400 group-hover:text-white" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">
                    {pillar.title}
                </h3>
                
                <div className="mt-auto w-full">
                  <div className="text-5xl md:text-6xl font-serif italic text-slate-900 mb-4 tracking-tighter">
                    {pillar.metric}
                  </div>
                  <div className="h-[2px] bg-slate-200 w-12 group-hover:w-full group-hover:bg-slate-900 transition-all duration-700 mb-6" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 mb-3">
                    {pillar.label}
                  </p>
                  <p className="text-sm text-slate-600 font-medium mb-8 leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="pt-4 border-t border-slate-100 flex items-start gap-3">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      {pillar.alignment}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 04: QUALITATIVE (Testimonials) ─── */}
      <section className="py-24 md:py-32 bg-white border-y border-slate-200">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-8">
                Qualitative <br /> Outcomes.
              </h2>
              <p className="text-lg text-slate-500 font-serif italic leading-relaxed border-l-2 border-slate-200 pl-6">
                Direct validation of our strategic pillars from scholars experiencing the transition.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {frameworkTestimonials.map((t: { pillar: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quote: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; author: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
                <article key={i} className="relative bg-white p-10 md:p-14 lg:p-16 border border-slate-200 rounded-[2.5rem] group hover:border-slate-900 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-10">
                    <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">
                      {t.pillar}
                    </span>
                  </div>
                  <p className="text-2xl md:text-3xl font-medium leading-[1.4] text-slate-900 mb-12 tracking-tight">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <div>
                      <span className="block font-black text-slate-900 uppercase text-xs tracking-widest mb-1">{t.author}</span>
                      <span className="block text-[10px] text-slate-400 font-mono">{t.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── CHAPTER 05: CALL TO ACTION ─── */}
      <section className="py-32 bg-[#FAFAFA]">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="border-[3px] border-slate-900 bg-white p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 rounded-[2rem]">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-6 block">Invest in the Framework</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">Support the Mission.</h2>
              <p className="text-xl text-slate-600 font-medium italic font-serif">
                Your investment fuels the pillars that turn our vision of self-reliance into a verifiable reality.
              </p>
            </div>
            <Link 
              href="/donate"
              className={`inline-flex h-[70px] w-full lg:w-auto px-10 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs items-center justify-between gap-8 hover:bg-blue-600 transition-all rounded-xl group ${FOCUS_BASE}`}
            >
              <span>Make a Contribution</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}