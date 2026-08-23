import { PrismaClient } from '@prisma/client'
import { collections, products } from '../src/data/catalog'

const prisma = new PrismaClient()

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()

  const bySlug: Record<string, string> = {}
  for (const collection of collections) {
    const row = await prisma.collection.create({ data: collection })
    bySlug[collection.slug] = row.id
  }

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        brand: product.brand,
        name: product.name,
        nameEn: product.nameEn,
        category: product.category,
        collectionId: bySlug[product.collection],
        description: product.description,
        descriptionEn: product.descriptionEn,
        imageUrl: product.imageUrl,
        images: {
          create: product.images.map((url, sortOrder) => ({ url, sortOrder })),
        },
        variants: { create: product.variants },
      },
    })
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
