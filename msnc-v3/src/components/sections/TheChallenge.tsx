'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight, Users, BookOpen, GraduationCap, Briefcase, Globe, Plus, X, AlertCircle } from 'lucide-react'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

const BRAND = { navy: '#002147', blue: '#1d4ed8', red: '#E31937' }

function SolutionCard({
  item,
}: {
  item: {
    id: string
    icon: typeof Users
    title: string
    tagline: string
    detail: string
    color: string
  }
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:shadow-lg md:h-72">
      <div className="flex h-full flex-col justify-between p-6">
        <div>
          <div
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${item.color}10`, color: item.color }}
          >
            <item.icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <h3 className="mb-1 text-lg font-black uppercase tracking-tighter leading-tight text-slate-900">
            {item.title}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {item.tagline}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600"
        >
          <Plus className="h-3 w-3 transition-transform group-hover:rotate-90" />
          Learn More
        </button>
      </div>

      <div
        className={cn(
          'absolute inset-0 z-20 flex flex-col justify-between p-6 transition-transform duration-500 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
        style={{ backgroundColor: item.color }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="self-end rounded-full bg-white/10 p-1 hover:bg-white/20"
        >
          <X className="h-4 w-4 text-white" />
        </button>
        <p className="mb-4 text-sm font-medium leading-relaxed text-white">{item.detail}</p>
        <div className="h-1 w-8 rounded-full bg-white/40" />
      </div>
    </div>
  )
}

export default function TheChallenge() {
  const t = useTranslations('TheChallenge')
  const solutions = [
    {
      id: 'mentorship',
      icon: Users,
      title: t('solutions.mentorship.title'),
      tagline: t('solutions.mentorship.tagline'),
      detail: t('solutions.mentorship.detail'),
      color: BRAND.navy,
    },
    {
      id: 'academic',
      icon: BookOpen,
      title: t('solutions.academic.title'),
      tagline: t('solutions.academic.tagline'),
      detail: t('solutions.academic.detail'),
      color: BRAND.blue,
    },
    {
      id: 'post-sec',
      icon: GraduationCap,
      title: t('solutions.postSec.title'),
      tagline: t('solutions.postSec.tagline'),
      detail: t('solutions.postSec.detail'),
      color: '#0369a1',
    },
    {
      id: 'career',
      icon: Briefcase,
      title: t('solutions.career.title'),
      tagline: t('solutions.career.tagline'),
      detail: t('solutions.career.detail'),
      color: '#0f766e',
    },
    {
      id: 'global',
      icon: Globe,
      title: t('solutions.global.title'),
      tagline: t('solutions.global.tagline'),
      detail: t('solutions.global.detail'),
      color: BRAND.red,
    },
  ]
  const barriers = t.raw('barriers') as string[]

  return (
    <section className="border-t border-slate-200 bg-[#FAFAFA] py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
        <div className="mb-16 grid items-end gap-12 border-b border-slate-200 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-blue-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600">
                {t('sectionLabel')}
              </span>
            </div>
            <h2 className="mb-8 text-6xl font-black uppercase leading-[0.85] tracking-tighter text-slate-900 md:text-8xl">
              {t('heading').split(' ')[0]} <br /> {t('heading').split(' ').slice(1).join(' ')}
              <span className="text-slate-300">.</span>
            </h2>
            <p className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-slate-900 md:text-3xl">
              {t('subheading')}
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5 lg:pl-12">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-red-500" />
              <div>
                <h4 className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {t('criticalAwarenessLabel')}
                </h4>
                <p className="text-sm font-medium leading-relaxed text-slate-600">
                  {t('criticalAwarenessBody')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4 lg:sticky lg:top-24">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              {t('barrierAnalysisLabel')}
            </h4>
            <div className="grid gap-4">
              {barriers.map((text, i) => (
                <div key={text} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-black text-blue-600">0{i + 1}</span>
                  <span className="text-sm font-bold tracking-tight text-slate-800">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {solutions.map((item) => (
                <SolutionCard key={item.id} item={item} />
              ))}

              <div className="relative flex h-64 w-full flex-col justify-between overflow-hidden rounded-2xl bg-slate-900 p-8 md:h-72">
                <div className="absolute right-0 top-0 p-4 opacity-10">
                  <ArrowRight className="h-32 w-32 rotate-[-45deg] text-white" />
                </div>
                <h3 className="relative z-10 text-xl font-black uppercase leading-tight text-white">
                  {t('joinNetworkTitle')}
                </h3>
                <Link
                  href="/programs"
                  className="relative z-10 flex h-12 w-full items-center justify-between rounded-xl bg-white px-5 text-[10px] font-black uppercase tracking-widest text-slate-900 transition-colors hover:bg-blue-50"
                >
                  {t('viewAllPrograms')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
