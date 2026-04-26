'use client'

import { useActionState, useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import {
  ArrowRight, Loader2, Mail, Plus, Minus,
  BookOpen, X, Send, Clock, MessageSquare, Instagram
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { submitContactForm } from '@/actions/contact'

// ─── Types ────────────────────────────────────────────────────────────────────

type FaqItem = {
  q: string
  a: string
  programs?: string[]
}

type InquiryOption = {
  value: string
  label: string
  placeholder: string
}

type InquiryGroup = {
  groupLabel: string
  options: InquiryOption[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DEFAULT_INQUIRY_GROUPS: InquiryGroup[] = [
  {
    groupLabel: 'Programs',
    options: [
      {
        value: 'high-school-support',
        label: 'High School Support',
        placeholder:
          "Tell us about the student — what grade are they in, what school do they attend, and what kind of support are they looking for? The more you share, the better we can help.",
      },
      {
        value: 'adult-learning-pathways',
        label: 'Adult Learning Pathways',
        placeholder:
          "Tell us a bit about your background and what you're hoping to work towards. There's no wrong answer — we meet people where they are.",
      },
      {
        value: 'workshops-community',
        label: 'Workshops & Community',
        placeholder:
          "What topics or skills are you interested in? Let us know what brought you here and what you're hoping to get out of our community programs.",
      },
    ],
  },
  {
    groupLabel: 'General',
    options: [
      {
        value: 'volunteer',
        label: 'Volunteering',
        placeholder:
          "Tell us about yourself, your skills, and how you'd like to contribute. Whether it's tutoring, mentorship, events, or something else — we'd love to hear from you.",
      },
      {
        value: 'partnership',
        label: 'Partnerships',
        placeholder:
          "Tell us about your organisation and how you envision working with MSNC. What's the nature of the partnership you have in mind, and what goals are you hoping to achieve together?",
      },
      {
        value: 'general',
        label: 'General Inquiries',
        placeholder:
          "What's on your mind? Share as much or as little as you'd like — we'll make sure your message gets to the right person.",
      },
    ],
  },
]

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: 'Who is eligible for MSNC programs?',
    a: 'We serve Banyamulenge youth across Canada (specifically Grades 11-12 and post-secondary), adult learners seeking educational upgrading, and youth living in refugee camps in East Africa through our Rebuilding Futures Initiative.',
  },
  {
    q: 'What does the High School Support program cover?',
    a: 'Our High School Support program offers tutoring, mentorship pairings, and university application guidance for students in Grades 11 and 12. We work closely with students to build academic confidence and long-term goals.',
    programs: ['high-school-support'],
  },
  {
    q: 'Who can join the Adult Learning Pathways program?',
    a: 'Adult Learning Pathways is open to adult learners who are seeking educational upgrading, literacy support, or a pathway back into formal education. We meet learners where they are and build from there.',
    programs: ['adult-learning-pathways'],
  },
  {
    q: 'What kinds of workshops does MSNC run?',
    a: 'Our community workshops cover a range of topics including financial literacy, digital skills, career readiness, and cultural programming. They are open to the broader Banyamulenge community and allies.',
    programs: ['workshops-community'],
  },
  {
    q: 'What does the mentorship program entail?',
    a: 'Mentorship is a core pillar. We pair students with experienced alumni and professionals who provide 1-on-1 academic guidance, course selection advice, and support with university applications.',
    programs: ['high-school-support', 'adult-learning-pathways'],
  },
  {
    q: 'How does the Rebuilding Futures Initiative work?',
    a: 'This global initiative equips youth in refugee camps (Kenya, Uganda, Burundi) with employable, vocational skills. We focus on high-demand trades like construction, IT, electrical work, and plumbing to foster long-term self-reliance.',
  },
  {
    q: 'Are donations tax-deductible?',
    a: 'Please reach out to our partnership coordination team via the contact form to discuss financial contributions, grant alignment, and official documentation.',
  },
]

const SUBJECT_NUDGES: Partial<Record<string, string>> = {
  partnership:
    'We review partnership requests carefully. The more context you provide, the sooner we can set up a conversation.',
  volunteer:
    "Don't worry about having the 'right' experience — we welcome all kinds of contributors.",
  'high-school-support':
    'Applications are reviewed on a rolling basis. We aim to respond within one week.',
  'adult-learning-pathways':
    "There's no minimum level of education required to reach out — just bring your goals.",
}

// ─── Components ─────────────────────────────────────────────────────────────

function ProgramBanner({ programName, onDismiss }: { programName: string; onDismiss: () => void }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 rounded-xl border border-secondary/20 bg-secondary/5 px-5 py-3.5">
      <div className="flex items-center gap-3">
        <BookOpen className="h-4 w-4 shrink-0 text-secondary" />
        <p className="text-sm font-medium text-primary">
          Inquiring about{' '}
          <span className="font-bold text-secondary">{programName}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-border hover:text-primary"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

function FaqAccordionItem({
  faq, index, isActive, isRelevant, onToggle,
}: {
  faq: FaqItem
  index: number
  isActive: boolean
  isRelevant: boolean | null
  onToggle: (i: number) => void
}) {
  return (
    <div className={cn('transition-opacity duration-200', isRelevant === false && 'opacity-40')}>
      <button
        type="button"
        onClick={() => onToggle(index)}
        className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left"
      >
        <span className={cn(
          'text-base font-semibold leading-snug transition-colors',
          isActive ? 'text-secondary' : 'text-primary',
        )}>
          {faq.q}
        </span>
        <span className="mt-0.5 shrink-0 text-muted-foreground">
          {isActive ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <div className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out',
        isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
      )}>
        <p className="mx-6 mb-5 border-l-2 border-secondary/30 pl-4 text-sm leading-relaxed text-foreground/65">
          {faq.a}
        </p>
      </div>
    </div>
  )
}

// ─── Inner Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const t = useTranslations('ContactPage')
  const tBread = useTranslations('Breadcrumbs')
  const tLoader = useTranslations('Loader')
  const locale = useLocale()
  const searchParams = useSearchParams()

  const programParam = searchParams.get('program') ?? ''
  const subjectParam = searchParams.get('subject') ?? ''
  const sourceParam  = searchParams.get('source')  ?? (programParam ? 'program-page' : 'direct')

  const deriveProgramName = (): string => {
    if (!subjectParam) return ''
    const match = new RegExp(/^Inquiry regarding (.+)$/).exec(subjectParam)
    return match ? match[1] : ''
  }

  const programDisplayName =
    deriveProgramName() ||
    (programParam ? programParam.replaceAll('-', ' ').replaceAll(/\b\w/g, c => c.toUpperCase()) : '')

  const [programBannerVisible, setProgramBannerVisible] = useState(!!programDisplayName)

  const rawGroups = t.raw('inquiryGroups')
  const inquiryGroups: InquiryGroup[] =
    Array.isArray(rawGroups) && rawGroups.length > 0 ? rawGroups : DEFAULT_INQUIRY_GROUPS

  const allOptions: InquiryOption[] = inquiryGroups.flatMap(g => g.options)

  const rawFaqs = t.raw('faq.items')
  const allFaqs: FaqItem[] =
    Array.isArray(rawFaqs) && rawFaqs.length > 0 ? rawFaqs : DEFAULT_FAQS

  const deriveInitialSubject = (): string => {
    if (programParam) {
      const slugMatch = allOptions.find(o => o.value === programParam)
      if (slugMatch) return slugMatch.value
    }
    if (!subjectParam) return ''
    const lower = subjectParam.toLowerCase()
    const match = allOptions.find(
      o => o.value.toLowerCase() === lower || o.label.toLowerCase() === lower,
    )
    if (!match && programParam) return 'student_intake'
    return match?.value ?? ''
  }

  const [subject, setSubject] = useState<string>(deriveInitialSubject)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    message: '',
  })

  useEffect(() => {
    if (!state?.message) return
    state.success ? toast.success(state.message) : toast.error(state.message)
  }, [state])

  const activePlaceholder =
    allOptions.find(o => o.value === subject)?.placeholder ??
    "What's on your mind? Share as much or as little as you'd like."

  const activeNudge = subject ? SUBJECT_NUDGES[subject] : undefined

  const sortedFaqs = programParam
    ? [
        ...allFaqs.filter(f => f.programs?.includes(programParam)),
        ...allFaqs.filter(f => !f.programs?.includes(programParam)),
      ]
    : allFaqs

  const isFaqRelevant = (faq: FaqItem): boolean | null => {
    if (!programParam) return null
    return faq.programs?.includes(programParam) ?? false
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="relative overflow-hidden border-b border-border bg-[#001830]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #D97706 0%, transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="container-editorial relative z-10 pb-20 pt-36 md:pt-44">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center text-sm font-medium text-white/60">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">{tBread('home')}</Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white">{tBread('contact')}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-white/25" />
                <span className="section-label text-white/40">{t('hero.badge')}</span>
              </div>

              <h1 className="text-white mb-0 leading-[1.05]">
                {t('hero.title1')}{' '}
                <em className="font-display font-normal not-italic text-white/30">
                  {t('hero.title2')}
                </em>
              </h1>

              <p className="text-lg text-white/55 max-w-xl leading-relaxed mb-0">
                {t('hero.subtitle')}
              </p>

              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <Clock className="h-3.5 w-3.5 text-white/35" />
                <span className="text-xs font-medium text-white/45">
                  We typically respond within 2–3 business days
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3 pb-1">
              <p className="section-label text-white/30 mb-5">You can also reach us at</p>
              
              <a
                href={`mailto:${t('directory.canada.email')}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail className="h-4 w-4 text-white/50" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30 mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-white/75 group-hover:text-white transition-colors truncate mb-0">
                    {t('directory.canada.email')}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/20 ml-auto shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-white/40" />
              </a>

              <a
                href="https://instagram.com/mulengescholars"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Instagram className="h-4 w-4 text-white/50" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30 mb-0.5">Instagram</p>
                  <p className="text-sm font-semibold text-white/75 group-hover:text-white transition-colors mb-0">@mulengescholars</p>
                </div>
                <ArrowRight className="h-4 w-4 text-white/20 ml-auto shrink-0 transition-transform group-hover:translate-x-1 group-hover:text-white/40" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section py-20">
        <div className="container-editorial">
          <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
            <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="rounded-2xl border border-border bg-slate-50/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="h-4 w-4 text-secondary shrink-0" />
                  <span className="section-label">What to expect</span>
                </div>
                <div className="space-y-5">
                  {[
                    { step: '01', title: 'Send your message', desc: 'Use the form to tell us what you need. The more detail you share, the faster we can help.' },
                    { step: '02', title: 'We read it personally', desc: 'Every message is read by a team member — not a bot.' },
                    { step: '03', title: 'We get back to you', desc: 'Expect a response within 2–3 business days.' }
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4">
                      <span className="mt-0.5 text-[10px] font-black tracking-widest text-secondary/50 shrink-0 w-5">{step}</span>
                      <div>
                        <p className="text-sm font-bold text-primary mb-0.5">{title}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground mb-0">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">Prefer to write directly?</p>
                <a href={`mailto:${t('directory.canada.email')}`} className="group inline-flex items-center gap-2 text-sm font-bold text-secondary hover:underline">
                  {t('directory.canada.email')}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="mb-16 rounded-2xl border border-border bg-background p-8 shadow-sm md:p-10">
                {programBannerVisible && programDisplayName && (
                  <ProgramBanner
                    programName={programDisplayName}
                    onDismiss={() => setProgramBannerVisible(false)}
                  />
                )}

                <div className="mb-8">
                  <h2 className="mb-1">{t('form.title')}</h2>
                  <p className="text-sm text-muted-foreground mb-0">All fields are required.</p>
                </div>

                <form action={formAction} className="space-y-6">
                  <input type="text" name="_honeypot" className="hidden" aria-hidden="true" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="source" value={sourceParam} />
                  <input type="hidden" name="programSlug" value={programParam} />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="section-label">{t('form.firstName')}</label>
                      <input name="firstName" required placeholder="First name" className="input-base" />
                    </div>
                    <div className="space-y-2">
                      <label className="section-label">{t('form.lastName')}</label>
                      <input name="lastName" required placeholder="Last name" className="input-base" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="section-label">{t('form.email')}</label>
                    <input type="email" name="email" required placeholder="your@email.com" className="input-base" />
                  </div>

                  <div className="space-y-2">
                    <label className="section-label">{t('form.subject')}</label>
                    <select
                      name="subject"
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="input-base cursor-pointer"
                    >
                      <option value="" disabled>{t('form.subjectPlaceholder')}</option>
                      {inquiryGroups.map(group => (
                        <optgroup key={group.groupLabel} label={group.groupLabel}>
                          {group.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="section-label">{t('form.message')}</label>
                    <textarea
                      key={subject}
                      name="message"
                      rows={6}
                      required
                      placeholder={activePlaceholder}
                      className="input-base resize-none"
                    />
                    {activeNudge && <p className="text-[11px] leading-relaxed text-muted-foreground/60">{activeNudge}</p>}
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-5">
                    <span className="section-label text-muted-foreground">{t('secureSubmission')}</span>
                    <button type="submit" disabled={isPending} className="btn btn-primary group">
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {tLoader('pleaseWait')}
                        </span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t('form.submit')}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <h2 className="mb-0">{t('faq.title')}</h2>
                  {programParam && programDisplayName && (
                    <span className="section-label text-secondary">
                      Relevant to {programDisplayName} first
                    </span>
                  )}
                </div>
                <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
                  {sortedFaqs.map((faq, i) => (
                    <FaqAccordionItem
                      key={i}
                      faq={faq}
                      index={i}
                      isActive={activeFaq === i}
                      isRelevant={isFaqRelevant(faq)}
                      onToggle={idx => setActiveFaq(activeFaq === idx ? null : idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── Default Export ──────────────────────────────────────────────────────────

export default function ContactClient() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background">
        <div className="bg-[#001830] pb-20 pt-36">
          <div className="container-editorial max-w-3xl space-y-5">
            <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
            <div className="h-14 w-2/3 rounded-xl bg-white/10 animate-pulse" />
          </div>
        </div>
        <div className="container-editorial space-y-4 py-16">
          <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
        </div>
      </main>
    }>
      <ContactForm />
    </Suspense>
  )
}