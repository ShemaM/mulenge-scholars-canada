import type { CollectionConfig } from 'payload'

export const JoinSubmissions: CollectionConfig = {
  slug: 'join-submissions',
  admin: { useAsTitle: 'fullName' },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'message', type: 'textarea' },
  ],
}
