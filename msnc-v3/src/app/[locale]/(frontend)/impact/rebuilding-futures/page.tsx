import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/payload'
import { Link } from '@/navigation'
import {
  Target, Eye, Layers, ArrowRight, Quote,
  Users, GraduationCap, BookOpen, Globe, ArrowUpRight,
} from 'lucide-react'
import { normalizeSiteLocale } from '@/lib/site-copy'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  return {
    title:       'Impact Framework | MSNC',
    description: 'Measuring our Mission and Vision through the verified results of our four strategic pillars.',
  }
}

export const dynamic = 'force-dynamic'

// ─── Static data ──────────────────────────────────────────────────────────────

const pillars = [
  {
    id: '01', icon: Users, title: 'Workshops & Community',
    metric: '450+', label: 'Youth Engaged',
    desc: 'Scholars participating in academic, career, and well-being sessions.',
    alignment: 'Mission: Safe, culturally grounded spaces.',
  },
  {
    id: '02', icon: GraduationCap, title: 'High School Support',
    metric: '88%', label: 'Placement Rate',
    desc: 'Grade 11–12 scholars successfully transitioned to higher education.',
    alignment: 'Vision: Successful academic journeys.',
  },
  {
    id: '03', icon: BookOpen, title: 'Adult Learning Pathways',
    metric: '120+', label: 'Career Transitions',
    desc: 'Adult learners guided through prerequisites and skilled trades.',
    alignment: 'Vision: Meaningful, sustainable careers.',
  },
  {
    id: '04', icon: Globe, title: 'Rebuilding Futures',
    metric: '3', label: 'Global Hubs',
    desc: 'Vocational training deployed in Kenya, Uganda, and Burundi.',
    alignment: 'Mission: Promoting global self-reliance.',
  },
]

const visionItems = [
  'Confident in their abilities.',
  'Successful in their academic journeys.',
  'Established in meaningful and sustainable careers.',
  'Leaders who give back to their communities.',
]

const fallbackTestimonials = [
  {
    pillar: 'Workshops & Community',
    quote: 'The workshops gave me not just skills, but a community that understands my journey as a Banyamulenge youth.',
    author: 'Grace Nyazuba',
    location: 'Toronto Hub',
  },
  {
    pillar: 'High School Support',
    quote: 'Course selection guidance changed my trajectory. My mentor caught a missing engineering prerequisite before it was too late.',
    author: 'David Byamungu',
    location: 'Edmonton Hub',
  },
  {
    pillar: 'Adult Learning Pathways',
    quote: 'Adult pathways opened skilled trades I never thought possible. Now I have a sustainable career path.',
    author: 'Solange Umutesi',
    location: 'Career Transition',
  },
  {
    pillar: 'Rebuilding Futures',
    quote: 'Vocational skills travel with me across borders. Wherever resettlement takes me, this trade gives me leverage.',
    author: 'Gilbert Bukuru',
    location: 'Uganda Camp',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale }     = await params
  const activeLocale   = normalizeSiteLocale(locale)

  const rawTestimonials = await getTestimonials(6, activeLocale).catch(() => [])
  const testimonials = rawTestimonials.length > 0
    ? rawTestimonials.slice(0, 4).map((t: any) => ({
        pillar:   t.role ? `${t.role}` : 'Featured Voice',
        quote:    t.quote,
        author:   t.name,
        location: t.role || 'MSNC Network',
      }))
    : fallbackTestimonials

  const newLocal = "space-y-6 lg:col-span-8"
  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-paper-50 pb-20 pt-32 md:pb-28 md:pt-40">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none tracking-tighter text-foreground/3"
          style={{ fontSize: 'clamp(6rem, 20vw, 18rem)' }}
          aria-hidden="true"
        >
          IMPACT
        </div>

        <div className="container-editorial relative z-10">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <Layers className="h-4 w-4 text-secondary" strokeWidth={2} />
                <span className="section-label text-secondary">The MSNC Framework</span>
              </div>
              <h1 className="mb-0">
                Results by{' '}
                <em className="font-display font-normal not-italic text-primary/40">
                  Design.
                </em>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="mb-0 border-l-2 border-secondary pl-6 text-lg font-medium leading-relaxed text-foreground/65">
                We measure the strict execution of our Mission and Vision across four strategic pillars — not generic aid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────────────── */}
      <section className="section border-b border-border bg-background">
        <div className="container-editorial">
          <div className="grid items-start gap-12 lg:grid-cols-2">

            {/* Mission */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Target className="h-5 w-5 text-secondary" strokeWidth={2} />
                <span className="section-label text-primary">The Mission</span>
              </div>
              <div className="rounded-2xl border border-border bg-paper-50 p-8">
                <p className="mb-0 font-display text-2xl italic leading-relaxed text-primary md:text-3xl">
                  To equip Banyamulenge youth with the knowledge, confidence, and resources they need to succeed academically and professionally.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Eye className="h-5 w-5 text-primary" strokeWidth={2} />
                <span className="section-label text-primary">The Vision</span>
              </div>
              <ul className="space-y-3">
                {visionItems.map((item, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-5 rounded-xl border border-border p-5 transition-colors duration-200 hover:bg-paper-50"
                  >
                    <span className="font-display text-xl italic text-muted-foreground/50 transition-colors group-hover:text-secondary">
                      0{i + 1}
                    </span>
                    <span className="text-base font-medium leading-snug text-foreground/75 transition-colors group-hover:text-primary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Program verification ─────────────────────────────────────────────── */}
      <section className="section bg-paper-50">
        <div className="container-editorial">

          <div className="mb-12 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="mb-0">Program Verification.</h2>
            </div>
            <div className="lg:col-span-5">
              <p className="mb-0 text-base italic leading-relaxed text-muted-foreground">
                Tracking measurable outcomes across all active modules.
              </p>
            </div>
          </div>

<div className="grid gap-12 md:gap-16 md:grid-cols-2 lg:gap-20 lg:grid-cols-2 xl:grid-cols-4"
            >
              {pillars.map((pillar) => (
              <article
                key={pillar.id}
                className="group flex flex-col rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:border-secondary hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Header row */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="section-label text-muted-foreground">
                    Pillar {pillar.id}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 transition-colors group-hover:bg-secondary">
                    <pillar.icon className="h-5 w-5 text-secondary transition-colors group-hover:text-white" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="mb-6 text-lg">{pillar.title}</h3>

                {/* Metric */}
                <div className="mt-auto">
                  <p className="mb-2 font-display text-5xl italic text-primary tracking-tight">
                    {pillar.metric}
                  </p>
                  <div className="mb-4 h-px w-10 bg-border transition-all duration-500 group-hover:w-full group-hover:bg-secondary" />
                  <span className="section-label text-primary block mb-2">{pillar.label}</span>
                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    {pillar.desc}
                  </p>
                  <div className="flex items-start gap-2 border-t border-border pt-4">
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                    <span className="section-label">{pillar.alignment}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="section border-y border-border bg-background">
        <div className="container-editorial">
          <div className="grid items-start gap-14 lg:grid-cols-12">

            {/* Sticky label column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="mb-6">
                Qualitative{' '}
                <em className="font-display font-normal not-italic text-primary/40">
                  Outcomes.
                </em>
              </h2>
              <p className="mb-0 border-l-2 border-border pl-5 text-base italic leading-relaxed text-muted-foreground">
                Direct validation from scholars experiencing the transition.
              </p>
            </div>

            {/* Quote cards */}
            <div className={newLocal}>
              {testimonials.map((item: any, i: number) => (
                <article
                  key={i}
                  className="group rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:border-secondary md:p-10"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary/40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
                    </span>
                    <span className="section-label transition-colors group-hover:text-primary">
                      {item.pillar}
                    </span>
                  </div>

                  <Quote className="mb-4 h-6 w-6 text-border" strokeWidth={1.5} />

                  <p className="mb-8 text-xl font-medium leading-relaxed tracking-tight text-primary md:text-2xl">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-6">
                    <div>
                      <span className="block text-xs font-black uppercase tracking-widest text-primary">
                        {item.author}
                      </span>
                      <span className="section-label mt-0.5">{item.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container-editorial">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-12 md:p-20">
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-secondary/20 blur-[100px]"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <span className="section-label mb-4 block text-white/50">
                  Invest in the Framework
                </span>
                <h2 className="text-white mb-3">
                  Support the{' '}
                  <em className="font-display font-normal not-italic text-white/40">
                    Mission.
                  </em>
                </h2>
                <p className="mb-0 text-base font-medium italic leading-relaxed text-white/65">
                  Your investment fuels the pillars that turn our vision of self-reliance into verifiable reality.
                </p>
              </div>
              <Link href="/donate" className="btn shrink-0 bg-white text-primary hover:bg-white/90 w-full lg:w-auto">
                Make a Contribution
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}