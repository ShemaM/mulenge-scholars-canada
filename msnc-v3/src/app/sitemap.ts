import { getCachedPayload } from '@/lib/payload'
import { SITE_URL } from '@/lib/site'
import type { MetadataRoute } from 'next'

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL

  const staticPages = [
    '/',
    '/about',
    '/contact',
    '/donate',
    '/join',
    '/events',
    '/programs',
    '/leadership',
    '/blog',
    '/impact',
    '/impact/rebuilding-futures',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  let payload

  try {
    payload = await getCachedPayload()
  } catch (error) {
    console.error('Sitemap Payload error:', error)
    return staticPages
  }

  if (!payload) return staticPages

  const events = await payload.find({
    collection: 'events',
    limit: 100,
    where: { published: { equals: true } },
  })

  const eventPages = events.docs.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) as MetadataRoute.Sitemap

  const programs = await payload.find({
    collection: 'programs',
    limit: 100,
    where: { published: { equals: true } },
  })

  const programPages = programs.docs.map((program) => ({
    url: `${baseUrl}/programs/${program.slug}`,
    lastModified: new Date(program.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  })) as MetadataRoute.Sitemap

  const leadership = await payload.find({
    collection: 'leadership',
    limit: 100,
    where: { published: { equals: true } },
  })

  const leadershipPages = leadership.docs.map((leader) => ({
    url: `${baseUrl}/leadership/${leader.slug}`,
    lastModified: new Date(leader.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  })) as MetadataRoute.Sitemap

  const blogs = await payload.find({
    collection: 'blogs',
    limit: 100,
    where: { published: { equals: true } },
  })

  const blogPages = blogs.docs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  })) as MetadataRoute.Sitemap

  return [...staticPages, ...eventPages, ...programPages, ...leadershipPages, ...blogPages]
}

export const dynamic = 'force-dynamic'
