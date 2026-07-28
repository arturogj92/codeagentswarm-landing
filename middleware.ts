import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const COOKIE_NAME = 'dashboard_session'

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET env var is not set')
  return new TextEncoder().encode(secret)
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return false
  try {
    // Imported lazily: only /dashboard and /login need it, and those get
    // almost no traffic. Keeping it out of the module scope means the hot
    // path ("/" locale detection) doesn't pay for jose on every cold start.
    const { jwtVerify } = await import('jose')
    await jwtVerify(token, getJwtSecret())
    return true
  } catch {
    return false
  }
}

const intlMiddleware = createIntlMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Dashboard routes: require authentication
  if (pathname.startsWith('/dashboard')) {
    const authed = await isAuthenticated(request)
    if (!authed) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  // Login page: redirect to dashboard if already authenticated
  if (pathname === '/login') {
    const authed = await isAuthenticated(request)
    if (authed) {
      return NextResponse.redirect(new URL('/dashboard/emails', request.url))
    }
    return NextResponse.next()
  }

  // Only "/" reaches this point (see the matcher): resolve the visitor's
  // locale and redirect to /en or /es.
  return intlMiddleware(request)
}

// Middleware runs BEFORE the CDN cache, so every matched path costs Fluid
// Active CPU even when the page itself is a prerendered cache HIT. Keep this
// list as small as possible.
//
// Deliberately NOT matched:
//   '/(en|es)/:path*' - every localized page already carries its locale in the
//     URL and `localePrefix` is 'always' with no `pathnames` mapping, so the
//     intl middleware had nothing to rewrite. It only stamped the NEXT_LOCALE
//     cookie and a `Link: rel=alternate` header, and neither is needed here:
//     next-intl's own navigation writes that cookie client-side on an explicit
//     language switch (syncLocaleCookie), and the real hreflang tags come from
//     each page's generateMetadata (including x-default). The header was in
//     fact wrong: hreflang="en" pointed at /en/guias/<spanish-slug> and the
//     x-default at a locale-less URL that 404'd.
//   '/api/:path*' - the middleware only did NextResponse.next() there, i.e. it
//     burned an invocation to decide to do nothing.
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/login',
  ],
}
