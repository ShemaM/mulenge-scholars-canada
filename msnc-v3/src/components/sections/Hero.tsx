/**
 * MSNC Hero - Refined Scholarly Editorial
 * Focus: Full-width typography & enhanced legibility
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, Compass, Star, MoveRight, BookOpen } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-white pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200">
      {/* Structural 32px Grid Background */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-60"
        aria-hidden="true"
      />

      <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 mx-auto max-w-425">
        {/* ─── MASTHEAD ─── */}
        <header className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              MSNC
            </span>
            <span className="h-3 w-px bg-slate-300" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Canada
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
              2026
            </span>
          </div>
        </header>

        {/* ─── PRIMARY HEADING (Full Width & Balanced Contrast) ─── */}
        <div className="mb-16 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.85] tracking-tighter text-[#002147] font-black w-full"
          >
            Empowering <br />
            <span className="text-slate-400 font-serif italic font-light tracking-tight mr-4">
              Banyamulenge Youth
            </span>{' '}
            <br />
            Through Academic Excellence.
          </motion.h1>
        </div>

        {/* ─── THE TRIPLE COLUMN SPREAD ─── */}
        <div className="grid lg:grid-cols-12 gap-0 border-t border-slate-900 divide-y lg:divide-y-0 lg:divide-x divide-slate-900">
          {/* COLUMN 1: THE COMMITMENT */}
          <div className="lg:col-span-5 py-10 lg:pr-10">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-5 h-5 text-blue-600" />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                I. The Commitment
              </h2>
            </div>

            <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-[#002147] mb-8 border-l-4 border-blue-600 pl-6">
              We are dedicated to empowering youth across Canada through mentorship, academic
              guidance, and leadership development.
            </p>

            <p className="text-sm font-bold text-slate-500 leading-relaxed mb-10">
              By fostering a strong sense of community and belonging, we bridge the gap between
              migration and scholarly success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="group flex items-center justify-between h-14 w-full sm:w-1/2 px-6 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all rounded-xl"
              >
                <span>Learn More</span>
                <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/programs"
                className="group flex items-center justify-between h-14 w-full sm:w-1/2 px-6 bg-white border border-slate-200 text-[#002147] text-[10px] font-black uppercase tracking-widest hover:border-slate-900 transition-all rounded-xl"
              >
                <span>Our Programs</span>
                <BookOpen className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2: THE HERITAGE (Adjusted Font Weight/Size) */}
          <div className="lg:col-span-4 py-10 lg:px-10">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-blue-600" />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                II. Heritage
              </h2>
            </div>
            <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
              Founded by Banyamulenge students, MSNC carries the legacy of the
              highlands—transforming a history of migration and resilience into a catalyst for
              professional growth.
            </p>
            <div className="grid grid-cols-2 gap-y-4">
              {['Mentorship', 'Equity', 'Leadership', 'Excellence'].map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400"
                >
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {tag}
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: THE VISION */}
          <div className="lg:col-span-3 py-10 lg:pl-10">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-5 h-5 text-blue-600" />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                III. The Vision
              </h2>
            </div>
            <p className="text-xl font-serif italic text-slate-700 leading-snug mb-8">
              &quot;A future where our youth are successful in their academic journeys and
              established as leaders giving back to their communities.&quot;
            </p>
            <div className="pt-8 border-t border-slate-100">
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-2">
                Our Guiding Principles
              </span>
              <span className="text-sm font-black text-blue-600 uppercase tracking-widest italic">
                Equity & Excellence
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
