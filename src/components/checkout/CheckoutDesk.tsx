'use client'

import { formatEuro } from '@/lib/catalog'
import { useCart } from '@/lib/cart-client'
import { useLocale } from '@/i18n/LocaleProvider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CheckoutDesk() {
  const { t, locale } = useLocale()
  const { items, totalCents, refresh } = useCart()
  const router = useRouter()
  const [method, setMethod] = useState<'card' | 'pix'>('card')
  const [pix, setPix] = useState('')
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    postal: '',
  })

  async function pay() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, method, locale }),
    })
    const json = (await res.json()) as { url?: string; pixCode?: string }
    if (json.pixCode) setPix(json.pixCode)
    await refresh()
    if (json.url && method === 'card') window.location.href = json.url
    if (json.url && method === 'pix' && !json.pixCode) router.push(json.url)
  }

  if (items.length === 0 && !pix) {
    return <p>{t.empty}</p>
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        className="card space-y-3 p-6"
        onSubmit={(e) => {
          e.preventDefault()
          void pay()
        }}
      >
        <h1 className="display text-4xl uppercase text-[#ffaa00]">{t.checkout}</h1>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#ff7a00]">{t.shipping}</p>
        <input className="field" required placeholder={t.fullName} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="field" required type="email" placeholder={t.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="field" required placeholder={t.address} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <input className="field" required placeholder={t.city} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input className="field" required placeholder={t.postal} value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} />
        </div>
        <p className="pt-2 text-[11px] uppercase tracking-[0.2em] text-[#ff7a00]">{t.payment}</p>
        <div className="flex gap-2">
          <button type="button" className={`rounded-full px-3 py-1 text-sm ${method === 'card' ? 'bg-[#ff7a00] text-black' : 'border border-[#f4e6c8]/25'}`} onClick={() => setMethod('card')}>
            {t.card}
          </button>
          <button type="button" className={`rounded-full px-3 py-1 text-sm ${method === 'pix' ? 'bg-[#ffaa00] text-black' : 'border border-[#f4e6c8]/25'}`} onClick={() => setMethod('pix')}>
            {t.pix}
          </button>
        </div>
        <button className="btn w-full" type="submit">
          {t.pay} · {formatEuro(totalCents, locale)}
        </button>
        {pix ? (
          <div className="break-all rounded-lg border border-[#ffaa00]/40 p-3 text-xs">
            <p className="mb-2 text-[#ffaa00]">PIX</p>
            {pix}
          </div>
        ) : null}
      </form>
      <aside className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="card p-4">
            <p className="display text-xl uppercase">{locale === 'en' ? item.nameEn : item.name}</p>
            <p className="text-sm text-[#f4e6c8]/65">
              {item.finish} · {item.format} · ×{item.quantity}
            </p>
          </article>
        ))}
      </aside>
    </div>
  )
}
