import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const collections = [
  {
    slug: 'film',
    name: 'Película',
    nameEn: 'Film',
    lead: 'Rolos 35mm e 120, caixa a caixa, ISO marcado.',
    leadEn: '35mm and 120 rolls, box by box, ISO marked.',
    imageUrl: 'https://images.unsplash.com/photo-1471341971476-ae15ff43dd37?auto=format&fit=crop&w=1600&q=80',
    sortOrder: 1,
  },
  {
    slug: 'cameras',
    name: 'Câmaras',
    nameEn: 'Cameras',
    lead: 'Corpos com peso, visor claro, obturador mecânico.',
    leadEn: 'Bodies with weight, a clear finder, a mechanical shutter.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80',
    sortOrder: 2,
  },
  {
    slug: 'optics',
    name: 'Óptica',
    nameEn: 'Optics',
    lead: 'Primárias e zooms com o vidro limpo, sem mistério.',
    leadEn: 'Primes and zooms with clean glass, no mystery.',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1600&q=80',
    sortOrder: 3,
  },
  {
    slug: 'darkroom',
    name: 'Quarto escuro',
    nameEn: 'Darkroom',
    lead: 'Papel, químicos e a bancada onde a prova nasce.',
    leadEn: 'Paper, chemistry and the bench where the print is born.',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-1520f6b5d3d4?auto=format&fit=crop&w=1600&q=80',
    sortOrder: 4,
  },
  {
    slug: 'prints',
    name: 'Provas',
    nameEn: 'Prints',
    lead: 'Edições limitadas, papel baryta, margem larga.',
    leadEn: 'Limited editions, baryta paper, a wide margin.',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77a70b?auto=format&fit=crop&w=1600&q=80',
    sortOrder: 5,
  },
]

const products = [
  {
    slug: 'tri-x-400',
    brand: 'Kodak',
    name: 'TRI-X 400 · 35mm',
    nameEn: 'TRI-X 400 · 35mm',
    category: 'film',
    collection: 'film',
    description:
      'O preto e branco que já esteve em milhares de noites de rua. Grão visível, latitude larga, revelação previsível. Caixa de 36 exposições.',
    descriptionEn:
      'The black and white that has already been out on a thousand night streets. Visible grain, wide latitude, predictable development. 36-exposure box.',
    imageUrl: 'https://images.unsplash.com/photo-1471341971476-ae15ff43dd37?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1471341971476-ae15ff43dd37?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'KX-TX-35-36', finish: 'yellow-box', format: '36exp', priceCents: 1290, stock: 40 },
      { sku: 'KX-TX-35-24', finish: 'yellow-box', format: '24exp', priceCents: 1090, stock: 18 },
    ],
  },
  {
    slug: 'portra-400',
    brand: 'Kodak',
    name: 'Portra 400 · 120',
    nameEn: 'Portra 400 · 120',
    category: 'film',
    collection: 'film',
    description:
      'Pele e céu sem drama. O 120 dá-te o negativo grande; o 400 deixa trabalhar ao fim da tarde em Cascais.',
    descriptionEn:
      'Skin and sky without drama. 120 gives you the large negative; 400 lets you work at the end of the afternoon in Cascais.',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'KX-PO-120-1', finish: 'gold-box', format: '120', priceCents: 1490, stock: 24 },
      { sku: 'KX-PO-120-5', finish: 'gold-box', format: '5-pack', priceCents: 6990, stock: 8 },
    ],
  },
  {
    slug: 'fm2n-body',
    brand: 'Nikon',
    name: 'FM2n · corpo',
    nameEn: 'FM2n · body',
    category: 'cameras',
    collection: 'cameras',
    description:
      'Obturador a 1/4000, sem pilha para o tempo. Revisada na bancada: cortinas, selos, visor. Pronta para o próximo rolo.',
    descriptionEn:
      '1/4000 shutter, no battery for the speeds. Bench-serviced: curtains, seals, finder. Ready for the next roll.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'NK-FM2-BLK', finish: 'black', format: 'body', priceCents: 48900, stock: 3 },
      { sku: 'NK-FM2-CHR', finish: 'chrome', format: 'body', priceCents: 45900, stock: 2 },
    ],
  },
  {
    slug: 'm6-ttl',
    brand: 'Leica',
    name: 'M6 TTL · corpo',
    nameEn: 'M6 TTL · body',
    category: 'cameras',
    collection: 'cameras',
    description:
      'Telémetro, janela clara, o clique que já conhecês. Corpo verificado, telémetro alinhado, avanços suaves.',
    descriptionEn:
      'Rangefinder, a clear window, the click you already know. Checked body, aligned rangefinder, smooth advance.',
    imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9c1e?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'LC-M6-BLK', finish: 'black', format: '0.72', priceCents: 289000, stock: 1 },
      { sku: 'LC-M6-SLV', finish: 'silver', format: '0.72', priceCents: 275000, stock: 1 },
    ],
  },
  {
    slug: 'summicron-50',
    brand: 'Leica',
    name: 'Summicron-M 50mm f/2',
    nameEn: 'Summicron-M 50mm f/2',
    category: 'optics',
    collection: 'optics',
    description:
      'O 50 que não discute. Contraste alto, bokeh limpo, foco que chega ao metro. Vidro inspeccionado sob luz rasteira.',
    descriptionEn:
      'The 50 that does not argue. High contrast, clean bokeh, focus that reaches a metre. Glass inspected under raking light.',
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1452587925148-ce544e77a70b?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'LC-50-BLK', finish: 'black', format: 'M-mount', priceCents: 189000, stock: 2 },
    ],
  },
  {
    slug: 'nikkor-35',
    brand: 'Nikon',
    name: 'AI-S 35mm f/2',
    nameEn: 'AI-S 35mm f/2',
    category: 'optics',
    collection: 'optics',
    description:
      'O angular de rua: distorção contida, abertura que ainda trabalha à noite. Acoplamento AI-S verificado.',
    descriptionEn:
      'The street wide: contained distortion, an aperture that still works at night. AI-S coupling checked.',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77a70b?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1452587925148-ce544e77a70b?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'NK-35-BLK', finish: 'black', format: 'F-mount', priceCents: 32900, stock: 4 },
    ],
  },
  {
    slug: 'ilford-mgiv',
    brand: 'Ilford',
    name: 'Multigrade IV · RC',
    nameEn: 'Multigrade IV · RC',
    category: 'darkroom',
    collection: 'darkroom',
    description:
      'Papel de trabalho. Superfície perola, contraste por filtro, secos rápidos. Caixa de 100 folhas.',
    descriptionEn:
      'Work paper. Pearl surface, contrast by filter, fast drying. Box of 100 sheets.',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-1520f6b5d3d4?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1478720568477-1520f6b5d3d4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'IL-MG-13x18', finish: 'pearl', format: '13x18', priceCents: 3900, stock: 12 },
      { sku: 'IL-MG-18x24', finish: 'pearl', format: '18x24', priceCents: 5900, stock: 9 },
      { sku: 'IL-MG-24x30', finish: 'glossy', format: '24x30', priceCents: 7900, stock: 6 },
    ],
  },
  {
    slug: 'd76-stock',
    brand: 'Kodak',
    name: 'D-76 · revelador',
    nameEn: 'D-76 · developer',
    category: 'darkroom',
    collection: 'darkroom',
    description:
      'O stock clássico. Diluição 1+1 para o TRI-X, tempo marcado no relógio da bancada. Saco para 3,8 litros.',
    descriptionEn:
      'The classic stock. 1+1 dilution for TRI-X, time marked on the bench clock. Bag for 3.8 litres.',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'KX-D76-1GAL', finish: 'powder', format: '3.8L', priceCents: 1890, stock: 20 },
    ],
  },
  {
    slug: 'cascais-dusk',
    brand: 'FORJA',
    name: 'Cascais, fim de tarde',
    nameEn: 'Cascais, late light',
    category: 'prints',
    collection: 'prints',
    description:
      'Prova em baryta, edição de 25, assinada a lápis na margem. Luz de oeste sobre a baía, negativo 6x6.',
    descriptionEn:
      'Baryta print, edition of 25, pencil-signed in the margin. Western light on the bay, 6x6 negative.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'FJ-CD-A3', finish: 'baryta', format: 'A3', priceCents: 18000, stock: 12 },
      { sku: 'FJ-CD-A2', finish: 'baryta', format: 'A2', priceCents: 32000, stock: 8 },
    ],
  },
  {
    slug: 'lisbon-night',
    brand: 'FORJA',
    name: 'Lisboa, uma hora',
    nameEn: 'Lisbon, one hour',
    category: 'prints',
    collection: 'prints',
    description:
      'Rua molhada, néon laranja, um só fotograma. Edição de 15. Papel mate, margem de 4 cm.',
    descriptionEn:
      'Wet street, orange neon, a single frame. Edition of 15. Matte paper, 4 cm margin.',
    imageUrl: 'https://images.unsplash.com/photo-1544989164-31dc3c6455fa?auto=format&fit=crop&w=1400&q=80',
    images: [
      'https://images.unsplash.com/photo-1544989164-31dc3c6455fa?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80',
    ],
    variants: [
      { sku: 'FJ-LN-A3', finish: 'matte', format: 'A3', priceCents: 22000, stock: 7 },
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
