'use client'

import { Photo } from '@/components/ui/Photo'
import { formatEuro } from '@/lib/catalog'
import { readJson } from '@/lib/http'
import { useLocale } from '@/i18n/LocaleProvider'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Collection = { slug: string; name: string; nameEn: string }
type Product = {
  id: string
  slug: string
  brand: string
  name: string
  nameEn: string
  category: string
  imageUrl: string
  collection: { slug: string }
  variants: { finish: string; format: string; priceCents: number; stock: number }[]
}

export function ShopDesk({ initialCollection = '' }: { initialCollection?: string }) {
  const { t, locale } = useLocale()
  const [q, setQ] = useState('')
  const [collection, setCollection] = useState(initialCollection)

  useEffect(() => {
    setCollection(initialCollection)
  }, [initialCollection])
  const [finish, setFinish] = useState('')
  const [format, setFormat] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    void fetch('/api/collections').then(async (res) => {
      const data = await readJson<Collection[]>(res, [])
      setCollections(Array.isArray(data) ? data : [])
    })
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (collection) params.set('collection', collection)
    if (finish) params.set('finish', finish)
    if (format) params.set('format', format)
    void fetch(`/api/products?${params}`).then(async (res) => {
      const data = await readJson<Product[]>(res, [])
      setProducts(Array.isArray(data) ? data : [])
    })
  }, [q, collection, finish, format])

  const finishes = useMemo(
    () => [...new Set(products.flatMap((p) => p.variants.map((v) => v.finish)))],
    [products],
  )
  const formats = useMemo(
    () => [...new Set(products.flatMap((p) => p.variants.map((v) => v.format)))],
    [products],
  )

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="card h-fit space-y-4 p-5">
        <h1 className="display text-3xl uppercase text-[#ffaa00]">{t.browse}</h1>
        <input className="field" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} />
        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#ff7a00]">{t.collections}</p>
          <button
            type="button"
            className={`mb-1 block text-sm ${collection === '' ? 'text-[#ffaa00]' : ''}`}
            onClick={() => setCollection('')}
          >
            {t.all}
          </button>
          {collections.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={`mb-1 block text-sm ${collection === item.slug ? 'text-[#ffaa00]' : ''}`}
              onClick={() => setCollection(item.slug)}
            >
              {locale === 'en' ? item.nameEn : item.name}
            </button>
          ))}
        </div>
        <label className="block text-sm">
          {t.finish}
          <select className="field mt-1" value={finish} onChange={(e) => setFinish(e.target.value)}>
            <option value="">{t.all}</option>
            {finishes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          {t.format}
          <select className="field mt-1" value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="">{t.all}</option>
            {formats.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </aside>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const from = Math.min(...product.variants.map((v) => v.priceCents))
          return (
            <Link key={product.id} href={`/products/${product.slug}`} className="card group">
              <div className="relative h-72 overflow-hidden">
                <Photo
                  src={product.imageUrl}
                  alt={locale === 'en' ? product.nameEn : product.name}
                  className="object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  sizes="33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#ff7a00]">{product.brand}</p>
                <h2 className="display mt-1 text-2xl uppercase">
                  {locale === 'en' ? product.nameEn : product.name}
                </h2>
                <p className="mt-2 text-[#ffaa00]">{formatEuro(from, locale)}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
