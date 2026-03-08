import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'dashboard_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 // 24 hours

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET env var is not set')
  return new TextEncoder().encode(secret)
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJwtSecret())
}

export async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return payload as Record<string, unknown>
  } catch {
    return null
  }
}

export function validateCredentials(username: string, password: string): boolean {
  const validUsername = process.env.DASHBOARD_USERNAME
  const validPassword = process.env.DASHBOARD_PASSWORD
  if (!validUsername || !validPassword) return false
  return username === validUsername && password === validPassword
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export { COOKIE_NAME }
