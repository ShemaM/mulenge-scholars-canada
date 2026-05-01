import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getBlogs } from '@/lib/payload'
import { getSiteDateLocale, normalizeSiteLocale } from '@/lib/site-copy'
import { Link } from '@/navigation'
import Image from 'next/image'
import PageHeader from '@/components/ui/PageHeader'
import { ArrowRight, Bookmark, Feather } from 'lucide-react'
import type { Blog, Media } from '@/types/payload-types'
import { SITE_NAME, SITE_URL } from '@/lib/site'

export const revalidate = 3600

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: `Impact Journal | ${SITE_NAME}`,
    description: 'Stories, insights, and updates from the Mulenge Scholars Network Canada community.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
    },
    openGraph: {
      title: `Impact Journal | ${SITE_NAME}`,
      description: 'Stories, insights, and updates from the MSNC community.',
      url: `${SITE_URL}/${locale}/blog`,
      type: 'website',
    },
  }
}

export default async function BlogListingPage({ params }: Props) {
  const { locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const t = await getTranslations({ locale, namespace: 'BlogPage' })
  const dateLocale = getSiteDateLocale(activeLocale)

  const posts = (await getBlogs({ limit: 50, locale: activeLocale })) as Blog[]

  const featuredPost = posts[0] || null
  const remainingPosts = posts.slice(1)

  return (
    <main className="min-h-screen bg-background">
      <PageHeader 
        label={t('listing.subtitle')}
        title={t('listing.title')}
        description={t('listing.description')}
        breadcrumbs={[
          { label: t('listing.title'), href: '/blog' }
        ]}
      />

      {/* ── Featured Post ──────────────────────────────────────────────────── */}
      {featuredPost && (
        <section className="container-editorial py-16 md:py-24">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block"
          >
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-paper-50 shadow-sm transition-shadow group-hover:shadow-md">
                  {featuredPost.featuredImage &&
                  typeof featuredPost.featuredImage === 'object' &&
                  (featuredPost.featuredImage as Media).url ? (
                    <Image
                      src={(featuredPost.featuredImage as Media).url!}
                      alt={featuredPost.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Bookmark className="h-16 w-16 text-muted-foreground/10" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="rounded-full bg-secondary px-4 py-1 text-2xs font-black uppercase tracking-widest text-white">
                    {t('listing.featured')}
                  </span>
                  <span className="section-label text-muted-foreground">
                    {featuredPost.createdAt
                      ? new Date(featuredPost.createdAt).toLocaleDateString(dateLocale, {
                          dateStyle: 'long',
                        })
                      : ''}
                  </span>
                </div>

                <h2
                  className="font-display font-normal text-primary mb-4 transition-colors group-hover:text-secondary"
                  style={{
                    fontSize: 'clamp(1.75rem,3vw,2.5rem)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt && (
                  <p className="text-base leading-relaxed text-muted-foreground mb-8">
                    {featuredPost.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-2 text-secondary">
                  <span className="section-label">{t('listing.readArticle')}</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── Post Grid ──────────────────────────────────────────────────────── */}
      {remainingPosts.length > 0 && (
        <section className="border-t border-border bg-paper-50 py-16 md:py-24">
          <div className="container-editorial">
            <div className="mb-12 flex items-center justify-between">
              <h2
                className="font-display font-normal text-primary"
                style={{
                  fontSize: 'clamp(1.5rem,3vw,2.25rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('listing.latest')}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group space-y-5"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm transition-shadow group-hover:shadow-md">
                    {post.featuredImage &&
                    typeof post.featuredImage === 'object' &&
                    (post.featuredImage as Media).url ? (
                      <Image
                        src={(post.featuredImage as Media).url!}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Bookmark className="h-10 w-10 text-muted-foreground/10" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="section-label text-muted-foreground">
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString(dateLocale, {
                              dateStyle: 'medium',
                            })
                          : ''}
                      </span>
                    </div>

                    <h3
                      className="font-display font-normal text-primary transition-colors group-hover:text-secondary"
                      style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.3',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Empty State ────────────────────────────────────────────────────── */}
      {posts.length === 0 && (
        <section className="container-editorial py-32 text-center">
          <div className="mx-auto max-w-md space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-paper-50 border border-border">
              <Feather className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h2
              className="font-display font-normal text-primary"
              style={{
                fontSize: '1.5rem',
                letterSpacing: '-0.02em',
              }}
            >
              {t('listing.emptyTitle')}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('listing.emptyDescription')}
            </p>
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border bg-paper-50">
        <div className="container-editorial text-center">
          <h2 className="font-display text-3xl md:text-4xl font-normal max-w-2xl mx-auto mb-8">
            Stay informed about our impact stories
          </h2>
          <Link
            href="/join/newsletter"
            className="btn inline-flex bg-primary text-white hover:bg-primary/90 px-8 font-semibold"
          >
            Get Updates
          </Link>
        </div>
      </section>
    </main>
  )
}
