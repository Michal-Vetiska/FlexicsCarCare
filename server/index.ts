import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import { registerAuthRoutes } from './auth.js'
import { registerContentRoutes } from './content.js'
import { registerUploadRoutes } from './upload.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT || 3001)

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
)
app.use(express.json({ limit: '2mb' }))
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'flexics-admin-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
)

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')))

registerAuthRoutes(app)
registerContentRoutes(app)
registerUploadRoutes(app)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})
