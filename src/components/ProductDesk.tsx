'use client'

import { formatEuro } from '@/lib/catalog'
import { useCart } from '@/lib/cart-client'
import { useLocale } from '@/i18n/LocaleProvider'
import Image from 'next/image'
import { useMemo, useState } from 'react'

type Product = {
  slug: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  imageUrl: string
  variants: { id: string; color: string; size: string; priceCents: number; stock: number; sku: string }[]
}

export function ProductDesk({ product }: { product: Product }) {
  const { t, locale } = useLocale()
  const { add } = useCart()
  const [color, setColor] = useState(product.variants[0]?.color ?? '')
  const [size, setSize] = useState(product.variants[0]?.size ?? '')
  const [note, setNote] = useState('')

  const colors = [...new Set(product.variants.map((v) => v.color))]
  const sizes = product.variants.filter((v) => v.color === color).map((v) => v.size)
  const variant = useMemo(
    () => product.variants.find((v) => v.color === color && v.size === size),
    [product.variants, color, size],
  )

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#f4e6c8]/15">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="50vw" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-[#ff7a00]">{t.variant}</p>
        <h1 className="display mt-2 text-5xl uppercase text-[#ffaa00]">
          {locale === 'en' ? product.nameEn : product.name}
        </h1>
        <p className="mt-4 text-[#f4e6c8]/80">
          {locale === 'en' ? product.descriptionEn : product.description}
        </p>
        <p className="mt-6 text-2xl text-[#ffaa00]">
          {variant ? formatEuro(variant.priceCents, locale) : '—'}
        </p>
        <p className="mt-1 text-sm text-[#f4e6c8]/60">
          {variant ? `${variant.stock} ${t.stock}` : t.out}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              className={`rounded-full px-3 py-1 text-sm ${color === c ? 'bg-[#ff7a00] text-black' : 'border border-[#f4e6c8]/25'}`}
              onClick={() => {
                setColor(c)
                const next = product.variants.find((v) => v.color === c)
                if (next) setSize(next.size)
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`rounded-full px-3 py-1 text-sm ${size === s ? 'bg-[#ffaa00] text-black' : 'border border-[#f4e6c8]/25'}`}
              onClick={() => setSize(s)}
            >
              {s}
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
  )
}
