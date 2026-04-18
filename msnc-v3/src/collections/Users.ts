import type { CollectionConfig, Access, FieldAccess } from 'payload'
import { afterLoginHook, afterLogoutHook } from './Authhooks'

// ─── Role helpers ─────────────────────────────────────────────────────────────

export type UserRole = 'super-admin' | 'admin' | 'editor'

const isSuperAdmin: Access = ({ req: { user } }) => (user as any)?.role === 'super-admin'

const isAdminOrAbove: Access = ({ req: { user } }) =>
  (user as any)?.role === 'super-admin' || (user as any)?.role === 'admin'

const isAnyStaff = ({ req: { user } }: { req: any }) => Boolean(user)

/** A user can always read/update their own doc */
const isSelfOrAdmin: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if ((user as any).role === 'super-admin' || (user as any).role === 'admin') return true
  return user.id === id
}

/** Only super-admins can read or write the role field on other users */
const roleFieldAccess: FieldAccess = ({ req: { user }, id }) => {
  if (!user) return false
  if ((user as any).role === 'super-admin') return true
  // admins can set role only on docs that are not themselves
  if ((user as any).role === 'admin') return user.id !== id
  return false
}

// ─── Collection ───────────────────────────────────────────────────────────────

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'role', 'createdAt'],
    group: 'System',
  },

  // ── Access ──────────────────────────────────────────────────────────────────
  access: {
    // Only staff can see the users list
    read: isSelfOrAdmin,
    // Only admins+ can create users
    create: isAdminOrAbove,
    // Users can update themselves; admins can update others
    update: isSelfOrAdmin,
    // Only super-admins can delete
    delete: isSuperAdmin,
    // Who can log in to the Payload admin panel
    admin: isAnyStaff,
  },

  // ── Hooks ───────────────────────────────────────────────────────────────────
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Fire-and-forget audit log — non-blocking
        try {
          await req.payload.create({
            collection: 'audit-logs' as any,
            data: {
              actor: req.user?.id ?? null,
              action: operation === 'create' ? 'user.created' : 'user.updated',
              targetCollection: 'users',
              targetId: String(doc.id),
              detail: `User "${doc.email}" was ${operation === 'create' ? 'created' : 'updated'}.`,
              ipAddress: (req.headers?.get?.('x-forwarded-for') as string) ?? null,
              userAgent: req.headers?.get?.('user-agent') ?? null,
            },
            overrideAccess: true,
          })
        } catch (_) {
          // Audit failure must never break the main operation
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        try {
          await req.payload.create({
            collection: 'audit-logs' as any,
            data: {
              actor: req.user?.id ?? null,
              action: 'user.deleted',
              targetCollection: 'users',
              targetId: String(doc.id),
              detail: `User "${doc.email}" was permanently deleted.`,
              ipAddress: (req.headers?.get?.('x-forwarded-for') as string) ?? null,
              userAgent: req.headers?.get?.('user-agent') ?? null,
            },
            overrideAccess: true,
          })
        } catch (_) {}
      },
    ],
    // afterLogin:  [afterLoginHook],
    // afterLogout: [afterLogoutHook],
  },

  // ── Fields ──────────────────────────────────────────────────────────────────
  fields: [
    // Virtual title field used by admin UI
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor' satisfies UserRole,
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        read: roleFieldAccess,
        update: roleFieldAccess,
      },
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Inactive users cannot log in.',
      },
    },
    {
      name: 'lastLogin',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { displayFormat: 'PPpp' },
      },
    },
    // Divider — profile section
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'department',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'avatarUrl',
      type: 'text',
      admin: { description: 'Optional profile image URL.' },
    },
  ],
}
