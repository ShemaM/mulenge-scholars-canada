import type { CollectionConfig } from 'payload'

export const JoinSubmissions: CollectionConfig = {
  slug: 'join-submissions',
  admin: {
    useAsTitle: 'fullName',
    group: 'Submissions',
    defaultColumns: ['fullName', 'email', 'interest', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: 'fullName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { 
      name: 'interest', 
      type: 'select', 
      required: true,
      options: [
        { label: 'Volunteer Mentor', value: 'volunteer' },
        { label: 'Scholar Applicant', value: 'scholar' },
      ],
      defaultValue: 'volunteer',
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Archived', value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}
