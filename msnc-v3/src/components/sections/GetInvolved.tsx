'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, Gift, HandHeart, ChevronRight } from 'lucide-react'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

export default function GetInvolved() {
  const t = useTranslations('GetInvolved')
  const actions = [
    {
      id: '01',
      title: t('actions.join.title'),
      role: t('actions.join.label'),
      desc: t('actions.join.body'),
      detail: t('actions.join.body'),
      cta: t('actions.join.cta'),
      link: '/join?role=student',
      icon: Users,
      brandColor: 'text-[#002147]',
      brandBg: 'bg-[#002147]',
      brandBorder: 'border-[#002147]',
    },
    {
      id: '02',
      title: t('actions.partner.title'),
      role: t('actions.partner.label'),
      desc: t('actions.partner.body'),
      detail: t('actions.partner.body'),
      cta: t('actions.partner.cta'),
      link: '/join?role=partner',
      icon: Gift,
      brandColor: 'text-blue-600',
      brandBg: 'bg-blue-600',
      brandBorder: 'border-blue-600',
    },
    {
      id: '03',
      title: t('actions.volunteer.title'),
      role: t('actions.volunteer.label'),
      desc: t('actions.volunteer.body'),
      detail: t('actions.volunteer.body'),
      cta: t('actions.volunteer.cta'),
      link: '/join?role=volunteer',
      icon: HandHeart,
      brandColor: 'text-slate-600',
      brandBg: 'bg-slate-600',
      brandBorder: 'border-slate-400',
    },
  ]
  const [activeId, setActiveId] = useState<string>('01')

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32" aria-labelledby="gi-heading">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.5]" />

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 md:px-12 lg:px-16">
        <div className="mb-16 flex items-center justify-between border-b-2 border-slate-900 pb-3">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
              {t('sectionLabel')}
            </span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Phase_04: Call to Action
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            <span className="text-[10px] font-mono font-black text-slate-900">REF_ACTIVATE</span>
          </div>
        </div>

        <div className="mb-20 grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2
              id="gi-heading"
              className="text-5xl font-black leading-[0.85] tracking-tighter text-[#002147] md:text-7xl lg:text-[5.5rem]"
            >
              {t('heading')} <br />
              <span className="font-serif font-light italic text-slate-300">Next Chapter.</span>
            </h2>
          </div>
          <div className="pb-2 lg:col-span-4">
            <p className="border-l-4 border-blue-600 pl-8 text-xl font-medium leading-tight text-slate-600">
              {t('actions.join.body')}
            </p>
          </div>
        </div>

        <div className="flex h-auto flex-col gap-4 lg:h-[580px] lg:flex-row">
          {actions.map((action) => {
            const isActive = activeId === action.id
            const Icon = action.icon

            return (
              <motion.div
                key={action.id}
                layout
                onMouseEnter={() => setActiveId(action.id)}
                onClick={() => setActiveId(action.id)}
                className={cn(
                  'relative cursor-pointer overflow-hidden rounded-[2.5rem] border-2 bg-white transition-all duration-700',
                  isActive ? cn(action.brandBorder, 'shadow-2xl shadow-blue-900/10') : 'border-slate-100 hover:border-slate-200',
                )}
                style={{ flex: isActive ? 4.5 : 1 }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.03),transparent)]"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex h-full flex-col p-8 md:p-12">
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex h-full flex-col items-center justify-between py-6"
                    >
                      <span className="text-[11px] font-mono font-bold text-slate-300">MOD_0{action.id}</span>
                      <span className="rotate-180 [writing-mode:vertical-lr] text-sm font-black uppercase tracking-[0.25em] text-[#002147]">
                        {action.title}
                      </span>
                      <Icon className="h-6 w-6 text-slate-200" strokeWidth={1.5} />
                    </motion.div>
                  )}

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex h-full flex-col justify-between"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-4">
                          <span
                            className={cn(
                              'inline-block rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-widest',
                              action.brandBorder,
                              action.brandColor,
                            )}
                          >
                            STAKEHOLDER: {action.role}
                          </span>
                          <h3 className="text-4xl font-black tracking-tighter text-[#002147] md:text-6xl">
                            {action.title}
                          </h3>
                        </div>
                        <div className={cn('rounded-[1.5rem] p-5 text-white shadow-xl shadow-blue-900/5', action.brandBg)}>
                          <Icon className="h-10 w-10" strokeWidth={2} />
                        </div>
                      </div>

                      <div className="ml-2 max-w-2xl border-l-2 border-slate-100 pl-8">
                        <p className="mb-6 text-2xl font-bold leading-tight text-[#002147]">{action.desc}</p>
                        <p className="text-lg font-medium italic leading-relaxed text-slate-500">
                          &ldquo;{action.detail}&rdquo;
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col items-center justify-between gap-8 border-t border-slate-100 pt-10 md:flex-row">
                        <Link
                          href={action.link}
                          className={cn(
                            'group/btn flex h-16 w-full items-center justify-between gap-6 rounded-full px-10 text-[11px] font-black uppercase tracking-widest text-white shadow-xl shadow-blue-900/10 transition-all md:w-auto',
                            action.brandBg,
                          )}
                        >
                          {action.cta}
                          <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                        </Link>

                        <div className="hidden items-center gap-3 md:flex">
                          {actions.map((dot) => (
                            <div
                              key={dot.id}
                              className={cn(
                                'h-1.5 rounded-full transition-all duration-700',
                                dot.id === action.id ? 'w-12 bg-[#002147]' : 'w-3 bg-slate-200',
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-100 pt-8 md:flex-row">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">© 2026 MSNC Canada</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {t('sectionLabel')}
            </span>
            <ChevronRight className="h-4 w-4 text-slate-200" />
          </div>
        </div>
      </div>
    </section>
  )
}
