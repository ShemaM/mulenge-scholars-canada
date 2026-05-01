import { Metadata } from 'next'
import { Link } from '@/navigation'
import {
  BookOpen, ArrowRight,
  Map, GraduationCap, Briefcase, Compass, Quote, Users, TrendingUp, Award,
} from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { ProgramContextSection } from '@/components/sections/ProgramContextSection'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SITE_NAME, SITE_URL } from '@/lib/site'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AdultLearningPage.metadata' })
  
  return { 
    title: `${t('title')} | ${SITE_NAME}`, 
    description: t('description'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/programs/adult-learning-pathways`,
    },
    openGraph: {
      title: `${t('title')} | ${SITE_NAME}`,
      description: t('description'),
      url: `${SITE_URL}/${locale}/programs/adult-learning-pathways`,
      siteName: SITE_NAME,
      locale: locale,
      type: 'website',
    },
  }
}

const modules = [
  { icon: Map, bgClass: 'bg-secondary/10', iconClass: 'text-secondary', key: 'prerequisites' },
  { icon: GraduationCap, bgClass: 'bg-paper-50 border border-border', iconClass: 'text-primary', key: 'adultEd' },
  { icon: Briefcase, bgClass: 'bg-paper-50 border border-border', iconClass: 'text-primary', key: 'trades' },
  { icon: Compass, bgClass: 'bg-secondary/10', iconClass: 'text-secondary', key: 'planning' },
] as const

export default async function AdultLearningPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'AdultLearningPage' })

  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero (Primary Proof of Impact) ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-paper-50 pb-20 pt-32 md:pt-40 border-b border-border">
        {/* Editorial Watermark */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[30vw] font-display text-primary/5 leading-none tracking-tighter"
          aria-hidden="true"
        >
          03
        </div>

        <div className="container-editorial relative z-10">
          <div className="mb-12">
            <Breadcrumb auto />
          </div>

          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[2px] bg-secondary" aria-hidden="true" />
              <span className="font-bold text-2xs uppercase tracking-widest text-secondary">
                {t('hero.label')} — {t('hero.sublabel')}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-primary leading-none tracking-tighter">
              {t('hero.titleLead')}{' '}
              <em className="font-display font-normal not-italic text-secondary">
                {t('hero.titleItalic')}
              </em>
            </h1>

            <div className="border-l-4 border-secondary pl-6 md:pl-8 max-w-2xl mt-8">
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed mb-0">
                {t('hero.description')}
              </p>
            </div>

            {/* Stat Strip: Strategic Impact Proof */}
            <div className="flex flex-wrap gap-10 border-t border-border pt-10 mt-12">
              {[
                { icon: Users, value: '120+', label: 'Career Transitions' },
                { icon: TrendingUp, value: '88%', label: 'Placement Rate' },
                { icon: Award, value: '4', label: 'Learning Modules' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                    <Icon className="h-5 w-5 text-secondary" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-display text-3xl text-primary leading-none mb-1">{value}</p>
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Chapter I: Context (Narrative Thesis Focus) ────────────────────── */}
      <ProgramContextSection
        chapterNumber="01"
        label={t('chapter1.label')}
        dropcap={t('chapter1.dropcap')}
        paragraph1={t('chapter1.paragraph1')}
        paragraph2={t('chapter1.paragraph2')}
        // Stats array passed as empty to remove redundancy and keep focus on narrative
        stats={[]}
      />

      {/* ── Chapter II: Methodology ────────────────────────────────────────── */}
      <section className="section border-y border-border bg-white py-24">
        <div className="container-editorial">

          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display tracking-tighter text-primary">
              {t('chapter2.titleLead')}{' '}
              <em className="font-display font-normal not-italic text-secondary">
                {t('chapter2.titleBreak')}
              </em>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {modules.map((mod, i) => {
              const Icon = mod.icon
              return (
                <article
                  key={mod.key}
                  className="group flex flex-col rounded-[2rem] border border-border bg-paper-50 p-10 transition-all duration-500 hover:border-secondary hover:bg-white hover:shadow-xl"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${mod.bgClass}`}>
                      <Icon className={`h-6 w-6 ${mod.iconClass}`} strokeWidth={2} />
                    </div>
                    <span className="font-display text-4xl text-muted-foreground/20 group-hover:text-secondary/30 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display text-primary mb-4 group-hover:text-secondary transition-colors">
                    {t(`chapter2.modules.${mod.key}.title`)}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {t(`chapter2.modules.${mod.key}.description`)}
                  </p>
                </article>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── Chapter III: Pull quote ────────────────────────────────────────── */}
      <section className="section bg-paper-50 py-32">
        <div className="container-editorial">
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto mb-10 h-12 w-12 rotate-180 text-secondary" strokeWidth={1.5} />
            <h2 className="mb-12 text-3xl md:text-5xl font-serif italic text-primary leading-relaxed">
              "{t('chapter3.quote')}"
            </h2>
            <div className="mx-auto mb-6 h-[2px] w-16 bg-secondary" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {t('chapter3.objective')}
            </span>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="section-sm bg-white border-t border-border py-24">
        <div className="container-editorial">
          <div className="bg-paper-50 border border-border rounded-[3rem] p-12 md:p-20">

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-10 bg-secondary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-secondary">
                    {t('hero.label')}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display tracking-tighter text-primary">
                  {t('cta.titleLead')}{' '}
                  <em className="font-display font-normal not-italic text-secondary">
                    {t('cta.titleBreak')}
                  </em>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('cta.description')}
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:items-end">
                <Link href="/join?role=scholar" className="btn btn-primary h-16 px-10 w-full lg:w-auto text-lg group">
                  {t('cta.primary')}
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="btn btn-outline h-16 px-10 w-full lg:w-auto text-lg"
                >
                  {t('cta.secondary')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}