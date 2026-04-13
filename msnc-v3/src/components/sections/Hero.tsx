/**
 * MSNC Hero - The "Editorial Thesis" Architecture
 * Design: High-contrast print editorial, strict baseline grids, sophisticated typography.
 * Content: 100% Exact Text from Dictionary.
 */

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-slate-900';

export default function Hero() {
  return (
    <section className="relative bg-[#FAFAFA] pt-24 md:pt-32 pb-24 overflow-hidden selection:bg-slate-900 selection:text-white border-b border-slate-200">
      
      {/* Subtle Print-Grid Background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-[0.3]"
        aria-hidden="true"
      />

      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 max-w-[1800px] mx-auto">

        {/* ─── 1. THE MASTHEAD (Meta Information) ─── */}
        <header className="flex flex-col md:flex-row md:items-end justify-between border-b-[3px] border-slate-900 pb-6 mb-12 lg:mb-16 gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">
              Vol. 1 — Organization Overview
            </span>
            <span className="text-sm font-serif italic text-slate-900">
              Published in Canada
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-slate-900 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">
              Active Initiative
            </span>
          </div>
        </header>

        {/* ─── 2. THE THESIS TITLE (Massive Typographic Hook) ─── */}
        <div className="mb-16 lg:mb-24">
          <h1 className="text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.85] tracking-tighter text-slate-900 font-black uppercase">
            Mulenge Scholars&apos; <br />
            <span className="font-serif italic font-light normal-case tracking-normal text-slate-600">
              Network Canada
            </span>
            <span className="text-[clamp(2rem,4vw,4rem)] text-slate-400 font-sans tracking-tight ml-4">
              (MSNC)
            </span>
          </h1>
        </div>

        {/* Editorial Thick/Thin Divider */}
        <div className="w-full mb-12">
          <div className="h-[2px] bg-slate-900 w-full" />
          <div className="h-px bg-slate-300 w-full mt-1" />
        </div>

        {/* ─── 3. THE BODY (Split Column Editorial Layout) ─── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN: The "Abstract" & The "Ask" (Span 5) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            
            <div className="mb-12">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-200 pb-3 mb-6">
                I. The Organization
              </h2>
              {/* HCI: Increased leading and font weight for the "Hook" paragraph */}
              <p className="text-2xl md:text-3xl text-slate-900 font-medium leading-[1.4] tracking-tight">
                Mulenge Scholars' Network Canada (MSNC) is a youth-led organization founded by Banyamulenge students who understand firsthand the challenges of navigating new education systems.
              </p>
            </div>

            <div className="mb-12 bg-white p-8 md:p-10 border border-slate-200 shadow-sm">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">
                Our Mission
              </h2>
              <p className="text-xl text-slate-700 font-serif italic leading-relaxed">
                "We are dedicated to empowering youth across Canada through mentorship, academic guidance, and leadership development, while fostering a strong sense of community and belonging."
              </p>
            </div>

            {/* Fitts's Law: Large, accessible CTAs grouped together */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className={`group flex items-center justify-between h-16 w-full sm:w-1/2 px-6 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors duration-500 ease-out ${FOCUS_BASE}`}
              >
                <span>Get Involved</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
              <Link
                href="/programs"
                className={`group flex items-center justify-between h-16 w-full sm:w-1/2 px-6 bg-transparent border border-slate-300 text-slate-900 text-xs font-bold uppercase tracking-widest hover:border-slate-900 hover:bg-slate-50 transition-colors duration-500 ease-out ${FOCUS_BASE}`}
              >
                <span>Our Programs</span>
                <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors duration-500" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: The "Historical Context" (Span 7) */}
          <div className="lg:col-span-7 lg:pl-10 lg:border-l border-slate-200">
            
            <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-200 pb-3 mb-8">
              II. Heritage Context
            </h2>

            {/* Editorial Drop-Cap Paragraph */}
            <div className="text-lg md:text-xl text-slate-600 font-medium leading-[1.7] space-y-8 max-w-prose">
              <p>
                <span className="float-left text-7xl font-serif text-slate-900 leading-[0.8] pr-3 pt-1">
                  T
                </span>
                he Banyamulenge, also known as the Mulenge people, are a community originally from the highlands of eastern Democratic Republic of Congo. Their ancestors migrated to this region generations ago, primarily as pastoralists from neighboring areas such as Rwanda and Burundi.
              </p>
              
              <p>
                Despite their long history in Congo, many Banyamulenge have faced cycles of displacement due to conflict and instability, leading families to seek refuge in different countries across Africa and beyond.
              </p>
            </div>

            {/* Visual Break for Resilience Statement */}
            <div className="mt-12 pt-8 border-t-[2px] border-slate-900 max-w-prose">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">
                Resilience
              </h2>
              <p className="text-2xl text-slate-900 font-black tracking-tight leading-snug">
                These experiences of migration and adaptation have shaped a resilient and diverse global community, one that is now growing in Canada.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}