'use client'

import { useTranslations } from 'next-intl'

export interface StatItem {
  id: string
  value: string
}

export interface StatsGridProps {
  stats?: StatItem[]
}

const DEFAULT_STATS: StatItem[] = [
  { id: 'youth', value: '500+' },
  { id: 'success', value: '94%' },
  { id: 'scholarships', value: '42' },
  { id: 'partners', value: '12' },
]

export default function StatsGrid({ stats = DEFAULT_STATS }: StatsGridProps) {
  const t = useTranslations('Stats')

  return (
    <section className="section border-t border-border bg-white">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
          {stats.map((stat, i) => (
            <div key={stat.id} className="flex items-start gap-6">
              <span className="font-display text-5xl md:text-6xl text-primary tracking-tighter leading-none">
                {stat.value}
              </span>
              <div>
                <span className="section-label text-muted-foreground block mb-1">
                  {t(`items.${stat.id}.label` as any)}
                </span>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-[24ch] mb-0">
                  {t(`items.${stat.id}.description` as any)}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block h-16 w-px bg-border ml-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

