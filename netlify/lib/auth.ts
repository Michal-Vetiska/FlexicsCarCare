import * as jose from 'jose'
import { parseCookies } from './http.js'

export const COOKIE_NAME = 'flexics_admin'

function getSecret() {
  const secret = process.env.SESSION_SECRET || 'flexics-admin-dev-secret'
  return new TextEncoder().encode(secret)
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'AdminTest'
}

export async function createSessionToken(): Promise<string> {
  return new jose.SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false
  try {
    await jose.jwtVerify(token, getSecret())
    return true
  } catch {
    return false
  }
}

export async function isAuthenticated(cookieHeader: string | undefined): Promise<boolean> {
  const cookies = parseCookies(cookieHeader)
  return verifySessionToken(cookies[COOKIE_NAME])
}

function useSecureCookie() {
  const ctx = process.env.CONTEXT
  return ctx === 'production' || ctx === 'deploy-preview' || ctx === 'branch-deploy'
}

export function sessionCookieHeader(token: string): string {
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${60 * 60 * 24 * 7}`,
  ]
  if (useSecureCookie()) parts.push('Secure')
  return parts.join('; ')
}

export function clearSessionCookieHeader(): string {
  const parts = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
  ]
  if (useSecureCookie()) parts.push('Secure')
  return parts.join('; ')
}
