/**
 * MSNC Events Repository - Scholarly Editorial Version
 * Design: 40px Structural Grid, Rigid Mastheads, Mission Indexing
 */

import { Metadata } from 'next'
import { Calendar, ArrowRight, MapPin, Clock, History } from 'lucide-react'
import { Link } from '@/navigation'
import Image from 'next/image'
import { getCachedPayload } from '@/lib/payload'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Impact Chronicles | MSNC Repository',
  description: 'The official ledger of strategic initiatives and historical legacy.',
}

async function getEventsData(locale: string) {
  try {
    const payload = await getCachedPayload()
    const { docs } = await payload.find({
      collection: 'events',
      sort: '-eventDate',
      pagination: false,
      depth: 2,
      locale,
      fallbackLocale: 'en',
    })
    return docs
  } catch (error) {
    return []
  }
}

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const events = await getEventsData(activeLocale)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = events.filter(
    (e: { eventDate: string | number | Date }) => new Date(e.eventDate) >= today,
  )
  const past = events.filter(
    (e: { eventDate: string | number | Date }) => new Date(e.eventDate) < today,
  )

  return (
    <main className="min-h-screen bg-white text-[#002147] pb-32 relative overflow-x-hidden selection:bg-blue-100">
      {/* Structural UI Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4] pointer-events-none" />

      <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 mx-auto max-w-[1500px]">
        {/* ─── MASTHEAD: PHASE 01 ─── */}
        <header className="pt-32 pb-12 border-b-2 border-slate-900">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">
                Event Repository
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Official Chronicles Vol. 24
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-black uppercase text-slate-900">
                Live_Ledger
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.85] uppercase">
                Impact <br />
                <span className="text-slate-200 font-serif italic lowercase tracking-normal">
                  Chronicles.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
              <p className="text-lg text-slate-500 font-medium leading-tight border-l-4 border-blue-600 pl-6">
                Documenting the movement of scholars across disciplines, borders, and leadership
                summits.
              </p>
            </div>
          </div>
        </header>

        {/* ─── SECTION 01: ACTIVE MISSIONS (UPCOMING) ─── */}
        <section className="py-24">
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-16">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                Active Phases
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Upcoming Strategic Initiatives
              </h2>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">INDEX_UPCOMING</span>
          </div>

          {upcoming.length > 0 ? (
            <div className="space-y-20">
              {upcoming.map((event: unknown, idx: number) => {
                const typedEvent = event as any
                return <MissionEntry key={typedEvent.id} event={typedEvent} index={idx} locale={activeLocale} />
              })}
            </div>
          ) : (
            <div className="py-20 border-2 border-dashed border-slate-100 rounded-[3rem] text-center bg-slate-50/30">
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                No Active Missions Registered for this Window
              </p>
            </div>
          )}
        </section>

        {/* ─── SECTION 02: THE ARCHIVE (PAST) ─── */}
        <section className="py-24 border-t-2 border-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-16">
            <div className="flex items-center gap-4">
              <History className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Historical Legacy
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400">INDEX_ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {past.map((event: unknown) => {
              const typedEvent = event as any
              return <ArchiveRecord key={typedEvent.id} event={typedEvent} locale={activeLocale} />
            })}
          </div>
        </section>
      </div>
    </main>
  )
}

// ─── Component: Active Mission (Upcoming) ───

function MissionEntry({ event, index, locale }: { event: any; index: number; locale: string }) {
  const imageUrl = typeof event.image === 'object' ? event.image?.url : null

  return (
    <div className="group relative grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 relative aspect-square lg:aspect-4/3 rounded-[2.5rem] overflow-hidden border-2 border-slate-900 shadow-2xl shadow-blue-900/5 bg-slate-100 group-hover:border-blue-600 transition-colors duration-500">
        <Image
          src={
            imageUrl ||
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
          }
          alt={event.title}
          fill
          className="object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-8 left-8">
          <span className="px-4 py-1.5 bg-white border border-slate-900 text-[#002147] text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl">
            REF_MISSION_0{index + 1}
          </span>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-8">
        <div className="flex items-center gap-6 text-blue-600 text-[11px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />{' '}
            {new Date(event.eventDate).toLocaleDateString(getSiteDateLocale(locale), {
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {event.location}
          </div>
        </div>

        <h3 className="text-4xl md:text-6xl font-black text-[#002147] tracking-tighter leading-[0.9] uppercase">
          {event.title}
        </h3>

        <p className="text-xl text-slate-500 font-medium leading-relaxed italic font-serif border-l-4 border-slate-100 pl-8">
          &ldquo;{event.description}&rdquo;
        </p>

        <Link
          href={`/events/${event.slug}`}
          className="h-16 px-10 bg-[#002147] text-white rounded-full inline-flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all group-hover:shadow-xl group-hover:shadow-blue-900/10"
        >
          Access Mission Brief{' '}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

// ─── Component: Archive Record (Past) ───

function ArchiveRecord({ event, locale }: { event: any; locale: string }) {
  const imageUrl = typeof event.image === 'object' ? event.image?.url : null

  return (
    <Link href={`/events/${event.slug}`} className="group block space-y-6">
      <div className="relative aspect-[16/10] rounded-4xl overflow-hidden border border-slate-100 bg-slate-50 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm hover:shadow-xl">
        <Image
          src={
            imageUrl ||
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
          }
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
      </div>
      <div className="px-2">
        <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3">
          <Calendar className="w-3 h-3" />
          {new Date(event.eventDate).getFullYear()}
          <span className="h-1 w-1 bg-slate-200 rounded-full" />
          {event.location}
        </div>
        <h4 className="text-xl font-black text-[#002147] uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
          {event.title}
        </h4>
      </div>
    </Link>
  )
}
