import { isAdmin } from '@/lib/admin'
import { storeProductImage } from '@/lib/media'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'denied' }, { status: 401 })
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'file' }, { status: 400 })
  }
  const url = await storeProductImage(file)
  return NextResponse.json({ url })
}
