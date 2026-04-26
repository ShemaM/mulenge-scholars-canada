'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { z } from 'zod'

const InquirySchema = z.object({
  type:      z.enum(['scholar', 'support', 'partner', 'general']),
  firstName: z.string().trim().min(1, 'First name is required').max(50),
  lastName:  z.string().trim().min(1, 'Last name is required').max(50),
  email:     z.string().email('Invalid email address'),
  phone:     z.string().max(20).optional(),
  message:   z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
})

export async function submitUnifiedInquiry(prevState: any, formData: FormData) {
  // 1. Validate first — reject anything that doesn't match the schema
  const result = InquirySchema.safeParse({
    type:      formData.get('interest'),
    firstName: formData.get('firstName'),
    lastName:  formData.get('lastName'),
    email:     formData.get('email'),
    phone:     formData.get('phone') || undefined,
    message:   formData.get('message'),
  })

  if (!result.success) {
    return {
      success: false,
      message: result.error.errors[0]?.message ?? 'Invalid form data',
    }
  }

  // 2. Only validated data reaches the database
  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'inquiries',
      data: {
        ...result.data,
        status: 'new',
      },
    })

    return {
      success: true,
      message: 'Application submitted successfully! Our team will reach out soon.',
    }
  } catch (error) {
    console.error('Submission Error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please check your connection and try again.',
    }
  }
}
