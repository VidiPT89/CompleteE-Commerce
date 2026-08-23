import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'denied' }, { status: 401 })
  const body = (await request.json()) as { variantId?: string; stock?: number }
  const variant = await prisma.variant.update({
    where: { id: body.variantId ?? '' },
    data: { stock: Number(body.stock || 0) },
  })
  return NextResponse.json(variant)
}
