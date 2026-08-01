import { connectLambda } from '@netlify/blobs'
import type { Handler, HandlerEvent } from '@netlify/functions'
import { getMediaKey } from '../lib/http.js'
import { getUpload } from '../lib/store.js'

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

  try {
    const key = getMediaKey(event.path)
    if (!key || key.includes('..')) {
      return { statusCode: 400, body: 'Invalid path' }
    }

    const file = await getUpload(key)
    if (!file) {
      return { statusCode: 404, body: 'Not found' }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': file.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
      body: Buffer.from(file.data).toString('base64'),
      isBase64Encoded: true,
    }
  } catch (err) {
    console.error('Media error', err)
    return { statusCode: 500, body: 'Internal error' }
  }
}
