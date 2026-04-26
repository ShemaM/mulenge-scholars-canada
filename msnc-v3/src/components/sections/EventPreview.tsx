'use client'

import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/Button'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'

interface EventPreviewProps {
  events?: any[]
  blogs?: any[]
}

export default function EventPreview({ events = [] }: EventPreviewProps) {
  const t = useTranslations('EventPreview')
  const locale = normalizeSiteLocale(useLocale())
  const FOCUS_BASE =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600'

  if (!events || events.length === 0) {
    return (
      <section className="mx-6 my-10 rounded-[4rem] border-2 border-dashed border-slate-200 bg-[#FAFAFA] py-24 shadow-sm transition-all duration-500 hover:shadow-md md:py-40">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50">
          <Calendar className="h-10 w-10 text-slate-400 transition-colors hover:text-blue-600" />
        </div>
        <h3 className="mb-4 text-3xl font-black tracking-tighter text-slate-900">
          {t('noEvents.heading')}
        </h3>
        <p className="mx-auto max-w-md text-lg font-medium text-slate-600">{t('noEvents.body')}</p>
      </section>
    )
  }

  const featuredEvent = events[0]
  const secondaryEvents = events.slice(1, 3)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return t('dateTBD')
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return t('dateTBD')

    return date.toLocaleDateString(getSiteDateLocale(locale), {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-[#FAFAFA] py-24 transition-all duration-500 md:py-40">
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600">
              <Calendar className="h-4 w-4" />
              {t('sectionLabel')}
            </span>
            <h2 className="text-4xl font-black leading-[1.05] tracking-tighter text-slate-900 md:text-6xl">
              {t('heading')}
              <br className="hidden md:block" />
              <span className="font-serif font-light italic text-slate-500">{t('headingItalic')}</span>
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            className={`self-start rounded-2xl border-2 border-slate-200 px-8 text-sm font-bold uppercase tracking-wide shadow-sm transition-all duration-500 hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg lg:self-end ${FOCUS_BASE}`}
          >
            <Link href="/events" className="flex items-center gap-2">
              {t('viewAllEvents')}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {featuredEvent && (
            <div className="group lg:row-span-2">
              <Link href={`/events/${featuredEvent.slug || featuredEvent.id}`} className={`block h-full ${FOCUS_BASE}`}>
                <div className="relative h-125 overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700 hover:-translate-y-1 hover:-rotate-1 hover:scale-[1.02] group-hover:shadow-3xl md:h-150">
                  {featuredEvent.image?.url ? (
                    <img
                      src={featuredEvent.image.url}
                      alt={featuredEvent.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      {t('featuredLabel')}
                    </span>
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredEvent.eventDate || featuredEvent.date)}
                    </div>
                    <h3 className="mb-4 text-4xl font-black leading-tight tracking-tighter text-white md:text-5xl">
                      {featuredEvent.title}
                    </h3>
                    <p className="mb-8 max-w-lg line-clamp-2 text-lg leading-relaxed text-slate-300">
                      {featuredEvent.description || featuredEvent.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 font-bold text-sm text-white/90 transition-all group-hover:gap-3">
                      {t('secureSpot')}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {secondaryEvents.map((event: any, i: number) => (
              <Link key={event.id || i} href={`/events/${event.slug || event.id}`} className={`group block ${FOCUS_BASE}`}>
                <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:bg-slate-50 hover:shadow-xl md:p-10">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 transition-all group-hover:border-blue-200 group-hover:bg-blue-50">
                        <Calendar className="h-6 w-6 text-slate-500 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 transition-colors group-hover:text-blue-600">
                          {formatDate(event.eventDate || event.date)}
                        </div>
                        <div className="mt-1 text-lg font-bold text-slate-900 group-hover:text-slate-950">
                          {event.location || t('locationTBD')}
                        </div>
                      </div>
                    </div>
                    {event.location?.toLowerCase().includes('virtual') ? (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 transition-all group-hover:bg-blue-100">
                        <Video className="h-6 w-6 text-blue-600" />
                      </div>
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <MapPin className="h-6 w-6 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <h4 className="mb-4 text-2xl font-black leading-tight text-slate-900 transition-colors group-hover:text-slate-950">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors group-hover:text-blue-600">
                    {t('viewDetails')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
            {events.length < 3 && (
              <div className="flex min-h-50 items-center justify-center rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  {t('moreEventsLoading')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
