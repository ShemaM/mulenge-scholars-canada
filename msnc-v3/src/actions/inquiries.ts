'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function submitUnifiedInquiry(prevState: any, formData: FormData) {
  const payload = await getPayload({ config })

  try {
    // 1. Collect data from the form fields
    const data = {
      type: formData.get('interest') as string, // Matches our 'scholar', 'support', etc.
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      status: 'new',
    }

    // 2. Create the entry in the 'inquiries' collection
    await payload.create({
      collection: 'users' as any,
      data: data as any,
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
