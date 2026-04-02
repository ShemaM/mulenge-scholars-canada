import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { 
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', '_status'], // Shows status in the list view
    group: 'Editorial',
  },
  access: { read: () => true },
  // Enable Drafts (replaces your isPublished checkbox with a pro workflow)
  versions: {
    drafts: true,
  },
  fields: [
    { 
      name: 'title', 
      type: 'text', 
      required: true 
    },
    { 
      name: 'slug', 
      type: 'text', 
      required: true, 
      unique: true,
      admin: {
        description: 'URL-friendly name (e.g., leadership-summit-2026)'
      }
    },
    { 
      name: 'date', 
      type: 'date', 
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        }
      }
    },
    { 
      name: 'location', 
      type: 'text', 
      required: true,
      admin: { placeholder: 'e.g., Nairobi, Kenya or Virtual (Zoom)' }
    },
    {
      name: 'description', // Added: Needed for the card preview text
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary for the homepage card' }
    },
    { 
      name: 'registrationLink', 
      type: 'text',
      admin: { description: 'Link to Eventbrite, Zoom, or Google Form' }
    },
    { 
      name: 'image', // Renamed from thumbnail to match EventPreview.tsx logic
      type: 'upload', 
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content', // Added: For the actual event page details
      type: 'richText',
    }
  ],
}