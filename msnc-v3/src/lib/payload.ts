import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { fallbackScholarships, fallbackPartners } from '@/lib/fallbacks'

// 1. FIXED RACE CONDITION: Cache both the client and the initialization promise
let cached = (globalThis as any).payloadCache
if (!cached) {
  cached = (globalThis as any).payloadCache = { client: null, promise: null }
}

export async function getCachedPayload() {
  if (cached.client) return cached.client

  const requiredEnv = ['DATABASE_URL', 'PAYLOAD_SECRET']
  const missing = requiredEnv.filter((k) => !process.env[k])

  if (missing.length) {
    console.error(`🚨 Missing env vars: ${missing.join(', ')}`)
    return null
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config: configPromise })
  }

  try {
    cached.client = await cached.promise
    console.log('✅ Payload connected')
    return cached.client
  } catch (err) {
    cached.promise = null // Reset promise so we can try again
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
      // RESTORED: This stops Payload from checking if an admin is logged in (which crashes public views)
      overrideAccess: true, 
      // SAFEGUARD: This ensures we don't accidentally leak unpublished drafts
      draft: false,         
      ...args,
    })
  } catch (err) {
    console.error(`[Payload find error: ${collection}]`, err)
    return null
  }
}

/* ---------------- SCHOLAR STATS ---------------- */

export async function getScholarStats() {
  const payload = await getCachedPayload()
  if (!payload) {
    return { total: 500, active: 42, completed: 0, successRate: 94, locations: 12 }
  }

  try {
    // FIXED: Added overrideAccess: true to bypass the auth check on these counts
    const [totalRes, activeRes, completedRes] = await Promise.all([
      payload.count({ collection: 'scholars', overrideAccess: true }),
      payload.count({ collection: 'scholars', overrideAccess: true, where: { status: { equals: 'active' } } }),
      payload.count({ collection: 'scholars', overrideAccess: true, where: { status: { equals: 'completed' } } })
    ])

    const total = totalRes.totalDocs
    const active = activeRes.totalDocs
    const completed = completedRes.totalDocs

    // FIXED: Added overrideAccess: true here as well
    const locationsQuery = await payload.find({
      collection: 'scholars',
      limit: 1000,
      overrideAccess: true,
      select: { location: true } // Fetch minimal data
    })
    
    // FIXED SET BUG: Ensure we are comparing IDs or strings, not object references
    const uniqueLocations = new Set(
      locationsQuery.docs
        .map((d: any) => typeof d.location === 'object' ? d.location?.id : d.location)
        .filter(Boolean)
    ).size

    return {
      total: total || 500,
      active: active || 42,
      completed,
      successRate: total ? Math.round((completed / total) * 100) : 94,
      locations: uniqueLocations || 12,
    }
  } catch (error) {
    console.error('Failed to get stats', error)
    return { total: 500, active: 42, completed: 0, successRate: 94, locations: 12 }
  }
}

/* ---------------- TESTIMONIALS ---------------- */

export async function getScholarTestimonials(limit = 5) {
  const result = await safeFind('scholars', {
    where: { isFeatured: { equals: true } },
    limit,
    depth: 1,
  })

  let docs = result?.docs || []

  if (!docs.length) {
    const fallback = await safeFind('scholars', { limit, depth: 1 })
    docs = fallback?.docs || []
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
    location: typeof doc.location === 'object' ? doc.location?.name : doc.location || null,
    institution: doc.institution || doc.cohortYear || null, 
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
      overrideAccess: true, // Restored here as well
      draft: false, 
    })
  } catch {
    return null
  }
}