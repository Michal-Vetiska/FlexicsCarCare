import type { Request, Response, NextFunction } from 'express'

declare module 'express-session' {
  interface SessionData {
    authenticated?: boolean
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.authenticated) {
    next()
    return
  }
  res.status(401).json({ error: 'Unauthorized' })
}

export function registerAuthRoutes(app: import('express').Express) {
  const password = process.env.ADMIN_PASSWORD || 'AdminTest'

  app.post('/api/admin/login', (req, res) => {
    const body = req.body as { password?: string }
    if (body.password === password) {
      req.session.authenticated = true
      res.json({ ok: true })
      return
    }
    res.status(401).json({ error: 'Neplatné heslo' })
  })

  app.post('/api/admin/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.json({ ok: true })
    })
  })

  app.get('/api/admin/me', (req, res) => {
    if (req.session?.authenticated) {
      res.json({ authenticated: true })
      return
    }
    res.status(401).json({ authenticated: false })
  })
}
