import { ProductDesk } from '@/components/ProductDesk'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true, images: { orderBy: { sortOrder: 'asc' } }, collection: true },
  })
  if (!product) notFound()
  const related = await prisma.product.findMany({
    where: { collectionId: product.collectionId, NOT: { id: product.id } },
    include: { variants: true, images: true, collection: true },
    take: 3,
  })
  return <ProductDesk product={product} related={related} />
}
