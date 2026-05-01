/**
 * MSNC TheChallenge — Clean Editorial Narrative
 * No card grids. No dark backgrounds. Linear storytelling.
 */

'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/navigation'

export default function TheChallenge() {
  const t = useTranslations('TheChallenge')
  const barriers = (t.raw('barriers') || []) as string[]

  const solutions = [
    { id: 'mentorship', num: '01' },
    { id: 'academic', num: '02' },
    { id: 'postSec', num: '03' },
    { id: 'career', num: '04' },
    { id: 'global', num: '05' },
  ]

  return (
    <section className="section bg-white border-t border-border">
      <div className="container-editorial">
        {/* Top narrative */}
        <div className="max-w-3xl mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">{t('sectionLabel')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary mb-8 leading-tight tracking-tight">
            {t('heading')}
          </h2>
          <p className="text-xl text-muted-foreground font-sans leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        {/* Barriers — clean vertical list */}
        <div className="mb-20">
          <h3 className="section-label text-primary mb-8">{t('barrierAnalysisLabel')}</h3>
          <div className="flex flex-col">
            {barriers.map((text: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-6 py-6 border-b border-border group"
              >
                <span className="font-display text-2xl text-secondary/40 group-hover:text-secondary transition-colors">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl font-medium text-primary leading-snug pt-1">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions — clean vertical stack */}
        <div className="bg-paper-50 rounded-[2.5rem] p-8 md:p-16">
          <h3 className="section-label text-primary mb-12">{t('criticalAwarenessLabel')}</h3>
          <div className="flex flex-col space-y-8">
            {solutions.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-6 pb-8 border-b border-border last:border-0 last:pb-0"
              >
                <span className="font-display text-3xl text-secondary/30">
                  {item.num}
                </span>
                <div>
                  <h4 className="text-xl md:text-2xl font-display text-primary mb-2">
                    {t(`solutions.${item.id}.title`)}
                  </h4>
                  <span className="section-label text-secondary block mb-2">
                    {t(`solutions.${item.id}.tagline`)}
                  </span>
                  <p className="text-muted-foreground font-sans leading-relaxed">
                    {t(`solutions.${item.id}.detail`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/programs"
              className="btn btn-primary group"
            >
              <span>{t('viewAllPrograms')}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

