"use server";

import { z } from 'zod';
import { getPayload } from 'payload';
import config from '@payload-config';
import { checkRateLimit } from '@/lib/rate-limit';

// ─── i18n ─────────────────────────────────────────────────────────────────────

const copy = {
  en: {
    rateLimit:    'Too many requests. Please wait before trying again.',
    invalidEmail: 'Please enter a valid email address.',
    dup:          'This email is already subscribed to our newsletter.',
    success:      'Thank you for subscribing to The Dispatch! Welcome aboard.',
    failure:      'Subscription failed. Please try again.',
  },
  fr: {
    rateLimit:    'Trop de demandes. Veuillez patienter avant de réessayer.',
    invalidEmail: 'Veuillez saisir une adresse e-mail valide.',
    dup:          'Cette adresse e-mail est déjà abonnée à notre newsletter.',
    success:      'Merci de vous abonner à La Dépêche ! Bienvenue à bord.',
    failure:      'Abonnement échoué. Veuillez réessayer.',
  },
} as const;

type Locale = keyof typeof copy;

// ─── Schema ───────────────────────────────────────────────────────────────────

const NewsletterSchema = z.object({
  email:    z.string().email(),
  fullName: z.string().optional(),
  subject:  z.string().optional(),
  message:  z.string().optional(),
  locale:   z.enum(['en', 'fr']).default('en'),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLocale(formData: FormData): Locale {
  return formData.get('locale') === 'fr' ? 'fr' : 'en';
}

/** 30-day rolling window duplicate check */
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

// ─── Action ───────────────────────────────────────────────────────────────────

export async function submitNewsletterForm(
  _prevState: unknown,
  formData: FormData,
) {
  const locale = getLocale(formData);
  const t = copy[locale];

  // 1. Rate limit
  try {
    await checkRateLimit();
  } catch {
    return { success: false, message: t.rateLimit };
  }

  // 2. Validate — use schema so all fields are parsed in one pass
  const parsed = NewsletterSchema.safeParse({
    email:    formData.get('email'),
    fullName: formData.get('fullName'),
    subject:  formData.get('subject'),
    message:  formData.get('message'),
    locale:   formData.get('locale'),
  });

  if (!parsed.success) {
    // Email is the only truly required field; surface a specific message
    const isEmailError = parsed.error.issues.some(i => i.path.includes('email'));
    return { success: false, message: isEmailError ? t.invalidEmail : t.failure };
  }

  const { email, fullName, subject, message } = parsed.data;
  const lowerEmail = email.toLowerCase();

  // 3. Duplicate check — same email + type within rolling 30-day window
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: 'messages' as any,
    where: {
      and: [
        { email:     { equals: lowerEmail } },
        { type:      { equals: 'newsletter' } },
        { createdAt: { greater_than: new Date(Date.now() - THIRTY_DAYS_MS).toISOString() } },
      ],
    },
    limit: 1,       // we only need to know if one exists
    depth: 0,       // no relationship hydration needed
  });

  if (existing.docs.length > 0) {
    return { success: false, message: t.dup };
  }

  // 4. Persist
  try {
    await payload.create({
      collection: 'messages' as any,
      data: {
        name:    fullName || 'Newsletter Subscriber',
        email:   lowerEmail,
        subject: subject  || 'Newsletter Signup',
        message: message  || 'Newsletter subscription',
        type:    'newsletter',
        status:  'new',
      },
    });

    return { success: true, message: t.success };
  } catch (error) {
    console.error('[newsletter] create failed:', error);
    return { success: false, message: t.failure };
  }
}