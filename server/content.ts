import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Express, Request, Response } from 'express'
import { requireAuth } from './auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const CONTENT_PATH = path.join(__dirname, 'data', 'content.json')

export function readContent() {
  return JSON.parse(readFileSync(CONTENT_PATH, 'utf8'))
}

export function writeContent(data: unknown) {
  writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export function registerContentRoutes(app: Express) {
  app.get('/api/content', (_req: Request, res: Response) => {
    try {
      res.json(readContent())
    } catch {
      res.status(500).json({ error: 'Nepodařilo se načíst obsah' })
    }
  })

  app.put('/api/admin/content', requireAuth, (req: Request, res: Response) => {
    try {
      if (!req.body || typeof req.body !== 'object') {
        res.status(400).json({ error: 'Neplatná data' })
        return
      }
      writeContent(req.body)
      res.json({ ok: true, content: readContent() })
    } catch {
      res.status(500).json({ error: 'Nepodařilo se uložit obsah' })
    }
  })
}
