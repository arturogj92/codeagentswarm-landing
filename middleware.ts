import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { jwtVerify } from 'jose'

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

  // API routes: skip intl middleware
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // All other routes: use next-intl middleware
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/',
    '/(en|es)/:path*',
    '/dashboard/:path*',
    '/login',
    '/api/:path*',
  ],
}
