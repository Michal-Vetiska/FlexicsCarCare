import { connectLambda } from '@netlify/blobs'
import type { Handler, HandlerEvent } from '@netlify/functions'
import {
  clearSessionCookieHeader,
  createSessionToken,
  getAdminPassword,
  isAuthenticated,
  sessionCookieHeader,
} from '../lib/auth.js'
import { getApiPath, json } from '../lib/http.js'
import { parseMultipart, safeUploadFilename } from '../lib/multipart.js'
import { readContent, saveUpload, writeContent } from '../lib/store.js'

function getHeader(event: HandlerEvent, name: string): string | undefined {
  const lower = name.toLowerCase()
  for (const [key, value] of Object.entries(event.headers)) {
    if (key.toLowerCase() === lower) return value
  }
  return undefined
}

function parseBody(event: HandlerEvent): unknown {
  if (!event.body) return null
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function ensureBlobs(event: HandlerEvent) {
  const blobs = (event as HandlerEvent & { blobs?: string }).blobs
  if (!blobs) return
  connectLambda({
    blobs,
    headers: Object.fromEntries(
      Object.entries(event.headers).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
    ),
  })
}

export const handler: Handler = async (event) => {
  ensureBlobs(event)

  const method = (event.httpMethod || 'GET').toUpperCase()
  const path = getApiPath(event.path)

  try {
    if (method === 'GET' && (path === '/content' || path === '/content/')) {
      return json(200, await readContent())
    }

    if (method === 'PUT' && (path === '/admin/content' || path === '/admin/content/')) {
      if (!(await isAuthenticated(getHeader(event, 'cookie')))) {
        return json(401, { error: 'Unauthorized' })
      }
      const body = parseBody(event)
      if (!body || typeof body !== 'object') {
        return json(400, { error: 'Neplatná data' })
      }
      const content = await writeContent(body)
      return json(200, { ok: true, content })
    }

    if (method === 'POST' && (path === '/admin/login' || path === '/admin/login/')) {
      const body = parseBody(event) as { password?: string } | null
      if (body?.password === getAdminPassword()) {
        const token = await createSessionToken()
        return json(200, { ok: true }, { 'Set-Cookie': sessionCookieHeader(token) })
      }
      return json(401, { error: 'Neplatné heslo' })
    }

    if (method === 'POST' && (path === '/admin/logout' || path === '/admin/logout/')) {
      return json(200, { ok: true }, { 'Set-Cookie': clearSessionCookieHeader() })
    }

    if (method === 'GET' && (path === '/admin/me' || path === '/admin/me/')) {
      if (await isAuthenticated(getHeader(event, 'cookie'))) {
        return json(200, { authenticated: true })
      }
      return json(401, { authenticated: false })
    }

    if (method === 'POST' && (path === '/admin/upload' || path === '/admin/upload/')) {
      if (!(await isAuthenticated(getHeader(event, 'cookie')))) {
        return json(401, { error: 'Unauthorized' })
      }

      let file
      try {
        file = await parseMultipart(event)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upload selhal'
        return json(400, { error: message })
      }

      if (!file) {
        return json(400, { error: 'Soubor chybí' })
      }

      const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
      if (!allowed.includes(file.mimeType)) {
        return json(400, { error: 'Povolené formáty: JPEG, PNG, WebP' })
      }

      const filename = safeUploadFilename(file.filename, file.mimeType)
      const url = await saveUpload(filename, file.data, file.mimeType)
      return json(200, { url })
    }

    if (method === 'GET' && (path === '/health' || path === '/health/')) {
      return json(200, { ok: true, runtime: 'netlify-functions' })
    }

    return json(404, { error: 'Not found', path, method })
  } catch (err) {
    console.error('API error', err)
    const detail = err instanceof Error ? err.message : String(err)
    return json(500, { error: 'Interní chyba serveru', detail })
  }
}
