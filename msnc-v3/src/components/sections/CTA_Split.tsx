/**
 * MSNC CTA_Split — Clean Split with Borders
 * No dark blue or dark secondary backgrounds. White + borders.
 */

'use client'

import { GraduationCap, HeartHandshake, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

export default function CtaSplit() {
  const t = useTranslations('CtaSplit')

  return (
    <section className="relative overflow-hidden bg-white border-t border-border" aria-labelledby="cta-heading">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Path A: Scholars */}
          <div className="group px-8 py-20 md:px-16 md:py-28 border-b lg:border-b-0 lg:border-r border-border">
            <div className="max-w-lg space-y-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <GraduationCap className="h-8 w-8" />
              </div>

              <div className="space-y-6">
                <h2 id="cta-heading" className="text-primary text-4xl md:text-5xl font-display leading-tight tracking-tight">
                  {t('scholar.heading')}{' '}
                  <em className="font-display font-normal not-italic text-secondary">
                    {t('scholar.headingItalic')}
                  </em>{' '}
                  {t('scholar.headingEnd')}
                </h2>
                <p className="text-lg font-sans leading-relaxed text-muted-foreground mb-0">
                  {t('scholar.body')}
                </p>
              </div>

              <Link
                href="/join?role=scholar"
                className="btn btn-primary group/btn"
              >
                <span>{t('scholar.cta')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Path B: Mentors & Partners */}
          <div className="group px-8 py-20 md:px-16 md:py-28">
            <div className="max-w-lg space-y-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                <HeartHandshake className="h-8 w-8" />
              </div>

              <div className="space-y-6">
                <h2 className="text-primary text-4xl md:text-5xl font-display leading-tight tracking-tight">
                  {t('partner.heading')}{' '}
                  <em className="font-display font-normal not-italic text-secondary">
                    {t('partner.headingItalic')}
                  </em>{' '}
                  {t('partner.headingEnd')}
                </h2>
                <p className="text-lg font-sans leading-relaxed text-muted-foreground mb-0">
                  {t('partner.body')}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/join?role=volunteer" 
                  className="btn btn-primary"
                >
                  {t('partner.ctaMentor')}
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-outline"
                >
                  {t('partner.ctaPartner')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
