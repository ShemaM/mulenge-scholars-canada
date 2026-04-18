/**
 * MSNC Impact Journal - Wide Editorial Manuscript
 * FIX: Resolved TypeError for related.id, expanded width to 1600px, removed narrow margins.
 */

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getCachedPayload } from '@/lib/payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Feather,
  Camera,
  ArrowRight,
  Heart,
  Share2,
  Bookmark,
  Hash,
} from 'lucide-react'
import type { Blog, Media } from '@/types/payload-types'

type PageArgs = {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600 // 1 hour for published blogs
export const dynamicParams = true

export async function generateMetadata({ params }: PageArgs): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getCachedPayload()
    const { docs } = await payload.find({
      collection: 'blogs',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const post = docs?.[0] as Blog | undefined
    return { title: post ? `${post.title} | MSNC Journal` : 'Manuscript' }
  } catch {
    return { title: 'Impact Journal | MSNC' }
  }
}

function calculateReadTime(htmlString: string): number {
  if (!htmlString) return 1
  const wordCount = htmlString
    .replaceAll(/<[^>]*>?/gm, '')
    .trim()
    .split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export default async function BlogPostPage({ params }: PageArgs) {
  const { slug } = await params
  const payload = await getCachedPayload()

  const { docs } = await payload.find({
    collection: 'blogs',
    depth: 2,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const post = docs?.[0] as Blog | undefined
  if (!post) notFound()

  const { docs: relatedDocs } = await payload.find({
    collection: 'blogs',
    depth: 1,
    limit: 3,
    sort: '-createdAt',
    where: { slug: { not_equals: slug }, status: { equals: 'published' } },
  })
  const relatedPosts = relatedDocs as Blog[]

  const contentHTML = post?.content ? convertLexicalToHTML({ data: post.content as any }) : ''
  const readTime = calculateReadTime(contentHTML)
  const publishDate = (
    (post as any).publishedDate
      ? new Date((post as any).publishedDate)
      : post.createdAt
        ? new Date(post.createdAt)
        : new Date()
  ).toLocaleDateString('en-CA', { dateStyle: 'long' })

  return (
    <main className="min-h-screen bg-white text-[#002147] selection:bg-blue-100 pb-32 relative overflow-x-hidden">
      {/* Structural Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4] pointer-events-none" />

      {/* FULL WIDTH CONTAINER (1600px) */}
      <div className="w-full px-4 md:px-8 lg:px-16 relative z-10 mx-auto max-w-[1600px]">
        {/* ─── PHASE 01: NAVIGATION ─── */}
        <nav className="pt-32 pb-6 border-b-2 border-slate-900 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            href="/blog"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journal Archive
          </Link>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Hash className="w-3 h-3" /> REGISTER_ID: {String(post.id).slice(-8).toUpperCase()}
            </span>
            <button className="text-slate-300 hover:text-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* ─── PHASE 02: THE HEADER (WIDE GRID) ─── */}
        <header className="mb-16 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6 text-blue-600">
              <Bookmark className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                MSNC_Archive_Vol_01
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-black tracking-tighter leading-[1] mb-8 text-[#002147]">
              {post.title}
            </h1>
          </div>

          <div className="lg:col-span-4 lg:pt-20">
            {post.excerpt && (
              <p className="text-xl md:text-2xl font-serif italic text-slate-500 leading-relaxed border-l-4 border-blue-600 pl-8">
                {post.excerpt}
              </p>
            )}
          </div>
        </header>

        {/* ─── PHASE 03: HERO ARTIFACT (WIDE) ─── */}
        {post.featuredImage && typeof post.featuredImage === 'object' && (
          <section className="mb-20">
            <div className="relative aspect-video md:aspect-[21/8] rounded-[2.5rem] overflow-hidden border-[10px] border-white shadow-2xl bg-slate-50">
              <Image
                src={(post.featuredImage as Media).url!}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute bottom-10 right-10 bg-white/95 backdrop-blur shadow-xl px-6 py-2 rounded-full border border-slate-100">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Visual_Record_Verified
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ─── PHASE 04: THE BODY GRID ─── */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start border-t border-slate-200 pt-16">
          <aside className="lg:col-span-3 lg:sticky lg:top-32 space-y-10">
            <div className="space-y-6">
              <div className="pb-6 border-b border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                  <Feather className="w-3 h-3 text-blue-600" /> Contributor
                </h4>
                <p className="text-sm font-black uppercase">
                  {(post as any).author || 'MSNC Editorial Board'}
                </p>
              </div>
              <div className="pb-6 border-b border-slate-100">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-blue-600" /> Published
                </h4>
                <p className="text-sm font-black uppercase">{publishDate}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-blue-600" /> Metric
                </h4>
                <p className="text-sm font-black uppercase">
                  {(post as any).readTime || readTime} Min Session
                </p>
              </div>
            </div>
          </aside>

          {/* CONTENT SECTION (Spans the rest of the 1600px width) */}
          <div className="lg:col-span-9 pb-24 border-b border-slate-100">
            <div
              className="prose prose-lg md:prose-xl prose-slate max-w-none 
              prose-p:font-serif prose-p:text-slate-700 prose-p:leading-[1.8]
              prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-[#002147]
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-slate-50 prose-blockquote:py-10 prose-blockquote:px-12 prose-blockquote:rounded-r-[2.5rem] prose-blockquote:italic
              prose-img:rounded-[2.5rem] prose-img:border-8 prose-img:border-white prose-img:shadow-2xl
              
              [&>p:first-of-type]:first-letter:text-8xl 
              [&>p:first-of-type]:first-letter:font-black 
              [&>p:first-of-type]:first-letter:text-[#002147] 
              [&>p:first-of-type]:first-letter:float-left 
              [&>p:first-of-type]:first-letter:mr-6 
              [&>p:first-of-type]:first-letter:mt-3
              [&>p:first-of-type]:first-letter:leading-[0.7]
            "
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />

            {/* GALLERY */}
            {Array.isArray(post.imageGallery) && post.imageGallery.length > 0 && (
              <section className="mt-20 pt-16 border-t border-slate-100">
                <div className="flex items-center gap-3 mb-10">
                  <Camera className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-black tracking-tight uppercase">Appendix_Visuals</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.imageGallery.map((item, idx) => {
                    const media = typeof item.image === 'object' ? (item.image as Media) : null
                    if (!media?.url) return null
                    return (
                      <figure key={idx} className="group space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-50">
                          <Image
                            src={media.url}
                            alt={media.alt || 'Field record'}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        {item.caption && (
                          <figcaption className="text-[11px] font-serif italic text-slate-400 pl-3 border-l border-blue-600">
                            {item.caption}
                          </figcaption>
                        )}
                      </figure>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* ─── PHASE 05: RELATED CHRONICLES ─── */}
        {relatedPosts.length > 0 && (
          <section className="py-24">
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4 mb-16">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Further Studies</h2>
              <Link
                href="/blog"
                className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 group"
              >
                Full Repository{' '}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`} className="group space-y-6">
                  <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-100">
                    {/* Placeholder if no image */}
                    {related.featuredImage &&
                    typeof related.featuredImage === 'object' &&
                    (related.featuredImage as Media).url ? (
                      <Image
                        src={(related.featuredImage as Media).url!}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
                        <Bookmark className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {/* FIXED: Added String() around ID */}
                    <span className="text-[9px] font-mono text-blue-600 block uppercase">
                      ARCHIVE_ID_{String(related.id).slice(-4)}
                    </span>
                    <h3 className="text-xl font-black group-hover:text-blue-600 transition-colors leading-tight uppercase">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ─── PHASE 06: IMPACT CTA ─── */}
        <section className="py-24">
          <div className="bg-[#002147] rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent)] pointer-events-none" />
            <div className="relative z-10 lg:max-w-2xl text-center lg:text-left">
              <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8 block">
                End of Documentation
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                Turn Narrative <br /> Into Action.
              </h2>
            </div>
            <div className="relative z-10">
              <Link
                href="/donate"
                className="h-16 px-12 bg-white text-[#002147] rounded-full inline-flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 hover:text-white transition-all group shadow-xl"
              >
                Invest in Excellence <Heart className="w-4 h-4 group-hover:fill-current" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
