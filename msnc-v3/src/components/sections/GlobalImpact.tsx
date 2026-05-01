/**
 * MSNC GlobalImpact — Clean Linear Layout
 * No 2-column grid. Vertical storytelling.
 */

'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { ArrowUpRight, Target, GraduationCap, Briefcase, HeartHandshake } from 'lucide-react'

const visionChapters = [
  { id: '01', icon: Target, href: '/programs#workshops' },
  { id: '02', icon: GraduationCap, href: '/programs#high-school' },
  { id: '03', icon: Briefcase, href: '/programs#adult-learning' },
  { id: '04', icon: HeartHandshake, href: '/programs#rebuilding-futures' },
] as const

export default function GlobalImpact() {
  const t = useTranslations('GlobalImpact')
  const values = t.raw('values') as string[]

  return (
    <section className="section border-t border-border bg-white" aria-labelledby="vision-heading">
      <div className="container-editorial">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-10 bg-secondary" aria-hidden="true" />
          <span className="section-label text-secondary">{t('sectionLabel')}</span>
          <span className="section-label text-muted-foreground">{t('programAlignment')}</span>
        </div>

        {/* Heading + vision statement */}
        <div className="mb-16 max-w-4xl">
          <h2 id="vision-heading" className="text-4xl md:text-5xl font-display text-primary tracking-tight mb-8">
            {t('heading')}{' '}
            <em className="font-display font-normal not-italic text-secondary">
              {t('headingItalic')}
            </em>
          </h2>
          <div className="rounded-2xl border-l-2 border-secondary bg-paper-50 px-8 py-6">
            <p className="text-lg font-medium leading-snug text-primary mb-0 font-sans">
              {t('visionStatement')}
            </p>
          </div>
        </div>

        {/* Vision chapters — vertical stack, now clickable cards */}
        <div className="flex flex-col space-y-6 mb-16">
          {visionChapters.map((chapter) => {
            const Icon = chapter.icon
            return (
              <Link
                key={chapter.id}
                href={chapter.href}
                className="group bg-paper-50 border border-border p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-secondary hover:shadow-lg transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shrink-0">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="section-label text-secondary">{chapter.id}</span>
                      <span className="section-label text-muted-foreground">{t(`chapters.${chapter.id}.label`)}</span>
                    </div>
                    <h3 className="text-2xl font-display text-primary mb-2">
                      {t(`chapters.${chapter.id}.title`)}
                    </h3>
                    <p className="text-muted-foreground font-sans leading-relaxed mb-0">
                      {t(`chapters.${chapter.id}.body`)}
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary">
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer row */}
        <footer className="flex flex-col items-center justify-between gap-8 md:flex-row border-t border-border pt-8">
          <div className="flex items-center gap-3">
            <span className="section-label text-primary">{t('footerLabel')}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {values.map((value) => (
              <span key={value} className="section-label text-muted-foreground/50">
                {value}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </section>
  )
}
