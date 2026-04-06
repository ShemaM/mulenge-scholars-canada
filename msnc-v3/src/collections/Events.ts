import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: { 
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', '_status'],
    group: 'Editorial',
  },
  access: { read: () => true },
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
      name: 'eventDate', 
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
      name: 'description', 
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
      name: 'image', 
      type: 'upload', 
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content', 
      type: 'richText',
    }
  ],
}
