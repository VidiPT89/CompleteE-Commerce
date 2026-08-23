'use client'

import { readJson } from '@/lib/http'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type CartLine = {
  id: string
  variantId: string
  quantity: number
  sku: string
  finish: string
  format: string
  priceCents: number
  stock: number
  slug: string
  name: string
  nameEn: string
  imageUrl: string
}

type CartShape = { items: CartLine[]; totalCents: number; count: number }

type Ctx = CartShape & {
  refresh: () => Promise<void>
  add: (variantId: string, quantity?: number) => Promise<void>
  setQty: (variantId: string, quantity: number) => Promise<void>
  clear: () => Promise<void>
}

const CartContext = createContext<Ctx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CartShape>({ items: [], totalCents: 0, count: 0 })

  const refresh = useCallback(async () => {
    const res = await fetch('/api/cart')
    const json = await readJson<CartShape>(res, { items: [], totalCents: 0, count: 0 })
    setData({ items: json.items ?? [], totalCents: json.totalCents ?? 0, count: json.count ?? 0 })
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo<Ctx>(
    () => ({
      ...data,
      refresh,
      add: async (variantId, quantity = 1) => {
        await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variantId, quantity }),
        })
        await refresh()
      },
      setQty: async (variantId, quantity) => {
        await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ variantId, quantity }),
        })
        await refresh()
      },
      clear: async () => {
        await fetch('/api/cart', { method: 'DELETE' })
        await refresh()
      },
    }),
    [data, refresh],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): Ctx {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('CartProvider missing')
  return ctx
}
