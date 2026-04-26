/**
 * MSNC Impact Journal - Scholarly Editorial Version
 * Fixed: Syntax errors and compiler conflicts
 */

import { Metadata } from 'next'
import { Link } from '@/navigation'
import Image from 'next/image'
import { getBlogs } from '@/lib/payload'
import { ArrowRight, BookOpen, Calendar, Hash, Feather } from 'lucide-react'
import type { Blog } from '@/types/payload-types'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'

type BlogPost = Blog & {
  featuredImage?: {
    url?: string
    alt?: string
  }
}

export const metadata: Metadata = {
  title: 'Impact Journal | MSNC',
  description: 'Chronicles of academic excellence and community resilience.',
}

// Force dynamic ensures we always get the latest posts from Payload
export const dynamic = 'force-dynamic'

const formatDate = (dateString: string | undefined, locale: string) => {
  if (!dateString) return 'Recent'
  return new Date(dateString).toLocaleDateString(getSiteDateLocale(locale), {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const copy =
    activeLocale === 'fr'
      ? {
          draft: 'Journal en cours de preparation.',
          archive: 'Archive',
          journal: "Journal d'Impact",
          feature: 'Article vedette',
          byline: 'Par la redaction MSNC',
          readPost: "Lire l'article",
          recent: 'Entrees recentes',
          view: 'Voir',
          archiveHeading: 'Archive documentaire',
          contribute: 'Contribuer',
          toJournal: 'au journal.',
          ctaBody:
            'Vous etes un boursier ou un leader avec une histoire dimpact? Nous acceptons les propositions pour le prochain volume.',
          cta: 'Soumettre une proposition',
        }
      : {
          draft: 'Journal currently in draft.',
          archive: 'Archive',
          journal: 'Impact Journal',
          feature: 'Feature Story',
          byline: 'By MSNC Editorial',
          readPost: 'Read Full Post',
          recent: 'Recent Entries',
          view: 'View',
          archiveHeading: 'Document Archive',
          contribute: 'Contribute',
          toJournal: 'to the journal.',
          ctaBody:
            'Are you a scholar or leader with a story of impact? We are accepting pitches for the upcoming volume.',
          cta: 'Submit Pitch',
        }

  // Fetch data on the server
  const allPosts = (await getBlogs(6, activeLocale)) as BlogPost[]

  const coverStory = allPosts[0]
  const theLatest = allPosts.slice(1, 5)
  const inFocus = allPosts.slice(5)

  if (!coverStory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-serif italic">{copy.draft}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white text-[#002147] selection:bg-blue-100 pb-32 relative overflow-x-hidden">
      {/* ─── Structural UI Grid Background ─── */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.5] pointer-events-none" />

      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10 mx-auto max-w-[1500px]">
        {/* ─── PHASE 01: MASTHEAD ─── */}
        <header className="pt-32 pb-12 border-b-2 border-slate-900">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {copy.archive}
              </span>
              <span className="h-3 w-px bg-slate-200" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                {copy.journal}
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 hidden sm:block">
              ISSN: 2026-MSNC
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-[0.85] uppercase">
                Impact <br />
                <span className="text-slate-200 font-serif italic lowercase tracking-normal">
                  Journal.
                </span>
              </h1>
            </div>
            <div className="lg:col-span-3 pb-4">
              <p className="text-sm font-serif italic text-slate-500 leading-relaxed border-l-2 border-blue-600 pl-4">
                "Documenting narratives of resilience, scholarly advancement, and community
                leadership."
              </p>
            </div>
          </div>
        </header>

        {/* ─── PHASE 02: THE FOLD ─── */}
        <section className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-slate-100 pb-16">
            {/* LEFT: Cover Story */}
            <div className="lg:col-span-8 group">
              <Link
                href={`/blog/${coverStory.slug}`}
                className="block relative aspect-video md:aspect-[16/8] rounded-[2.5rem] overflow-hidden mb-10 shadow-2xl shadow-slate-200 transition-all group-hover:shadow-blue-900/10"
              >
                {coverStory.featuredImage?.url ? (
                  <Image
                    src={coverStory.featuredImage.url}
                    alt={coverStory.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-slate-200" />
                  </div>
                )}
                <div className="absolute top-8 left-8">
                  <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#002147] text-[10px] font-black uppercase tracking-widest rounded-full">
                    {copy.feature}
                  </span>
                </div>
              </Link>

              <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
                  <Calendar className="w-3 h-3" />
                  <time>{formatDate(coverStory.createdAt, activeLocale)}</time>
                  <span className="h-1 w-1 bg-slate-300 rounded-full" />
                  <span>{copy.byline}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6 hover:text-blue-600 transition-colors">
                  {coverStory.title}
                </h2>
                <p className="text-lg md:text-xl font-medium text-slate-500 leading-relaxed mb-8">
                  {coverStory.excerpt}
                </p>
                <Link
                  href={`/blog/${coverStory.slug}`}
                  className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-[#002147] pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
                >
                  {copy.readPost} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-8">
                <Hash className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-black uppercase tracking-widest">{copy.recent}</h3>
              </div>
              <div className="space-y-0 divide-y divide-slate-100 border-t border-slate-100">
                {theLatest.map((post) => (
                  <article key={post.id} className="py-8 group">
                    <Link href={`/blog/${post.slug}`}>
                      <time className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 block">
                        {formatDate(post.createdAt, activeLocale)}
                      </time>
                      <h4 className="text-xl font-black tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h4>
                      <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                        {copy.view} <ArrowRight className="w-3 h-3" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PHASE 03: ARCHIVE GRID ─── */}
        {inFocus.length > 0 && (
          <section className="py-20">
            <div className="flex items-center justify-between mb-16">
              <h3 className="text-3xl font-black tracking-tighter uppercase">{copy.archiveHeading}</h3>
              <div className="h-px grow bg-slate-100 ml-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {inFocus.map((post) => (
                <article
                  key={post.id}
                  className="group border border-slate-100 p-6 rounded-[2rem] bg-white transition-all hover:border-blue-600 hover:-translate-y-2"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-8">
                      {post.featuredImage?.url && (
                        <Image
                          src={post.featuredImage.url}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <time className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 block">
                      {formatDate(post.createdAt, activeLocale)}
                    </time>
                    <h4 className="text-2xl font-black tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed line-clamp-2 italic font-serif">
                      {post.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ─── CTA: SUBMISSION ─── */}
        <section className="pt-20">
          <div className="bg-slate-50 border-2 border-slate-200 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05),transparent)] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center">
              <Feather className="w-12 h-12 text-blue-600 mb-8" />
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                {copy.contribute} <br />
                <span className="text-slate-300 font-serif italic">{copy.toJournal}</span>
              </h2>
              <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto mb-12">
                {copy.ctaBody}
              </p>
              <Link
                href="/contact"
                className="h-16 px-12 bg-[#002147] text-white rounded-full font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 hover:bg-blue-700 transition-all active:scale-95"
              >
                {copy.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="mt-12 flex flex-col md:flex-row items-center justify-between border-t-2 border-slate-900 pt-10 gap-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              MSNC_PUBLICATION_REPOSITORY_2026
            </span>
          </div>
          <div className="flex gap-8">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Research
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Impact
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Resilience
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
