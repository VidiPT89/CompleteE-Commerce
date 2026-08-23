export type CatalogProduct = {
  slug: string
  name: string
  nameEn: string
  category: string
  description: string
  imageUrl: string
  variants: { color: string; size: string; priceCents: number; stock: number }[]
}

export type CatalogQuery = {
  q?: string
  category?: string
  color?: string
  size?: string
  minCents?: number
  maxCents?: number
}

export function matchesCatalog(product: CatalogProduct, query: CatalogQuery): boolean {
  const q = query.q?.trim().toLowerCase() ?? ''
  const hay = `${product.name} ${product.nameEn} ${product.category} ${product.description}`.toLowerCase()
  if (q && !hay.includes(q)) return false
  if (query.category && product.category !== query.category) return false

  const variants = product.variants.filter((variant) => {
    if (query.color && variant.color !== query.color) return false
    if (query.size && variant.size !== query.size) return false
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
