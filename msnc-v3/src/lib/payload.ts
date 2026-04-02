import 'server-only'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { 
  fallbackScholarships, 
  fallbackPartners 
} from '@/lib/fallbacks'

// Performance: Cache the payload instance to prevent multiple connections
let cachedPayload: any = (globalThis as any).payload;
const isBuildPhase = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

export async function getCachedPayload() {
  if (isBuildPhase) {
    throw new Error('PAYLOAD_BUILD_SKIP')
  }
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: configPromise });
    (globalThis as any).payload = cachedPayload;
  }
  return cachedPayload;
}

// --- SCHOLARS ---
export async function getScholars(limit = 10) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'scholars',
      limit,
      sort: '-year',
    });
    return result.docs?.length > 0 ? result.docs : fallbackScholarships;
  } catch (error) {
    return fallbackScholarships;
  }
}

// --- PARTNERS ---
export async function getPartners(limit = 20) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'partners',
      limit,
      sort: 'name',
    });
    return result.docs?.length > 0 
      ? result.docs.map((doc: any) => ({ id: doc.id, name: doc.name, logoUrl: doc.logo?.url || null })) 
      : fallbackPartners;
  } catch (error) {
    return fallbackPartners;
  }
}

// --- PROGRAMS ---
export async function getPrograms() {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'programs',
      sort: 'order', 
    });
    return result.docs || [];
  } catch (error) {
    if ((error as Error)?.message !== 'PAYLOAD_BUILD_SKIP') {
      console.error("Fetch Error [getPrograms]:", error);
    }
    return [];
  }
}

// --- BLOGS ---
export async function getBlogs(limit = 6) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'blogs',
      limit,
      sort: '-publishedDate',
    });
    return result.docs || [];
  } catch (error) {
    if ((error as Error)?.message !== 'PAYLOAD_BUILD_SKIP') {
      console.error("Fetch Error [getBlogs]:", error);
    }
    return [];
  }
}

// --- EVENTS ---
export async function getEvents({ upcoming = true, limit = 10 } = {}) {
  try {
    const payload = await getCachedPayload();
    const now = new Date().toISOString();
    const result = await payload.find({
      collection: 'events',
      where: {
        eventDate: upcoming ? { greater_than_equal: now } : { less_than: now }
      },
      limit,
      sort: upcoming ? 'eventDate' : '-eventDate',
    });
    return result.docs || [];
  } catch (error) {
    return [];
  }
}

// --- TESTIMONIALS (Fixed Export & Performance) ---
export async function getTestimonials(limit = 5) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'testimonials',
      limit,
      sort: '-createdAt', 
      depth: 1, // Crucial for fetching the Media/Image object
    });
    return result.docs || [];
  } catch (error) {
    if ((error as Error)?.message !== 'PAYLOAD_BUILD_SKIP') {
      console.error("Fetch Error [getTestimonials]:", error);
    }
    return [];
  }
}

// --- GLOBALS ---
export async function getSiteSettings() {
  try {
    const payload = await getCachedPayload();
    return await payload.findGlobal({ slug: 'site-settings', draft: false });
  } catch (error) {
    return null;
  }
}
