import { headers } from 'next/headers'

const requests = new Map<string, { count: number; resetAt: number }>()

const WINDOW_MS = 60 * 1000  // 1 minute
const MAX_REQUESTS = 5        // per IP per window

export async function checkRateLimit(identifier?: string) {
  const headersList = await headers()
  const ip = identifier
    ?? headersList.get('x-forwarded-for')?.split(',')[0].trim()
    ?? headersList.get('x-real-ip')
    ?? 'anonymous'

  const now = Date.now()
  const record = requests.get(ip)

  if (!record || now > record.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return
  }

  if (record.count >= MAX_REQUESTS) {
    throw new Error('Too many requests. Please wait a moment before trying again.')
  }

  record.count++
}
