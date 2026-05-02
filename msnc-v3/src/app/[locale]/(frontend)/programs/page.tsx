import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPrograms } from '@/lib/payload'
import { ArrowRight, GraduationCap, Users, Briefcase, HeartHandshake } from 'lucide-react'
import { Link } from '@/navigation'
import { SITE_NAME, SITE_URL } from '@/lib/site'
import PageHeader from '@/components/ui/PageHeader'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import Container from '@/components/ui/Container'

// ✅ FORCE DYNAMIC RENDERING
// This ensures fresh program data is always fetched from the database
export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ProgramsPage.metadata' })

  return {
    title: `${t('title')} | ${SITE_NAME}`,
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/programs`,
    },
    openGraph: {
      title: `${t('title')} | ${SITE_NAME}`,
      description: t('description'),
      url: `${SITE_URL}/${locale}/programs`,
      siteName: SITE_NAME,
      locale: locale,
      type: 'website',
    },
  }
}

interface ProgramItem {
  id: string | number
  index?: string
  pillar: 'workshops' | 'high-school' | 'adult-learning' | 'rebuilding-futures'
  title: string
  description?: string
  slug?: string
  color?: 'sky' | 'navy' | 'slate' | 'red'
  tagline?: string
}

const PILLAR_CONFIG = {
  'workshops': {
    icon: Users,
    accentColor: 'var(--color-sky)',
    href: '/programs/workshops-community',
  },
  'high-school': {
    icon: GraduationCap,
    accentColor: 'var(--color-navy)',
    href: '/programs/high-school-support',
  },
  'adult-learning': {
    icon: Briefcase,
    accentColor: '#0f766e',
    href: '/programs/adult-learning-pathways',
  },
  'rebuilding-futures': {
    icon: HeartHandshake,
    accentColor: 'var(--color-maple)',
    href: '/programs/rebuilding-futures',
  },
} as const

const FALLBACK_PROGRAMS: ProgramItem[] = [
  {
    id: 'workshops',
    pillar: 'workshops',
    index: '01',
    title: 'Workshops & Community Engagement',
    tagline: 'Community Engagement',
    description: 'Interactive sessions — virtual and in-person — focused on academic success, career development, and student life.',
  },
  {
    id: 'high-school',
    pillar: 'high-school',
    index: '02',
    title: 'High School Support',
    tagline: 'Grades 11–12',
    description: 'Targeted mentorship to help students in Grades 11 and 12 transition successfully into post-secondary education.',
  },
  {
    id: 'adult-learning',
    pillar: 'adult-learning',
    index: '03',
    title: 'Adult Learning & Career Pathways',
    tagline: 'Career Transitions',
    description: 'Support for adult learners who want to upgrade their education or explore new career opportunities.',
  },
  {
    id: 'rebuilding-futures',
    pillar: 'rebuilding-futures',
    index: '04',
    title: 'Rebuilding Futures Initiative',
    tagline: 'Global Impact',
    description: 'Vocational training in high-demand fields for youth in refugee camps — construction, electrical, IT, and more.',
  },
]

export default async function Programs({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'ProgramsPage' })
  
  let data: ProgramItem[] = []

try {
    // 1. Fetch programs from the CMS collection
    const result = await getPrograms(locale)
    data = Array.isArray(result) && result.length > 0
      ? (result as ProgramItem[])
      : FALLBACK_PROGRAMS
  } catch {
    data = FALLBACK_PROGRAMS
  }

  // 2. If CMS is empty and we use the fallback array, translate its contents
  if (data === FALLBACK_PROGRAMS) {
    try {
      const td = await getTranslations({ locale, namespace: 'ProgramDetails' })
      data = FALLBACK_PROGRAMS.map(prog => ({
        ...prog,
        title: td(`${prog.pillar}.title` as any) || prog.title,
        description: td(`${prog.pillar}.intro` as any) || prog.description,
        tagline: locale === 'fr' ? (
          prog.pillar === 'workshops' ? 'Engagement Communautaire' :
          prog.pillar === 'high-school' ? '11e–12e année' :
          prog.pillar === 'adult-learning' ? 'Transitions de Carrière' :
          prog.pillar === 'rebuilding-futures' ? 'Impact Mondial' : prog.tagline
        ) : prog.tagline,
      }))
    } catch (e) {
      // Proceed with default English if translation namespace is not found
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Breadcrumb auto />

      <PageHeader
        label={t('header.label')}
        title={t('header.title')}
        description={t('header.description')}
      />

      <section className="section py-24 bg-paper-50 border-t border-border">
        <Container className="container-editorial">
          
          <div className="mb-16 flex items-center gap-4">
            <div className="h-px w-10 bg-secondary" />
            <span className="section-label text-secondary">{t('sectionTitle')}</span>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {data.map((program, i) => {
              const pillarKey = (program.pillar ?? '').toLowerCase().trim() as ProgramItem['pillar']
              const config = PILLAR_CONFIG[pillarKey] ?? PILLAR_CONFIG['workshops']
              const Icon = config.icon
              const href = program.slug ? `/programs/${program.slug}` : config.href
              const indexNumber = program.index ?? String(i + 1).padStart(2, '0')

              return (
                <article
                  key={program.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-[2.5rem] border border-border bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-secondary hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 group-hover:bg-secondary group-hover:text-white"
                        style={{ backgroundColor: `${config.accentColor}15`, color: config.accentColor }}
                      >
                        <Icon className="h-7 w-7" strokeWidth={2} />
                      </div>
                      <span className="font-display text-4xl text-muted-foreground/20 group-hover:text-secondary/30 transition-colors">
                        {indexNumber}
                      </span>
                    </div>

                    {program.tagline && (
                      <span className="block text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                        {program.tagline}
                      </span>
                    )}

                    <h3 className="mb-4 text-3xl font-display text-primary transition-colors duration-300 group-hover:text-secondary">
                      {program.title}
                    </h3>

                    {program.description && (
                      <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                        {program.description}
                      </p>
                    )}
                  </div>

                  <div>
                    {/* HCI: Descriptive CTAs rather than generic "Learn More" */}
                    <Link 
                      href={href} 
                      aria-label={`${t('explorePrefix')} ${program.title}`}
                      className="btn btn-outline w-full h-14 text-lg justify-between px-6 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all"
                    >
                      <span>{t('explorePrefix')} {program.title.split('&')[0].trim()}</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

        </Container>
      </section>
    </main>
  )
}