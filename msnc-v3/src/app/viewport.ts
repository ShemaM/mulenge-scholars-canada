import { ViewportMeta } from 'next'

export default function viewport(): ViewportMeta {
  return {
    colorScheme: 'light dark',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  }
}

