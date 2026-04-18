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
    create: () => true, // Public can submit
    read: ({ req: { user } }) => !!user, // Only admins can read
    update: ({ req: { user } }) => !!user, // Only admins can update status
    delete: ({ req: { user } }) => !!user, // Only admins can delete
  },
  fields: [
    {
      type: 'row', // UX: Groups fields side-by-side in the admin panel
      fields: [
        { 
          name: 'fullName', 
          type: 'text', 
          required: true, 
          admin: { readOnly: true } // Prevents admins from accidentally changing user input
        },
        { 
          name: 'email', 
          type: 'email', 
          required: true, 
          admin: { readOnly: true } 
        },
      ],
    },
    { 
      name: 'phone', 
      type: 'text', 
      admin: { readOnly: true } 
    },
    { 
      name: 'interest', 
      type: 'select', 
      required: true,
      admin: { readOnly: true },
      options: [
        // CRITICAL FIX: Matches the frontend form roles exactly to prevent database rejections
        { label: 'Scholar Applicant', value: 'scholar' },
        { label: 'Volunteer Mentor', value: 'volunteer' },
        { label: 'Institutional Partner', value: 'partner' },
        { label: 'General Support', value: 'support' },
        { label: 'General Inquiry', value: 'general' },
      ],
      defaultValue: 'general',
    },
    { 
      name: 'message', 
      type: 'textarea', 
      admin: { readOnly: true } 
    },
    // ─── ADMIN CONTROLS ───
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar', // UX: Moves this to the right-hand sidebar for workflow management
        description: 'Update this status as you process the application.',
      },
      options: [
        { label: '🟢 New / Unread', value: 'new' },
        { label: '🟡 Under Review', value: 'reviewed' },
        { label: '⚪ Archived', value: 'archived' },
      ],
    },
  ],
  timestamps: true,
}