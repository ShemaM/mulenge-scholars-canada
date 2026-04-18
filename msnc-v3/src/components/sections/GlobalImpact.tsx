/**
 * MSNC Global Impact — The Program Alignment Grid
 * Architecture: 2x2 Editorial Quadrant
 * Design: High-Contrast Thesis (Pure Light Theme)
 * Content: 100% Document Source / Direct Program Linking
 */

'use client'

import React from 'react'
import Link from 'next/link'
import {
  Eye,
  Target,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'

// ─── Data (Mapped directly to Strategic Pillars in Document) ──────────────

const visionChapters = [
  {
    id: '01',
    label: 'Foundation',
    title: 'Confident in their abilities',
    body: 'Youth equipped with self-assurance to pursue ambitious goals and overcome the barriers of displacement.',
    icon: Target,
    href: '/programs#workshops', // Matches Workshops Pillar
    cta: 'View Workshops',
  },
  {
    id: '02',
    label: 'Scholarship',
    title: 'Successful in their academic journeys',
    body: 'Students thriving in Canadian classrooms and post-secondary institutions—from Grade 11 through to graduation.',
    icon: GraduationCap,
    href: '/programs#high-school', // Matches High School Support Pillar
    cta: 'Academic Support',
  },
  {
    id: '03',
    label: 'Professionalism',
    title: 'Established in meaningful and sustainable careers',
    body: 'Graduates building purposeful careers in skilled trades, professional fields, and leadership roles.',
    icon: Briefcase,
    href: '/programs#adult-learning', // Matches Adult Learning Pillar
    cta: 'Career Pathways',
  },
  {
    id: '04',
    label: 'Stewardship',
    title: 'Leaders who give back to their communities',
    body: 'A generation of Banyamulenge leaders who uplift others—mentoring the next cohort and expanding opportunity.',
    icon: HeartHandshake,
    href: '/programs#rebuilding-futures', // Matches Rebuilding Futures Pillar
    cta: 'Global Initiative',
  },
]

export default function GlobalImpact() {
  return (
    <section
      className="relative py-24 md:py-40 bg-white overflow-hidden border-t-2 border-slate-900"
      aria-labelledby="vision-heading"
    >
      {/* Structural 32px Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.6] pointer-events-none" />

      <div className="w-full px-6 md:px-12 lg:px-16 relative z-10 mx-auto max-w-437.5">
        {/* ─── MASTHEAD (PHASE 05) ─── */}
        <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-16">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">
              The Vision
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Program Alignment
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Eye className="w-4 h-4 text-slate-900" />
            <span className="text-[10px] font-mono font-black uppercase text-slate-900">
              REF_PERSPECTIVE_24
            </span>
          </div>
        </div>

        {/* ─── INTRO STORY ─── */}
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-24">
          <div className="lg:col-span-8">
            <h2
              id="vision-heading"
              className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[0.85] text-[#002147]"
            >
              Our Impact <br />
              <span className="font-serif italic font-light text-slate-300">Perspective.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 pb-2">
            <div className="p-8 border-l-4 border-blue-600 bg-slate-50/50 rounded-r-3xl">
              <p className="text-xl text-slate-600 font-medium leading-tight">
                We envision a future where{' '}
                <span className="text-[#002147] font-black underline decoration-blue-600/30 underline-offset-8">
                  Banyamulenge youth
                </span>{' '}
                flourish as self-reliant community leaders.
              </p>
            </div>
          </div>
        </div>

        {/* ─── THE QUADRANT GRID ─── */}
        <div className="grid md:grid-cols-2 border-2 border-slate-900 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5 bg-slate-900 gap-0.5">
          {visionChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="relative group bg-white p-10 lg:p-16 transition-all duration-700 overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle Ad-Sign Glow Effect on Hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.04),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header Row */}
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-blue-600">
                      MOD_{chapter.id}
                    </span>
                    <div className="h-px w-8 bg-slate-100" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      {chapter.label}
                    </span>
                  </div>
                  <chapter.icon
                    className="w-6 h-6 text-slate-200 group-hover:text-blue-600 transition-all duration-500"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="space-y-6 grow">
                  <h3 className="text-3xl lg:text-4xl font-black tracking-tighter text-[#002147] leading-none group-hover:translate-x-2 transition-transform duration-500">
                    {chapter.title}
                  </h3>

                  <div className="h-1 w-12 bg-slate-100 group-hover:w-full group-hover:bg-blue-600 transition-all duration-700" />

                  <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed italic font-serif">
                    &ldquo;{chapter.body}&rdquo;
                  </p>
                </div>

                {/* Footer Link - Only rendered if href exists */}
                <div className="pt-10 mt-10 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    Verified_Objective
                  </span>

                  {chapter.href && (
                    <Link
                      href={chapter.href}
                      className="group/link flex items-center gap-3 px-5 py-2.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {chapter.cta}
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── FOOTER LABELS ─── */}
        <footer className="mt-20 pt-12 border-t-2 border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              MSNC_Impact_Ledger_2024
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 bg-slate-50 px-6 py-2 rounded-full border border-slate-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#002147]">
              Strategic Interconnect: Vision points aligned to Core Pillars
            </span>
          </div>

          <div className="flex gap-10">
            {['Resilience', 'Scholarship', 'Stewardship'].map((v) => (
              <span
                key={v}
                className="text-[11px] font-black uppercase tracking-widest text-slate-300"
              >
                {v}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </section>
  )
}
