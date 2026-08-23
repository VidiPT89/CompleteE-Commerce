'use client'

import { formatEuro } from '@/lib/catalog'
import { useLocale } from '@/i18n/LocaleProvider'
import { useEffect, useState } from 'react'

type Variant = { id: string; sku: string; color: string; size: string; priceCents: number; stock: number }
type Product = { id: string; name: string; nameEn: string; category: string; variants: Variant[] }
type Order = {
  id: string
  email: string
  totalCents: number
  method: string
  status: string
  createdAt: string
}

export function AdminDesk() {
  const { t, locale } = useLocale()
  const [ok, setOk] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState<'products' | 'orders' | 'stock'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [form, setForm] = useState({
    name: '',
    nameEn: '',
    category: 'accessories',
    sku: '',
    color: 'black',
    size: 'OS',
    priceCents: 4900,
    stock: 4,
    imageUrl: '',
  })

  async function load() {
    const session = await fetch('/api/admin/session')
    const json = (await session.json()) as { ok: boolean }
    setOk(json.ok)
    if (!json.ok) return
    const [p, o] = await Promise.all([fetch('/api/admin/products'), fetch('/api/admin/orders')])
    setProducts((await p.json()) as Product[])
    setOrders((await o.json()) as Order[])
  }

  useEffect(() => {
    void load()
  }, [])

  if (!ok) {
    return (
      <form
        className="card mx-auto max-w-sm p-6"
        onSubmit={async (e) => {
          e.preventDefault()
          const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
          })
          if (res.ok) await load()
        }}
      >
        <h1 className="display text-3xl uppercase text-[#ffaa00]">{t.admin}</h1>
        <input
          className="field mt-4"
          type="password"
          placeholder={t.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn mt-4 w-full" type="submit">
          {t.login}
        </button>
      </form>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {(['products', 'orders', 'stock'] as const).map((key) => (
          <button
            key={key}
            type="button"
            className={`rounded-full px-4 py-1 ${tab === key ? 'bg-[#ff7a00] text-black' : 'border border-[#f4e6c8]/20'}`}
            onClick={() => setTab(key)}
          >
            {key === 'products' ? t.products : key === 'orders' ? t.orders : t.stockCol}
          </button>
        ))}
        <button
          type="button"
          className="ml-auto text-sm underline"
          onClick={async () => {
            await fetch('/api/admin/login', { method: 'DELETE' })
            setOk(false)
          }}
        >
          {t.logout}
        </button>
      </div>

      {tab === 'products' ? (
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            className="card space-y-3 p-5"
            onSubmit={async (e) => {
              e.preventDefault()
              await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
              })
              await load()
            }}
          >
            <h2 className="display text-2xl uppercase">{t.newProduct}</h2>
            <input className="field" placeholder={t.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="field" placeholder={t.nameEn} value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} />
            <input className="field" placeholder={t.sku} value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <input
              className="field"
              type="number"
              placeholder={t.price}
              value={form.priceCents}
              onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })}
            />
            <input
              type="file"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const data = new FormData()
                data.set('file', file)
                const res = await fetch('/api/admin/upload', { method: 'POST', body: data })
                const json = (await res.json()) as { url?: string }
                if (json.url) setForm((prev) => ({ ...prev, imageUrl: json.url as string }))
              }}
            />
            <button className="btn" type="submit">
              {t.save}
            </button>
          </form>
          <div className="space-y-3">
            {products.map((product) => (
              <article key={product.id} className="card p-4">
                <h3 className="display text-xl uppercase">{locale === 'en' ? product.nameEn : product.name}</h3>
                <p className="text-sm text-[#f4e6c8]/60">{product.category}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {tab === 'orders' ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="card p-4">
              <p className="text-[#ffaa00]">{order.email}</p>
              <p className="text-sm">
                {formatEuro(order.totalCents, locale)} · {order.method} · {order.status}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {tab === 'stock' ? (
        <div className="space-y-3">
          {products.flatMap((product) =>
            product.variants.map((variant) => (
              <article key={variant.id} className="card flex items-center gap-3 p-4">
                <div className="flex-1">
                  <p>
                    {product.name} · {variant.color} · {variant.size}
                  </p>
                  <p className="text-xs text-[#f4e6c8]/55">{variant.sku}</p>
                </div>
                <input
                  className="field w-24"
                  type="number"
                  defaultValue={variant.stock}
                  onBlur={async (e) => {
                    await fetch('/api/admin/stock', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ variantId: variant.id, stock: Number(e.target.value) }),
                    })
                  }}
                />
              </article>
            )),
          )}
        </div>
      ) : null}
    </div>
  )
}
