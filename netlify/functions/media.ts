import type { Config } from '@netlify/functions'
import { getMediaKey } from '../lib/http.js'
import { getUpload } from '../lib/store.js'

export default async (req: Request) => {
  try {
    const key = getMediaKey(new URL(req.url).pathname)
    if (!key || key.includes('..')) {
      return new Response('Invalid path', { status: 400 })
    }

    const file = await getUpload(key)
    if (!file) {
      return new Response('Not found', { status: 404 })
    }

    return new Response(file.data, {
      status: 200,
      headers: {
        'Content-Type': file.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (err) {
    console.error('Media error', err)
    return new Response('Internal error', { status: 500 })
  }
}

export const config: Config = {
  path: '/uploads/*',
}
