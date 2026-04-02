import { getPayload } from 'payload'
import configPromise from '@/payload.config'

/**
 * SHARED PAYLOAD INSTANCE
 * Prevents multiple database handshakes. In Next.js 15+, 
 * using the configPromise is the recommended pattern.
 */
let cachedPayload: any = (global as any).payload;

if (!cachedPayload) {
  cachedPayload = (global as any).payload = null;
}

export async function getCachedPayload() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config: configPromise });
    (global as any).payload = cachedPayload;
  }
  return cachedPayload;
}

/**
 * 1. GET SITE SETTINGS
 */
export async function getSiteSettings() {
  try {
    const payload = await getCachedPayload();
    return await payload.findGlobal({
      slug: 'site-settings',
      draft: false, // Ensures we only get published global data
    })
  } catch (error) {
    console.error("Payload Fetch Error [getSiteSettings]:", error);
    return null;
  }
}

/**
 * 2. GET EVENTS
 */
export async function getEvents({ 
  upcoming = true, 
  limit = 10 
}: { 
  upcoming?: boolean; 
  limit?: number 
} = {}) {
  try {
    const payload = await getCachedPayload();
    const now = new Date().toISOString();
    
    // Safety: Only query _status if you have versions enabled in your collection
    const result = await payload.find({
      collection: 'events',
      where: {
        and: [
          // If you get a '_status' error, remove this line until drafts are enabled
          // { _status: { equals: 'published' } }, 
          { eventDate: upcoming ? { greater_than_equal: now } : { less_than: now } }
        ]
      },
      limit,
      sort: upcoming ? 'eventDate' : '-eventDate',
    });
    return result.docs;
  } catch (error) {
    console.error("Payload Fetch Error [getEvents]:", error);
    return [];
  }
}

/**
 * 3. GET PARTNERS
 */
export async function getPartners(limit = 20) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'partners',
      limit,
      sort: 'name',
    });
    
    return result.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      logoUrl: doc.logo?.url || null
    }));
  } catch (error) {
    console.error("Payload Fetch Error [getPartners]:", error);
    return [];
  }
}

/**
 * 4. GET PROGRAMS
 */
export async function getPrograms() {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'programs',
      sort: 'order', 
    });
    return result.docs;
  } catch (error) {
    console.error("Payload Fetch Error [getPrograms]:", error);
    return [];
  }
}

/**
 * 5. GET SCHOLARS
 */
export async function getScholars(limit = 10) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'scholars',
      limit,
      sort: '-year',
    });
    return result.docs;
  } catch (error) {
    console.error("Payload Fetch Error [getScholars]:", error);
    return [];
  }
}

/**
 * 6. GET BLOGS
 */
export async function getBlogs(limit = 6) {
  try {
    const payload = await getCachedPayload();
    const result = await payload.find({
      collection: 'blogs',
      limit,
      sort: '-publishedDate',
      // draft: false, // Cleaner way to handle published only
    });
    return result.docs;
  } catch (error) {
    console.error("Payload Fetch Error [getBlogs]:", error);
    return [];
  }
}