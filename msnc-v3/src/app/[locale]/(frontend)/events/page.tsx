/**
 * MSNC Events — Editorial v3
 */
import { Metadata } from 'next'
import { Calendar, ArrowRight, MapPin, Clock, History } from 'lucide-react'
import { Link } from '@/navigation'
import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'
import { getCachedPayload } from '@/lib/payload'
import { getSiteDateLocale, normalizeSiteLocale, getUiCopy } from '@/lib/site-copy'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Events | MSNC',
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
  const ui = getUiCopy(activeLocale)
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
    <main className="min-h-screen bg-white pb-32">
      {/* ── Page Header ── */}
      <PageHeader
        label={ui.pages.events.label}
        title={ui.pages.events.title}
        description={ui.pages.events.description}
        breadcrumbs={[{ label: ui.pages.events.breadcrumb }]}
      />

      <div className="container-editorial">
        {/* ── Upcoming ── */}
        <section className="section border-t border-border">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-16">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="section-label text-secondary">{ui.pages.events.upcoming}</span>
            </div>
          </div>

          {upcoming.length > 0 ? (
            <div className="space-y-20">
              {upcoming.map((event: unknown, idx: number) => {
                const typedEvent = event as any
                return <MissionEntry key={typedEvent.id} event={typedEvent} index={idx} locale={activeLocale} ui={ui} />
              })}
            </div>
          ) : (
            <div className="py-20 border-2 border-dashed border-border rounded-[3rem] text-center bg-paper-50">
              <p className="section-label text-muted-foreground">
                {ui.pages.events.noUpcoming}
              </p>
            </div>
          )}
        </section>

        {/* ── Past Archive ── */}
        <section className="section border-t border-border bg-paper-50 -mx-6 sm:-mx-12 lg:-mx-20 px-6 sm:px-12 lg:px-20">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-16">
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-secondary" />
              <span className="section-label text-secondary">{ui.pages.events.past}</span>
            </div>
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

function MissionEntry({ event, index, locale, ui }: { event: any; index: number; locale: string; ui: any }) {
  const imageUrl = typeof event.image === 'object' ? event.image?.url : null

  return (
    <div className="group relative grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-5 relative aspect-square lg:aspect-4/3 rounded-[2.5rem] overflow-hidden border border-border bg-paper-50 group-hover:border-secondary transition-colors duration-500">
        <Image
          src={imageUrl || '/media/event.png'}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-[2s] group-hover:scale-105"
        />
        <div className="absolute top-8 left-8">
          <span className="px-4 py-1.5 bg-white border border-border text-primary rounded-full shadow-sm section-label">
            {ui.pages.events.upcomingBadge}
          </span>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-8">
        <div className="flex items-center gap-6 text-secondary text-nav font-black uppercase tracking-widest">
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

        <h3 className="text-3xl md:text-4xl lg:text-5xl font-display text-primary leading-tight">
          {event.title}
        </h3>

        <p className="text-lg text-muted-foreground leading-relaxed italic font-display border-l-4 border-border pl-6">
          &ldquo;{event.description}&rdquo;
        </p>

        <Link
          href={`/events/${event.slug}`}
          className="btn btn-primary group"
        >
          {ui.pages.events.viewDetails}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

function ArchiveRecord({ event, locale }: { event: any; locale: string }) {
  const imageUrl = typeof event.image === 'object' ? event.image?.url : null

  return (
    <Link href={`/events/${event.slug}`} className="group block space-y-6">
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-paper-50 hover:border-secondary transition-all duration-700 shadow-sm">
        <Image
          src={imageUrl || '/media/event.png'}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="px-2">
        <div className="flex items-center gap-3 section-label text-muted-foreground mb-3">
          <Calendar className="w-3 h-3" />
          {new Date(event.eventDate).getFullYear()}
          <span className="h-1 w-1 bg-border rounded-full" />
          {event.location}
        </div>
        <h4 className="text-xl font-display text-primary group-hover:text-secondary transition-colors">
          {event.title}
        </h4>
      </div>
    </Link>
  )
}
