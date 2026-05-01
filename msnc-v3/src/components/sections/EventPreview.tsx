'use client'

import { Calendar, MapPin, ArrowRight, ArrowUpRight, BookOpen, Video, Sparkles, X, Clock } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface EventPreviewProps {
  events?: any[]
  blogs?: any[]
}

// ─── New content popup — shown in hero when fresh event or blog exists ─────────

function NewContentPopup({ events, blogs }: { events: any[]; blogs: any[] }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const t = useTranslations('EventPreview')

  const latestEvent = events[0]
  const latestBlog  = blogs[0]
  const item        = latestEvent ?? latestBlog
  const isEvent     = !!latestEvent

  useEffect(() => {
    if (!item) return
    // Small delay so it slides in after page load
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [item])

  if (!item || dismissed) return null

  const href = isEvent
    ? `/events/${item.slug || item.id}`
    : `/blog/${item.slug || item.id}`

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 max-w-sm transition-all duration-500 ease-out-expo',
        visible && !dismissed ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none',
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-secondary to-primary" />

        <div className="p-5">
          {/* Header row */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/10">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
              </div>
              <span className="section-label text-secondary">
                {isEvent ? t('popup.newEvent') : t('popup.newPost')}
              </span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground/50 transition-colors hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <p className="mb-4 text-sm font-semibold leading-snug text-primary line-clamp-2">
            {item.title}
          </p>

          <Link
            href={href}
            onClick={() => setDismissed(true)}
            className="btn btn-primary w-full"
          >
            {isEvent ? t('popup.viewEvent') : t('popup.readPost')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── EventPreview ─────────────────────────────────────────────────────────────

export default function EventPreview({ events = [], blogs = [] }: EventPreviewProps) {
  const t = useTranslations('EventPreview') as (key: string) => string
  const locale = normalizeSiteLocale(useLocale())

  const hasEvents = events.length > 0
  const hasBlogs  = blogs.length > 0

  const formatDate = (dateStr: string) => {
    if (!dateStr) return t('dateTBD')
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return t('dateTBD')
    return date.toLocaleDateString(getSiteDateLocale(locale), {
      month: 'short', day: 'numeric', year: 'numeric',
    })
  }

  // ── Empty state ──────────────────────────────────────────────────────────────
  if (!hasEvents && !hasBlogs) {
    return (
      <section className="section border-t border-border bg-paper-50">
        <div className="container-editorial">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white py-24 text-center shadow-sm">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-border bg-paper-50">
              <Calendar className="h-10 w-10 text-muted-foreground/40" aria-hidden="true" />
            </div>
            <h3 className="mb-3">{t('noEvents.heading')}</h3>
            <p className="max-w-md text-base text-muted-foreground mb-0">
              {t('noEvents.body')}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const featuredEvent = events[0]
  const recentBlogs   = blogs.slice(0, 3)

  return (
    <>
      {/* Popup — only renders when there's fresh content */}
      <NewContentPopup events={events} blogs={blogs} />

      <section className="section border-t border-border bg-white">
        <div className="container-editorial">

          {/* ── Section header ──────────────────────────────────────────────── */}
          <div className="mb-16">
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="h-px w-10 bg-secondary" aria-hidden="true" />
              <span className="section-label text-secondary">{t('sectionLabel')}</span>
            </div>
            <h2 className="mb-0">
              {t('heading')}{' '}
              <em className="font-display font-normal not-italic text-secondary">
                {t('headingItalic')}
              </em>
            </h2>
          </div>

          {/* ── Split layout ────────────────────────────────────────────────── */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* LEFT: Upcoming Events */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="section-label text-primary">{t('upcomingEventsHeading')}</span>
                <Link href="/events" className="btn btn-outline text-2xs" >
                  {t('viewAllEvents')}
                </Link>
              </div>

              {featuredEvent ? (
                <Link
                  href={`/events/${featuredEvent.slug || featuredEvent.id}`}
                  className="group block h-[450px] rounded-2xl md:h-[550px]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-xl">
                    {featuredEvent.image?.url ? (
                      <img
                        src={featuredEvent.image.url}
                        alt={featuredEvent.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary" aria-hidden="true" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-transparent" aria-hidden="true" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                      <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-2xs font-black uppercase tracking-widest text-white backdrop-blur-md">
                        <div className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
                        {t('featuredEventLabel')}
                      </span>

                      <div className="mb-3 flex items-center gap-2 font-sans text-sm font-medium text-white/80">
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        {formatDate(featuredEvent.eventDate || featuredEvent.date)}
                        <span className="mx-2 opacity-50">•</span>
                        {featuredEvent.location?.toLowerCase().includes('virtual') ? (
                          <><Video className="h-4 w-4" aria-hidden="true" /> Virtual</>
                        ) : (
                          <><MapPin className="h-4 w-4" aria-hidden="true" /> {featuredEvent.location || t('locationTBD')}</>
                        )}
                      </div>

                      <h3 className="mb-4 text-3xl font-display leading-tight text-white md:text-4xl">
                        {featuredEvent.title}
                      </h3>

                      <span className="mt-4 inline-flex items-center gap-3 font-sans text-sm font-bold uppercase tracking-widest text-white transition-all group-hover:gap-4 group-hover:text-secondary">
                        {t('secureSpot')}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ) : (
                /* ── Better "no events" empty state ── */
                <div className="relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-border bg-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(3,105,161,0.12),_transparent_58%)]" aria-hidden="true" />
                  <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary" aria-hidden="true">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="relative p-8 md:p-10">
                    <span className="section-label mb-4 block text-secondary">{t('upcomingEventsHeading')}</span>
                    <h3 className="mb-3 max-w-md text-primary">{t('noEventsUpcoming')}</h3>
                    <p className="mb-6 max-w-md text-sm leading-7 text-muted-foreground">{t('noEventsCheckBack')}</p>
                    <Link href="/contact" className="btn btn-outline text-2xs">
                      {t('noEventsNotify')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Latest Blogs — Redesigned with large cover images */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="section-label text-primary">{t('latestJournalHeading')}</span>
                <Link href="/blog" className="btn btn-outline text-2xs" >
                  {t('viewAllArticles')}
                </Link>
              </div>

              {hasBlogs ? (
                <div className="flex flex-col gap-5">
                  {recentBlogs.map((blog: any, i: number) => (
                    <Link
                      key={blog.id || i}
                      href={`/blog/${blog.slug || blog.id}`}
                      className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-lg"
                    >
                      {/* Cover Image — large and prominent */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {blog.featuredImage && typeof blog.featuredImage === 'object' && blog.featuredImage.url ? (
                          <img
                            src={blog.featuredImage.url}
                            alt={blog.title}
                            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
                            <BookOpen className="h-10 w-10 text-primary/15" aria-hidden="true" />
                          </div>
                        )}
                        {/* Subtle gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-5 p-5">
                        {/* Date pillar */}
                        <div className="hidden shrink-0 flex-col items-center justify-center rounded-xl bg-paper-50 px-3 py-2 sm:flex">
                          <span className="text-2xs font-bold uppercase tracking-widest text-muted-foreground">
                            {blog.publishedDate || blog.createdAt
                              ? new Date(blog.publishedDate || blog.createdAt).toLocaleDateString(getSiteDateLocale(locale), { month: 'short' }).toUpperCase()
                              : '—'}
                          </span>
                          <span className="text-xl font-display font-bold leading-none text-primary">
                            {blog.publishedDate || blog.createdAt
                              ? new Date(blog.publishedDate || blog.createdAt).getDate()
                              : '—'}
                          </span>
                        </div>

                        <div className="flex flex-col justify-center min-w-0">
                          {/* Meta row */}
                          <div className="mb-1.5 flex items-center gap-2 text-2xs font-medium uppercase tracking-widest text-muted-foreground">
                            <span className="text-secondary">{t('post.feature')}</span>
                            <span className="opacity-30">|</span>
                            <span className="sm:hidden">
                              {formatDate(blog.publishedDate || blog.createdAt)}
                            </span>
                            <span className="hidden sm:inline">
                              {blog.readTime ? (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {blog.readTime} min
                                </span>
                              ) : (
                                formatDate(blog.publishedDate || blog.createdAt)
                              )}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="mb-1.5 font-display text-lg leading-snug text-primary line-clamp-2 transition-colors group-hover:text-secondary md:text-xl">
                            {blog.title}
                          </h4>

                          {/* Excerpt — the hook */}
                          {blog.excerpt && (
                            <p className="mb-2 text-sm text-muted-foreground line-clamp-2">
                              {blog.excerpt}
                            </p>
                          )}

                          {/* CTA */}
                          <span className="inline-flex items-center gap-2 text-2xs font-bold uppercase tracking-widest text-secondary transition-all group-hover:gap-3">
                            {t('readArticle')}
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-paper-50 p-10 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                    <BookOpen className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                  <p className="mb-1 text-base font-semibold text-primary/70">{t('noArticlesPublished')}</p>
                  <p className="text-sm text-muted-foreground mb-0">{t('noArticlesCheckBack')}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

