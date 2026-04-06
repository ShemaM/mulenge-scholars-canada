import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onwq4czaexzxtq41.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fdchvoehlteusfsrrkmi.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default withPayload(nextConfig)