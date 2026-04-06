import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image' // Added Next.js Image
import Container from '@/components/ui/Container'
import { getCachedPayload } from '@/lib/payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'
import type { Blog, Media } from '@/types/payload-types' // Import Media type

type PageArgs = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageArgs): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getCachedPayload()
    const { docs } = await payload.find({
      collection: 'blogs',
      depth: 1,
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    const post = docs?.[0] as Blog | undefined

    if (!post) return { title: 'Post Not Found | Impact Journal' }

    return {
      title: `${post.title} | Impact Journal`,
      description: post.excerpt || 'MSNC Impact Journal',
    }
  } catch {
    return { title: 'Impact Journal' }
  }
}

export default async function BlogPostPage({ params }: PageArgs) {
  const { slug } = await params

  const payload = await getCachedPayload()
  const { docs } = await payload.find({
    collection: 'blogs',
    depth: 1, // Ensures relationships (like images) are populated
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = docs?.[0] as Blog | undefined

  if (!post) {
    notFound()
  }

  const contentHTML = post?.content ? convertLexicalToHTML({ data: post.content as any }) : ''

  // safely extract the populated image object.
  // Payload returns an ID (string/number) if not populated, or the Media object if it is.
  const featuredImage =
    typeof post.featuredImage === 'object' && post.featuredImage !== null
      ? (post.featuredImage as Media)
      : null

  return (
    <main className="min-h-screen bg-white selection:bg-secondary selection:text-primary">
      <section className="pt-24 pb-10">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>
        </Container>
      </section>

      <section className="pb-16">
        <Container className="max-w-4xl">
          <h1 className="font-display text-5xl md:text-7xl font-black text-primary tracking-tighter leading-[0.95] mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-xl text-slate-500 font-medium leading-relaxed border-l-4 border-secondary pl-6">
              {post.excerpt}
            </p>
          )}
        </Container>
      </section>

      {/* Render the image if the object exists and has a URL */}
      {featuredImage?.url && (
        <section className="pb-16">
          <Container className="max-w-5xl">
            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-slate-100 shadow-brand bg-slate-100 flex items-center justify-center">
              <Image
                src={featuredImage.url}
                alt={featuredImage.alt || post.title}
                fill
                priority // Preloads the hero image for better LCP performance
                className="object-cover"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Fallback state so you know if the image is missing from the DB vs broken code */}
      {!featuredImage?.url && (
        <section className="pb-16">
          <Container className="max-w-5xl">
            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
              <ImageIcon className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-sm font-medium tracking-widest uppercase">
                No Cover Image Assigned
              </p>
            </div>
          </Container>
        </section>
      )}

      <section className="pb-32">
        <Container className="max-w-3xl">
          {contentHTML ? (
            <div
              className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary prose-img:rounded-3xl"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
          ) : (
            <p className="text-slate-400 italic">This entry is still being drafted.</p>
          )}
        </Container>
      </section>
    </main>
  )
}
