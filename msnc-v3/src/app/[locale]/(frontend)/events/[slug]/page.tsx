/**
 * MSNC Event Detail - Technical Brief Version
 * Architecture: Content Sidebar + Artifact Sticky Portrait
 */

import { getCachedPayload } from '@/lib/payload'
import Container from '@/components/ui/Container'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Clock,
  Share2,
  Quote,
  Hash,
  UserCircle,
  FileText,
} from 'lucide-react'
import { Link } from '@/navigation'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'

export const dynamic = 'force-dynamic'

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug, locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const payload = await getCachedPayload()

  const { docs } = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    depth: 2,
    locale: activeLocale,
    fallbackLocale: 'en',
  })

  const event = docs[0]
  if (!event) return notFound()

  const imageUrl = typeof event.image === 'object' ? event.image?.url : null

  return (
    <main className="min-h-screen bg-white text-[#002147] pt-32 pb-24 relative selection:bg-blue-100">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.3] pointer-events-none" />

      <div className="w-full px-6 md:px-10 lg:px-16 relative z-10 mx-auto max-w-375">
        {/* Navigation Masthead */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16 border-b-2 border-slate-900 pb-8">
          <Link
            href="/events"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            Back to Chronicles Repository
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
              LOG_REF_ID: {event.id.slice(-8).toUpperCase()}
            </span>
            <button className="text-slate-400 hover:text-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Content side (Ledger) */}
          <div className="lg:col-span-7 space-y-16">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-6 text-blue-600 font-black text-[11px] uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />{' '}
                  {new Date(event.eventDate).toLocaleDateString(getSiteDateLocale(activeLocale), {
                    dateStyle: 'medium',
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {event.location}
                </div>
                <div className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                  Status: Documented
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#002147] tracking-tighter leading-[0.9] uppercase">
                {event.title}
              </h1>
            </div>

            {/* Event Descriptiontreated as Abstract */}
            <div className="prose prose-xl prose-slate max-w-none">
              <p className="text-2xl font-serif italic text-slate-600 leading-relaxed border-l-4 border-blue-600 pl-8 mb-12">
                {event.description}
              </p>
            </div>

            {/* Story-telling Interlude: Field Notes / Testimonials */}
            <div className="p-12 lg:p-16 border-2 border-slate-900 rounded-[3rem] bg-[#FAFAFA] relative overflow-hidden group">
              <Quote className="absolute top-0 right-0 w-32 h-32 text-slate-100 -mr-8 -mt-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10 text-blue-600">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-[0.3em]">
                    Voices from the Summit
                  </span>
                </div>
                <p className="text-2xl lg:text-3xl font-medium text-slate-800 leading-snug italic mb-12">
                  &quot;Seeing the community gathered for academic excellence transforms the
                  collective narrative from displacement to leadership.&quot;
                </p>
                <div className="flex items-center gap-4 pt-8 border-t border-slate-200">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <div>
                    <span className="block font-black text-xs uppercase tracking-widest text-slate-900">
                      Verified Attendee
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Post-Event Reflection Ledger
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Artifact side (Imagery as Evidence) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-4/5 rounded-[3.5rem] overflow-hidden shadow-2xl border-12 border-white bg-slate-50 rotate-1 group transition-transform hover:rotate-0 duration-700">
              <Image
                src={
                  imageUrl ||
                  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
                }
                alt={event.title}
                fill
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                  <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    Visual_Record
                  </span>
                  <span className="block font-black text-sm uppercase tracking-tight text-[#002147]">
                    Artifact_Field_Photography
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
              <span>Secured Record</span>
              <span>{'//'}</span>
              <span>Archives</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
