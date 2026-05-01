'use server'

import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { checkRateLimit } from '@/lib/rate-limit'

const contactMessages = {
  en: {
    rateLimit: 'Too many requests. Please wait a moment before trying again.',
    spamAccepted: 'Your message has been sent.',
    invalidInput: 'Please check your input and try again.',
    success: 'Your message has been sent to the MSNC leadership board. Expect a response within 24-48 hours.',
    failure: 'We could not send your message right now. Please try again again in a moment.',
    validation: {
      fullNameShort: 'Full name is too short.',
      fullNameLong: 'Full name is too long.',
      invalidEmail: 'Please enter a valid email address.',
      subjectRequired: 'Please select a subject.',
      messageShort: 'Message must be at least 10 characters.',
      messageLong: 'Message is too long.',
      spam: 'Spam detected.',
    },
  },
  fr: {
    rateLimit: 'Trop de demandes. Veuillez patienter un instant avant de reessayer.',
    spamAccepted: 'Votre message a ete envoye.',
    invalidInput: 'Veuillez verifier vos informations et reessayer.',
    success: "Votre message a ete transmis a l'equipe du MSNC. Attendez-vous a une reponse sous 24 a 48 heures.",
    failure: "Nous n'avons pas pu envoyer votre message pour le moment. Veuillez reessayer dans un instant.",
    validation: {
      fullNameShort: 'Le nom complet est trop court.',
      fullNameLong: 'Le nom complet est trop long.',
      invalidEmail: 'Veuillez saisir une adresse courriel valide.',
      subjectRequired: 'Veuillez selectionner un sujet.',
      messageShort: 'Le message doit contenir au moins 10 caracteres.',
      messageLong: 'Le message est trop long.',
      spam: 'Spam detecte.',
    },
  },
} as const

function getLocale(formData: FormData) {
  return formData.get('locale') === 'fr' ? 'fr' : 'en'
}

function getContactSchema(locale: keyof typeof contactMessages) {
  const t = contactMessages[locale].validation

  return z.object({
    fullName: z.string().trim().min(2, t.fullNameShort).max(100, t.fullNameLong),
    email: z.string().trim().email(t.invalidEmail).toLowerCase(),
    subject: z.string().trim().min(1, t.subjectRequired).max(100),
    message: z.string().trim().min(10, t.messageShort).max(2000, t.messageLong),
    _honeypot: z.string().max(0, { message: t.spam }).optional(),
    locale: z.string().optional(),
  })
}

export async function submitContactForm(prevState: any, formData: FormData) {
  const locale = getLocale(formData)
  const copy = contactMessages[locale]

  try {
    await checkRateLimit()
  } catch {
    return { success: false, message: copy.rateLimit }
  }

  const rawData = Object.fromEntries(formData.entries())

  if (rawData._honeypot && rawData._honeypot !== '') {
    return { success: true, message: copy.spamAccepted }
  }

  const validatedFields = getContactSchema(locale).safeParse(rawData)

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors
    const firstError = Object.values(errors).flat()[0]
    return {
      success: false,
      message: firstError || copy.invalidInput,
      errors,
    }
  }

  const { fullName, email, subject, message } = validatedFields.data

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'messages',
      data: {
        name: fullName,
        email,
        subject,
        message,
        status: 'new',
      },
    })

    return {
      success: true,
      message: copy.success,
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, message: copy.failure }
  }
}
