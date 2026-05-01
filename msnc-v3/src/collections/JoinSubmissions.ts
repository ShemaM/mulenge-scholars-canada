import type { CollectionConfig } from 'payload'

export const JoinSubmissions: CollectionConfig = {
  slug: 'join-submissions',
  admin: {
    useAsTitle: 'fullName',
    group: 'Submissions',
    defaultColumns: ['fullName', 'email', 'interest', 'status', 'createdAt'],
    description: 'Applications submitted via the frontend Join/Partner forms.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'emailView',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/SubmissionEmailView#SubmissionEmailView',
        },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          admin: { readOnly: true },
        },
        {
          name: 'email',
          type: 'email',
          required: true,          // unique: true removed — same person can reapply
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'interest',
      type: 'select',
      required: true,
      defaultValue: 'general',
      admin: { readOnly: true },
      options: [
        { label: 'Scholar Applicant',    value: 'scholar' },
        { label: 'Volunteer Mentor',     value: 'volunteer' },
        { label: 'Institutional Partner', value: 'partner' },
        { label: 'General Support',      value: 'support' },
        { label: 'General Inquiry',      value: 'general' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      admin: { readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      required: true,             // added — prevents status being nulled via API
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
        description: 'Update this status as you process the application.',
      },
      options: [
        { label: '🟢 New',         value: 'new' },
        { label: '🟡 Under Review', value: 'reviewed' },
        { label: '⚪ Archived',    value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}