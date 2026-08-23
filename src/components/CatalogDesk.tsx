'use client'

import { formatEuro } from '@/lib/catalog'
import { useLocale } from '@/i18n/LocaleProvider'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Product = {
  id: string
  slug: string
  name: string
  nameEn: string
  category: string
  imageUrl: string
  variants: { color: string; size: string; priceCents: number; stock: number }[]
}

export function CatalogDesk() {
  const { t, locale } = useLocale()
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (category) params.set('category', category)
    if (color) params.set('color', color)
    if (size) params.set('size', size)
    void fetch(`/api/products?${params}`).then(async (res) => setProducts((await res.json()) as Product[]))
  }, [q, category, color, size])

  const colors = useMemo(
    () => [...new Set(products.flatMap((p) => p.variants.map((v) => v.color)))],
    [products],
  )
  const sizes = useMemo(() => [...new Set(products.flatMap((p) => p.variants.map((v) => v.size)))], [products])

  return (
    <div>
      <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#ff7a00]">{t.heroLead}</p>
          <h1 className="display mt-2 text-6xl uppercase leading-none text-[#ffaa00] md:text-8xl">{t.brand}</h1>
          <p className="mt-4 max-w-xl text-[#f4e6c8]/80">{t.heroCopy}</p>
        </div>
        <p className="text-right text-sm uppercase tracking-[0.2em] text-[#f4e6c8]/55">{t.tagline}</p>
      </section>

      <div className="mb-8 grid gap-3 md:grid-cols-4">
        <input className="field md:col-span-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} />
        <select className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">{t.all}</option>
          {['outerwear', 'tops', 'bottoms', 'footwear', 'accessories'].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <select className="field" value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">{t.color}</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select className="field" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">{t.size}</option>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => {
          const from = Math.min(...product.variants.map((v) => v.priceCents))
          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card group"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={locale === 'en' ? product.nameEn : product.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#ff7a00]">{product.category}</p>
                  <h2 className="display mt-1 text-2xl uppercase">
                    {locale === 'en' ? product.nameEn : product.name}
                  </h2>
                  <p className="mt-2 text-[#ffaa00]">{formatEuro(from, locale)}</p>
                </div>
              </Link>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
