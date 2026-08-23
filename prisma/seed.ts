import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    slug: 'ember-overshirt',
    name: 'Sobrecamisa Ember',
    nameEn: 'Ember overshirt',
    category: 'outerwear',
    description: 'Tecido pesado, costura visível e corte direito. Feita para o fim de tarde em Cascais.',
    descriptionEn: 'Heavy cloth, visible stitching and a straight cut. Made for late light in Cascais.',
    imageUrl:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { sku: 'EMB-OS-BLK-M', color: 'black', size: 'M', priceCents: 8900, stock: 8 },
      { sku: 'EMB-OS-BLK-L', color: 'black', size: 'L', priceCents: 8900, stock: 6 },
      { sku: 'EMB-OS-AMB-M', color: 'amber', size: 'M', priceCents: 9200, stock: 4 },
      { sku: 'EMB-OS-AMB-L', color: 'amber', size: 'L', priceCents: 9200, stock: 3 },
    ],
  },
  {
    slug: 'forja-tee',
    name: 'T-shirt Forja',
    nameEn: 'Forja tee',
    category: 'tops',
    description: 'Algodão grosso, gola reforçada. O logótipo sentado no peito, pequeno de propósito.',
    descriptionEn: 'Heavy cotton, reinforced collar. The mark sits small on the chest on purpose.',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { sku: 'FRJ-TEE-PAP-S', color: 'paper', size: 'S', priceCents: 2900, stock: 12 },
      { sku: 'FRJ-TEE-PAP-M', color: 'paper', size: 'M', priceCents: 2900, stock: 14 },
      { sku: 'FRJ-TEE-INK-M', color: 'black', size: 'M', priceCents: 2900, stock: 10 },
      { sku: 'FRJ-TEE-INK-L', color: 'black', size: 'L', priceCents: 2900, stock: 9 },
    ],
  },
  {
    slug: 'cinder-trousers',
    name: 'Calças Cinder',
    nameEn: 'Cinder trousers',
    category: 'bottoms',
    description: 'Corte largo, pregas suaves e bolso lateral fundo. Anda com a sobrecamisa.',
    descriptionEn: 'Wide cut, soft pleats and a deep side pocket. Walks with the overshirt.',
    imageUrl:
      'https://images.unsplash.com/photo-1473966968600-ce3387a83c6d?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { sku: 'CIN-TR-INK-32', color: 'black', size: '32', priceCents: 7900, stock: 5 },
      { sku: 'CIN-TR-INK-34', color: 'black', size: '34', priceCents: 7900, stock: 7 },
      { sku: 'CIN-TR-OLV-34', color: 'olive', size: '34', priceCents: 7900, stock: 4 },
    ],
  },
  {
    slug: 'lume-runner',
    name: 'Runner Lume',
    nameEn: 'Lume runner',
    category: 'footwear',
    description: 'Sola fina, cabedal mate. Uma faixa âmbar no calcanhar, só para quem repara.',
    descriptionEn: 'Thin sole, matte upper. An amber stripe on the heel, only for those who look.',
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { sku: 'LUM-RN-BLK-40', color: 'black', size: '40', priceCents: 11900, stock: 6 },
      { sku: 'LUM-RN-BLK-42', color: 'black', size: '42', priceCents: 11900, stock: 8 },
      { sku: 'LUM-RN-AMB-42', color: 'amber', size: '42', priceCents: 12500, stock: 3 },
    ],
  },
  {
    slug: 'hearth-tote',
    name: 'Tote Hearth',
    nameEn: 'Hearth tote',
    category: 'accessories',
    description: 'Lona encerada, pegas de couro. Cabe um portátil e o resto do dia.',
    descriptionEn: 'Waxed canvas, leather handles. Holds a laptop and the rest of the day.',
    imageUrl:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    variants: [
      { sku: 'HRT-TO-AMB-OS', color: 'amber', size: 'OS', priceCents: 6400, stock: 11 },
      { sku: 'HRT-TO-INK-OS', color: 'black', size: 'OS', priceCents: 6400, stock: 9 },
    ],
  },
]

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        nameEn: product.nameEn,
        category: product.category,
        description: product.description,
        descriptionEn: product.descriptionEn,
        imageUrl: product.imageUrl,
        images: { create: [{ url: product.imageUrl }] },
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
