'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface HeroProps {
  settings?: {
    heroTitle?: string
    featuredQuote?: string
    youthEmpowered?: string
    successRate?: string
  }
  featuredStory?: any
}

export default function Hero({ settings, featuredStory }: HeroProps) {
  const [currentStat, setCurrentStat] = useState(0)
  const [mounted, setMounted] = useState(false)

  const stats = useMemo(
    () => [
      { value: settings?.youthEmpowered ?? '500', label: 'Youth Empowered', suffix: '+' },
      { value: '7', label: 'Strategic Pillars', suffix: '' },
      { value: settings?.successRate ?? '94', label: 'Success Rate', suffix: '%' },
    ],
    [settings]
  )

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [stats.length])

  const heroTitle = settings?.heroTitle || 'Empowering Mulenge Youth Through Education.'
  const displayQuote = featuredStory?.quote || settings?.featuredQuote || 'MSNC showed me I belonged.'
  const displayAuthor = featuredStory?.name || 'Jean-Claude N.'
  const displayRole = featuredStory?.role || 'Scholar · MSNC Member'

  const displayAvatar =
    featuredStory?.image?.url ||
    (typeof featuredStory?.image === 'string' ? featuredStory.image : null) ||
    '/media/logo.png'

  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-24 selection:bg-secondary/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] opacity-[0.035] [background-size:48px_48px]" />
      </div>

      <div className="container-editorial relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-10">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-editorial backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Mulenge Scholars' Network Canada
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-[0.92] tracking-tighter text-primary text-balance">
                {heroTitle.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className={cn(
                      'inline-block mr-[0.25em]',
                      i === 1 ? 'text-secondary italic font-display font-medium' : ''
                    )}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              <p className="text-xl md:text-2xl text-primary/70 leading-relaxed max-w-2xl font-medium border-l-4 border-secondary/30 pl-6">
                We bridge the gap between <span className="text-primary font-black">Mulenge potential</span> and global
                opportunity through mentorship, academic guidance, and leadership development.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-9">
                <Link href="/join">
                  Join the Network
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-9">
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    'rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur',
                    mounted && i === currentStat && 'ring-2 ring-secondary/30'
                  )}
                >
                  <div className="font-display text-3xl font-black text-primary">
                    {stat.value}
                    <span className="text-secondary ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/50 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[3.5rem] border border-slate-200 bg-slate-50 shadow-brand">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/media/hero-scholar.jpg"
                  alt="MSNC Scholar Success Story"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
                      Success Narrative
                    </span>
                  </div>
                  <p className="text-lg font-bold leading-tight text-primary mb-5 italic">"{displayQuote}"</p>
                  <div className="flex items-center gap-4 border-t border-slate-200/60 pt-4">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white shadow-sm bg-slate-200">
                      <Image src={displayAvatar} alt={displayAuthor} fill unoptimized className="object-cover" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary">
                        {displayAuthor}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-primary/50">
                        {displayRole}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
