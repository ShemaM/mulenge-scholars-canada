import crypto from 'crypto'
import type { CollectionAfterLoginHook, CollectionAfterLogoutHook } from 'payload'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getIp(req: Request & { socket?: { remoteAddress?: string } }): string | null {
  return (
    (req.headers?.get?.('x-forwarded-for') as string | null) ??
    req.socket?.remoteAddress ??
    null
  )
}

function getUserAgent(req: Request): string | null {
  return req.headers?.get?.('user-agent') ?? null
}

/** Session token = 32 random bytes as hex */
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/** Token expiry matches Payload's tokenExpiration (2 hours) */
function sessionExpiry(): Date {
  const d = new Date()
  d.setSeconds(d.getSeconds() + 7200)
  return d
}

// ─── afterLogin ──────────────────────────────────────────────────────────────
// Wired to Users collection via hooks.afterLogin

export const afterLoginHook: CollectionAfterLoginHook = async ({ req, user }) => {
  const ip        = getIp(req as any)
  const userAgent = getUserAgent(req as any)

  // 1. Create a session record
  try {
    await req.payload.create({
      collection: 'sessions',
      data: {
        user:         user.id,
        sessionToken: generateToken(),
        ipAddress:    ip,
        userAgent,
        isActive:     true,
        expiresAt:    sessionExpiry().toISOString(),
      },
      overrideAccess: true,
    })
  } catch (_) {}

  // 2. Update user's lastLogin timestamp
  try {
    await req.payload.update({
      collection: 'users',
      id:         user.id,
      data:       { lastLogin: new Date().toISOString() },
      overrideAccess: true,
    })
  } catch (_) {}

  // 3. Audit log
  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        actor:            user.id,
        action:           'auth.login',
        targetCollection: 'users',
        targetId:         String(user.id),
        detail:           `"${user.email}" logged in.`,
        ipAddress:        ip,
        userAgent,
      },
      overrideAccess: true,
    })
  } catch (_) {}

  return user
}

// ─── afterLogout ─────────────────────────────────────────────────────────────
// Wired to Users collection via hooks.afterLogout

export const afterLogoutHook: CollectionAfterLogoutHook = async ({ req }) => {
  const user      = req.user
  const ip        = getIp(req as any)
  const userAgent = getUserAgent(req as any)

  if (!user) return

  // Mark all active sessions for this user as revoked
  try {
    const { docs: activeSessions } = await req.payload.find({
      collection: 'sessions',
      where: {
        and: [
          { user:     { equals: user.id } },
          { isActive: { equals: true } },
        ],
      },
      overrideAccess: true,
    })

    await Promise.all(
      activeSessions.map((session) =>
        req.payload.update({
          collection: 'sessions',
          id:         session.id,
          data: {
            isActive:  false,
            revokedAt: new Date().toISOString(),
            revokedBy: user.id,
          },
          overrideAccess: true,
        })
      )
    )
  } catch (_) {}

  // Audit log
  try {
    await req.payload.create({
      collection: 'audit-logs',
      data: {
        actor:            user.id,
        action:           'auth.logout',
        targetCollection: 'users',
        targetId:         String(user.id),
        detail:           `"${user.email}" logged out.`,
        ipAddress:        ip,
        userAgent,
      },
      overrideAccess: true,
    })
  } catch (_) {}
}