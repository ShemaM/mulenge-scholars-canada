'use client'

import { Suspense, useActionState, useEffect, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { Building2, ArrowRight, GraduationCap, Heart, Loader2, ShieldCheck, Sparkles, UserPlus } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from '@/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Textarea } from '@/components/ui/Textarea'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'
import { submitUnifiedInquiry } from '@/actions/inquiries'
import { normalizeSiteLocale } from '@/lib/site-copy'

type InterestType = 'scholar' | 'volunteer' | 'partner' | 'support' | 'general'

function JoinForm() {
  const t = useTranslations('JoinPage')
  const locale = normalizeSiteLocale(useLocale())
  const searchParams = useSearchParams()
  const router = useRouter()
  const roleParam = searchParams.get('role')

  const getInitialInterest = (): InterestType => {
    if (roleParam === 'highschool' || roleParam === 'support') return 'support'
    if (roleParam === 'student' || roleParam === 'scholar') return 'scholar'
    if (roleParam === 'partner') return 'partner'
    if (roleParam === 'mentor' || roleParam === 'volunteer') return 'volunteer'
    return 'general'
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: getInitialInterest(),
    message: '',
  })

  const [state, formAction, isPending] = useActionState(submitUnifiedInquiry, null)

  useEffect(() => {
    setFormData((prev) => ({ ...prev, interest: getInitialInterest() }))
  }, [roleParam])

  useEffect(() => {
    if (!state?.message) return
    if (state.success) {
      toast.success(state.message)
      router.push(`/success/join/${formData.interest}`)
    } else {
      toast.error(state.message)
    }
  }, [formData.interest, router, state])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contentMap: Record<
    InterestType,
    {
      badge: string
      title: string
      desc: string
      label: string
      placeholder: string
      button: string
      accent: string
      bg: string
    }
  > = {
    support: {
      badge: t('roles.support.badge'),
      title: t('roles.support.title'),
      desc: t('roles.support.description'),
      label: t('roles.support.label'),
      placeholder: t('roles.support.placeholder'),
      button: t('roles.support.button'),
      accent: '#4A90D9',
      bg: 'bg-[#4A90D9]',
    },
    scholar: {
      badge: t('roles.scholar.badge'),
      title: t('roles.scholar.title'),
      desc: t('roles.scholar.description'),
      label: t('roles.scholar.label'),
      placeholder: t('roles.scholar.placeholder'),
      button: t('roles.scholar.button'),
      accent: '#002147',
      bg: 'bg-[#002147]',
    },
    volunteer: {
      badge: t('roles.volunteer.badge'),
      title: t('roles.volunteer.title'),
      desc: t('roles.volunteer.description'),
      label: t('roles.volunteer.label'),
      placeholder: t('roles.volunteer.placeholder'),
      button: t('roles.volunteer.button'),
      accent: '#D97706',
      bg: 'bg-[#D97706]',
    },
    partner: {
      badge: t('roles.partner.badge'),
      title: t('roles.partner.title'),
      desc: t('roles.partner.description'),
      label: t('roles.partner.label'),
      placeholder: t('roles.partner.placeholder'),
      button: t('roles.partner.button'),
      accent: '#6F4763',
      bg: 'bg-[#6F4763]',
    },
    general: {
      badge: t('roles.general.badge'),
      title: t('roles.general.title'),
      desc: t('roles.general.description'),
      label: t('roles.general.label'),
      placeholder: t('roles.general.placeholder'),
      button: t('roles.general.button'),
      accent: '#1E293B',
      bg: 'bg-[#1E293B]',
    },
  }

  const pathwayIcons = {
    scholar: GraduationCap,
    support: UserPlus,
    volunteer: Heart,
    partner: Building2,
    general: ArrowRight,
  } satisfies Record<InterestType, React.ComponentType<{ className?: string }>>

  const current = contentMap[formData.interest]

  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-paper-50 pb-16 pt-32">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 -skew-x-12 translate-x-32 border-l border-border bg-white" />
        <div className="pointer-events-none absolute right-10 top-1/2 select-none text-[12vw] font-display uppercase leading-none text-primary/5">
          {formData.interest}
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4" style={{ color: current.accent }} />
              <span className="text-2xs font-black uppercase tracking-widest text-primary">
                {current.badge}
              </span>
            </div>
            <h1 className="font-display text-6xl leading-none tracking-tighter text-primary md:text-8xl">
              {current.title}
            </h1>
            <p
              className="max-w-2xl border-l-4 pl-8 text-xl font-medium italic leading-relaxed text-slate-500"
              style={{ borderColor: current.accent }}
            >
              {current.desc}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid items-start gap-20 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="mb-8 text-2xs uppercase tracking-widest text-slate-300">
                {t('steps.pathway')}
              </h2>

              {(Object.keys(contentMap) as Array<InterestType>).map((key) => {
                const item = contentMap[key]
                const isActive = formData.interest === key
                const Icon = pathwayIcons[key]

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, interest: key })}
                    className={cn(
                      'group flex w-full items-center gap-6 rounded-[2.5rem] border-2 p-6 text-left transition-all duration-500',
                      isActive
                        ? 'scale-[1.02] border-transparent bg-white shadow-brand'
                        : 'border-slate-50 bg-slate-50 hover:border-slate-200 hover:bg-white',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-all duration-500',
                        isActive ? 'text-white' : 'bg-white text-slate-300',
                      )}
                      style={isActive ? { backgroundColor: item.accent } : {}}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        'text-sm font-bold tracking-tight transition-colors',
                        isActive ? 'text-primary' : 'text-slate-400',
                      )}
                    >
                      {item.badge}
                    </span>
                  </button>
                )
              })}

              <div className="mt-8 flex items-start gap-3 rounded-[2.5rem] border border-slate-100 bg-slate-50 p-6">
                <ShieldCheck className="h-6 w-6 shrink-0 text-secondary" />
                <p className="text-2xs font-bold uppercase tracking-widest leading-loose text-slate-400">
                  {t('security')}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[4rem] border border-slate-100 bg-white p-6 shadow-2xl shadow-slate-200/40 md:p-12">
                <header className="mb-12">
                  <h2 className="mb-4 text-2xs uppercase tracking-widest text-slate-300">
                    {t('steps.intake')}
                  </h2>
                  <h3 className="font-display text-4xl tracking-tight text-primary">
                    {t('form.titlePrefix')}{' '}
                    <span className="italic" style={{ color: current.accent }}>
                      {t('form.titleAccent')}
                    </span>
                  </h3>
                </header>

                <form action={formAction} className="space-y-6">
                  <input type="hidden" name="interest" value={formData.interest} />
                  <input type="hidden" name="locale" value={locale} />

                  <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                      <Label className="ml-2 text-2xs font-black uppercase tracking-widest text-slate-400">
                        {t('form.firstName')}
                      </Label>
                      <Input
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="h-16 rounded-2xl border-slate-100 bg-slate-50 transition-all focus:bg-white focus:ring-secondary"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="ml-2 text-2xs font-black uppercase tracking-widest text-slate-400">
                        {t('form.lastName')}
                      </Label>
                      <Input
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="h-16 rounded-2xl border-slate-100 bg-slate-50 transition-all focus:bg-white focus:ring-secondary"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="ml-2 text-2xs font-black uppercase tracking-widest text-slate-400">
                      {t('form.email')}
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="h-16 rounded-2xl border-slate-100 bg-slate-50 transition-all focus:bg-white focus:ring-secondary"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="ml-2 text-2xs font-black uppercase tracking-widest text-slate-400">
                      {current.label}
                    </Label>
                    <Textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={current.placeholder}
                      className="rounded-[2.5rem] border-slate-100 bg-slate-50 p-8 leading-relaxed transition-all focus:bg-white focus:ring-secondary"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className={cn(
                      'h-20 w-full rounded-full text-nav font-black uppercase tracking-widest text-white shadow-2xl transition-all duration-500',
                      current.bg,
                    )}
                  >
                    {isPending ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <span className="flex items-center gap-3">
                        {current.button} <ArrowRight className="h-5 w-5" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}

export default function JoinClient() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <JoinForm />
    </Suspense>
  )
}
