// app/about/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Link } from '@/navigation'
import { useLocale } from 'next-intl'
import { normalizeSiteLocale } from '@/lib/site-copy'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  TrendingUp,
  Shield,
  Users,
  Handshake,
  Star,
  Anchor,
  Quote,
  Compass,
  MapPin,
  GraduationCap,
  BookOpen,
  Wrench,
  History,
  CheckCircle2,
  Plus,
} from 'lucide-react'

/**
 * Mulenge Scholars' Network Canada (MSNC)
 *
 * Two lines quoted from the organization's materials:
 * "Mulenge Scholars' Network Canada (MSNC) is a youth-led organization founded by Banyamulenge students who understand firsthand the challenges of navigating new education systems."
 * "We equip youth with the knowledge, confidence, and resources they need to succeed academically and professionally."
 *
 * This page is a complete, accessible, responsive About page implementation
 * that uses only the organization's provided content and program descriptions.
 */

/* -------------------- Utilities -------------------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (globalThis.window === undefined) return
    const mq = globalThis.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = () => setReduced(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

const baseTransition = { duration: 0.6, ease: easeInOut }

/* -------------------- Small Accessible Subcomponents -------------------- */

const SectionHeader = ({
  label,
  title,
  index,
  id,
}: {
  label: string
  title: string
  index: string
  id?: string
}) => (
  <header
    className="flex items-center justify-between border-b border-slate-200 pb-2 mb-8"
    aria-labelledby={id}
  >
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
        {label}
      </span>
      <span className="h-3 w-px bg-slate-100" />
      <span id={id} className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {title}
      </span>
    </div>
    <span className="text-[9px] font-mono text-slate-400">#About</span>
  </header>
)

const IconDecor = ({ children }: { children: React.ReactNode }) => (
  <span
    aria-hidden="true"
    className="inline-flex items-center justify-center w-8 h-8 text-blue-600"
  >
    {children}
  </span>
)

/* -------------------- Main Component -------------------- */

export default function AboutPage() {
  const reduced = usePrefersReducedMotion()
  const activeLocale = normalizeSiteLocale(useLocale())
  const copy =
    activeLocale === 'fr'
      ? {
          missionBrief: 'Resume de mission',
          joinNetwork: 'Rejoindre le reseau',
          learnMore: 'En savoir plus',
          joinLead: 'Rejoindre',
          joinTail: "l'heritage",
          applyStudent: 'Postuler comme etudiant',
          becomeMentor: 'Devenir mentor',
        }
      : {
          missionBrief: 'Mission Brief',
          joinNetwork: 'Join Network',
          learnMore: 'Learn More',
          joinLead: 'Join the',
          joinTail: 'Legacy',
          applyStudent: 'Apply as Student',
          becomeMentor: 'Become a Mentor',
        }

  const fadeUp = reduced
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: baseTransition }
  const fadeIn = reduced
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { ...baseTransition, delay: 0.12 },
      }

  return (
    <main className="min-h-screen bg-white text-[#002147] selection:bg-blue-100 pb-20 relative overflow-x-hidden">
      {/* Decorative grid background (lower opacity on small screens for legibility) */}
      <div
        className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[40px_40px] opacity-50 pointer-events-none md:opacity-50 sm:opacity-20"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* HERO */}
        <section className="pt-20 md:pt-28 pb-10 lg:pb-16" aria-labelledby="hero-heading">
          <SectionHeader label="Identity" title="About MSNC" index="1" id="about-msnc" />

          <div className="relative grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <AnimatePresence>
                <motion.h1
                  {...fadeUp}
                  id="hero-heading"
                  className="font-black tracking-tight leading-[0.9] text-[#002147] wrap-break-word"
                  style={{ fontSize: 'clamp(2rem, 6vw, 4.25rem)' }}
                >
                  <span className="block">Equity</span>
                  <span className="block text-slate-700 font-serif italic font-light md:inline md:ml-3">
                    Through
                  </span>
                  <span className="block">Excellence</span>
                </motion.h1>
              </AnimatePresence>

              <motion.div
                {...fadeIn}
                className="mt-6 md:mt-10 border-l-4 border-blue-600 pl-5 md:pl-8 max-w-3xl"
              >
                <p className="text-lg md:text-xl text-slate-700 font-medium leading-tight">
                  Mulenge Scholars&apos; Network Canada (MSNC) is a youth-led organization founded
                  by Banyamulenge students who understand firsthand the challenges of navigating new
                  education systems.
                </p>
                <p className="mt-4 text-slate-600">
                  We equip youth with the knowledge, confidence, and resources they need to succeed
                  academically and professionally.
                </p>
              </motion.div>
            </div>

            {/* Mission Card */}
            <motion.aside
              {...(reduced
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.98 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { ...baseTransition, delay: 0.18 },
                  })}
              className="lg:col-span-4 lg:mt-6 bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm relative group"
              aria-labelledby="mission-title"
              role="region"
            >
              <h3
                id="mission-title"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-3"
              >
                {copy.missionBrief}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mb-6">
                Empowering youth across Canada through mentorship, academic guidance, and leadership
                development while fostering community and belonging.
              </p>

              <Link
                href="/join"
                className="inline-flex items-center justify-center w-full h-12 px-4 bg-primary-500 text-white rounded-full text-[12px] font-black uppercase tracking-widest hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 transition"
                aria-label="Join MSNC — open application page"
              >
                <span className="mr-3">{copy.joinNetwork}</span>
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </motion.aside>
          </div>
        </section>

        {/* HERITAGE & ORIGINS */}
        <section
          className="py-10 md:py-16 border-t border-slate-100"
          aria-labelledby="heritage-heading"
        >
          <SectionHeader label="Origins" title="Heritage Context" index="2" id="heritage-heading" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <article className="space-y-4">
              <div className="flex items-center gap-3">
                <IconDecor>
                  <History className="w-5 h-5" />
                </IconDecor>
                <h3 className="text-xl font-black uppercase tracking-tight">The Highlands</h3>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                The Banyamulenge, also known as the Mulenge people, originate from the highlands of
                eastern Democratic Republic of Congo. Their history of migration and displacement
                has shaped a resilient and diverse global community now growing in Canada.
              </p>
            </article>

            <article className="space-y-4">
              <div className="flex items-center gap-3">
                <IconDecor>
                  <Globe className="w-5 h-5" />
                </IconDecor>
                <h3 className="text-xl font-black uppercase tracking-tight">Global Resilience</h3>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                Cycles of displacement and migration have transformed community experience into a
                catalyst for excellence and adaptation in new education systems.
              </p>
            </article>

            <aside className="md:col-span-2 lg:col-span-1 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Quote className="w-8 h-8 text-blue-200 mb-3" aria-hidden="true" />
              <p className="text-lg font-serif italic text-slate-700 leading-snug">
                &quot;We rebuild excellence in every new terrain we navigate.&quot;
              </p>
            </aside>
          </div>
        </section>

        {/* THE INTERVENTION */}
        <section className="py-10 md:py-16" aria-labelledby="bridge-heading">
          <SectionHeader
            label="Analysis"
            title="The Academic Bridge"
            index="3"
            id="bridge-heading"
          />
          <div className="grid lg:grid-cols-2 gap-8">
            <article className="bg-white border p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <Compass className="w-6 h-6 text-red-600" aria-hidden="true" />
                <h3 className="text-2xl font-black uppercase tracking-tight">The Barrier</h3>
              </div>
              <ul className="space-y-4 list-none">
                <li className="flex gap-4">
                  <span className="text-red-600 font-black">01</span>
                  <p className="text-slate-700 font-semibold">
                    Guidance deficiency on academic pathways.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-black">02</span>
                  <p className="text-slate-700 font-semibold">
                    Struggles with post-secondary transition.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-black">03</span>
                  <p className="text-slate-700 font-semibold">
                    Financial pressure pushing youth toward short-term jobs instead of long-term
                    careers.
                  </p>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-black">04</span>
                  <p className="text-slate-700 font-semibold">
                    Families unfamiliar with the Canadian system may be unable to provide support.
                  </p>
                </li>
              </ul>
            </article>

            <article className="bg-blue-50/60 border p-6 md:p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" aria-hidden="true" />
                <h3 className="text-2xl font-black uppercase tracking-tight">The Bridge</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Mentorship',
                  'Academic guidance and tutoring',
                  'Post-secondary application support',
                  'Career and leadership development',
                ].map((v) => (
                  <button
                    key={v}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white border border-blue-100 hover:border-blue-600 focus-visible:ring-4 focus-visible:ring-blue-200 transition"
                    aria-label={`${v} — learn more`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <span className="text-sm font-black uppercase tracking-widest text-left">
                      {v}
                    </span>
                    <Plus className="ml-auto w-4 h-4 text-slate-300" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* PROGRAMS */}
        <section
          className="py-10 md:py-16 border-t border-slate-100"
          aria-labelledby="programs-heading"
        >
          <SectionHeader label="Action" title="Our Programs" index="4" id="programs-heading" />
          <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Workshops',
                desc: 'Interactive virtual and in-person sessions on academic success, career development, and student life.',
              },
              {
                icon: GraduationCap,
                title: 'High School Support',
                desc: 'Targeted support for Grades 11–12: tutoring, course selection, and application assistance.',
              },
              {
                icon: BookOpen,
                title: 'Adult Learning',
                desc: 'Support for adult learners: prerequisite guidance, enrollment support, and career pathways.',
              },
              {
                icon: Wrench,
                title: 'Rebuilding Futures',
                desc: 'Vocational training for Banyamulenge youth in refugee camps: construction, electrical, plumbing, mechanics, heavy equipment, IT.',
              },
            ].map((p, i) => {
              const Icon = p.icon
              return (
                <li key={i}>
                  <article
                    className="bg-white border p-6 rounded-xl hover:border-blue-600 transition focus-visible:ring-4 focus-visible:ring-blue-200 h-full flex flex-col"
                    aria-labelledby={`program-${i}-title`}
                  >
                    <div className="mb-4">
                      <p className="sr-only">{p.title} icon</p>
                      <Icon className="w-8 h-8 text-blue-600" aria-hidden="true" />
                    </div>
                    <h4 id={`program-${i}-title`} className="text-lg font-black uppercase mb-2">
                      {p.title}
                    </h4>
                    <p className="text-sm text-slate-600 font-semibold flex-1">{p.desc}</p>
                    <Link
                      href="/programs"
                      className="mt-6 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600"
                    >
                      {copy.learnMore}
                    </Link>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>

        {/* CORE VALUES */}
        <section className="py-10 md:py-16" aria-labelledby="values-heading">
          <SectionHeader label="Principles" title="Core Values" index="5" id="values-heading" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-100 border border-slate-100 overflow-hidden rounded-2xl shadow-sm">
            {[
              { l: 'Empowerment', i: TrendingUp },
              { l: 'Community', i: Users },
              { l: 'Integrity', i: Shield },
              { l: 'Collaboration', i: Handshake },
              { l: 'Excellence', i: Star },
              { l: 'Resilience', i: Anchor },
            ].map((v, i) => {
              const Icon = v.i
              return (
                <div key={i} className="bg-white p-6 flex flex-col items-center text-center">
                  <Icon className="w-5 h-5 text-blue-600 mb-4" aria-hidden="true" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">{v.l}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16" aria-labelledby="cta-heading">
          <div className="bg-slate-50 border rounded-2xl p-8 md:p-12 text-center">
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              {copy.joinLead}{' '}
              <span className="font-serif italic font-light text-slate-400">{copy.joinTail}</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link
                href="/join?role=student"
                className="h-12 px-8 bg-primary-500 text-white rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-blue-700 focus-visible:ring-4 focus-visible:ring-blue-200 w-full md:w-auto"
                aria-label="Apply as student"
              >
                {copy.applyStudent} <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>

              <Link
                href="/join?role=volunteer"
                className="h-12 px-8 border-2 border-[#002147] text-[#002147] rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-primary-500 hover:text-white focus-visible:ring-4 focus-visible:ring-blue-200 w-full md:w-auto"
                aria-label="Become a mentor"
              >
                {copy.becomeMentor} <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          className="mt-10 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 pt-8 gap-6"
          role="contentinfo"
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" aria-hidden="true" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              MSNC 2026
            </span>
          </div>
          <div className="flex gap-6">
            {['Equity', 'Excellence', 'Community'].map((v) => (
              <span
                key={v}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400"
              >
                {v}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  )
}
