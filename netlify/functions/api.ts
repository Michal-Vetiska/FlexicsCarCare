import type { Config } from '@netlify/functions'
import {
  clearSessionCookieHeader,
  createSessionToken,
  getAdminPassword,
  isAuthenticated,
  sessionCookieHeader,
} from '../lib/auth.js'
import { getApiPath } from '../lib/http.js'
import { safeUploadFilename } from '../lib/multipart.js'
import { readContent, saveUpload, writeContent } from '../lib/store.js'

function json(status: number, body: unknown, init: HeadersInit = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...Object.fromEntries(new Headers(init).entries()),
    },
  })
}

export default async (req: Request) => {
  const method = req.method.toUpperCase()
  const path = getApiPath(new URL(req.url).pathname)
  const cookie = req.headers.get('cookie') || undefined

  try {
    if (method === 'GET' && (path === '/content' || path === '/content/')) {
      return json(200, await readContent())
    }

    if (method === 'PUT' && (path === '/admin/content' || path === '/admin/content/')) {
      if (!(await isAuthenticated(cookie))) {
        return json(401, { error: 'Unauthorized' })
      }
      let body: unknown
      try {
        body = await req.json()
      } catch {
        return json(400, { error: 'Neplatná data' })
      }
      if (!body || typeof body !== 'object') {
        return json(400, { error: 'Neplatná data' })
      }
      try {
        const content = await writeContent(body)
        return json(200, { ok: true, content })
      } catch (err) {
        console.error('writeContent failed', err)
        const detail = err instanceof Error ? err.message : String(err)
        return json(500, {
          error: 'Nepodařilo se uložit obsah',
          detail,
        })
      }
    }

    if (method === 'POST' && (path === '/admin/login' || path === '/admin/login/')) {
      let body: { password?: string }
      try {
        body = (await req.json()) as { password?: string }
      } catch {
        return json(400, { error: 'Neplatná data' })
      }
      if (body.password === getAdminPassword()) {
        const token = await createSessionToken()
        return json(200, { ok: true }, { 'Set-Cookie': sessionCookieHeader(token) })
      }
      return json(401, { error: 'Neplatné heslo' })
    }

    if (method === 'POST' && (path === '/admin/logout' || path === '/admin/logout/')) {
      return json(200, { ok: true }, { 'Set-Cookie': clearSessionCookieHeader() })
    }

    if (method === 'GET' && (path === '/admin/me' || path === '/admin/me/')) {
      if (await isAuthenticated(cookie)) {
        return json(200, { authenticated: true })
      }
      return json(401, { authenticated: false })
    }

    if (method === 'POST' && (path === '/admin/upload' || path === '/admin/upload/')) {
      if (!(await isAuthenticated(cookie))) {
        return json(401, { error: 'Unauthorized' })
      }

      let form: FormData
      try {
        form = await req.formData()
      } catch (err) {
        console.error('formData failed', err)
        return json(400, { error: 'Upload selhal' })
      }

      const entry = form.get('file')
      if (!entry || typeof entry === 'string') {
        return json(400, { error: 'Soubor chybí' })
      }

      const file = entry as File
      const mimeType = file.type || 'application/octet-stream'
      const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
      if (!allowed.includes(mimeType)) {
        return json(400, { error: 'Povolené formáty: JPEG, PNG, WebP' })
      }
      if (file.size > 5 * 1024 * 1024) {
        return json(400, { error: 'Soubor je příliš velký (max 5 MB)' })
      }

      try {
        const filename = safeUploadFilename(file.name || 'upload.bin', mimeType)
        const buffer = new Uint8Array(await file.arrayBuffer())
        const url = await saveUpload(filename, buffer, mimeType)
        return json(200, { url })
      } catch (err) {
        console.error('upload failed', err)
        const detail = err instanceof Error ? err.message : String(err)
        return json(500, { error: 'Upload selhal', detail })
      }
    }

    if (method === 'GET' && (path === '/health' || path === '/health/')) {
      return json(200, { ok: true, runtime: 'netlify-functions-v2' })
    }

    return json(404, { error: 'Not found', path, method })
  } catch (err) {
    console.error('API error', err)
    const detail = err instanceof Error ? err.message : String(err)
    return json(500, { error: 'Interní chyba serveru', detail })
  }
}

// Functions v2: Blobs kontext se nastaví automaticky (ne Lambda compat)
export const config: Config = {
  path: '/api/*',
}
