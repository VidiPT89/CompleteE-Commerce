import { isAdmin } from '@/lib/admin'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'denied' }, { status: 401 })
  const products = await prisma.product.findMany({
    include: { variants: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'denied' }, { status: 401 })
  const body = (await request.json()) as {
    name?: string
    nameEn?: string
    category?: string
    description?: string
    imageUrl?: string
    sku?: string
    color?: string
    size?: string
    priceCents?: number
    stock?: number
  }
  const slug = (body.nameEn || body.name || 'piece')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  const collection =
    (await prisma.collection.findFirst({ where: { slug: body.category || 'film' } })) ??
    (await prisma.collection.findFirst())
  if (!collection) return NextResponse.json({ error: 'collection' }, { status: 400 })
  const product = await prisma.product.create({
    data: {
      slug: `${slug}-${Date.now().toString(36)}`,
      brand: 'FORJA',
      name: body.name || 'Peça',
      nameEn: body.nameEn || body.name || 'Piece',
      category: body.category || collection.slug,
      collectionId: collection.id,
      description: body.description || '',
      descriptionEn: body.description || '',
      imageUrl: body.imageUrl || '/uploads/.gitkeep',
      images: body.imageUrl ? { create: [{ url: body.imageUrl }] } : undefined,
      variants: {
        create: [
          {
            sku: body.sku || `SKU-${Date.now()}`,
            finish: body.color || 'black',
            format: body.size || 'OS',
            priceCents: Number(body.priceCents || 0),
            stock: Number(body.stock || 0),
          },
        ],
      },
    },
    include: { variants: true },
  })
  return NextResponse.json(product)
}
