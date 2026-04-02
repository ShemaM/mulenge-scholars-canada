import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import { getCachedPayload } from '@/lib/payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import { ArrowLeft } from 'lucide-react'
import type { Blog } from '@/types/payload-types'

type BlogPost = Blog & {
  featuredImage?: {
    url?: string
  }
}

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

    const post = docs?.[0] as BlogPost | undefined

    if (!post) {
      return {
        title: 'Post Not Found | Impact Journal',
      }
    }

    return {
      title: `${post.title} | Impact Journal`,
      description: post.excerpt || 'MSNC Impact Journal',
    }
  } catch {
    return {
      title: 'Impact Journal',
    }
  }
}

export default async function BlogPostPage({ params }: PageArgs) {
  const { slug } = await params

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

  const post = docs?.[0] as BlogPost | undefined

  if (!post) {
    notFound()
  }

  const contentHTML = post?.content
    ? convertLexicalToHTML({ data: post.content as any })
    : ''

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

      {post.featuredImage?.url && (
        <section className="pb-16">
          <Container className="max-w-5xl">
            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-slate-100 shadow-brand bg-slate-50">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="pb-32">
        <Container className="max-w-3xl">
          {contentHTML ? (
            <div
              className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-primary prose-a:text-secondary"
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
