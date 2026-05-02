import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { fallbackScholarships, fallbackPartners } from '@/lib/fallbacks'

let cachedPayload: any = (globalThis as any).payload || null

export async function getCachedPayload() {
  if (cachedPayload) return cachedPayload

  const requiredEnv = ['DATABASE_URL', 'PAYLOAD_SECRET']
  const missing = requiredEnv.filter((k) => !process.env[k])

  if (missing.length) {
    console.error(`🚨 Missing env vars: ${missing.join(', ')}`)
    return null
  }

  try {
    cachedPayload = await getPayload({
      config: configPromise,
    })

    ;(globalThis as any).payload = cachedPayload

    console.log('✅ Payload connected')
    return cachedPayload
  } catch (err) {
    console.error('❌ Payload init failed:', err)
    return null
  }
}

/* ---------------- SAFE WRAPPER ---------------- */

async function safeFind(collection: string, args: any) {
  const payload = await getCachedPayload()
  if (!payload) return null

  try {
    return await payload.find({
      collection,
      overrideAccess: true,
      ...args,
    })
  } catch (err) {
    console.error(`[Payload find error: ${collection}]`, err)
    return null
  }
}

/* ---------------- SCHOLAR STATS ---------------- */

export async function getScholarStats() {
  const result = await safeFind('scholars', {
    limit: 1000,
  })

  const docs = result?.docs || []

  const total = docs.length
  const active = docs.filter((d: any) => d.status === 'active').length
  const completed = docs.filter((d: any) => d.status === 'completed').length
  const locations = new Set(docs.map((d: any) => d.location).filter(Boolean)).size

  return {
    total: total || 500,
    active: active || 42,
    completed,
    successRate: total ? Math.round((completed / total) * 100) : 94,
    locations: locations || 12,
  }
}

/* ---------------- TESTIMONIALS ---------------- */

export async function getScholarTestimonials(limit = 5) {
  const result = await safeFind('scholars', {
    where: {
      isFeatured: { equals: true },
    },
    limit,
    depth: 1,
  })

  const docs = result?.docs || []

  if (!docs.length) {
    const fallback = await safeFind('scholars', {
      limit,
      depth: 1,
    })

    return (fallback?.docs || []).map(mapScholarToTestimonial)
  }

  return docs.map(mapScholarToTestimonial)
}

/* ---------------- MAPPER ---------------- */

function mapScholarToTestimonial(doc: any) {
  const programLabels: Record<string, string> = {
    'high-school': 'High School Support',
    'adult-learning': 'Adult Learning',
    'rebuilding-futures': 'Rebuilding Futures',
    workshops: 'Workshops',
  }

  return {
    id: String(doc.id || ''),
    name: doc.fullName || 'Scholar',
    role: programLabels[doc.program] || 'MSNC Scholar',
    location: doc.location || null,
    institution: doc.cohortYear || null,
    quote: doc.quote || 'MSNC experience was transformative.',
    image: doc.photo?.url ? { url: doc.photo.url } : null,
    imageUrl: doc.photo?.url || null,
  }
}

/* ---------------- SCHOLARS ---------------- */

export async function getScholars(limit = 10) {
  const result = await safeFind('scholars', {
    limit,
    sort: '-createdAt',
  })

  return result?.docs?.length ? result.docs : fallbackScholarships
}

/* ---------------- PARTNERS ---------------- */

export async function getPartners(limit = 20) {
  const result = await safeFind('partners', {
    limit,
    sort: 'name',
  })

  if (!result?.docs?.length) return fallbackPartners

  return result.docs.map((doc: any) => ({
    id: doc.id,
    name: doc.name,
    logoUrl: doc.logo?.url || null,
  }))
}

/* ---------------- BLOGS ---------------- */

export async function getBlogs({ limit = 6 } = {}) {
  const result = await safeFind('blogs', {
    limit,
    sort: '-publishedDate',
    depth: 1,
  })

  return result?.docs || []
}

/* ---------------- EVENTS ---------------- */

export async function getEvents({ upcoming = true, limit = 10 } = {}) {
  const now = new Date().toISOString()

  const result = await safeFind('events', {
    limit,
    sort: upcoming ? 'eventDate' : '-eventDate',
    where: {
      eventDate: upcoming
        ? { greater_than_equal: now }
        : { less_than: now },
    },
    depth: 1,
  })

  return result?.docs || []
}

/* ---------------- TESTIMONIALS COLLECTION ---------------- */

export async function getTestimonials(limit = 5) {
  const result = await safeFind('testimonials', {
    limit,
    sort: '-createdAt',
    depth: 1,
  })

  return result?.docs || []
}

/* ---------------- PROGRAMS ---------------- */

export async function getPrograms(locale?: string) {
  const result = await safeFind('programs', {
    limit: 20,
    sort: 'order',
    depth: 1,
  })

  const docs = result?.docs || []

  // Filter by locale if provided
  if (locale) {
    const normalized = locale === 'fr' ? 'fr' : 'en'
    return docs.filter((d: any) => d.locale === normalized || !d.locale)
  }

  return docs
}

/* ---------------- GLOBAL ---------------- */

export async function getSiteSettings() {
  const payload = await getCachedPayload()
  if (!payload) return null

  try {
    return await payload.findGlobal({
      slug: 'site-settings',
      draft: false,
      overrideAccess: true,
    })
  } catch {
    return null
  }
}
