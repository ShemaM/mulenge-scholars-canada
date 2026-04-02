import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // 1. Allow images from your Supabase bucket
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fdchvoehlteusfsrrkmi.supabase.co', // Your Supabase project ID
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  experimental: {
    workerThreads: true,
  },
  // 2. Remove the turbopack.root and webpack alias overrides. 
  // Payload 3.0 handles the TS-to-JS mapping internally.
}

export default withPayload(nextConfig)
