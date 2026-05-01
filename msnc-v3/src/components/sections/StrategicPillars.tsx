/**
 * MSNC Strategic Pillars — Clean Vertical List
 * No grids. Linear storytelling.
 */

import { ArrowUpRight, ShieldCheck, Zap, Globe2, BarChart3 } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'

const icons = {
  '01': ShieldCheck,
  '02': Zap,
  '03': Globe2,
  '04': BarChart3,
} as const

const links = {
  '01': '/programs/workshops-community',
  '02': '/programs/high-school-support',
  '03': '/programs/adult-learning-pathways',
  '04': '/impact/rebuilding-futures',
} as const

export default async function StrategicPillars() {
  const t = await getTranslations('StrategicPillars')
  const pillars = ['01', '02', '03', '04'] as const

  return (
    <section className="section border-t border-border bg-white" aria-labelledby="pillars-heading">
      <div className="container-editorial">
        {/* Header */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">{t('sectionLabel')}</span>
          </div>
          <h2 id="pillars-heading" className="text-4xl md:text-5xl lg:text-6xl font-display text-primary tracking-tight leading-tight mb-6">
            {t('heading')}
          </h2>
          <p className="text-xl text-muted-foreground font-sans max-w-2xl">
            {t('subheading')}
          </p>
        </div>

        {/* Pillars — vertical stack */}
        <div className="flex flex-col space-y-6">
          {pillars.map((id) => {
            const bullets = t.raw(`pillars.${id}.bullets`) as string[]
            const Icon = icons[id]

            return (
              <Link
                key={id}
                href={links[id]}
                className="group relative flex flex-col bg-paper-50 border border-border p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  {/* Left: Icon + Number */}
                  <div className="flex items-center gap-4 md:w-1/4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="font-display text-4xl text-primary/10 group-hover:text-secondary/20 transition-colors">
                      {id}
                    </span>
                  </div>

                  {/* Right: Content */}
                  <div className="md:w-3/4">
                    <h3 className="text-2xl md:text-3xl font-display text-primary mb-4 group-hover:text-secondary transition-colors">
                      {t(`pillars.${id}.title`)}
                    </h3>
                    <p className="font-sans text-lg leading-relaxed text-muted-foreground mb-6">
                      {t(`pillars.${id}.intro`)}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3 font-sans font-medium text-primary">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <span className="section-label text-muted-foreground group-hover:text-primary transition-colors">
                        {t('exploreLabel')}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

