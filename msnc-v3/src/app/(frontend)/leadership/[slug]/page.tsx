/**
 * MSNC Leadership Profile - Complete Manuscript Version
 * Design System: Scholarly Editorial / Digital Thesis
 * Features: Manuscript Bio, Strategic Alignment, Collective Gallery, Institutional CTA
 */

import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { getCachedPayload } from '@/lib/payload'
import {
  ArrowLeft,
  Quote,
  Share2,
  ShieldCheck,
  FileText,
  Hash,
  ArrowRight,
  Bookmark,
  Users,
  Star,
  GraduationCap,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

interface LeadershipMember {
  id: number | string
  name: string
  role: string
  pillar?: string
  bio?: any
  image?: {
    url: string
    alt?: string
  }
  slug: string
  linkedinUrl?: string
}

// ─── 1. DYNAMIC SEO ───
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getCachedPayload()
  const { docs } = await payload.find({
    collection: 'leadership' as any,
    where: { slug: { equals: slug } },
  })
  const leader = docs[0] as unknown as LeadershipMember
  if (!leader) return { title: 'Member Not Found' }

  return {
    title: `${leader.name} | MSNC Leadership`,
    description: `Executive Profile: ${leader.role} at Mulenge Scholars' Network Canada.`,
  }
}

// ─── 2. LEXICAL RENDERER ───
function RenderBio({ content }: { content: any }) {
  if (!content?.root?.children)
    return (
      <p className="italic text-slate-400 font-serif text-xl">Biography pending registration...</p>
    )

  return (
    <div className="space-y-6">
      {content.root.children.map((block: any, i: number) => {
        if (block.type === 'paragraph') {
          return (
            <p key={i} className="text-xl text-slate-700 leading-[1.8] font-serif">
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

export default async function LeaderProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getCachedPayload()

  // Fetch Current Leader
  const { docs } = await payload.find({
    collection: 'leadership' as any,
    where: { slug: { equals: slug } },
    depth: 1,
  })

  const leader = docs[0] as unknown as LeadershipMember
  if (!leader) notFound()

  // Fetch Other Board Members (Collective Stewardship)
  const { docs: otherMembers } = await payload.find({
    collection: 'leadership' as any,
    where: { slug: { not_equals: slug } },
    limit: 3,
    sort: 'order',
  })

  return (
    <main className="min-h-screen bg-white text-[#002147] selection:bg-blue-100 pb-32 relative overflow-x-hidden">
      {/* Structural UI Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4] pointer-events-none" />

      <div className="w-full px-4 md:px-8 lg:px-16 relative z-10 mx-auto max-w-[1600px]">
        {/* ─── PHASE 01: NAVIGATION & MASTHEAD ─── */}
        <nav className="pt-32 pb-6 border-b-2 border-slate-900 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            href="/leadership"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            Back to Leadership Ledger
          </Link>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Hash className="w-3 h-3" /> STEWARD_ID:{' '}
              {String(leader.id).padStart(8, '0').toUpperCase()}
            </span>
            <button className="text-slate-300 hover:text-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </nav>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* ─── PHASE 02: VISUAL ARTIFACT (IMAGE) ─── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-12 border-white shadow-2xl bg-slate-50 rotate-1 group transition-transform hover:rotate-0 duration-700">
              {leader.image?.url ? (
                <Image
                  src={leader.image.url}
                  alt={leader.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-white font-black text-9xl uppercase opacity-20">
                  {leader.name.charAt(0)}
                </div>
              )}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-100">
                  
                  
                </div>
              </div>
            </div>
          </div>

          {/* ─── PHASE 03: MANUSCRIPT CONTENT ─── */}
          <div className="lg:col-span-7 space-y-16">
            <header className="space-y-8">
              <div className="flex items-center gap-3 text-blue-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  {leader.pillar || 'Strategic Leadership'}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-[#002147]">
                {leader.name}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center gap-8 border-t border-slate-100 pt-8">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                    Board Appointment
                  </span>
                  <p className="text-2xl font-bold italic font-serif text-slate-600">
                    {leader.role}
                  </p>
                </div>
                {leader.linkedinUrl && (
                  <Link
                    href={leader.linkedinUrl}
                    target="_blank"
                    className="h-12 px-6 bg-slate-50 border border-slate-200 rounded-full flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#0077b5] hover:text-white transition-all w-max"
                  >
                    Executive LinkedIn <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </header>

            {/* Biography Section */}
            <article className="relative">
              <Quote className="absolute -left-12 -top-10 w-24 h-24 text-blue-50 opacity-50 -z-10" />
              <div
                className="prose prose-xl prose-slate max-w-none
                [&>div>p:first-of-type]:first-letter:text-8xl 
                [&>div>p:first-of-type]:first-letter:font-black 
                [&>div>p:first-of-type]:first-letter:text-[#002147] 
                [&>div>p:first-of-type]:first-letter:float-left 
                [&>div>p:first-of-type]:first-letter:mr-6 
                [&>div>p:first-of-type]:first-letter:mt-3
                [&>div>p:first-of-type]:first-letter:leading-[0.7]
              "
              >
                <RenderBio content={leader.bio} />
              </div>
            </article>

            {/* Impact Note */}
            <div className="p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-start gap-6">
              <FileText className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-[#002147] mb-2">
                  Governance Statement
                </h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  As a member of the executive board, {leader.name} is responsible for the strategic
                  oversight of academic excellence and diaspora community engagement. This record
                  serves as a verified biography for institutional transparency.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─── PHASE 04: STRATEGIC ALIGNMENT (NEW) ─── */}
        <section className="mt-32 pt-24 border-t-2 border-slate-900">
          <div className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-4 text-blue-600">
              <Bookmark className="w-6 h-6" />
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                Stewardship Alignment
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-300">REF_STRATEGY_LEDGER</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                t: 'Academic Rigor',
                d: 'Providing scholars with the high-level roadmap required for tier-1 university systems.',
              },
              {
                icon: Users,
                t: 'Community Trust',
                d: 'Maintaining a bridge of transparency between the Mulenge diaspora and Canadian institutions.',
              },
              {
                icon: Star,
                t: 'Legacy Building',
                d: 'Ensuring that youth leadership is developed as a sustainable community resource.',
              },
            ].map((align, idx) => (
              <div
                key={idx}
                className="p-10 rounded-[2.5rem] border border-slate-100 bg-white hover:border-blue-600 transition-colors group"
              >
                <align.icon className="w-8 h-8 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                <h4 className="text-xl font-black uppercase tracking-tighter mb-4">{align.t}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{align.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── PHASE 05: COLLECTIVE STEWARDSHIP (RELATED BOARD MEMBERS) ─── */}
        <section className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              The Collective.
            </h2>
            <Link
              href="/leadership"
              className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-[#002147] transition-colors flex items-center gap-2"
            >
              Full Board Registry <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {otherMembers.map((member: any) => (
              <Link
                key={member.id}
                href={`/leadership/${member.slug}`}
                className="group block space-y-6"
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50">
                  <div className="absolute inset-0 bg-slate-200 grayscale transition-all group-hover:grayscale-0 group-hover:scale-105" />
                  {member.image?.url && (
                    <Image
                      src={member.image.url}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div>
                  <span className="text-[9px] font-mono text-blue-600 uppercase mb-2 block">
                    Executive_Registry_{member.id.toString().slice(-4)}
                  </span>
                  <h3 className="text-2xl font-black group-hover:text-blue-600 transition-colors uppercase leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">
                    {member.role}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── PHASE 06: INSTITUTIONAL CTA (THE BRIDGE) ─── */}
        <section className="mt-40">
          <div className="bg-[#002147] rounded-[4rem] p-12 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl border-4 border-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent)] pointer-events-none" />
            <div className="relative z-10 lg:max-w-2xl text-center lg:text-left">
              <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-8 block">
                Institutional Engagement
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] uppercase">
                Support Our <br /> Stewardship.
              </h2>
              <p className="text-lg text-slate-400 font-medium mt-8 leading-relaxed">
                Join the leaders of MSNC in our mission to redefine educational equity. Whether
                through partnership or contribution, your involvement scales our impact.
              </p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row gap-6 shrink-0">
              <Link
                href="/donate"
                className="h-16 px-12 bg-white text-[#002147] rounded-full inline-flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 hover:text-white transition-all group active:scale-95 shadow-xl"
              >
                Invest in Mission <Star className="w-4 h-4 group-hover:fill-current" />
              </Link>
              <Link
                href="/contact"
                className="h-16 px-12 border-2 border-white/20 text-white rounded-full inline-flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-[#002147] transition-all active:scale-95 group"
              >
                Inquire Partnership{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="mt-32 border-t-2 border-slate-900 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
          <span>Secured Document</span>
          <div className="flex gap-8">
            <span>Leadership</span>
            <span>Governance</span>
            <span>Stewardship</span>
          </div>
          <span>MSNC Canada Repository_2024</span>
        </footer>
      </div>
    </main>
  )
}
