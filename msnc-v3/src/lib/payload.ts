// import 'server-only' // Removed for client compat, ensure no client use
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { fallbackScholarships, fallbackPartners } from '@/lib/fallbacks'
import { normalizeSiteLocale } from '@/lib/site-copy'

/**
 * HCI Principle #4: Error Prevention
 * We removed the 5s timeout. Cross-continental handshakes (Nairobi -> Canada)
 * need more time during the initial "cold start."
 */
let cachedPayload: any = (globalThis as any).payload || null

export async function getCachedPayload() {
  if (cachedPayload) return cachedPayload

  // Production env validation
  const requiredEnv = ['DATABASE_URL', 'PAYLOAD_SECRET', 'BLOB_READ_WRITE_TOKEN']
  const missingEnv = requiredEnv.filter((key) => !process.env[key])
  if (missingEnv.length > 0) {
    console.error(`🚨 PRODUCTION ERROR: Missing env vars: ${missingEnv.join(', ')}`)
    return null
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('🏛️ PROD: Initializing Payload + Postgres (Vercel Serverless)...')
    console.log('   DB Host:', new URL(process.env.DATABASE_URL!).hostname)
    console.log('   Server:', typeof window === 'undefined' ? 'Server' : 'Client')
  } else {
    console.log('🏛️ MSNC System: Initializing Database Connection...')
  }

  try {
    cachedPayload = await getPayload({
      config: configPromise,
    })

    if (cachedPayload) {
      ;(globalThis as any).payload = cachedPayload
      console.log('✅ MSNC System: Database Connected Successfully.')
    } else {
      console.warn('⚠️ Payload init returned null')
    }
  } catch (error) {
    console.error('❌ MSNC System: Database Connection Failed:', error)
    cachedPayload = null
  }

  return cachedPayload
}

// --- SCHOLARS ---
export async function getScholars(limit = 10) {
  const payload = await getCachedPayload()

  if (!payload) {
    console.warn('⚠️ MSNC Alert: Database offline, using Fallback Scholars.')
    return fallbackScholarships
  }

  try {
    const result = await payload.find({
      collection: 'scholars',
      limit,
      sort: '-year',
    })

    // HCI: Only fallback if the DB is actually empty
    return result.docs?.length > 0 ? result.docs : fallbackScholarships
  } catch (error) {
    console.error('Fetch Error [getScholars]:', error)
    return fallbackScholarships
  }
}

// --- PARTNERS ---
export async function getPartners(limit = 20) {
  const payload = await getCachedPayload()
  if (!payload) return fallbackPartners

  try {
    const result = await payload.find({
      collection: 'partners',
      limit,
      sort: 'name',
    })
    return result.docs?.length > 0
      ? result.docs.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          logoUrl: doc.logo?.url || null,
        }))
      : fallbackPartners
  } catch (error) {
    return fallbackPartners
  }
}

// --- PROGRAMS ---
export async function getPrograms(locale?: string) {
  const payload = await getCachedPayload()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'programs',
      sort: 'order', // Ascending for pillar display order
      locale: normalizeSiteLocale(locale),
      fallbackLocale: 'en',
    })
    return result.docs || []
  } catch (error) {
    console.error('Fetch Error [getPrograms]:', error)
    return []
  }
}

// --- BLOGS ---
export async function getBlogs(limit = 6, locale?: string) {
  const payload = await getCachedPayload()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'blogs',
      limit,
      sort: '-publishedDate',
      locale: normalizeSiteLocale(locale),
      fallbackLocale: 'en',
    })
    return result.docs || []
  } catch (error) {
    console.error('Fetch Error [getBlogs]:', error)
    return []
  }
}

// --- SINGLE BLOG ---
export async function getBlogBySlug(slug: string, locale?: string) {
  const payload = await getCachedPayload()
  if (!payload) return null

  try {
    const result = await payload.find({
      collection: 'blogs',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 1, // To populate featuredImage
      locale: normalizeSiteLocale(locale),
      fallbackLocale: 'en',
    })
    return result.docs[0] || null
  } catch (error) {
    console.error(`Fetch Error [getBlogBySlug: ${slug}]:`, error)
    return null
  }
}

// --- EVENTS ---
export async function getEvents({ upcoming = true, limit = 10, locale }: { upcoming?: boolean; limit?: number; locale?: string } = {}) {
  const payload = await getCachedPayload()
  if (!payload) return []

  try {
    const now = new Date().toISOString()
    const result = await payload.find({
      collection: 'events',
      where: {
        eventDate: upcoming ? { greater_than_equal: now } : { less_than: now },
      },
      limit,
      sort: upcoming ? 'eventDate' : '-eventDate',
      locale: normalizeSiteLocale(locale),
      fallbackLocale: 'en',
    })
    return result.docs || []
  } catch (error) {
    return []
  }
}

// --- TESTIMONIALS ---
export async function getTestimonials(limit = 5, locale?: string) {
  const payload = await getCachedPayload()
  if (!payload) return []

  try {
    const result = await payload.find({
      collection: 'testimonials',
      limit,
      sort: '-createdAt',
      depth: 1,
      locale: normalizeSiteLocale(locale),
      fallbackLocale: 'en',
    })
    return result.docs || []
  } catch (error) {
    console.error('Fetch Error [getTestimonials]:', error)
    return []
  }
}

// --- GLOBALS ---
export async function getSiteSettings(locale?: string) {
  const payload = await getCachedPayload()
  if (!payload) return null

  try {
    return await payload.findGlobal({
      slug: 'site-settings',
      draft: false,
      locale: normalizeSiteLocale(locale),
      fallbackLocale: 'en',
    })
  } catch (error) {
    return null
  }
}
