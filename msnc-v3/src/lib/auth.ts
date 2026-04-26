import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function requireAdmin() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })

  if (!user) {
    throw new Error('Unauthenticated')
  }

  if (user.role !== 'admin' && user.role !== 'super-admin') {
    throw new Error('Forbidden')
  }

  return { payload, user }
}
