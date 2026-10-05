import { cookies } from 'next/headers'
import { prisma } from './prisma'

export const CART_COOKIE = 'forja-cart'

export async function getCartId() {
  const jar = await cookies()
  const id = jar.get(CART_COOKIE)?.value
  if (id) {
    const existing = await prisma.cart.findUnique({ where: { id } })
    if (existing) return id
  }
  const cart = await prisma.cart.create({ data: {} })
  jar.set(CART_COOKIE, cart.id, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 90 })
  return cart.id
}

export async function cartPayload(cartId: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          variant: { include: { product: true } },
        },
      },
    },
  })
  if (!cart) return { id: cartId, items: [], totalCents: 0, count: 0 }

  const items = cart.items.map((item) => ({
    id: item.id,
    variantId: item.variantId,
    quantity: item.quantity,
    sku: item.variant.sku,
    finish: item.variant.finish,
    format: item.variant.format,
    priceCents: item.variant.priceCents,
    stock: item.variant.stock,
    slug: item.variant.product.slug,
    name: item.variant.product.name,
    nameEn: item.variant.product.nameEn,
    imageUrl: item.variant.product.imageUrl,
  }))

  return {
    id: cart.id,
    items,
    totalCents: items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
  }
}
