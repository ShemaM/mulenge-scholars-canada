'use server'

import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'

const inquiryMessages = {
  en: {
    invalidData: 'Please review the form and try again.',
    success: 'Application submitted successfully. Our team will reach out soon.',
    failure: 'We could not submit your application right now. Please try again in a moment.',
    validation: {
      firstName: 'First name is required.',
      lastName: 'Last name is required.',
      email: 'Please enter a valid email address.',
      message: 'Message must be at least 10 characters.',
    },
  },
  fr: {
    invalidData: 'Veuillez verifier le formulaire et reessayer.',
    success: 'Votre demande a ete envoyee avec succes. Notre equipe vous contactera bientot.',
    failure: "Nous n'avons pas pu envoyer votre demande pour le moment. Veuillez reessayer dans un instant.",
    validation: {
      firstName: 'Le prenom est requis.',
      lastName: 'Le nom est requis.',
      email: 'Veuillez saisir une adresse courriel valide.',
      message: 'Le message doit contenir au moins 10 caracteres.',
    },
  },
} as const

function getLocale(formData: FormData) {
  return formData.get('locale') === 'fr' ? 'fr' : 'en'
}

function getInquirySchema(locale: keyof typeof inquiryMessages) {
  const t = inquiryMessages[locale].validation

  return z.object({
    interest: z.enum(['scholar', 'support', 'partner', 'general', 'volunteer']),
    firstName: z.string().trim().min(1, t.firstName).max(50),
    lastName: z.string().trim().min(1, t.lastName).max(50),
    email: z.string().trim().email(t.email),
    message: z.string().trim().min(10, t.message).max(5000),
  })
}

export async function submitUnifiedInquiry(prevState: any, formData: FormData) {
  const locale = getLocale(formData)
  const copy = inquiryMessages[locale]

  const result = getInquirySchema(locale).safeParse({
    interest: formData.get('interest'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.success) {
    return {
      success: false,
      message: result.error.errors[0]?.message ?? copy.invalidData,
    }
  }

  try {
    const payload = await getPayload({ config })
    const fullName = `${result.data.firstName} ${result.data.lastName}`.trim()

    await payload.create({
      collection: 'join-submissions',
      data: {
        fullName,
        email: result.data.email,
        interest: result.data.interest,
        message: result.data.message,
        status: 'new',
      },
    })

    return {
      success: true,
      message: copy.success,
    }
  } catch (error) {
    console.error('Join submission error:', error)
    return {
      success: false,
      message: copy.failure,
    }
  }
}
