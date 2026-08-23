import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: true } } },
    })
    return NextResponse.json(collections)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'collections'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
