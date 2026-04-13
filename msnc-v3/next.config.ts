import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 1. Dev stability + build bypass
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Fix source map issues in dev
  productionBrowserSourceMaps: false,



  sassOptions: {
    includePaths: ['./src/app/(payload)'],
    prependData: `@import "custom.scss";`,
  },

  // 2. Image Optimization for Vercel Blob & Supabase
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

  // 3. Payload 3.0 Specific Tuning
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
}

export default withPayload(nextConfig)
