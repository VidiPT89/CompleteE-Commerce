export type CatalogProduct = {
  slug: string
  name: string
  nameEn: string
  brand: string
  category: string
  collectionSlug?: string
  description: string
  imageUrl: string
  variants: { finish: string; format: string; priceCents: number; stock: number }[]
}

export type CatalogQuery = {
  q?: string
  category?: string
  collection?: string
  finish?: string
  format?: string
  minCents?: number
  maxCents?: number
}

export function matchesCatalog(product: CatalogProduct, query: CatalogQuery): boolean {
  const q = query.q?.trim().toLowerCase() ?? ''
  const hay = `${product.brand} ${product.name} ${product.nameEn} ${product.category} ${product.description}`.toLowerCase()
  if (q && !hay.includes(q)) return false
  if (query.category && product.category !== query.category) return false
  if (query.collection && product.collectionSlug !== query.collection) return false

  const variants = product.variants.filter((variant) => {
    if (query.finish && variant.finish !== query.finish) return false
    if (query.format && variant.format !== query.format) return false
    if (query.minCents != null && variant.priceCents < query.minCents) return false
    if (query.maxCents != null && variant.priceCents > query.maxCents) return false
    return true
  })

  return variants.length > 0
}

export function formatEuro(cents: number, locale: string) {
  return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(cents / 100)
}

export function nextOrderNumber(seq: number) {
  return `FORJA-${String(seq).padStart(5, '0')}`
}
