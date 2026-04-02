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
  // HEURISTIC #1: VISIBILITY OF SYSTEM STATUS
  if (!events || events.length === 0) {
    return (
      <section className="py-32 text-center bg-slate-50 rounded-[4rem] mx-6 my-10 border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Calendar className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-2xl font-display font-bold text-primary mb-2">No Upcoming Chapters</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          We are currently planning our next leadership summit. Join our newsletter to be the first to know.
        </p>
      </section>
    )
  }

  const featuredEvent = events[0]
  const secondaryEvents = events.slice(1, 3)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Date TBD'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <Calendar className="w-3 h-3 text-secondary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.15em]">
                Upcoming Chapters
              </span>
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl text-primary mb-6 tracking-tight leading-[1.05]">
              Join Our Next
              <span className="block text-secondary italic mt-2">Gathering</span>
            </h2>
          </div>

          <Button
            asChild
            variant="outline"
            className="border-2 border-slate-200 hover:border-secondary hover:bg-slate-50 rounded-xl font-semibold group self-start lg:self-end"
          >
            <Link href="/events">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* FEATURED EVENT */}
          {featuredEvent && (
            <div className="lg:row-span-2">
              <Link
                href={`/events/${featuredEvent.slug || featuredEvent.id}`}
                className="group block h-full"
              >
                <div className="relative h-full min-h-[500px] md:min-h-[600px] rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
                  {featuredEvent.image?.url ? (
                    <img
                      src={featuredEvent.image.url}
                      alt={featuredEvent.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-900" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                  <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Featured Gathering
                    </div>

                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredEvent.eventDate || featuredEvent.date)}
                    </div>

                    <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                      {featuredEvent.title}
                    </h3>

                    <p className="text-slate-300 text-lg leading-relaxed mb-8 line-clamp-2 max-w-lg">
                      {featuredEvent.description || featuredEvent.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                      Secure Your Spot <ArrowRight className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* SECONDARY EVENTS */}
          <div className="flex flex-col gap-6">
            {secondaryEvents.map((event: any) => (
              <Link
                key={event.id}
                href={`/events/${event.slug || event.id}`}
                className="group block"
              >
                <div className="p-8 rounded-[2.5rem] bg-white border-2 border-slate-100 hover:border-secondary/30 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/20 transition-colors">
                        <Calendar className="w-5 h-5 text-slate-400 group-hover:text-secondary" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {formatDate(event.eventDate || event.date)}
                        </div>
                        <div className="text-sm text-primary font-bold mt-0.5">
                          {event.location || 'Location TBD'}
                        </div>
                      </div>
                    </div>

                    {event.location?.toLowerCase().includes('virtual') ? (
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-secondary" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                  </div>

                  <h4 className="font-display text-2xl font-bold text-primary mb-3 tracking-tight group-hover:text-secondary transition-colors">
                    {event.title}
                  </h4>

                  <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-primary transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}

            {events.length < 3 && (
              <div className="flex-grow p-10 rounded-[2.5rem] border-2 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center text-center">
                <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">More chapters loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
