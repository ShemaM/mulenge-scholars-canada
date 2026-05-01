import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
typescript: {
ignoreBuildErrors: true,
},
eslint: {
ignoreDuringBuilds: true,
},

productionBrowserSourceMaps: false,
poweredByHeader: false,
reactStrictMode: true,
compress: true,

// ✅ FIXED (NO payload here)
transpilePackages: [
'@payloadcms/richtext-lexical',
],

images: {
formats: ['image/webp', 'image/avif'],
deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
imageSizes: [16, 32, 48, 64, 96, 128, 256],
minimumCacheTTL: 60 * 60 * 24 * 30,
remotePatterns: [
{
protocol: 'https',
hostname: '*.public.blob.vercel-storage.com',
pathname: '/**',
},
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
{
protocol: 'http',
hostname: 'localhost',
},
{
protocol: 'https',
hostname: 'mulengescholars.org',
pathname: '/**',
},
{
protocol: 'https',
hostname: '[www.mulengescholars.org](http://www.mulengescholars.org)',
pathname: '/**',
},
],
},

experimental: {
serverActions: {
bodySizeLimit: '10mb',
},
optimizePackageImports: ['lucide-react'],
},

async headers() {
return [
{
source: '/(.*)',
headers: [
{ key: 'X-Content-Type-Options', value: 'nosniff' },
{ key: 'X-Frame-Options', value: 'DENY' },
{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
],
},
{
source: '/media/(.*)',
headers: [
{
key: 'Cache-Control',
value: 'public, max-age=31536000, immutable',
},
],
},
]
},
}

export default withPayload(withNextIntl(nextConfig))
