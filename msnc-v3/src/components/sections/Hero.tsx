/**
 * MSNC Hero - Refined Scholarly Editorial
 * Focus: Full-width typography & enhanced legibility
 */

'use client'

import { motion } from 'framer-motion'
import { Globe, Compass, Star, MoveRight, BookOpen } from 'lucide-react'
import { useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { getUiCopy, normalizeSiteLocale } from '@/lib/site-copy'

export default function Hero() {
  const copy = getUiCopy(normalizeSiteLocale(useLocale()))

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white pb-16 pt-20 md:pb-24 md:pt-28">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[2rem_2rem] opacity-60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-425 px-6 md:px-10 lg:px-16">
        <header className="mb-10 flex items-center justify-between border-b-2 border-slate-900 pb-4">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              MSNC
            </span>
            <span className="h-3 w-px bg-slate-300" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {copy.hero.country}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
              2026
            </span>
          </div>
        </header>

        <div className="mb-16 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full text-[clamp(2.5rem,7vw,7.5rem)] font-black leading-[0.85] tracking-tighter text-[#002147]"
          >
            Empowering <br />
            <span className="mr-4 font-serif font-light italic tracking-tight text-slate-400">
              Banyamulenge Youth
            </span>{' '}
            <br />
            Through Academic Excellence.
          </motion.h1>
        </div>

        <div className="grid gap-0 divide-slate-900 border-t border-slate-900 lg:grid-cols-12 lg:divide-x lg:divide-y-0">
          <div className="py-10 lg:col-span-5 lg:pr-10">
            <div className="mb-6 flex items-center gap-3">
              <Compass className="h-5 w-5 text-blue-600" />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                {copy.hero.commitmentLabel}
              </h2>
            </div>

            <p className="mb-8 border-l-4 border-blue-600 pl-6 text-2xl font-bold leading-tight tracking-tight text-[#002147] md:text-3xl">
              {copy.hero.commitmentLead}
            </p>

            <p className="mb-10 text-sm font-bold leading-relaxed text-slate-500">
              {copy.hero.commitmentBody}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/about"
                className="group flex h-14 w-full items-center justify-between rounded-xl bg-primary-500 px-6 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-blue-700 sm:w-1/2"
              >
                <span>{copy.hero.learnMore}</span>
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
              <Link
                href="/programs"
                className="group flex h-14 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-6 text-[10px] font-black uppercase tracking-widest text-[#002147] transition-all hover:border-slate-900 sm:w-1/2"
              >
                <span>{copy.hero.programs}</span>
                <BookOpen className="h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-600" />
              </Link>
            </div>
          </div>

          <div className="py-10 lg:col-span-4 lg:px-10">
            <div className="mb-6 flex items-center gap-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                {copy.hero.heritageLabel}
              </h2>
            </div>
            <p className="mb-6 text-lg font-medium leading-relaxed text-slate-700">
              {copy.hero.heritageBody}
            </p>
            <div className="grid grid-cols-2 gap-y-4">
              {copy.hero.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" /> {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="py-10 lg:col-span-3 lg:pl-10">
            <div className="mb-6 flex items-center gap-3">
              <Star className="h-5 w-5 text-blue-600" />
              <h2 className="text-[11px] font-black uppercase tracking-widest text-slate-900">
                {copy.hero.visionLabel}
              </h2>
            </div>
            <p className="mb-8 text-xl font-serif italic leading-snug text-slate-700">
              &quot;{copy.hero.visionQuote}&quot;
            </p>
            <div className="border-t border-slate-100 pt-8">
              <span className="mb-2 block text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">
                {copy.hero.principles}
              </span>
              <span className="text-sm font-black uppercase tracking-widest italic text-blue-600">
                {copy.hero.principlesValue}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
