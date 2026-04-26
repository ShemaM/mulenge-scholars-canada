/**
 * MSNC Programs Orchestrator - The "Academic Thesis" Layout
 * Architecture: Swiss Editorial, Sticky TOC Wayfinding, Asymmetric Grid
 * Content: 100% Exact Content Dictionary (All 4 Pillars)
 */

import { Metadata, Viewport } from 'next'
import { Link } from '@/navigation'
import { Users, GraduationCap, BookOpen, Wrench, ArrowRight, ArrowDownRight } from 'lucide-react'
import { normalizeSiteLocale } from '@/lib/site-copy'

export const metadata: Metadata = {
  title: "Programs & Impact | Mulenge Scholars' Network Canada",
  description:
    'Targeted support systems for high school students, adult learners, and global refugee initiatives.',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

const FOCUS_BASE =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-blue-600'

// ─── EXACT DICTIONARY DATA ────────────────────────────────────────────────
const STRATEGIC_PILLARS = [
  {
    id: 'workshops',
    num: '01',
    icon: Users,
    title: 'Workshops & Community Engagement',
    description: 'We organize interactive workshops both virtual and in-person focused on:',
    bullets: ['Academic success', 'Career development', 'Student life'],
    footer:
      'These sessions create safe and engaging spaces where youth can learn, connect, and grow.',
    link: '/programs/workshops',
  },
  {
    id: 'high-school',
    num: '02',
    icon: GraduationCap,
    title: 'High School Support (Grades 11-12)',
    description:
      'We provide targeted support to help students transition successfully into post-secondary education:',
    bullets: [
      'Tutoring and mentorship',
      'Course selection guidance',
      'Post-secondary planning',
      'College and university application support',
      'Access to leadership and volunteer opportunities',
    ],
    link: '/programs/high-school',
  },
  {
    id: 'adult-learning',
    num: '03',
    icon: BookOpen,
    title: 'Adult Learning & Career Pathways',
    description:
      'We support adult learners who want to upgrade their education or explore new career opportunities:',
    bullets: [
      'Guidance on prerequisite courses',
      'Support with enrolling in adult education programs',
      'Information on skilled trades and alternative career paths',
      'Personalized mentorship and academic planning',
    ],
    link: '/programs/adult-learning',
  },
  {
    id: 'rebuilding-futures',
    num: '04',
    icon: Wrench,
    title: 'Rebuilding Futures Initiative',
    description:
      'We are committed to expanding our impact globally by supporting Banyamulenge youth living in refugee camps, particularly in Kenya, Uganda, and Burundi. This initiative focuses on vocational training in high demand fields such as:',
    bullets: [
      'Construction',
      'Electrical work',
      'Plumbing',
      'Mechanics',
      'Heavy equipment operation',
      'Information technology',
    ],
    footer:
      'Our goal is to equip youth with practical, employable skills that promote self-reliance and long-term stability.',
    link: '/impact/rebuilding-futures',
  },
]

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const copy =
    activeLocale === 'fr'
      ? {
          strategicInterventions: 'Interventions strategiques',
          pillarsOfSupport: 'Piliers de soutien',
          programIndex: 'Index des programmes',
          ourStrategic: 'Nos programmes strategiques.',
          directory: 'Repertoire',
          chapter: 'CHAPITRE',
          learnMore: 'En savoir plus',
        }
      : {
          strategicInterventions: 'Strategic Interventions',
          pillarsOfSupport: 'Pillars of Support',
          programIndex: 'Program Index',
          ourStrategic: 'Our Strategic Programs.',
          directory: 'Directory',
          chapter: 'CHAPTER',
          learnMore: 'Learn More',
        }
  return (
    <div className="min-h-screen bg-white selection:bg-slate-900 selection:text-white pb-32">
      {/* ─── EDITORIAL HERO SECTION ─── */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-[#FAFAFA] border-b border-slate-200">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end justify-between border-b-[3px] border-slate-900 pb-6 mb-12 lg:mb-16 gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">
                {copy.strategicInterventions}
              </span>
              <span className="text-sm font-serif italic text-slate-900">{copy.pillarsOfSupport}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-600">
              <span className="w-8 h-px bg-blue-600" aria-hidden />
              {copy.programIndex}
            </div>
          </header>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-[clamp(3.5rem,7vw,7rem)] font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
                Our Strategic <br />
                <span className="font-serif italic font-light text-slate-500 normal-case tracking-normal">
                  {copy.ourStrategic}
                </span>
              </h1>
            </div>
            <div className="lg:col-span-4 pb-3">
              <p className="text-xl text-slate-600 font-medium leading-relaxed border-l-4 border-blue-600 pl-6">
                We equip youth with the knowledge, confidence, and resources they need to succeed
                academically and professionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE THESIS BODY (Sticky Nav + Content Flow) ─── */}
      <section className="pt-24 md:pt-32">
        <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* LEFT: Sticky Editorial Table of Contents */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 hidden md:block">
              <div className="pr-8">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 border-b border-slate-200 pb-4 mb-8">
                  {copy.directory}
                </h2>
                <nav className="flex flex-col" aria-label="Program quick links">
                  {STRATEGIC_PILLARS.map((p) => (
                    <a
                      key={p.id}
                      href={`#${p.id}`}
                      className={`group flex items-center gap-6 py-5 border-b border-slate-100 last:border-0 transition-all duration-300 ${FOCUS_BASE}`}
                    >
                      <span className="text-[10px] font-mono font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
                        {p.num}
                      </span>
                      <span className="text-lg font-bold text-slate-600 group-hover:text-slate-900 group-hover:translate-x-1 transition-all duration-300 flex-grow">
                        {p.title}
                      </span>
                      <ArrowDownRight className="w-4 h-4 text-slate-200 group-hover:text-blue-600 transition-colors" />
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* RIGHT: Flowing Program Articles */}
            <main className="lg:col-span-8 space-y-32">
              {STRATEGIC_PILLARS.map((pillar) => (
                <article key={pillar.id} id={pillar.id} className="group relative scroll-mt-32">
                  {/* Article Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 border-b-[3px] border-slate-900 pb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors duration-500">
                      <pillar.icon
                        className="w-8 h-8 text-slate-400 group-hover:text-blue-600 transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-blue-600 block mb-2">
                        {copy.chapter} {pillar.num}
                      </span>
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-none">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  {/* Article Body */}
                  <div className="pl-0 sm:pl-22">
                    <p className="text-xl md:text-2xl text-slate-800 font-medium leading-[1.6] mb-10">
                      {pillar.description}
                    </p>

                    <ul className="space-y-4 mb-12 border-l-2 border-slate-100 pl-6 md:pl-8 ml-2">
                      {pillar.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 text-lg text-slate-600 font-medium"
                        >
                          <span className="text-blue-600 font-serif italic font-bold mt-0.5">
                            ›
                          </span>
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {pillar.footer && (
                      <div className="mb-12 p-8 bg-slate-50 border border-slate-200 rounded-tr-3xl rounded-bl-3xl">
                        <p className="text-lg text-slate-700 font-serif italic leading-relaxed">
                          "{pillar.footer}"
                        </p>
                      </div>
                    )}

                    {/* Article Action */}
                    <div className="pt-8 border-t border-slate-100">
                      <Link
                        href={pillar.link}
                        className={`inline-flex items-center gap-4 group/btn ${FOCUS_BASE}`}
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center group-hover/btn:bg-blue-600 transition-colors duration-500">
                          <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 group-hover/btn:text-blue-600 transition-colors duration-500">
                          {copy.learnMore}
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
