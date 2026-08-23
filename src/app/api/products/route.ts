import { matchesCatalog } from '@/lib/catalog'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') ?? undefined
  const category = url.searchParams.get('category') ?? undefined
  const color = url.searchParams.get('color') ?? undefined
  const size = url.searchParams.get('size') ?? undefined
  const min = url.searchParams.get('min')
  const max = url.searchParams.get('max')

  const products = await prisma.product.findMany({
    include: { variants: true, images: true },
    orderBy: { createdAt: 'desc' },
  })

  const filtered = products.filter((product) =>
    matchesCatalog(
      {
        slug: product.slug,
        name: product.name,
        nameEn: product.nameEn,
        category: product.category,
        description: `${product.description} ${product.descriptionEn}`,
        imageUrl: product.imageUrl,
        variants: product.variants,
      },
      {
        q,
        category: category || undefined,
        color: color || undefined,
        size: size || undefined,
        minCents: min ? Number(min) * 100 : undefined,
        maxCents: max ? Number(max) * 100 : undefined,
      },
    ),
  )

  return NextResponse.json(filtered)
}
