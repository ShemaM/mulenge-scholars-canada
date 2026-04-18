import type { CollectionConfig, Access } from 'payload'

// ─── Access ───────────────────────────────────────────────────────────────────

const isAdminOrAbove: Access = ({ req: { user } }) =>
  user?.role === 'super-admin' || user?.role === 'admin'

/** A user can see their own sessions; admins can see all */
const canReadSession: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin' || user.role === 'admin') return true
  // Payload will filter by the where clause below for regular users
  return { user: { equals: user.id } }
}

// ─── Collection ───────────────────────────────────────────────────────────────

export const Sessions: CollectionConfig = {
  slug: 'sessions',
  admin: {
    useAsTitle: 'sessionToken',
    defaultColumns: ['user', 'ipAddress', 'isActive', 'createdAt', 'expiresAt'],
    group: 'System',
    hideAPIURL: true,
  },

  // ── Access ──────────────────────────────────────────────────────────────────
  access: {
    read:   canReadSession,
    create: () => false,       // created only via the login hook
    update: isAdminOrAbove,    // admins can revoke (flip isActive)
    delete: isAdminOrAbove,
  },

  // ── Fields ──────────────────────────────────────────────────────────────────
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'sessionToken',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to revoke this session.' },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
        date: { displayFormat: 'PPpp' },
      },
    },
    {
      name: 'revokedAt',
      type: 'date',
      admin: {
        readOnly: true,
        date: { displayFormat: 'PPpp' },
        description: 'Set automatically when the session is revoked.',
      },
    },
    {
      name: 'revokedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true },
    },
  ],

  timestamps: true,
}