import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// --- CORE & AUTH ---
import { Users } from './collections/Users'
import { Media } from './collections/Media'

// --- EDITORIAL CONTENT ---
import { Blogs } from './collections/Blogs'
import { Events } from './collections/Events'
import { Programs } from './collections/Programs'

// --- NETWORK & LEADERSHIP ---
import Leadership from './collections/Leadership'
import { Partners } from './collections/Partners'
import { Scholars } from './collections/Scholars'
import { Testimonials } from './collections/Testimonials'

// --- INBOUND DATA ---
import Messages from './collections/Messages'
import { JoinSubmissions } from './collections/JoinSubmissions'

// --- GLOBALS & UI ---
import { SiteSettings } from './globals/SiteSettings'
import { Logo } from './components/admin/Logo'
import { Icon } from './components/admin/Icon'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // REMOVED: Hardcoded autoLogin for production security
    css: path.resolve(dirname, 'app/(payload)/custom.scss'),
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
    meta: {
      titleSuffix: '- MSNC Executive Board',
      favicon: '/assets/favicon.svg',
    },
  },

  // REGISTERED COLLECTIONS (Corrected Import Types)
  collections: [
    Users, 
    Media, 
    Leadership,
    Scholars,
    Testimonials,
    Partners,
    Programs,
    Blogs, 
    Events, 
    Messages,
    JoinSubmissions,
  ],

  globals: [SiteSettings],
  editor: lexicalEditor(),
  
  // SECURITY: Strictly env-based
  secret: process.env.PAYLOAD_SECRET as string,
  
  typescript: {
    outputFile: path.resolve(dirname, 'types/payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL as string,
      max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    },
  }),

  sharp,
})