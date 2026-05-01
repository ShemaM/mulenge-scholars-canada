/**
 * MSNC Features (Core Values) — Scannable Icon Cards
 * Cards with icons for Recognition > Recall.
 */

'use client'

import { ArrowUpRight, TrendingUp, Users, Shield, Handshake, Star, Anchor } from 'lucide-react'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

const valueIcons = {
  empowerment: TrendingUp,
  community: Users,
  integrity: Shield,
  collaboration: Handshake,
  excellence: Star,
  resilience: Anchor,
} as const

const valueIds = [
  'empowerment',
  'community',
  'integrity',
  'collaboration',
  'excellence',
  'resilience',
] as const

export default function Features() {
  const t = useTranslations('Features')

  return (
    <section id="values" className="section bg-white border-t border-border">
      <div className="container-editorial">
        {/* Header */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">{t('sectionLabel')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary tracking-tight">
            {t('heading')}
          </h2>
        </div>

        {/* Values — icon card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueIds.map((id, i) => {
            const Icon = valueIcons[id]
            return (
              <div
                key={id}
                className="group bg-paper-50 border border-border p-8 rounded-2xl flex flex-col gap-5 hover:border-secondary transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <span className="font-display text-4xl text-primary/10 group-hover:text-secondary/20 transition-colors">
                    {i + 1}.
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-display text-primary mb-3 group-hover:text-secondary transition-colors duration-300">
                    {t(`items.${id}.title`)}
                  </h3>
                  <p className="text-base text-muted-foreground font-sans leading-relaxed">
                    {t(`items.${id}.description`)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer link */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-muted-foreground font-sans mb-0">
            {t('subheading')}
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 rounded-full"
          >
            <span className="relative section-label text-primary">
              {t('learnMore')}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-secondary transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

