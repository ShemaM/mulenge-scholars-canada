'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export interface TestimonialRecord {
  id: string
  authorName?: string
  name?: string
  authorRole?: string | null
  role?: string | null
  institution?: string | null
  location?: string | null
  quote: string
  imageUrl?: string | null
  image?: { url: string } | null
  journey?: string | null
  stats?: unknown | null
}

export default function Testimonials({ data }: { data: TestimonialRecord[] }) {
  const t = useTranslations('Testimonials')
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  if (!data || data.length === 0) return null

  const isSingle = data.length === 1

  useEffect(() => {
    if (!isAutoPlaying || isSingle) return
    const id = setInterval(() => setCurrent((prev) => (prev + 1) % data.length), 10000)
    return () => clearInterval(id)
  }, [data.length, isAutoPlaying, isSingle])

  const next = () => {
    if (isSingle) return
    setCurrent((prev) => (prev + 1) % data.length)
    setIsAutoPlaying(false)
  }

  const prev = () => {
    if (isSingle) return
    setCurrent((prev) => (prev - 1 + data.length) % data.length)
    setIsAutoPlaying(false)
  }

  const entry = data[current]
  const displayName = entry.authorName || entry.name || 'Scholar'
  const displayRole = entry.authorRole || entry.role || ''
  const displayImage = entry.imageUrl || entry.image?.url
  const initial = displayName.charAt(0) || 'M'
  const caption = entry.institution ? t('captionYear', { year: entry.institution }) : t('captionPrefix')

  return (
    <section className="section overflow-hidden border-t border-border bg-paper-50">
      <div className="container-editorial">
        <div className="mb-12 max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-12 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">{t('heading')}</span>
          </div>
          <h2 className="mb-0 max-w-2xl text-primary">{t('subheading')}</h2>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white p-8 shadow-[0_24px_80px_-48px_rgba(0,33,71,0.22)] md:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

          <div className="mb-8 flex items-center gap-4">
            {displayImage ? (
              <img
                src={displayImage}
                alt={displayName}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 font-display text-2xl text-secondary">
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="mb-1 text-2xl text-primary">{displayName}</h3>
              {displayRole ? (
                <p className="mb-0 text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                  {displayRole}
                </p>
              ) : null}
            </div>
          </div>

          <div className="relative">
            <Quote className="absolute -left-1 -top-6 h-10 w-10 text-secondary/15" aria-hidden="true" />
            <blockquote
              key={current}
              className="relative max-w-4xl pl-8 font-display text-[clamp(1.4rem,2.3vw,2.35rem)] italic leading-[1.35] text-primary animate-fade-up"
            >
              {entry.quote}
            </blockquote>
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {caption}
            </p>
            <p className="mb-0 text-sm leading-6 text-muted-foreground">
              {displayName}
              {displayRole ? ` / ${displayRole}` : ''}
            </p>
          </div>

          {!isSingle ? (
            <div className="mt-8 flex flex-col gap-5 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                {data.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setCurrent(index)
                      setIsAutoPlaying(false)
                    }}
                    className={cn(
                      'rounded-full transition-all duration-300',
                      index === current
                        ? 'h-1.5 w-10 bg-secondary'
                        : 'h-2 w-2 bg-border hover:bg-muted-foreground',
                    )}
                    aria-label={t('goTo', { index: index + 1 })}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label={t('previous')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label={t('next')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
