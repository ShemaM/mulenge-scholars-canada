import { getCachedPayload } from '@/lib/payload'
import { SITE_URL } from '@/lib/site'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL

const staticPages: MetadataRoute.Sitemap = [
  { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'weekly' as const, lastModified: new Date() },
  { url: `${baseUrl}/about`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/programs`, priority: 0.9, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/leadership`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/events`, priority: 0.8, changeFrequency: 'weekly' as const, lastModified: new Date() },
  { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' as const, lastModified: new Date() },
  { url: `${baseUrl}/impact/rebuilding-futures`, priority: 0.8, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/join`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/contact`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/donate`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/programs/adult-learning-pathways`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/programs/high-school-support`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
  { url: `${baseUrl}/programs/workshops-community`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: new Date() },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let payload
  try {
    payload = await getCachedPayload()
  } catch {
    return staticPages
  }

  if (!payload) return staticPages

  const [events, programs, leadership, blogs] = await Promise.all([
    payload.find({ collection: 'events', limit: 100, where: { published: { equals: true } } }),
    payload.find({ collection: 'programs', limit: 100, where: { published: { equals: true } } }),
    payload.find({ collection: 'leadership', limit: 100, where: { published: { equals: true } } }),
    payload.find({ collection: 'blogs', limit: 100, where: { published: { equals: true } } }),
  ])

  const dynamicPages: MetadataRoute.Sitemap = [
    ...events.docs.map((doc: { slug: any; updatedAt: string | number | Date }) => ({
      url: `${baseUrl}/events/${doc.slug}`,
      lastModified: new Date(doc.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...programs.docs.map((doc: { slug: any; updatedAt: string | number | Date }) => ({
      url: `${baseUrl}/programs/${doc.slug}`,
      lastModified: new Date(doc.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...leadership.docs.map((doc: { slug: any; updatedAt: string | number | Date }) => ({
      url: `${baseUrl}/leadership/${doc.slug}`,
      lastModified: new Date(doc.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...blogs.docs.map((doc: { slug: any; updatedAt: string | number | Date }) => ({
      url: `${baseUrl}/blog/${doc.slug}`,
      lastModified: new Date(doc.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ]

  return [...staticPages, ...dynamicPages]
}