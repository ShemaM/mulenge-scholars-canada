/**
 * MSNC Impact Journal — Blog Post Page
 * Editorial magazine style: full-bleed hero, wide reading column, strong typographic hierarchy
 */

import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Link } from '@/navigation'
import Image from 'next/image'
import { getCachedPayload } from '@/lib/payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { ArrowLeft, Calendar, Clock, Feather, Camera, ArrowRight, Heart, Share2, Bookmark } from 'lucide-react'
import type { Blog, Media } from '@/types/payload-types'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'
import { getTranslations } from 'next-intl/server'

type PageArgs = { params: Promise<{ locale: string; slug: string }> }

export const revalidate = 3600
export const dynamicParams = true

export async function generateMetadata({ params }: PageArgs): Promise<Metadata> {
  const { slug, locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  try {
    const payload = await getCachedPayload()
    const { docs } = await payload.find({
      collection: 'blogs', where: { slug: { equals: slug } },
      limit: 1, locale: activeLocale, fallbackLocale: 'en',
    })
    const post = docs?.[0] as Blog | undefined
    return { title: post ? `${post.title} | MSNC Journal` : 'Journal' }
  } catch {
    return { title: 'Impact Journal | MSNC' }
  }
}

function calculateReadTime(html: string): number {
  if (!html) return 1
  const words = html.replaceAll(/<[^>]*>?/gm, '').trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function BlogPostPage({ params }: PageArgs) {
  const { slug, locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const t = await getTranslations({ locale, namespace: 'BlogPage' })
  const payload = await getCachedPayload()

  const { docs } = await payload.find({
    collection: 'blogs', depth: 2, limit: 1,
    where: { slug: { equals: slug } },
    locale: activeLocale, fallbackLocale: 'en',
  })
  const post = docs?.[0] as Blog | undefined
  if (!post) notFound()

  const { docs: relatedDocs } = await payload.find({
    collection: 'blogs', depth: 1, limit: 3, sort: '-createdAt',
    where: { slug: { not_equals: slug }, status: { equals: 'published' } },
    locale: activeLocale, fallbackLocale: 'en',
  })
  const relatedPosts = relatedDocs as Blog[]

  const contentHTML = post?.content ? convertLexicalToHTML({ data: post.content as any }) : ''
  const readTime = calculateReadTime(contentHTML)
  const publishDate = (
    (post as any).publishedDate ? new Date((post as any).publishedDate)
    : post.createdAt ? new Date(post.createdAt)
    : new Date()
  ).toLocaleDateString(getSiteDateLocale(activeLocale), { dateStyle: 'long' })

  return (
    <main className="min-h-screen bg-background">

      {/* ── Top nav bar ────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="container-editorial flex h-14 items-center justify-between">
          <Link href="/blog"
            className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="section-label">{t('detail.back')}</span>
          </Link>
          <span className="hidden max-w-sm truncate section-label text-muted-foreground/60 md:block">
            {post.title}
          </span>
          <button className="text-muted-foreground transition-colors hover:text-secondary" aria-label="Share">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Hero — full bleed image ────────────────────────────────────────── */}
      {post.featuredImage && typeof post.featuredImage === 'object' && (post.featuredImage as Media).url && (
        <div className="relative h-[55vh] min-h-100 w-full overflow-hidden md:h-[70vh]">
          <Image
            src={(post.featuredImage as Media).url!}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        </div>
      )}

      {/* ── Article header — overlaps hero ────────────────────────────────── */}
      <div className="container-editorial pt-8" style={{ marginTop: post.featuredImage ? '-3rem' : '4rem' }}>
        <div className="mx-auto max-w-5xl">

          {/* Category + date */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-secondary px-4 py-1 text-2xs font-black uppercase tracking-widest text-white">
              {t('hero.journal')}
            </span>
            <span className="section-label text-muted-foreground">{publishDate}</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display font-normal text-primary text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt as deck */}
          {post.excerpt && (
            <p className="mb-5 text-lg font-medium leading-relaxed text-foreground/65 border-l-2 border-secondary pl-5">
              {post.excerpt}
            </p>
          )}

          {/* Byline strip */}
          <div className="flex flex-wrap items-center gap-5 border-y border-border py-3">
            <div className="flex items-center gap-2">
              <Feather className="h-3.5 w-3.5 text-secondary" />
              <span className="text-sm font-semibold text-primary">
                {(post as any).author || 'MSNC Editorial'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="section-label">{publishDate}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span className="section-label">{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ──────────────────────────────────────────────────── */}
      <div className="container-editorial py-8">
        <div className="mx-auto max-w-5xl">
          <div
            className="
              prose prose-lg max-w-none
              prose-p:text-foreground/75 prose-p:leading-relaxed prose-p:text-md
              prose-headings:font-display prose-headings:font-normal prose-headings:text-primary
              prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
              prose-blockquote:border-l-2 prose-blockquote:border-secondary
              prose-blockquote:bg-paper-50 prose-blockquote:rounded-r-xl
              prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:not-italic
              prose-blockquote:text-foreground/80
              prose-img:rounded-2xl prose-img:border prose-img:border-border prose-img:shadow-sm
              prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-primary prose-strong:font-semibold
              [&>p:first-of-type]:text-xl [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-foreground/80
              [&>p:first-of-type]:first-letter:float-left
              [&>p:first-of-type]:first-letter:mr-3 [&>p:first-of-type]:first-letter:mt-1
              [&>p:first-of-type]:first-letter:font-display [&>p:first-of-type]:first-letter:text-7xl
              [&>p:first-of-type]:first-letter:text-primary [&>p:first-of-type]:first-letter:leading-none
            "
            dangerouslySetInnerHTML={{ __html: contentHTML }}
          />

          {/* Gallery */}
          {Array.isArray(post.imageGallery) && post.imageGallery.length > 0 && (
            <section className="mt-16 border-t border-border pt-12">
              <div className="mb-8 flex items-center gap-3">
                <Camera className="h-5 w-5 text-secondary" />
                <span className="section-label text-primary">{t('detail.appendix')}</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {post.imageGallery.map((item, idx) => {
                  const media = typeof item.image === 'object' ? (item.image as Media) : null
                  if (!media?.url) return null
                  return (
                    <figure key={idx} className="group space-y-3">
                      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-paper-50">
                        <Image src={media.url} alt={media.alt || 'Field record'} fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      {item.caption && (
                        <figcaption className="section-label border-l border-secondary pl-4 italic text-muted-foreground">
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

      {/* ── Related stories ───────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border bg-paper-50 py-16">
          <div className="container-editorial">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="font-display font-normal text-primary mb-0 text-2xl md:text-3xl tracking-tight">
                {t('detail.furtherStudies')}
              </h2>
              <Link href="/blog" className="group flex items-center gap-2">
                <span className="section-label text-secondary">{t('detail.fullRepository')}</span>
                <ArrowRight className="h-3 w-3 text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group space-y-4">
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-shadow group-hover:shadow-md">
                    {related.featuredImage && typeof related.featuredImage === 'object' && (related.featuredImage).url ? (
                      <Image src={(related.featuredImage).url} alt={related.title} fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Bookmark className="h-10 w-10 text-muted-foreground/10" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-display font-normal text-primary transition-colors group-hover:text-secondary mb-0 text-lg leading-snug">
                    {related.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border bg-paper-50">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl md:text-4xl font-normal max-w-2xl mx-auto mb-8">
            Explore more impact stories
          </h2>
          <Link
            href="/blog"
            className="btn inline-flex bg-primary text-white hover:bg-primary/90 px-8 font-semibold"
          >
            Read More
          </Link>
        </div>
      </section>

    </main>
  )
}
