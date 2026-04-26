'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Eye, Target, GraduationCap, Briefcase, HeartHandshake, ArrowUpRight, Sparkles } from 'lucide-react'

export default function GlobalImpact() {
  const t = useTranslations('GlobalImpact')
  const values = t.raw('values') as string[]
  const visionChapters = [
    { id: '01', icon: Target, href: '/programs#workshops' },
    { id: '02', icon: GraduationCap, href: '/programs#high-school' },
    { id: '03', icon: Briefcase, href: '/programs#adult-learning' },
    { id: '04', icon: HeartHandshake, href: '/programs#rebuilding-futures' },
  ] as const

  return (
    <section
      className="relative overflow-hidden border-t-2 border-slate-900 bg-white py-24 md:py-40"
      aria-labelledby="vision-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.6]" />

      <div className="relative z-10 mx-auto w-full max-w-437.5 px-6 md:px-12 lg:px-16">
        <div className="mb-16 flex items-center justify-between border-b-2 border-slate-900 pb-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">
              {t('sectionLabel')}
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {t('programAlignment')}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Eye className="h-4 w-4 text-slate-900" />
            <span className="text-[10px] font-mono font-black uppercase text-slate-900">
              REF_PERSPECTIVE_24
            </span>
          </div>
        </div>

        <div className="mb-24 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2
              id="vision-heading"
              className="text-5xl font-black leading-[0.85] tracking-tighter text-[#002147] md:text-7xl lg:text-[6rem]"
            >
              {t('heading')} <br />
              <span className="font-serif font-light italic text-slate-300">
                {t('headingItalic')}
              </span>
            </h2>
          </div>
          <div className="pb-2 lg:col-span-4">
            <div className="rounded-r-3xl border-l-4 border-blue-600 bg-slate-50/50 p-8">
              <p className="text-xl font-medium leading-tight text-slate-600">
                {t('visionStatement')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-0.5 overflow-hidden rounded-[3rem] border-2 border-slate-900 bg-slate-900 shadow-2xl shadow-blue-900/5 md:grid-cols-2">
          {visionChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="group relative flex flex-col justify-between overflow-hidden bg-white p-10 transition-all duration-700 lg:p-16"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.04),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-black text-blue-600">MOD_{chapter.id}</span>
                    <div className="h-px w-8 bg-slate-100" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                      {t(`chapters.${chapter.id}.label`)}
                    </span>
                  </div>
                  <chapter.icon className="h-6 w-6 text-slate-200 transition-all duration-500 group-hover:text-blue-600" strokeWidth={1.5} />
                </div>

                <div className="grow space-y-6">
                  <h3 className="text-3xl font-black leading-none tracking-tighter text-[#002147] transition-transform duration-500 group-hover:translate-x-2 lg:text-4xl">
                    {t(`chapters.${chapter.id}.title`)}
                  </h3>

                  <div className="h-1 w-12 bg-slate-100 transition-all duration-700 group-hover:w-full group-hover:bg-blue-600" />

                  <p className="text-lg font-medium italic leading-relaxed text-slate-500 lg:text-xl">
                    &ldquo;{t(`chapters.${chapter.id}.body`)}&rdquo;
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {t('verifiedObjective')}
                  </span>

                  <Link
                    href={chapter.href}
                    className="group/link flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 shadow-sm transition-all duration-300 hover:bg-primary-500 hover:text-white"
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {t(`chapters.${chapter.id}.cta`)}
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-8 border-t-2 border-slate-900 pt-12 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="h-3 w-3 animate-pulse rounded-full bg-blue-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              {t('footerLabel')}
            </span>
          </div>

          <div className="hidden items-center gap-4 rounded-full border border-slate-100 bg-slate-50 px-6 py-2 lg:flex">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#002147]">
              {t('strategicInterconnect')}
            </span>
          </div>

          <div className="flex gap-10">
            {values.map((value) => (
              <span key={value} className="text-[11px] font-black uppercase tracking-widest text-slate-300">
                {value}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </section>
  )
}
