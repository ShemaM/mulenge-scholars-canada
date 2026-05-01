'use client'

import { ArrowUpRight, BookOpen, GraduationCap, Users, Wrench } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const initiatives = [
  {
    label: 'Community Engagement',
    title: 'Workshops & Community Engagement',
    body: 'Interactive sessions focused on academic success, career development, and navigating student life in Canada.',
    icon: Users,
  },
  {
    label: 'Grades 11-12',
    title: 'High School Support',
    body: 'Targeted transition support for Grades 11-12, including course selection, post-secondary planning, and application assistance.',
    icon: GraduationCap,
  },
  {
    label: 'Adult Education',
    title: 'Adult Learning & Career Pathways',
    body: 'Guidance for adult learners on prerequisite courses, trades, and alternative career paths.',
    icon: BookOpen,
  },
  {
    label: 'Global Outreach',
    title: 'Rebuilding Futures Initiative',
    body: 'Vocational training in construction, IT, mechanics, and other high-demand skills for youth in refugee camps in Kenya, Uganda, and Burundi.',
    icon: Wrench,
  },
]

export default function Programs() {
  const t = useTranslations('ProgramsSection')

  return (
    <section id="programs" className="section bg-paper-50">
      <div className="container-editorial">
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">{t('label')}</span>
          </div>
          <h2 className="font-display text-4xl tracking-tight text-primary md:text-5xl lg:text-6xl">
            {t('heading')}
          </h2>
        </div>

        <div className="flex flex-col space-y-6">
          {initiatives.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="group flex flex-col items-start justify-between gap-8 rounded-[2.5rem] border border-border bg-white p-8 transition-all duration-500 hover:border-secondary md:flex-row md:items-center md:p-14"
              >
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <span className="section-label text-secondary">{item.label}</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-display text-primary">{item.title}</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">{item.body}</p>
                </div>

                <Link
                  href="/programs"
                  className="inline-flex items-center gap-3 rounded-full border border-border px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-primary transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary group-hover:text-white"
                  aria-label={`${t('learnMore')} ${item.title}`}
                >
                  <span>{t('learnMore')}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
