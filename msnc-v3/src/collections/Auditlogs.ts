import type { CollectionConfig, Access } from 'payload'

// ─── Access ───────────────────────────────────────────────────────────────────

const isAdminOrAbove: Access = ({ req: { user } }) =>
  user?.role === 'super-admin' || user?.role === 'admin'

const isSuperAdmin: Access = ({ req: { user } }) =>
  user?.role === 'super-admin'

// ─── Collection ───────────────────────────────────────────────────────────────

export const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  admin: {
    useAsTitle: 'action',
    defaultColumns: ['action', 'actor', 'targetCollection', 'targetId', 'createdAt'],
    group: 'System',
    // Logs are read-only in the panel — no create/edit buttons
    hideAPIURL: true,
  },

  // ── Access ──────────────────────────────────────────────────────────────────
  access: {
    // Admins+ can read logs; only super-admins can purge them
    read:   isAdminOrAbove,
    create: () => false,   // only created via hooks / overrideAccess
    update: () => false,   // immutable
    delete: isSuperAdmin,
  },

  // Logs are never mutated after insert
  hooks: {},

  // ── Fields ──────────────────────────────────────────────────────────────────
  fields: [
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      required: false, // null when triggered by a system/seed operation
      admin: { readOnly: true },
    },
    {
      name: 'action',
      type: 'select',
      required: true,
      admin: { readOnly: true },
      options: [
        // Auth
        { label: 'Login',           value: 'auth.login' },
        { label: 'Logout',          value: 'auth.logout' },
        { label: 'Login Failed',    value: 'auth.login_failed' },
        { label: 'Password Reset',  value: 'auth.password_reset' },
        // Users
        { label: 'User Created',    value: 'user.created' },
        { label: 'User Updated',    value: 'user.updated' },
        { label: 'User Deleted',    value: 'user.deleted' },
        // Generic CRUD (for other collections)
        { label: 'Record Created',  value: 'record.created' },
        { label: 'Record Updated',  value: 'record.updated' },
        { label: 'Record Deleted',  value: 'record.deleted' },
      ],
    },
    {
      name: 'targetCollection',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'targetId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'detail',
      type: 'textarea',
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
  ],

  // Timestamps give us createdAt for free
  timestamps: true,
}