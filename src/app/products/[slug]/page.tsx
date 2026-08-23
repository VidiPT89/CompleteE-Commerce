import { ProductDesk } from '@/components/ProductDesk'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  })
  if (!product) notFound()
  return <ProductDesk product={product} />
}
