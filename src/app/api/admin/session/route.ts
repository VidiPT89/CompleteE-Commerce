import { isAdmin } from '@/lib/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ ok: await isAdmin() })
}
