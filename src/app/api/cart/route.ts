import { cartPayload, getCartId } from '@/lib/cart'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const id = await getCartId()
  return NextResponse.json(await cartPayload(id))
}

export async function POST(request: Request) {
  const body = (await request.json()) as { variantId?: string; quantity?: number }
  const variantId = body.variantId ?? ''
  const quantity = Math.max(1, Number(body.quantity || 1))
  const variant = await prisma.variant.findUnique({ where: { id: variantId } })
  if (!variant) return NextResponse.json({ error: 'missing' }, { status: 404 })

  const cartId = await getCartId()
  await prisma.cartItem.upsert({
    where: { cartId_variantId: { cartId, variantId } },
    update: { quantity: { increment: quantity } },
    create: { cartId, variantId, quantity },
  })
  return NextResponse.json(await cartPayload(cartId))
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as { variantId?: string; quantity?: number }
  const cartId = await getCartId()
  const variantId = body.variantId ?? ''
  const quantity = Number(body.quantity || 0)
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({ where: { cartId, variantId } })
  } else {
    await prisma.cartItem.updateMany({ where: { cartId, variantId }, data: { quantity } })
  }
  return NextResponse.json(await cartPayload(cartId))
}

export async function DELETE() {
  const cartId = await getCartId()
  await prisma.cartItem.deleteMany({ where: { cartId } })
  return NextResponse.json(await cartPayload(cartId))
}
