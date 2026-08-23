import { ADMIN_COOKIE, adminPassword } from '@/lib/admin'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }
  if (body.password !== adminPassword()) {
    return NextResponse.json({ error: 'denied' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, 'ok', { httpOnly: true, sameSite: 'lax', path: '/' })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 0 })
  return res
}
