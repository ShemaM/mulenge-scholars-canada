'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export interface TestimonialRecord {
  id?: string
  authorName?: string
  name?: string
  authorRole?: string | null
  role?: string | null
  institution?: string | null
  location?: string | null
  quote?: string
  imageUrl?: string | null
  image?: { url?: string } | null
  journey?: string | null
  stats?: unknown | null
}

export default function Testimonials({ data }: { data?: TestimonialRecord[] }) {
  const t = useTranslations('Testimonials')

  const safeData = data ?? []

  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const isSingle = safeData.length === 1

  // reset index if data changes
  useEffect(() => {
    if (current >= safeData.length) {
      setCurrent(0)
    }
  }, [safeData.length, current])

  useEffect(() => {
    if (!isAutoPlaying || isSingle || safeData.length === 0) return

    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % safeData.length)
    }, 10000)

    return () => clearInterval(id)
  }, [safeData.length, isAutoPlaying, isSingle])

  const entry = safeData[current]

  if (!entry) return null

  const displayName = entry.authorName || entry.name || 'Scholar'
  const displayRole = entry.authorRole || entry.role || ''
  const displayImage = entry.imageUrl || entry.image?.url || ''
  const initial = displayName.charAt(0) || 'M'

  const caption =
    entry.institution
      ? t('captionYear', { year: entry.institution })
      : t('captionPrefix')

  const next = () => {
    if (isSingle) return
    setCurrent((prev) => (prev + 1) % safeData.length)
    setIsAutoPlaying(false)
  }

  const prev = () => {
    if (isSingle) return
    setCurrent((prev) => (prev - 1 + safeData.length) % safeData.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="section overflow-hidden border-t border-border bg-paper-50">
      <div className="container-editorial">

        <div className="mb-12 max-w-3xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-12 bg-secondary" />
            <span className="section-label text-secondary">
              {t('heading')}
            </span>
          </div>
          <h2 className="mb-0 max-w-2xl text-primary">
            {t('subheading')}
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white p-8 shadow-[0_24px_80px_-48px_rgba(0,33,71,0.22)] md:p-12">

          <div className="mb-8 flex items-center gap-4">
            {displayImage ? (
              <img
                src={displayImage}
                alt={displayName}
                className="h-16 w-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-2xl text-secondary">
                {initial}
              </div>
            )}

            <div>
              <h3 className="text-2xl text-primary">{displayName}</h3>
              {displayRole && (
                <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                  {displayRole}
                </p>
              )}
            </div>
          </div>

          <div className="relative">
            <Quote className="absolute -top-6 left-0 h-10 w-10 text-secondary/20" />

            <blockquote className="pl-8 font-display text-[1.6rem] italic leading-snug text-primary">
              {entry.quote || ''}
            </blockquote>
          </div>

          <div className="mt-8 border-t border-border pt-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {caption}
            </p>
            <p className="text-sm text-muted-foreground">
              {displayName}
              {displayRole ? ` / ${displayRole}` : ''}
            </p>
          </div>

          {!isSingle && safeData.length > 1 && (
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">

              <div className="flex gap-2">
                {safeData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index)
                      setIsAutoPlaying(false)
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      index === current
                        ? 'w-10 bg-secondary'
                        : 'w-2 bg-border',
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={prev} className="btn-circle">
                  <ChevronLeft />
                </button>
                <button onClick={next} className="btn-circle">
                  <ChevronRight />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  )
}