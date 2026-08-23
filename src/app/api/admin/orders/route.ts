import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'denied' }, { status: 401 })
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
    take: 80,
  })
  return NextResponse.json(orders)
}
