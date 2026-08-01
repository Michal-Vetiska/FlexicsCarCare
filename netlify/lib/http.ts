import type { HandlerResponse } from '@netlify/functions'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
}

export function json(
  statusCode: number,
  body: unknown,
  extraHeaders: Record<string, string> = {},
): HandlerResponse {
  return {
    statusCode,
    headers: { ...DEFAULT_HEADERS, ...extraHeaders },
    body: JSON.stringify(body),
  }
}

export function text(
  statusCode: number,
  body: string,
  contentType: string,
  extraHeaders: Record<string, string> = {},
): HandlerResponse {
  return {
    statusCode,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      ...extraHeaders,
    },
    body,
  }
}

export function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {}
  return Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const i = part.indexOf('=')
        if (i === -1) return [part, '']
        return [part.slice(0, i), decodeURIComponent(part.slice(i + 1))]
      }),
  )
}

export function getApiPath(eventPath: string): string {
  // /.netlify/functions/api/content → /content
  // /api/content → /content
  const cleaned = eventPath
    .replace(/^\/\.netlify\/functions\/api/, '')
    .replace(/^\/api/, '')
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

export function getMediaKey(eventPath: string): string {
  return eventPath
    .replace(/^\/\.netlify\/functions\/media\/?/, '')
    .replace(/^\/uploads\/?/, '')
    .replace(/^\/+/, '')
}
