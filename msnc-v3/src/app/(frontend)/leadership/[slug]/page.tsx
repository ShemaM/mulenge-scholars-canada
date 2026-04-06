import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import Container from '@/components/ui/Container'
import { ArrowLeft, Quote } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

interface LeadershipMember {
  name: string
  role: string
  pillar?: string
  bio?: any
  image?: {
    url: string
    alt?: string
  }
  slug: string
}

// --- 1. DYNAMIC SEO & METADATA ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'leadership' as any,
    where: { slug: { equals: slug } },
  })

  const leader = docs[0] as unknown as LeadershipMember

  if (!leader) return { title: 'Member Not Found | MSNC' }

  return {
    title: `${leader.name} | ${leader.role} | MSNC Leadership`,
    description: `Explore the journey of ${leader.name}, ${leader.role} at Mulenge Scholars' Network Canada. Dedicated to academic excellence and community resilience.`,
    openGraph: {
      title: `${leader.name} - MSNC Leadership`,
      description: leader.role,
      images: leader.image?.url ? [{ url: leader.image.url }] : [],
    },
  }
}

// --- 2. RICHTEXT RENDERER (Lexical Support) ---
function RenderBio({ content }: { content: any }) {
  if (!content) return null

  // Handle legacy string data
  if (typeof content === 'string') {
    return <p className="leading-relaxed text-slate-600">{content}</p>
  }

  // Handle Lexical JSON (root.children)
  if (content.root && Array.isArray(content.root.children)) {
    return (
      <div className="space-y-4">
        {content.root.children.map((block: any, i: number) => {
          if (block.type === 'paragraph') {
            return (
              <p key={i} className="leading-relaxed text-slate-600 text-lg">
                {block.children?.map((child: any, j: number) => (
                  <span key={j} className={child.format === 1 ? 'font-bold' : ''}>
                    {child.text}
                  </span>
                ))}
              </p>
            )
          }
          return null
        })}
      </div>
    )
  }

  return <p className="italic text-slate-400">Biography format not recognized.</p>
}

export default async function LeaderProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'leadership' as any,
    where: { slug: { equals: slug } },
  })

  const leader = docs[0] as unknown as LeadershipMember
  if (!leader) notFound()

  return (
    <main className="min-h-screen bg-white pt-40 pb-24 selection:bg-secondary/10">
      <Container>
        <Link
          href="/leadership"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all duration-300 mb-16 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Leadership
        </Link>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Visual Anchor */}
          <div className="lg:col-span-5">
            <div className="aspect-4/5 rounded-[3rem] bg-slate-100 overflow-hidden relative border-8 border-white shadow-2xl">
              {leader.image?.url ? (
                <Image
                  src={leader.image.url}
                  alt={leader.name}
                  fill
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-200 font-black text-9xl font-display uppercase opacity-20">
                  {leader.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Narrative Content */}
          <article className="lg:col-span-7 space-y-10">
            <header className="space-y-4">
              <span className="text-secondary font-black uppercase tracking-[0.4em] text-[10px] block">
                {leader.pillar || 'Strategic Leadership'}
              </span>
              <h1 className="text-5xl md:text-7xl font-black font-display text-primary tracking-tighter leading-[0.9]">
                {leader.name}
              </h1>
              <p className="text-2xl font-bold text-slate-500/80 italic font-display">
                {leader.role}
              </p>
            </header>

            <div className="relative">
              <Quote className="absolute -left-12 -top-6 w-16 h-16 text-secondary/5 -z-10" />
              <div className="prose prose-slate prose-lg max-w-none border-t border-slate-100 pt-10">
                <RenderBio content={leader.bio} />
              </div>
            </div>
          </article>
        </div>
      </Container>
    </main>
  )
}
