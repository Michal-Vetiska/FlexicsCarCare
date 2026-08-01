import Busboy from 'busboy'
import type { HandlerEvent } from '@netlify/functions'

export type UploadedFile = {
  filename: string
  mimeType: string
  data: Buffer
}

export function parseMultipart(event: HandlerEvent): Promise<UploadedFile | null> {
  return new Promise((resolve, reject) => {
    const contentType =
      event.headers['content-type'] || event.headers['Content-Type'] || ''
    if (!contentType.includes('multipart/form-data')) {
      resolve(null)
      return
    }

    const busboy = Busboy({
      headers: { 'content-type': contentType },
      limits: { files: 1, fileSize: 5 * 1024 * 1024 },
    })

    let file: UploadedFile | null = null
    let truncated = false

    busboy.on('file', (_name, stream, info) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk: Buffer) => chunks.push(chunk))
      stream.on('limit', () => {
        truncated = true
      })
      stream.on('end', () => {
        file = {
          filename: info.filename || 'upload.bin',
          mimeType: info.mimeType || 'application/octet-stream',
          data: Buffer.concat(chunks),
        }
      })
    })

    busboy.on('error', reject)
    busboy.on('finish', () => {
      if (truncated) {
        reject(new Error('Soubor je příliš velký (max 5 MB)'))
        return
      }
      resolve(file)
    })

    const encoding = event.isBase64Encoded ? 'base64' : 'binary'
    const body = event.body || ''
    busboy.end(Buffer.from(body, encoding))
  })
}

export function safeUploadFilename(original: string, mimeType: string): string {
  const fromName = original.includes('.') ? original.slice(original.lastIndexOf('.')) : ''
  const fromMime =
    mimeType === 'image/png'
      ? '.png'
      : mimeType === 'image/webp'
        ? '.webp'
        : mimeType === 'image/jpeg' || mimeType === 'image/jpg'
          ? '.jpg'
          : ''
  const ext = (fromName || fromMime || '.jpg').toLowerCase()
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
}
