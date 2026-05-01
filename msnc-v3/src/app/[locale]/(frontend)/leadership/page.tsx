/**
 * MSNC Leadership — Editorial v3
 */

import { Metadata } from 'next'
import Image from 'next/image'
import { Link } from '@/navigation'
import PageHeader from '@/components/ui/PageHeader'
import { ArrowRight, ShieldCheck, Globe, Scale, Users } from "lucide-react"
import { LinkedInIcon } from "@/components/ui/SocialIcons"
import { getCachedPayload } from '@/lib/payload'
import { cn } from '@/lib/utils'
import { SITE_URL } from '@/lib/site'
import { normalizeSiteLocale } from '@/lib/site-copy'
import { getTranslations } from 'next-intl/server'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'LeadershipPage.metadata' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: `${BASE_URL}/leadership` },
  }
}

export const revalidate = 3600

interface LeadershipMember {
  id: string
  name: string
  role: string
  pillar: string
  bio: {
    root: {
      children: Array<{
        type: string
        children?: Array<{ text?: string }>
      }>
    }
  }
  linkedinUrl?: string
  image?: { url: string }
  slug: string
}

function getBioPreview(bio: LeadershipMember['bio']): string {
  if (!bio?.root?.children) return "The story of impact is being written..."
  try {
    const firstParagraph = bio.root.children.find(child => child.type === "paragraph")
    const text = firstParagraph?.children?.map(node => node.text || "").join("") || ""
    return text.length > 140 ? `${text.substring(0, 140)}...` : text
  } catch (e) { return "Exploring the journey of leadership." }
}

async function getTeamData(locale: string): Promise<LeadershipMember[]> {
  try {
    const payload = await getCachedPayload()
    const { docs } = await payload.find({
      collection: "leadership",
      sort: "order",
      locale,
      fallbackLocale: 'en',
    })
    return (docs as unknown as LeadershipMember[]).filter(member => 
      member.slug && 
      typeof member.slug === 'string' && 
      member.slug.trim() !== '' && 
      member.slug !== 'null'
    )
  } catch (e) { return [] }
}


export default async function LeadershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'LeadershipPage' })
  const team = await getTeamData(normalizeSiteLocale(locale))

  const values = t.raw('values') as Array<{ icon: string; t: string; d: string }>

  return (
    <main className="min-h-screen bg-white pb-24">

      {/* ── Page Header ── */}
      <PageHeader
        label={t('header.label')}
        title={t('header.title')}
        description={t('header.description')}
        breadcrumbs={[{ label: t('header.breadcrumb') }]}
      />

      <div className="container-editorial">

        {/* ── Values ── */}
        <section className="section border-t border-border">
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((item, i) => {
              const Icon = [Globe, Scale, Users][i]
              return (
                <div key={i} className="space-y-4">
                  <Icon className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl">{item.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Board ── */}
        <section className="section border-t border-border bg-paper-50 -mx-6 sm:-mx-12 lg:-mx-20 px-6 sm:px-12 lg:px-20">
          <div className="mb-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-secondary" aria-hidden="true" />
              <span className="section-label text-secondary">{t('board.label')}</span>
            </div>
            <h2 className="max-w-3xl">{t('board.title')}</h2>
          </div>

          {team.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-32">
              {team.map((member, idx) => (
                <TeamMemberCard key={member.id} member={member} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border-2 border-dashed border-border rounded-[3rem]">
              <p className="section-label text-muted-foreground">{t('board.empty')}</p>
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="section border-t border-border">
          <div className="bg-paper-50 border border-border rounded-[2.5rem] p-12 md:p-20 text-center">
            <h2 className="max-w-3xl mx-auto mb-8">
              {t('cta.heading')}{" "}
              <em className="font-display font-normal not-italic text-secondary">
                {t('cta.headingItalic')}
              </em>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              {t('cta.body')}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                {t('cta.primary')} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn btn-outline">
                {t('cta.secondary')} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

function TeamMemberCard({ member, index }: { member: LeadershipMember; index: number }) {
  const isStaggered = index % 2 !== 0

  return (
    <article className={cn("group flex flex-col", isStaggered && "md:mt-40")}>
      <Link href={`/leadership/${member.slug}`} className="block relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-paper-50 shadow-sm group-hover:shadow-lg transition-all duration-500 border border-white">
        {member.image?.url ? (
          <Image
            src={member.image.url}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-paper-50 text-primary font-display text-8xl">{member.name.charAt(0)}</div>
        )}
        <div className="absolute bottom-6 left-6">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm section-label text-primary">
            {member.pillar || "Board Member"}
          </div>
        </div>
      </Link>

      <div className="mt-10 space-y-4 px-2">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-3xl md:text-4xl group-hover:text-secondary transition-colors">{member.name}</h3>
            <p className="section-label text-secondary mt-2">{member.role}</p>
          </div>
          {member.linkedinUrl && (
            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-secondary transition-all">
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </header>
        <p className="text-muted-foreground text-lg leading-relaxed italic font-display line-clamp-3">
          &ldquo;{getBioPreview(member.bio)}&rdquo;
        </p>
        <Link href={`/leadership/${member.slug}`} className="btn btn-outline text-2xs">
          Explore Journey <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
