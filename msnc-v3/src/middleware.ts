import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export default function middleware(req: NextRequest) {
  // Redirect /en → / and /en/anything → /anything
  if (req.nextUrl.pathname === '/en' || req.nextUrl.pathname.startsWith('/en/')) {
    const newPath = req.nextUrl.pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(new URL(newPath, req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
};