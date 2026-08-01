import type { SiteContent } from '../types/content'

async function parseJson<T>(res: Response): Promise<T> {
  const data = (await res.json()) as T & { error?: string }
  if (!res.ok) {
    throw new Error((data as { error?: string }).error || `HTTP ${res.status}`)
  }
  return data
}

export async function fetchContent(): Promise<SiteContent> {
  const res = await fetch('/api/content', { credentials: 'include' })
  return parseJson<SiteContent>(res)
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const res = await fetch('/api/admin/content', {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  })
  const data = await parseJson<{ ok: boolean; content: SiteContent }>(res)
  return data.content
}

export async function loginAdmin(password: string): Promise<void> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  await parseJson(res)
}

export async function logoutAdmin(): Promise<void> {
  const res = await fetch('/api/admin/logout', {
    method: 'POST',
    credentials: 'include',
  })
  await parseJson(res)
}

export async function checkAdminSession(): Promise<boolean> {
  const res = await fetch('/api/admin/me', { credentials: 'include' })
  return res.ok
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    credentials: 'include',
    body: form,
  })
  const data = await parseJson<{ url: string }>(res)
  return data.url
}
