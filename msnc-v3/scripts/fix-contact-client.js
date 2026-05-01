const fs = require('fs');

const content = `'use client'

import { useActionState, useEffect, useId, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowRight, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { submitContactForm } from '@/actions/contact'
import { toast } from 'sonner'

type InquiryState = {
  success: boolean
  message: string
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

export default function ContactClient() {
  const t = useTranslations('ContactPage.form')
  const [state, formAction, isPending] = useActionState<InquiryState, FormData>(
    submitContactForm,
    null,
  )

  const fullNameId = useId()
  const emailId = useId()
  const subjectId = useId()
  const messageId = useId()

  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!state) return
    if (state.success) {
      setShowSuccess(true)
    } else if (state.message) {
      toast.error(state.message)
    }
  }, [state])

  if (showSuccess) {
    return (
      <div
        id="contact-form"
        className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[2.5rem] bg-paper-50 p-10 text-center border border-border animate-in fade-in zoom-in"
      >
        <CheckCircle2 className="mb-6 h-20 w-20 text-secondary" />
        <h2 className="mb-4 font-display text-4xl text-primary">{t('success.heading')}</h2>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{t('success.message')}</p>
      </div>
    )
  }

  return (
    <div id="contact-form" className="w-full">
      <form action={formAction} noValidate className="w-full space-y-8">
        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor={fullNameId}>{t('labels.name')}</FieldLabel>
            <Input
              id={fullNameId}
              name="fullName"
              required
              autoComplete="name"
              placeholder={t('placeholders.name')}
              className="h-14 w-full rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-lg focus-visible:border-secondary focus-visible:ring-0 transition-colors placeholder:text-muted-foreground/40"
            />
          </div>
          <div>
            <FieldLabel htmlFor={emailId}>{t('labels.email')}</FieldLabel>
            <Input
              id={emailId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t('placeholders.email')}
              className="h-14 w-full rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-lg focus-visible:border-secondary focus-visible:ring-0 transition-colors placeholder:text-muted-foreground/40"
            />
          </div>

        <div>
          <FieldLabel htmlFor={subjectId}>{t('labels.subject')}</FieldLabel>
          <div className="relative w-full">
            <select
              id={subjectId}
              name="subject"
              required
              defaultValue=""
              className="h-14 w-full cursor-pointer appearance-none rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-lg text-primary focus:border-secondary focus:outline-none transition-colors"
            >
              <option value="" disabled className="text-muted-foreground">
                {t('placeholders.selectSubject')}
              </option>
              <option value="general">{t('subjectOptions.general')}</option>
              <option value="support">{t('subjectOptions.support')}</option>
              <option value="partnership">{t('subjectOptions.partnership')}</option>
              <option value="volunteer">{t('subjectOptions.volunteer')}</option>
            </select>
            <ArrowRight className="pointer-events-none absolute inset-y-0 right-0 my-auto h-5 w-5 text-muted-foreground rotate-90" />
          </div>

        <div>
          <FieldLabel htmlFor={messageId}>{t('labels.message')}</FieldLabel>
          <textarea
            id={messageId}
            name="message"
            required
            rows={4}
            placeholder={t('placeholders.message')}
            className="w-full resize-none rounded-none border-0 border-b-2 border-border bg-transparent px-0 py-4 text-lg focus:border-secondary focus:outline-none transition-colors placeholder:text-muted-foreground/40"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isPending} size="lg" className="group w-full md:w-auto px-12 h-14">
            {isPending ? (
              <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> {t('button.pending')}</>
            ) : (
              <>{t('button.default')} <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" /></>
            )}
          </Button>
        </div>

        <p className="mt-6 flex w-full items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
          {t('secure')}
        </p>
      </form>
    </div>
  )
}
`;

fs.writeFileSync('msnc-v3/src/app/[locale]/(frontend)/contact/ContactClient.tsx', content, 'utf8');
console.log('Fixed ContactClient.tsx');
