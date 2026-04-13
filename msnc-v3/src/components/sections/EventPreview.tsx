'use client'

import React from 'react'
import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface EventPreviewProps {
  events?: any[]
  blogs?: any[]
}

export default function EventPreview({ events = [], blogs = [] }: EventPreviewProps) {
  const FOCUS_BASE = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600';

  if (!events || events.length === 0) {
    return (
      <section className="py-24 md:py-40 bg-[#FAFAFA] border-t border-slate-200 rounded-[4rem] mx-6 my-10 border-2 border-dashed shadow-sm transition-all duration-500 hover:shadow-md">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm border border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-all">
          <Calendar className="w-10 h-10 text-slate-400 hover:text-blue-600 transition-colors" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">No Upcoming Events</h3>
        <p className="text-slate-600 max-w-md mx-auto text-lg font-medium">
          We&apos;re planning our next chapter. Join our newsletter to stay updated.
        </p>
      </section>
    )
  }

  const featuredEvent = events[0]
  const secondaryEvents = events.slice(1, 3)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Date TBD'
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return 'Date TBD';
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section className="py-24 md:py-40 bg-[#FAFAFA] border-t border-slate-200 overflow-hidden transition-all duration-500">
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600 inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
              <Calendar className="w-4 h-4" />
              Upcoming Chapters
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05]">
              Join Our Next
              <br className="hidden md:block" />
              <span className="font-serif italic font-light text-slate-500">Gathering</span>
            </h2>
          </div>

          <Button asChild variant="outline" className={`border-2 border-slate-200 hover:border-blue-600 hover:bg-blue-50 rounded-2xl font-bold uppercase tracking-wide text-sm px-8 h-14 shadow-sm hover:shadow-lg transition-all duration-500 self-start lg:self-end ${FOCUS_BASE}`}>
            <Link href="/events" className="flex items-center gap-2">
              View All Events
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured */}
          {featuredEvent && (
            <div className="lg:row-span-2 group">
              <Link href={`/events/${featuredEvent.slug || featuredEvent.id}`} className={`block h-full ${FOCUS_BASE}`}>
                <div className="relative h-125 md:h-150 rounded-[3rem] overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-700 hover:scale-[1.02] hover:-rotate-1 hover:-translate-y-1">
                  {featuredEvent.image?.url ? (
                    <img
                      src={featuredEvent.image.url}
                      alt={featuredEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold uppercase tracking-wider mb-6 w-fit">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      Featured
                    </span>
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredEvent.eventDate || featuredEvent.date)}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tighter">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 line-clamp-2 max-w-lg">
                      {featuredEvent.description || featuredEvent.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-white/90 font-bold text-sm group-hover:gap-3 transition-all">
                      Secure Your Spot
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary */}
          <div className="flex flex-col gap-6">
            {secondaryEvents.map((event: any, i: number) => (
              <Link key={event.id || i} href={`/events/${event.slug || event.id}`} className={`group block ${FOCUS_BASE}`}>
                <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                        <Calendar className="w-6 h-6 text-slate-500 group-hover:text-blue-600" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 group-hover:text-blue-600 transition-colors">
                          {formatDate(event.eventDate || event.date)}
                        </div>
                        <div className="text-lg font-bold text-slate-900 mt-1 group-hover:text-slate-950">
                          {event.location || 'Location TBD'}
                        </div>
                      </div>
                    </div>
                    {event.location?.toLowerCase().includes('virtual') ? (
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-blue-100 transition-all">
                        <Video className="w-6 h-6 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-slate-500" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-slate-950 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm group-hover:text-blue-600 transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
            {events.length < 3 && (
              <div className="p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-center min-h-50">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500">
                  More events loading...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

