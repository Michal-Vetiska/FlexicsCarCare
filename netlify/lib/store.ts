import { getStore } from '@netlify/blobs'
import seed from '../../server/data/content.json'

const STORE_NAME = 'cms'
const CONTENT_KEY = 'content'

export function getCmsStore() {
  const siteID = process.env.BLOBS_SITE_ID || process.env.SITE_ID
  const token = process.env.BLOBS_TOKEN || process.env.NETLIFY_BLOBS_TOKEN

  // Explicitní credentials (volitelné) — jinak Functions v2 kontext
  if (siteID && token) {
    return getStore({
      name: STORE_NAME,
      siteID,
      token,
      consistency: 'strong',
    })
  }

  return getStore({ name: STORE_NAME, consistency: 'strong' })
}

export async function readContent(): Promise<unknown> {
  try {
    const store = getCmsStore()
    const data = await store.get(CONTENT_KEY, { type: 'json' })
    if (data == null) {
      try {
        await store.setJSON(CONTENT_KEY, seed)
      } catch (err) {
        console.error('Failed to seed Blobs content', err)
      }
      return seed
    }
    return data
  } catch (err) {
    console.error('readContent failed, falling back to seed', err)
    return seed
  }
}

export async function writeContent(data: unknown): Promise<unknown> {
  const store = getCmsStore()
  await store.setJSON(CONTENT_KEY, data)
  const saved = await store.get(CONTENT_KEY, { type: 'json' })
  return saved ?? data
}

export async function saveUpload(
  filename: string,
  data: Uint8Array,
  contentType: string,
): Promise<string> {
  const store = getCmsStore()
  const key = `uploads/${filename}`
  await store.set(key, data, {
    metadata: { contentType },
  })
  return `/uploads/${filename}`
}

export async function getUpload(
  filename: string,
): Promise<{ data: ArrayBuffer; contentType: string } | null> {
  const store = getCmsStore()
  const key = filename.startsWith('uploads/') ? filename : `uploads/${filename}`
  const result = await store.getWithMetadata(key, { type: 'arrayBuffer' })
  if (!result) return null
  const contentType =
    (result.metadata?.contentType as string | undefined) || 'application/octet-stream'
  return { data: result.data, contentType }
}
