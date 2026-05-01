/**
 * MSNC GetInvolved — Clean Vertical Layout
 * No accordion. No fake tech labels. Simple cards.
 */

'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, Users, Gift, HandHeart } from 'lucide-react'
import { Link } from '@/navigation'

export default function GetInvolved() {
  const t = useTranslations('GetInvolved')

  const actions = [
    {
      id: 'join',
      role: t('actions.join.label'),
      title: t('actions.join.title'),
      body: t('actions.join.body'),
      cta: t('actions.join.cta'),
      link: '/join?role=scholar',
      icon: Users,
    },
    {
      id: 'partner',
      role: t('actions.partner.label'),
      title: t('actions.partner.title'),
      body: t('actions.partner.body'),
      cta: t('actions.partner.cta'),
      link: '/contact',
      icon: Gift,
    },
    {
      id: 'volunteer',
      role: t('actions.volunteer.label'),
      title: t('actions.volunteer.title'),
      body: t('actions.volunteer.body'),
      cta: t('actions.volunteer.cta'),
      link: '/join?role=volunteer',
      icon: HandHeart,
    },
  ]

  return (
    <section className="section bg-white border-t border-border">
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

        {/* Actions — clean cards */}
        <div className="flex flex-col space-y-6">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <div
                key={action.id}
                className="bg-paper-50 border border-border p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-secondary transition-all duration-500"
              >
                <div className="max-w-2xl">
                  <span className="section-label text-secondary mb-4 block">
                    {action.role}
                  </span>
                  <h3 className="text-3xl font-display text-primary mb-4">
                    {action.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {action.body}
                  </p>
                </div>
                <Link
                  href={action.link}
                  className="btn btn-primary group/btn whitespace-nowrap"
                >
                  <span>{action.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
