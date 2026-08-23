'use client'

import { Photo } from '@/components/ui/Photo'
import { formatEuro } from '@/lib/catalog'
import { useCart } from '@/lib/cart-client'
import { useLocale } from '@/i18n/LocaleProvider'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type Product = {
  slug: string
  brand: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  imageUrl: string
  images: { url: string }[]
  collection: { slug: string; name: string; nameEn: string }
  variants: { id: string; finish: string; format: string; priceCents: number; stock: number; sku: string }[]
}

export function ProductDesk({ product, related }: { product: Product; related: Product[] }) {
  const { t, locale } = useLocale()
  const { add } = useCart()
  const gallery = product.images.length ? product.images.map((i) => i.url) : [product.imageUrl]
  const [shot, setShot] = useState(gallery[0])
  const [finish, setFinish] = useState(product.variants[0]?.finish ?? '')
  const [format, setFormat] = useState(product.variants[0]?.format ?? '')
  const [note, setNote] = useState('')

  const finishes = [...new Set(product.variants.map((v) => v.finish))]
  const formats = product.variants.filter((v) => v.finish === finish).map((v) => v.format)
  const variant = useMemo(
    () => product.variants.find((v) => v.finish === finish && v.format === format),
    [product.variants, finish, format],
  )

  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-[#ff7a00]">
        <Link href={`/shop?collection=${product.collection.slug}`}>
          {locale === 'en' ? product.collection.nameEn : product.collection.name}
        </Link>
        {' · '}
        {product.brand}
      </p>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="shell">
            <div className="relative min-h-[480px] overflow-hidden rounded-[1.05rem]">
              <Photo src={shot} alt="" className="object-cover" sizes="55vw" priority />
            </div>
          </div>
          {gallery.length > 1 ? (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {gallery.map((url) => (
                <button
                  key={url}
                  type="button"
                  className={`relative h-20 overflow-hidden rounded-lg ${shot === url ? 'ring-2 ring-[#ff7a00]' : ''}`}
                  onClick={() => setShot(url)}
                >
                  <Photo src={url} alt="" className="object-cover" sizes="120px" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <h1 className="display text-5xl uppercase leading-none text-[#ffaa00]">
            {locale === 'en' ? product.nameEn : product.name}
          </h1>
          <p className="mt-5 text-[#f4e6c8]/80">
            {locale === 'en' ? product.descriptionEn : product.description}
          </p>
          <p className="mt-6 text-3xl text-[#ffaa00]">
            {variant ? formatEuro(variant.priceCents, locale) : '—'}
          </p>
          <p className="mt-1 text-sm text-[#f4e6c8]/60">
            {variant ? `${variant.sku} · ${variant.stock} ${t.stock}` : t.out}
          </p>

          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#ff7a00]">{t.variant}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {finishes.map((item) => (
              <button
                key={item}
                type="button"
                className={`rounded-full px-3 py-1 text-sm ${finish === item ? 'bg-[#ff7a00] text-black' : 'border border-[#f4e6c8]/25'}`}
                onClick={() => {
                  setFinish(item)
                  const next = product.variants.find((v) => v.finish === item)
                  if (next) setFormat(next.format)
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {formats.map((item) => (
              <button
                key={item}
                type="button"
                className={`rounded-full px-3 py-1 text-sm ${format === item ? 'bg-[#ffaa00] text-black' : 'border border-[#f4e6c8]/25'}`}
                onClick={() => setFormat(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn mt-8"
            disabled={!variant || variant.stock < 1}
            onClick={async () => {
              if (!variant) return
              await add(variant.id)
              setNote(t.added)
            }}
          >
            {variant && variant.stock < 1 ? t.out : t.add}
          </button>
          {note ? <p className="mt-3 text-[#ffaa00]">{note}</p> : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#ff7a00]">{t.related}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="card">
                <div className="relative h-44 overflow-hidden">
                  <Photo src={item.imageUrl} alt="" className="object-cover" sizes="30vw" />
                </div>
                <div className="p-3">
                  <p className="text-[11px] text-[#ff7a00]">{item.brand}</p>
                  <p className="display text-lg uppercase">{locale === 'en' ? item.nameEn : item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
