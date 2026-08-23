'use client'

import { formatEuro } from '@/lib/catalog'
import { useCart } from '@/lib/cart-client'
import { useLocale } from '@/i18n/LocaleProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CartDesk() {
  const { t, locale } = useLocale()
  const { items, totalCents, setQty, clear, refresh } = useCart()
  const [email, setEmail] = useState('')
  const [method, setMethod] = useState<'card' | 'pix'>('card')
  const [pix, setPix] = useState('')
  const router = useRouter()

  async function pay() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, method, locale }),
    })
    const json = (await res.json()) as { url?: string; pixCode?: string }
    if (json.pixCode) setPix(json.pixCode)
    if (json.url) {
      await refresh()
      if (method === 'pix') {
        return
      }
      window.location.href = json.url
    }
  }

  if (items.length === 0 && !pix) {
    return <p>{t.empty}</p>
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="card flex gap-4 p-3">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1">
              <h2 className="display text-xl uppercase">{locale === 'en' ? item.nameEn : item.name}</h2>
              <p className="text-sm text-[#f4e6c8]/70">
                {item.color} · {item.size} · {formatEuro(item.priceCents, locale)}
              </p>
              <div className="mt-2 flex items-center gap-2">
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
      </div>

      <aside className="card p-5">
        <h2 className="display text-3xl uppercase text-[#ffaa00]">{t.checkout}</h2>
        <p className="mt-2 text-xl">{formatEuro(totalCents, locale)}</p>
        <label className="mt-4 block text-sm">
          {t.email}
          <input className="field mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className={`rounded-full px-3 py-1 text-sm ${method === 'card' ? 'bg-[#ff7a00] text-black' : 'border border-[#f4e6c8]/25'}`}
            onClick={() => setMethod('card')}
          >
            {t.card}
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 text-sm ${method === 'pix' ? 'bg-[#ffaa00] text-black' : 'border border-[#f4e6c8]/25'}`}
            onClick={() => setMethod('pix')}
          >
            {t.pix}
          </button>
        </div>
        <button type="button" className="btn mt-5 w-full" disabled={!email} onClick={() => void pay()}>
          {t.pay}
        </button>
        {pix ? (
          <div className="mt-4 break-all rounded-lg border border-[#ffaa00]/40 p-3 text-xs">
            <p className="mb-2 text-[#ffaa00]">PIX</p>
            {pix}
            <button type="button" className="btn mt-3 w-full" onClick={() => router.push(`/checkout/success`)}>
              OK
            </button>
          </div>
        ) : null}
        {items.length > 0 ? (
          <button type="button" className="mt-3 text-sm underline" onClick={() => void clear()}>
            {locale === 'en' ? 'Clear cart' : 'Esvaziar carrinho'}
          </button>
        ) : null}
      </aside>
    </div>
  )
}
