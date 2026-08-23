export type SeedVariant = {
  sku: string
  finish: string
  format: string
  priceCents: number
  stock: number
}

export type SeedProduct = {
  slug: string
  brand: string
  name: string
  nameEn: string
  category: string
  collection: string
  description: string
  descriptionEn: string
  imageUrl: string
  images: string[]
  variants: SeedVariant[]
}

export type SeedCollection = {
  slug: string
  name: string
  nameEn: string
  lead: string
  leadEn: string
  imageUrl: string
  sortOrder: number
}

export const collections: SeedCollection[] = [
  {
    slug: 'street',
    name: 'Rua',
    nameEn: 'Street',
    lead: 'Corpos compactos e primárias rápidas para o passeio.',
    leadEn: 'Compact bodies and fast primes for the pavement.',
    imageUrl: '/photos/street-city.jpg',
    sortOrder: 1,
  },
  {
    slug: 'sports',
    name: 'Desporto',
    nameEn: 'Sports',
    lead: 'Teleobjectivas e obturadores que aguentam o sprint.',
    leadEn: 'Telephotos and shutters that hold a sprint.',
    imageUrl: '/photos/sports-football.jpg',
    sortOrder: 2,
  },
  {
    slug: 'reportage',
    name: 'Fotojornalismo',
    nameEn: 'Photojournalism',
    lead: 'Kits de agência: dois corpos, um 24-70, um 70-200.',
    leadEn: 'Agency kits: two bodies, a 24-70, a 70-200.',
    imageUrl: '/photos/press.jpg',
    sortOrder: 3,
  },
  {
    slug: 'digital',
    name: 'Digital',
    nameEn: 'Digital',
    lead: 'Corpos mirrorless para agência, rua e estúdio.',
    leadEn: 'Mirrorless bodies for agency, street and studio.',
    imageUrl: '/photos/camera-nikon.jpg',
    sortOrder: 4,
  },
  {
    slug: 'accessories',
    name: 'Acessórios',
    nameEn: 'Accessories',
    lead: 'Cartões, correias, flash e o resto da mochila.',
    leadEn: 'Cards, straps, flash and the rest of the bag.',
    imageUrl: '/photos/camera-hand.jpg',
    sortOrder: 5,
  },
  {
    slug: 'film',
    name: 'Película',
    nameEn: 'Film',
    lead: 'Rolos 35 mm e 120, caixa a caixa.',
    leadEn: '35 mm and 120 rolls, box by box.',
    imageUrl: '/photos/film-roll.jpg',
    sortOrder: 6,
  },
]

export const products: SeedProduct[] = [
  {
    slug: 'fuji-xt5',
    brand: 'Fujifilm',
    name: 'X-T5 · corpo',
    nameEn: 'X-T5 · body',
    category: 'cameras',
    collection: 'street',
    description:
      'O corpo de rua da FORJA: visor no eixo, dials à mão, 40 MP que ainda perdoam o ISO alto à noite em Lisboa.',
    descriptionEn:
      'The street body at FORJA: a finder on axis, dials under the fingers, 40 MP that still forgive high ISO at night in Lisbon.',
    imageUrl: '/photos/camera-table.jpg',
    images: ['/photos/camera-table.jpg', '/photos/street-city.jpg', '/photos/camera-hand.jpg'],
    variants: [
      { sku: 'FJ-XT5-BLK', finish: 'black', format: 'body', priceCents: 169900, stock: 4 },
      { sku: 'FJ-XT5-SLV', finish: 'silver', format: 'body', priceCents: 169900, stock: 2 },
    ],
  },
  {
    slug: 'fuji-xf23',
    brand: 'Fujifilm',
    name: 'XF 23mm f/1.4 R LM WR',
    nameEn: 'XF 23mm f/1.4 R LM WR',
    category: 'optics',
    collection: 'street',
    description:
      'O 35 mm equivalente para passeio. Foco silencioso, vedado, a distância que o fotojornalismo de rua pede.',
    descriptionEn:
      'The 35 mm equivalent for walking. Silent focus, weather-sealed, the distance street reportage asks for.',
    imageUrl: '/photos/lens.jpg',
    images: ['/photos/lens.jpg', '/photos/street-nyc.jpg'],
    variants: [
      { sku: 'FJ-23-14', finish: 'black', format: 'X-mount', priceCents: 89900, stock: 5 },
    ],
  },
  {
    slug: 'ricoh-grix',
    brand: 'Ricoh',
    name: 'GR IIIx',
    nameEn: 'GR IIIx',
    category: 'cameras',
    collection: 'street',
    description:
      'Cabe no bolso do casaco. 40 mm, snap focus, o corpo que não assusta na rua.',
    descriptionEn:
      'Fits a jacket pocket. 40 mm, snap focus, the body that does not scare the street.',
    imageUrl: '/photos/camera-hand.jpg',
    images: ['/photos/camera-hand.jpg', '/photos/street-night.jpg'],
    variants: [
      { sku: 'RC-GR3X', finish: 'black', format: 'compact', priceCents: 109900, stock: 6 },
    ],
  },
  {
    slug: 'canon-r6ii',
    brand: 'Canon',
    name: 'EOS R6 Mark II · corpo',
    nameEn: 'EOS R6 Mark II · body',
    category: 'cameras',
    collection: 'reportage',
    description:
      'O segundo corpo da mochila de agência. 40 fps eletrónico, AF que segue um jogador no meio do scramble, dois slots.',
    descriptionEn:
      'The second body in an agency bag. 40 fps electronic, AF that holds a player in a scramble, dual slots.',
    imageUrl: '/photos/hero.jpg',
    images: ['/photos/hero.jpg', '/photos/press.jpg', '/photos/camera-nikon.jpg'],
    variants: [
      { sku: 'CN-R6II-BDY', finish: 'black', format: 'body', priceCents: 259900, stock: 3 },
    ],
  },
  {
    slug: 'canon-70-200',
    brand: 'Canon',
    name: 'RF 70-200mm f/2.8L IS USM',
    nameEn: 'RF 70-200mm f/2.8L IS USM',
    category: 'optics',
    collection: 'reportage',
    description:
      'A tele curta de fotojornalismo. Compacta, f/2.8 constante, estabilização para o pódio e para o protesto.',
    descriptionEn:
      'The short tele for photojournalism. Compact, constant f/2.8, stabilisation for a podium and a protest.',
    imageUrl: '/photos/lens.jpg',
    images: ['/photos/lens.jpg', '/photos/protest.jpg', '/photos/press.jpg'],
    variants: [
      { sku: 'CN-RF-70200', finish: 'white', format: 'RF', priceCents: 279900, stock: 3 },
    ],
  },
  {
    slug: 'canon-400',
    brand: 'Canon',
    name: 'RF 400mm f/2.8L IS USM',
    nameEn: 'RF 400mm f/2.8L IS USM',
    category: 'optics',
    collection: 'sports',
    description:
      'Teleobjectiva de relvado. O 400 f/2.8 que isola o avançado contra a bancada, peso de trabalho, não de montra.',
    descriptionEn:
      'A pitch telephoto. The 400 f/2.8 that lifts a striker off the stand, a working weight, not a shop-window weight.',
    imageUrl: '/photos/sports-football.jpg',
    images: ['/photos/sports-football.jpg', '/photos/sports-soccer.jpg', '/photos/lens.jpg'],
    variants: [
      { sku: 'CN-RF-40028', finish: 'white', format: 'RF', priceCents: 1299000, stock: 1 },
    ],
  },
  {
    slug: 'nikon-z9',
    brand: 'Nikon',
    name: 'Z9 · corpo',
    nameEn: 'Z9 · body',
    category: 'cameras',
    collection: 'sports',
    description:
      'Obturador empilhado, buffer que não acaba no 90.º minuto. O corpo de desporto que a bancada da FORJA entrega revisto.',
    descriptionEn:
      'Stacked shutter, a buffer that lasts the 90th minute. The sports body the FORJA bench hands over serviced.',
    imageUrl: '/photos/camera-nikon.jpg',
    images: ['/photos/camera-nikon.jpg', '/photos/sports-basket.jpg', '/photos/hero.jpg'],
    variants: [
      { sku: 'NK-Z9-BDY', finish: 'black', format: 'body', priceCents: 529900, stock: 2 },
    ],
  },
  {
    slug: 'nikon-180-400',
    brand: 'Nikon',
    name: 'Z 180-400mm f/4 TC VR S',
    nameEn: 'Z 180-400mm f/4 TC VR S',
    category: 'optics',
    collection: 'sports',
    description:
      'Teleobjectiva com teleconversor interno. Do meio-campo à linha de fundo sem mudar de vidro.',
    descriptionEn:
      'A telephoto with a built-in teleconverter. From midfield to the byline without changing glass.',
    imageUrl: '/photos/sports-soccer.jpg',
    images: ['/photos/sports-soccer.jpg', '/photos/sports-basket.jpg', '/photos/lens.jpg'],
    variants: [
      { sku: 'NK-Z-180400', finish: 'black', format: 'Z-mount', priceCents: 1099000, stock: 1 },
    ],
  },
  {
    slug: 'sigma-150-600',
    brand: 'Sigma',
    name: '150-600mm f/5-6.3 DG DN OS',
    nameEn: '150-600mm f/5-6.3 DG DN OS',
    category: 'optics',
    collection: 'sports',
    description:
      'A tele longa acessível para atletismo e sideline. Estabilização OS, montagem RF ou Z à escolha.',
    descriptionEn:
      'The reachable long tele for track and sideline. OS stabilisation, RF or Z mount as you pick.',
    imageUrl: '/photos/sports-basket.jpg',
    images: ['/photos/sports-basket.jpg', '/photos/sports-football.jpg'],
    variants: [
      { sku: 'SG-150600-RF', finish: 'black', format: 'RF', priceCents: 119900, stock: 4 },
      { sku: 'SG-150600-Z', finish: 'black', format: 'Z-mount', priceCents: 119900, stock: 3 },
    ],
  },
  {
    slug: 'leica-q3',
    brand: 'Leica',
    name: 'Q3',
    nameEn: 'Q3',
    category: 'cameras',
    collection: 'street',
    description:
      '28 mm fixo, visor OLED, o clique que já conhecês da rua. Corpo verificado, obturador suave.',
    descriptionEn:
      'Fixed 28 mm, OLED finder, the click you already know from the street. Checked body, a smooth shutter.',
    imageUrl: '/photos/camera-leica.jpg',
    images: ['/photos/camera-leica.jpg', '/photos/street-nyc.jpg'],
    variants: [
      { sku: 'LC-Q3-BLK', finish: 'black', format: 'compact', priceCents: 579000, stock: 1 },
    ],
  },
  {
    slug: 'tri-x-400',
    brand: 'Kodak',
    name: 'TRI-X 400 · 35mm',
    nameEn: 'TRI-X 400 · 35mm',
    category: 'film',
    collection: 'film',
    description:
      'O preto e branco de milhares de noites de rua. Grão visível, latitude larga. Caixa de 36 exposições.',
    descriptionEn:
      'The black and white of a thousand night streets. Visible grain, wide latitude. 36-exposure box.',
    imageUrl: '/photos/film-roll.jpg',
    images: ['/photos/film-roll.jpg', '/photos/street-night.jpg'],
    variants: [
      { sku: 'KX-TX-35-36', finish: 'yellow-box', format: '36exp', priceCents: 1290, stock: 40 },
      { sku: 'KX-TX-35-24', finish: 'yellow-box', format: '24exp', priceCents: 1090, stock: 18 },
    ],
  },
  {
    slug: 'hp5',
    brand: 'Ilford',
    name: 'HP5 Plus · 35mm',
    nameEn: 'HP5 Plus · 35mm',
    category: 'film',
    collection: 'film',
    description:
      'O 400 da bancada europeia. Empurra-se a 1600 no protesto, revela-se em D-76 1+1.',
    descriptionEn:
      'The European bench 400. Push it to 1600 at a protest, develop it in D-76 1+1.',
    imageUrl: '/photos/darkroom.jpg',
    images: ['/photos/darkroom.jpg', '/photos/enlarger-durst.jpg', '/photos/film-roll.jpg'],
    variants: [
      { sku: 'IL-HP5-36', finish: 'black-box', format: '36exp', priceCents: 890, stock: 50 },
    ],
  },
  {
    slug: 'cascais-dusk',
    brand: 'FORJA',
    name: 'Cascais, fim de tarde',
    nameEn: 'Cascais, late light',
    category: 'prints',
    collection: 'reportage',
    description:
      'Prova em baryta, edição de 25, assinada na margem. Luz de oeste sobre a baía, negativo 6x6.',
    descriptionEn:
      'Baryta print, edition of 25, signed in the margin. Western light on the bay, 6x6 negative.',
    imageUrl: '/photos/sea.jpg',
    images: ['/photos/sea.jpg', '/photos/landscape.jpg'],
    variants: [
      { sku: 'FJ-CD-A3', finish: 'baryta', format: 'A3', priceCents: 18000, stock: 12 },
      { sku: 'FJ-CD-A2', finish: 'baryta', format: 'A2', priceCents: 32000, stock: 8 },
    ],
  },
  {
    slug: 'sony-a7iv',
    brand: 'Sony',
    name: 'A7 IV · corpo',
    nameEn: 'A7 IV · body',
    category: 'cameras',
    collection: 'digital',
    description:
      'O corpo digital de agência: 33 MP, dois slots, AF que segura um rosto no scramble. Entregue revisto, obturador contado.',
    descriptionEn:
      'The digital agency body: 33 MP, dual slots, AF that holds a face in a scramble. Handed over serviced, shutter counted.',
    imageUrl: '/photos/camera-nikon.jpg',
    images: ['/photos/camera-nikon.jpg', '/photos/hero.jpg', '/photos/press.jpg'],
    variants: [
      { sku: 'SY-A7IV-BDY', finish: 'black', format: 'body', priceCents: 239900, stock: 3 },
    ],
  },
  {
    slug: 'canon-r5',
    brand: 'Canon',
    name: 'EOS R5 · corpo',
    nameEn: 'EOS R5 · body',
    category: 'cameras',
    collection: 'digital',
    description:
      '45 MP para a página inteira. IBIS, vídeo quando a mesa pede, o mesmo grip que o 70-200 já conhece.',
    descriptionEn:
      '45 MP for a full page. IBIS, video when the desk asks, the same grip the 70-200 already knows.',
    imageUrl: '/photos/hero.jpg',
    images: ['/photos/hero.jpg', '/photos/camera-table.jpg'],
    variants: [
      { sku: 'CN-R5-BDY', finish: 'black', format: 'body', priceCents: 369900, stock: 2 },
    ],
  },
  {
    slug: 'peak-everyday',
    brand: 'Peak Design',
    name: 'Everyday Messenger 13L',
    nameEn: 'Everyday Messenger 13L',
    category: 'accessories',
    collection: 'accessories',
    description:
      'A mala de rua: um corpo, duas lentes, um portátil. Abre de lado no passeio sem despejar o resto.',
    descriptionEn:
      'The street bag: one body, two lenses, a laptop. Opens from the side on the pavement without spilling the rest.',
    imageUrl: '/photos/camera-hand.jpg',
    images: ['/photos/camera-hand.jpg', '/photos/street-city.jpg'],
    variants: [
      { sku: 'PD-MSG-13-BLK', finish: 'black', format: '13L', priceCents: 22900, stock: 8 },
      { sku: 'PD-MSG-13-ASH', finish: 'ash', format: '13L', priceCents: 22900, stock: 4 },
    ],
  },
  {
    slug: 'godox-v1',
    brand: 'Godox',
    name: 'V1 Pro · flash',
    nameEn: 'V1 Pro · flash',
    category: 'accessories',
    collection: 'accessories',
    description:
      'Cabeça redonda, TTL, a luz de preenchimento que o fotojornalismo ainda usa quando o teto some.',
    descriptionEn:
      'Round head, TTL, the fill light photojournalism still uses when the ceiling disappears.',
    imageUrl: '/photos/camera-table.jpg',
    images: ['/photos/camera-table.jpg', '/photos/hero.jpg'],
    variants: [
      { sku: 'GX-V1-CAN', finish: 'black', format: 'Canon', priceCents: 28900, stock: 6 },
      { sku: 'GX-V1-NIK', finish: 'black', format: 'Nikon', priceCents: 28900, stock: 5 },
      { sku: 'GX-V1-SON', finish: 'black', format: 'Sony', priceCents: 28900, stock: 4 },
    ],
  },
  {
    slug: 'sandisk-cfexpress',
    brand: 'SanDisk',
    name: 'CFexpress Type B 256 GB',
    nameEn: 'CFexpress Type B 256 GB',
    category: 'accessories',
    collection: 'accessories',
    description:
      'O cartão que aguenta 40 fps no R6 II e no Z9. Dois na mochila, sempre.',
    descriptionEn:
      'The card that holds 40 fps on the R6 II and the Z9. Two in the bag, always.',
    imageUrl: '/photos/tele.jpg',
    images: ['/photos/tele.jpg', '/photos/lens.jpg'],
    variants: [
      { sku: 'SD-CFE-256', finish: 'black', format: '256GB', priceCents: 18900, stock: 14 },
    ],
  },
]
