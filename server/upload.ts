import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Express, Request, Response } from 'express'
import multer from 'multer'
import { requireAuth } from './auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg'
    const safe = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    cb(null, safe)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)
    cb(ok ? null : new Error('Povolené formáty: JPEG, PNG, WebP'), ok)
  },
})

export function registerUploadRoutes(app: Express) {
  app.post(
    '/api/admin/upload',
    requireAuth,
    (req: Request, res: Response, next) => {
      upload.single('file')(req, res, (err) => {
        if (err) {
          res.status(400).json({ error: err.message || 'Upload selhal' })
          return
        }
        next()
      })
    },
    (req: Request, res: Response) => {
      if (!req.file) {
        res.status(400).json({ error: 'Soubor chybí' })
        return
      }
      res.json({ url: `/uploads/${req.file.filename}` })
    },
  )
}
