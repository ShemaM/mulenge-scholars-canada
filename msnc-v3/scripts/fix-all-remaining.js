const fs = require('fs');
const path = require('path');

// ============================================================
// FIX 1: Navbar — Language switcher labels
// ============================================================
const navbarPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Navbar.tsx');
let navbar = fs.readFileSync(navbarPath, 'utf8');

// Change switchLabel from 'FR'/'EN' to 'Français'/'English'
navbar = navbar.replace(
  "const switchLabel = locale === 'en' ? 'FR' : 'EN'",
  "const switchLabel = locale === 'en' ? 'Français' : 'English'"
);

// Update aria-label to be more descriptive
navbar = navbar.replace(
  'aria-label={`Switch to ${switchLocale}`}',
  'aria-label={`Switch to ${switchLocale === \'en\' ? "English" : "Français"}`}'
);

fs.writeFileSync(navbarPath, navbar, 'utf8');
console.log('Fixed Navbar language switcher');

// ============================================================
// FIX 2: Loading — Add language-aware message
// ============================================================
const loadingPath = path.join(__dirname, '..', 'src', 'app', '[locale]', '(frontend)', 'loading.tsx');
const loadingContent = `'use client';

import { useLocale } from 'next-intl';

export default function Loading() {
  const locale = useLocale();
  const switchMessage = locale === 'en' 
    ? 'Switching to English...' 
    : 'Changement vers Français...';

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Editorial Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary/10 border-t-primary" />
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-secondary/10 border-b-secondary [animation-duration:3s]" />
        <div className="absolute font-display text-primary text-xl">M</div>
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-primary">
          Mulenge Scholars
        </p>
        <p className="text-sm text-muted-foreground font-medium">
          {switchMessage}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="h-1 w-1 rounded-full bg-secondary animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-secondary animate-pulse delay-75" />
          <span className="h-1 w-1 rounded-full bg-secondary animate-pulse delay-150" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-paper-50">
        <div className="h-full w-full bg-gradient-to-r from-primary via-secondary to-primary origin-left animate-pulse" />
      </div>
    </div>
  );
}
`;

fs.writeFileSync(loadingPath, loadingContent, 'utf8');
console.log('Fixed Loading component');

// ============================================================
// FIX 3: Leadership page — Add translations
// ============================================================
const leadershipPath = path.join(__dirname, '..', 'src', 'app', '[locale]', '(frontend)', 'leadership', 'page.tsx');
const leadershipContent = `/**
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
    alternates: { canonical: \`\${BASE_URL}/leadership\` },
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
    return text.length > 140 ? \`\${text.substring(0, 140)}...\` : text
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
    return docs as unknown as LeadershipMember[]
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
      <Link href={\`/leadership/\${member.slug}\`} className="block relative aspect-4/5 overflow-hidden rounded-[2.5rem] bg-paper-50 shadow-sm group-hover:shadow-lg transition-all duration-500 border border-white">
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
        <Link href={\`/leadership/\${member.slug}\`} className="btn btn-outline text-2xs">
          Explore Journey <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  )
}
`;

fs.writeFileSync(leadershipPath, leadershipContent, 'utf8');
console.log('Fixed Leadership page with translations');

// ============================================================
// FIX 4: GlobalImpact — Remove buttons, make cards clickable
// ============================================================
const globalImpactPath = path.join(__dirname, '..', 'src', 'components', 'sections', 'GlobalImpact.tsx');
const globalImpactContent = `/**
 * MSNC GlobalImpact — Clean Linear Layout
 * No 2-column grid. Vertical storytelling.
 */

'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { ArrowUpRight, Target, GraduationCap, Briefcase, HeartHandshake } from 'lucide-react'

const visionChapters = [
  { id: '01', icon: Target, href: '/programs#workshops' },
  { id: '02', icon: GraduationCap, href: '/programs#high-school' },
  { id: '03', icon: Briefcase, href: '/programs#adult-learning' },
  { id: '04', icon: HeartHandshake, href: '/programs#rebuilding-futures' },
] as const

export default function GlobalImpact() {
  const t = useTranslations('GlobalImpact')
  const values = t.raw('values') as string[]

  return (
    <section className="section border-t border-border bg-white" aria-labelledby="vision-heading">
      <div className="container-editorial">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-px w-10 bg-secondary" aria-hidden="true" />
          <span className="section-label text-secondary">{t('sectionLabel')}</span>
          <span className="section-label text-muted-foreground">{t('programAlignment')}</span>
        </div>

        {/* Heading + vision statement */}
        <div className="mb-16 max-w-4xl">
          <h2 id="vision-heading" className="text-4xl md:text-5xl font-display text-primary tracking-tight mb-8">
            {t('heading')}{' '}
            <em className="font-display font-normal not-italic text-secondary">
              {t('headingItalic')}
            </em>
          </h2>
          <div className="rounded-2xl border-l-2 border-secondary bg-paper-50 px-8 py-6">
            <p className="text-lg font-medium leading-snug text-primary mb-0 font-sans">
              {t('visionStatement')}
            </p>
          </div>
        </div>

        {/* Vision chapters — vertical stack, now clickable cards */}
        <div className="flex flex-col space-y-6 mb-16">
          {visionChapters.map((chapter) => {
            const Icon = chapter.icon
            return (
              <Link
                key={chapter.id}
                href={chapter.href}
                className="group bg-paper-50 border border-border p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-secondary hover:shadow-lg transition-all duration-500 cursor-pointer"
              >
                <div className="flex items-start gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary shrink-0">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="section-label text-secondary">{chapter.id}</span>
                      <span className="section-label text-muted-foreground">{t(\`chapters.\${chapter.id}.label\`)}</span>
                    </div>
                    <h3 className="text-2xl font-display text-primary mb-2">
                      {t(\`chapters.\${chapter.id}.title\`)}
                    </h3>
                    <p className="text-muted-foreground font-sans leading-relaxed mb-0">
                      {t(\`chapters.\${chapter.id}.body\`)}
                    </p>
                  </div>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-secondary group-hover:bg-secondary">
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer row */}
        <footer className="flex flex-col items-center justify-between gap-8 md:flex-row border-t border-border pt-8">
          <div className="flex items-center gap-3">
            <span className="section-label text-primary">{t('footerLabel')}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {values.map((value) => (
              <span key={value} className="section-label text-muted-foreground/50">
                {value}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </section>
  )
}
`;

fs.writeFileSync(globalImpactPath, globalImpactContent, 'utf8');
console.log('Fixed GlobalImpact — cards are now clickable, buttons removed');

// ============================================================
// FIX 5: Add Leadership translations to en.json
// ============================================================
const enPath = path.join(__dirname, '..', 'src', 'messages', 'en.json');
const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));

enJson.LeadershipPage = {
  metadata: {
    title: "Leadership & Executive Board | MSNC",
    description: "Meet the architects of resilience. Our multidisciplinary leadership team bridges the gap between Mulenge potential and global opportunity."
  },
  header: {
    label: "Institutional",
    title: "Leadership",
    description: "The MSNC Executive Board is a multidisciplinary collective of scholars and advocates. We do not just lead an organization; we steward a generational promise of academic excellence and community resilience.",
    breadcrumb: "Leadership"
  },
  values: [
    { icon: "Globe", t: "Global Vision", d: "Connecting the Mulenge diaspora with top-tier international academic institutions." },
    { icon: "Scale", t: "Integrity", d: "Transparent stewardship of resources and trust across four strategic pillars." },
    { icon: "Users", t: "Mentorship", d: "A board that is actively involved in guiding individual scholar trajectories." }
  ],
  board: {
    label: "Directory",
    title: "The Board.",
    empty: "Directory is being updated"
  },
  cta: {
    heading: "Partner with",
    headingItalic: "Our Leadership.",
    body: "Are you an institution or academic leader looking to collaborate with our board? We are always open to strategic partnerships that expand our impact.",
    primary: "Inquire for Partnership",
    secondary: "View Organization"
  }
};

fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2), 'utf8');
console.log('Added LeadershipPage translations to en.json');

// ============================================================
// FIX 6: Add Leadership translations to fr.json
// ============================================================
const frPath = path.join(__dirname, '..', 'src', 'messages', 'fr.json');
const frJson = JSON.parse(fs.readFileSync(frPath, 'utf8'));

frJson.LeadershipPage = {
  metadata: {
    title: "Leadership et Conseil Exécutif | MSNC",
    description: "Rencontrez les architectes de la résilience. Notre équipe de leadership multidisciplinaire comble le fossé entre le potentiel Mulenge et l'opportunité mondiale."
  },
  header: {
    label: "Institutionnel",
    title: "Leadership",
    description: "Le Conseil Exécutif du MSNC est un collectif multidisciplinaire de boursiers et de défenseurs. Nous ne dirigeons pas seulement une organisation ; nous gérons une promesse générationnelle d'excellence académique et de résilience communautaire.",
    breadcrumb: "Leadership"
  },
  values: [
    { icon: "Globe", t: "Vision Mondiale", d: "Connecter la diaspora Mulenge avec des institutions académiques internationales de premier plan." },
    { icon: "Scale", t: "Intégrité", d: "Gestion transparente des ressources et de la confiance à travers quatre piliers stratégiques." },
    { icon: "Users", t: "Mentorat", d: "Un conseil activement impliqué dans l'orientation des trajectoires individuelles des boursiers." }
  ],
  board: {
    label: "Annuaire",
    title: "Le Conseil.",
    empty: "L'annuaire est en cours de mise à jour"
  },
  cta: {
    heading: "Partenaire avec",
    headingItalic: "Notre Leadership.",
    body: "Êtes-vous une institution ou un leader académique cherchant à collaborer avec notre conseil ? Nous sommes toujours ouverts aux partenariats stratégiques qui élargissent notre impact.",
    primary: "Demander un Partenariat",
    secondary: "Voir l'Organisation"
  }
};

fs.writeFileSync(frPath, JSON.stringify(frJson, null, 2), 'utf8');
console.log('Added LeadershipPage translations to fr.json');

console.log('\\n=== All remaining fixes applied ===');

