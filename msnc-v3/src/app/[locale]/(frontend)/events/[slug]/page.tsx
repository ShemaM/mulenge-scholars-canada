/**
 * MSNC Event Detail
 * Schema-accurate: title, eventDate, location, description,
 * registrationLink, image (upload→media), content (richText), slug
 *
 * Layout mirrors the Impact Journal blog post page:
 * fixed nav → full-bleed hero → overlapping header → body → related → CTA
 */

import { getCachedPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Share2,
  Bookmark,
  ExternalLink,
} from 'lucide-react'
import { Link } from '@/navigation'
import {
  getSiteDateLocale,
  normalizeSiteLocale,
  getUiCopy,
} from '@/lib/site-copy'
import type { Event, Media } from '@/types/payload-types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type PageArgs = { params: Promise<{ locale: string; slug: string }> }

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({ params }: PageArgs): Promise<Metadata> {
  const { slug, locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  try {
    const payload = await getCachedPayload()
    const { docs } = await payload.find({
      collection: 'events',
      where: { slug: { equals: slug } },
      limit: 1,
      locale: activeLocale,
      fallbackLocale: 'en',
    })
    const event = docs?.[0] as Event | undefined
    return {
      title: event ? `${event.title} | MSNC Events` : 'Events | MSNC',
      description: event?.description ?? undefined,
    }
  } catch {
    return { title: 'Events | MSNC' }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toLogRef(id: string | number): string {
  const str = String(id)
  return str.includes('-')
    ? str.replaceAll('-', '').slice(-8).toUpperCase()
    : str.slice(-8).toUpperCase().padStart(8, '0')
}

/** Safely unwrap a Payload upload/relation field to its URL */
function resolveMedia(field: unknown): { url: string; alt?: string } | null {
  if (field && typeof field === 'object' && 'url' in field) {
    const media = field as Media
    return media.url ? { url: media.url, alt: media.alt ?? undefined } : null
  }
  return null
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function EventDetailPage({ params }: PageArgs) {
  const { slug, locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const ui = getUiCopy(activeLocale)
  const payload = await getCachedPayload()

  // ── Current event ────────────────────────────────────────────────────────
  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 2,
    locale: activeLocale,
    fallbackLocale: 'en',
  })
  const event = docs[0] as Event | undefined
  if (!event) return notFound()

  // ── Related events ───────────────────────────────────────────────────────
  const { docs: relatedDocs } = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 3,
    sort: '-eventDate',
    where: { slug: { not_equals: slug } },
    locale: activeLocale,
    fallbackLocale: 'en',
  })
  const relatedEvents = relatedDocs as Event[]

  // ── Derived values ───────────────────────────────────────────────────────
  const hero = resolveMedia(event.image)
  const contentHTML = event.content
    ? convertLexicalToHTML({ data: event.content as any })
    : ''

  const formattedDate = new Date(event.eventDate).toLocaleDateString(
    getSiteDateLocale(activeLocale),
    { dateStyle: 'long' },
  )

  return (
    <main className="min-h-screen bg-background">

      {/* ── Fixed top nav ─────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container-editorial flex h-14 items-center justify-between">
          <Link
            href="/events"
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="section-label">{ui.pages.events.backToEvents}</span>
          </Link>

          {/* Truncated title — centre anchor on desktop */}
          <span className="hidden max-w-xs truncate section-label text-muted-foreground/60 md:block">
            {event.title}
          </span>

          <div className="flex items-center gap-4">
            <span className="hidden section-label font-mono text-muted-foreground/40 tracking-widest sm:block">
              {ui.pages.events.logRef}&nbsp;{toLogRef(event.id)}
            </span>
            <button
              type="button"
              aria-label="Share event"
              className="text-muted-foreground transition-colors hover:text-secondary"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Full-bleed hero ────────────────────────────────────────────────── */}
      {hero && (
        <div className="relative h-[55vh] min-h-100 w-full overflow-hidden md:h-[70vh]">
          <Image
            src={hero.url}
            alt={hero.alt ?? event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient pulls hero colour into the page background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
        </div>
      )}

      {/* ── Article header — overlaps hero ────────────────────────────────── */}
      <div
        className="container-editorial pt-8"
        style={{ marginTop: hero ? '-4rem' : '5rem' }}
      >
        <div className="mx-auto max-w-5xl">

          {/* Status pill + date */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-secondary px-4 py-1 text-xs font-black uppercase tracking-widest text-white">
              {ui.pages.events.status}
            </span>
            <span className="section-label text-muted-foreground">{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display font-normal text-primary text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
            {event.title}
          </h1>

          {/* Description as editorial deck */}
          <p className="mb-5 text-lg font-medium leading-relaxed text-foreground/65 border-l-2 border-secondary pl-5">
            {event.description}
          </p>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-5 border-y border-border py-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-secondary" />
              <span className="section-label">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-secondary" />
              <span className="section-label">{event.location}</span>
            </div>
            {event.registrationLink && (
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
              >
                {ui.pages.events.register ?? 'Register'}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Rich-text body ────────────────────────────────────────────────── */}
      {contentHTML && (
        <div className="container-editorial py-10">
          <div className="mx-auto max-w-5xl">
            <div
              className="
                prose prose-lg max-w-none
                prose-p:text-foreground/75 prose-p:leading-relaxed
                prose-headings:font-display prose-headings:font-normal prose-headings:text-primary
                prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                prose-blockquote:border-l-2 prose-blockquote:border-secondary
                prose-blockquote:not-italic prose-blockquote:text-foreground/80
                prose-blockquote:py-4 prose-blockquote:px-6
                prose-img:rounded-2xl prose-img:border prose-img:border-border
                prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-primary prose-strong:font-semibold
                [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed
                [&>p:first-of-type]:first-letter:float-left
                [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1
                [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:text-7xl
                [&>p:first-of-type]:first-letter:text-primary [&>p:first-of-type]:first-letter:leading-none
              "
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          </div>
        </div>
      )}

      {/* ── Related events ────────────────────────────────────────────────── */}
      {relatedEvents.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container-editorial">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-display font-normal text-primary text-2xl md:text-3xl tracking-tight">
                {ui.pages.events.relatedEvents ?? 'More Events'}
              </h2>
              <Link href="/events" className="group flex items-center gap-2">
                <span className="section-label text-secondary">
                  {ui.pages.events.archives}
                </span>
                <ArrowRight className="h-3 w-3 text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedEvents.map((related) => {
                const relatedHero = resolveMedia(related.image)
                const relatedDate = new Date(related.eventDate).toLocaleDateString(
                  getSiteDateLocale(activeLocale),
                  { dateStyle: 'medium' },
                )
                return (
                  <Link
                    key={related.id}
                    href={`/events/${related.slug}`}
                    className="group space-y-4"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-shadow group-hover:shadow-md">
                      {relatedHero ? (
                        <Image
                          src={relatedHero.url}
                          alt={relatedHero.alt ?? related.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bookmark className="h-10 w-10 text-muted-foreground/10" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <span className="section-label text-secondary block">{relatedDate}</span>
                      <h4 className="font-display font-normal text-primary transition-colors group-hover:text-secondary text-lg leading-snug">
                        {related.title}
                      </h4>
                      <span className="section-label text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {related.location}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border bg-muted/30">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl md:text-4xl font-normal max-w-2xl mx-auto mb-8 text-primary">
            {ui.pages.events.ctaTitle ?? 'Explore all our events'}
          </h2>
          <Link
            href="/events"
            className="btn inline-flex bg-primary text-white hover:bg-primary/90 px-8 font-semibold"
          >
            {ui.pages.events.archives}
          </Link>
        </div>
      </section>

    </main>
  )
}