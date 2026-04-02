import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['super-admin', 'admin', 'mentor'],
      defaultValue: 'mentor',
      required: true,
    },
  ],
}
