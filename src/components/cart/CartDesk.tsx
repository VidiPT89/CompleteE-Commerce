'use client'

import { Photo } from '@/components/ui/Photo'
import { formatEuro } from '@/lib/catalog'
import { useCart } from '@/lib/cart-client'
import { useLocale } from '@/i18n/LocaleProvider'
import Link from 'next/link'

export function CartDesk() {
  const { t, locale } = useLocale()
  const { items, totalCents, setQty, clear } = useCart()

  if (items.length === 0) return <p>{t.empty}</p>

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <h1 className="display text-5xl uppercase text-[#ffaa00]">{t.cart}</h1>
        {items.map((item) => (
          <article key={item.id} className="card flex gap-4 p-3">
            <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg">
              <Photo src={item.imageUrl} alt="" className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1">
              <h2 className="display text-xl uppercase">{locale === 'en' ? item.nameEn : item.name}</h2>
              <p className="text-sm text-[#f4e6c8]/70">
                {item.finish} · {item.format} · {item.sku}
              </p>
              <p className="mt-1 text-[#ffaa00]">{formatEuro(item.priceCents, locale)}</p>
              <div className="mt-2 flex items-center gap-3">
                <button type="button" onClick={() => setQty(item.variantId, item.quantity - 1)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => setQty(item.variantId, item.quantity + 1)}>
                  +
                </button>
              </div>
            </div>
          </article>
        ))}
        <button type="button" className="text-sm underline" onClick={() => void clear()}>
          {locale === 'en' ? 'Clear cart' : 'Esvaziar carrinho'}
        </button>
      </div>
      <aside className="card h-fit p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#ff7a00]">{t.checkout}</p>
        <p className="display mt-2 text-4xl text-[#ffaa00]">{formatEuro(totalCents, locale)}</p>
        <Link href="/checkout" className="btn mt-6 w-full">
          {t.continue}
        </Link>
      </aside>
    </div>
  )
}
