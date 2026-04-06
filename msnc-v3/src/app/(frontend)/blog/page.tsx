import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogs } from '@/lib/payload'
import Container from '@/components/ui/Container'
import { ArrowRight, BookOpen, Clock, ChevronRight } from 'lucide-react'

import type { Blog } from '@/types/payload-types'

type BlogPost = Blog & {
  featuredImage?: {
    url?: string
    alt?: string
  }
}

export const metadata: Metadata = {
  title: 'Impact Journal | MSNC',
  description:
    'Chronicles of academic excellence and community resilience within the Mulenge diaspora.',
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const allPosts = (await getBlogs()) as BlogPost[]
  const featuredPost = allPosts[0]
  const regularPosts = allPosts.slice(1)

  if (!featuredPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-display text-xl italic">
            The journal is being drafted.
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="bg-white selection:bg-secondary/30">
      {/* --- HERO: Minimalist Editorial Header --- */}
      <section className="pt-32 pb-20 border-b border-slate-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-6">
                <span>Archives</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-primary">Impact Journal</span>
              </nav>
              <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tight leading-[0.9] mb-8">
                Narratives of <br />
                <span className="text-secondary font-serif italic">Resilience.</span>
              </h1>
            </div>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-sm pb-2">
              The definitive record of excellence and scholarly advancement within the MSNC
              community.
            </p>
          </div>
        </Container>
      </section>

      {/* --- FEATURED: The Cinematic Cover Story --- */}
      <section className="py-20">
        <Container>
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <div className="relative aspect-video md:aspect-21/9 rounded-4xl overflow-hidden mb-12 shadow-2xl">
              {featuredPost.featuredImage?.url ? (
                <Image
                  src={featuredPost.featuredImage.url}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-primary flex items-center justify-center">
                  <BookOpen className="w-20 h-20 text-white/10" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent" />

              <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-3xl">
                  <span className="inline-block px-4 py-1.5 bg-secondary text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                    Cover Story
                  </span>
                  <h2 className="text-3xl md:text-6xl font-extrabold text-white leading-tight tracking-tight group-hover:text-secondary transition-colors">
                    {featuredPost.title}
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-4 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                  <span>Read Article</span>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* --- GRID: The Editorial Feed --- */}
      <section className="py-24 bg-slate-50/50">
        <Container>
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/40">
              Recent Briefings
            </h3>
            <div className="h-px flex-1 bg-slate-200 ml-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
            {regularPosts.map((post: BlogPost) => (
              <article key={post.id} className="group flex flex-col">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative aspect-4/5 rounded-3xl overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500"
                >
                  {post.featuredImage?.url ? (
                    <Image
                      src={post.featuredImage.url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-slate-300" />
                    </div>
                  )}
                </Link>

                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="text-secondary">Insight</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> 5 Min
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-primary mb-4 leading-tight tracking-tight group-hover:text-secondary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>

                <p className="text-slate-500 leading-relaxed line-clamp-3 mb-8 text-sm">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors"
                >
                  Explore <ArrowRight className="w-3 h-3" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* --- FOOTER: Storytelling Invitation --- */}
      <section className="py-32">
        <Container>
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <BookOpen className="w-64 h-64 text-white" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">
                Your narrative <br />
                <span className="italic text-secondary font-serif">matters.</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-12 text-lg">
                Are you a scholar or community leader with a story of impact? We are currently
                accepting pitches for the next volume.
              </p>
              <Link
                href="/contact"
                className="inline-flex h-16 items-center px-10 bg-secondary text-primary font-black uppercase tracking-widest text-xs rounded-full hover:bg-white transition-all active:scale-95 shadow-xl"
              >
                Submit your pitch
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
