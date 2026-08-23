import { matchesCatalog } from '@/lib/catalog'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') ?? undefined
  const category = url.searchParams.get('category') ?? undefined
  const collection = url.searchParams.get('collection') ?? undefined
  const finish = url.searchParams.get('finish') ?? undefined
  const format = url.searchParams.get('format') ?? undefined
  const min = url.searchParams.get('min')
  const max = url.searchParams.get('max')

  const products = await prisma.product.findMany({
    include: { variants: true, images: true, collection: true },
    orderBy: { createdAt: 'desc' },
  })

  const filtered = products.filter((product) =>
    matchesCatalog(
      {
        slug: product.slug,
        name: product.name,
        nameEn: product.nameEn,
        brand: product.brand,
        category: product.category,
        collectionSlug: product.collection.slug,
        description: `${product.description} ${product.descriptionEn}`,
        imageUrl: product.imageUrl,
        variants: product.variants,
      },
      {
        q,
        category: category || undefined,
        collection: collection || undefined,
        finish: finish || undefined,
        format: format || undefined,
        minCents: min ? Number(min) * 100 : undefined,
        maxCents: max ? Number(max) * 100 : undefined,
      },
    ),
  )

  return NextResponse.json(filtered)
}
