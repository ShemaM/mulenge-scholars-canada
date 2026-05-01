const fs = require('fs');
const path = require('path');

// Fix 1: Update contact.ts server action to accept fullName and split it
const contactActionPath = path.join(__dirname, '..', 'src', 'actions', 'contact.ts');
const contactActionContent = `"use server";

import { getCachedPayload } from "@/lib/payload";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const ContactSchema = z.object({
  fullName:  z.string().trim().min(2, "Full name is too short").max(100, "Full name is too long"),
  email:     z.string().trim().email("Please enter a valid email address").toLowerCase(),
  phone:     z.string().trim().regex(/^[+]*[(\d{1,4})?\.\/-\s]*$/, "Invalid phone format").optional().or(z.literal('')),
  subject:   z.string().min(1, "Please select a subject").max(100),
  message:   z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  _honeypot: z.string().max(0, { message: "Spam detected" }).optional(),
});

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
}

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    await checkRateLimit();
  } catch {
    return { success: false, message: "Too many requests. Please wait a moment before trying again." };
  }

  const rawData = Object.fromEntries(formData.entries());

  if (rawData._honeypot && rawData._honeypot !== "") {
    return { success: true, message: "Your message has been dispatched." };
  }

  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(errors).flat()[0];
    return {
      success: false,
      message: firstError || "Please check your input and try again.",
      errors,
    };
  }

  const { fullName, email, subject, message, phone } = validatedFields.data;
  const { firstName, lastName } = splitFullName(fullName);

  try {
    const payload = await getCachedPayload();

    await payload.create({
      collection: 'messages',
      data: {
        name: fullName,
        firstName,
        lastName,
        email,
        subject,
        message: phone ? \`[Phone: \${phone}]\\n\\n\${message}\` : message,
        status: 'unread',
      },
    });

    return {
      success: true,
      message: "Your message has been dispatched to the MSNC Leadership Board. Expect a response within 24-48 hours.",
    };
  } catch (error: any) {
    console.error("Contact form error:", error);
    if (error.message?.includes('not found')) {
      return { success: false, message: "Server configuration error. Please try again later." };
    }
    return { success: false, message: "Our system is currently at capacity. Please email info@mulengescholars.org directly." };
  }
}
`;

fs.writeFileSync(contactActionPath, contactActionContent, 'utf8');
console.log('Fixed contact.ts server action');

// Fix 2: Update ContactClient.tsx to add honeypot field and show field-level errors
const contactClientPath = path.join(__dirname, '..', 'src', 'app', '[locale]', '(frontend)', 'contact', 'ContactClient.tsx');
const contactClientContent = `'use client'

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
  errors?: Record<string, string[]>
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
  return <p className="mt-2 text-sm text-accent font-medium">{message}</p>
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
  const honeypotId = useId()

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
        role="status"
        aria-live="polite"
        className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-[2.5rem] bg-paper-50 p-10 text-center border border-border animate-in fade-in zoom-in"
      >
        <CheckCircle2 className="mb-6 h-20 w-20 text-secondary" aria-hidden="true" />
        <h2 className="mb-4 font-display text-4xl text-primary">{t('success.heading')}</h2>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
          {t('success.message')}
        </p>
      </div>
    )
  }

  return (
    <div id="contact-form" className="w-full">
      <form action={formAction} noValidate className="w-full space-y-8">
        {/* Honeypot field - hidden from users */}
        <div className="hidden" aria-hidden="true">
          <input
            id={honeypotId}
            name="_honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Row 1: Name + Email */}
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
            <FieldError message={state?.errors?.fullName?.[0]} />
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
            <FieldError message={state?.errors?.email?.[0]} />
          </div>
        </div>

        {/* Row 2: Subject */}
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
            <ArrowRight className="pointer-events-none absolute inset-y-0 right-0 my-auto h-5 w-5 text-muted-foreground rotate-90" aria-hidden="true" />
          </div>
          <FieldError message={state?.errors?.subject?.[0]} />
        </div>

        {/* Row 3: Message */}
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
          <FieldError message={state?.errors?.message?.[0]} />
        </div>

        {/* Row 4: Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            aria-label={isPending ? t('button.pending') : t('button.default')}
            size="lg"
            className="group w-full md:w-auto px-12 h-14"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" aria-hidden="true" />
                {t('button.pending')}
              </>
            ) : (
              <>
                {t('button.default')}
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>

        {/* Row 5: Security note */}
        <p className="mt-6 flex w-full items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden="true" />
          {t('secure')}
        </p>
      </form>
    </div>
  )
}
`;

fs.writeFileSync(contactClientPath, contactClientContent, 'utf8');
console.log('Fixed ContactClient.tsx');

