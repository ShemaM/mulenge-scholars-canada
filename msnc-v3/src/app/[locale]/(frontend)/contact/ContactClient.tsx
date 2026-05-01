'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { submitContactForm } from '@/actions/contact'
import { toast } from 'sonner'

type InquiryState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  subject?: string
} | null

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block text-xs uppercase tracking-widest text-muted-foreground"
    >
      {children}
    </label>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-2 text-sm font-medium text-accent">{message}</p>
}

export default function ContactClient() {
  const t = useTranslations('ContactPage')
  const locale = useLocale()

  const [state, formAction, isPending] = useActionState<InquiryState, FormData>(
    submitContactForm,
    null
  )

  const fullNameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const messageId = useId()
  const honeypotId = useId()

  const [showSuccess, setShowSuccess] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!state) return

    if (state.success) {
      setShowSuccess(true)

      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current)

      timerRef.current = setTimeout(() => {
        setShowSuccess(false)
      }, 10000)
    } else if (state.message) {
      toast.error(state.message)
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [state])

  if (showSuccess) {
    const subject = state?.subject || 'general'

    return (
      <div
        id="contact-form"
        role="status"
        aria-live="polite"
        className="flex min-h-100 w-full flex-col items-center justify-center rounded-[2.5rem] border border-border bg-paper-50 p-10 text-center animate-in fade-in zoom-in"
      >
        <CheckCircle2 className="mb-6 h-20 w-20 text-secondary" aria-hidden="true" />
        <h2 className="mb-4 font-display text-4xl text-primary">
          {t('form.success.heading')}
        </h2>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          {t(`form.success.message_${subject}`)}
        </p>
        <p className="mt-6 text-sm text-muted-foreground/70 opacity-0 animate-in fade-in delay-200">
          {t('form.success.autoDismiss', { seconds: 10 })}
        </p>
      </div>
    )
  }

  return (
    <div id="contact-form" className="w-full">
      <form action={formAction} noValidate className="w-full space-y-8">
        <input type="hidden" name="locale" value={locale} />

        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <input
            id={honeypotId}
            name="_honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Name + Email */}
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor={fullNameId}>{t('form.labels.name')}</FieldLabel>
            <Input
              id={fullNameId}
              name="fullName"
              required
              autoComplete="name"
              placeholder={t('form.placeholders.name')}
              className="h-14 w-full rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-lg transition-colors placeholder:text-muted-foreground/40 focus-visible:border-secondary focus-visible:ring-0"
            />
            <FieldError message={state?.errors?.fullName?.[0]} />
          </div>

          <div>
            <FieldLabel htmlFor={emailId}>{t('form.labels.email')}</FieldLabel>
            <Input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('form.placeholders.email')}
              className="h-14 w-full rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-lg transition-colors placeholder:text-muted-foreground/40 focus-visible:border-secondary focus-visible:ring-0"
            />
            <FieldError message={state?.errors?.email?.[0]} />
          </div>
        </div>

        {/* Subject */}
        <div>
          <FieldLabel htmlFor={subjectId}>{t('form.labels.subject')}</FieldLabel>
          <div className="relative w-full">
            <select
              id={subjectId}
              name="subject"
              required
              defaultValue=""
              className="h-14 w-full cursor-pointer appearance-none rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-lg text-primary transition-colors focus:border-secondary focus:outline-none"
            >
              <option value="" disabled>
                {t('form.placeholders.selectSubject')}
              </option>
              <option value="general">{t('form.subjectOptions.general')}</option>
              <option value="support">{t('form.subjectOptions.support')}</option>
              <option value="partnership">{t('form.subjectOptions.partnership')}</option>
              <option value="volunteer">{t('form.subjectOptions.volunteer')}</option>
            </select>

            <ArrowRight
              className="pointer-events-none absolute inset-y-0 right-0 my-auto h-5 w-5 rotate-90 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <FieldError message={state?.errors?.subject?.[0]} />
        </div>

        {/* Message */}
        <div>
          <FieldLabel htmlFor={messageId}>{t('form.labels.message')}</FieldLabel>
          <textarea
            id={messageId}
            name="message"
            required
            rows={4}
            placeholder={t('form.placeholders.message')}
            className="w-full resize-none rounded-none border-0 border-b-2 border-border bg-transparent px-0 py-4 text-lg transition-colors placeholder:text-muted-foreground/40 focus:border-secondary focus:outline-none"
          />
          <FieldError message={state?.errors?.message?.[0]} />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            aria-label={isPending ? t('form.button.pending') : t('form.button.default')}
            size="lg"
            className="group h-14 w-full px-12 md:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                {t('form.button.pending')}
              </>
            ) : (
              <>
                {t('form.button.default')}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>

        {/* Security note */}
        <p className="mt-6 flex w-full items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-secondary" />
          {t('form.secure')}
        </p>
      </form>
    </div>
  )
}