import { cartPayload, getCartId } from '@/lib/cart'
import { formatEuro } from '@/lib/catalog'
import { orderMail, sendMail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

function pixPayload(orderId: string, cents: number) {
  return `00020126360014BR.GOV.BCB.PIX0114forja@ividi.dev520400005303986540${(cents / 100).toFixed(2)}5802PT5913FORJA ATELIER6007Cascais62070503***6304${orderId.slice(0, 4).toUpperCase()}`
}

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; method?: 'card' | 'pix'; locale?: string }
  const email = body.email?.trim().toLowerCase() ?? ''
  const method = body.method === 'pix' ? 'pix' : 'card'
  const locale = body.locale === 'en' ? 'en' : 'pt'
  if (!email) return NextResponse.json({ error: 'invalid' }, { status: 400 })

  const cartId = await getCartId()
  const cart = await cartPayload(cartId)
  if (cart.items.length === 0) return NextResponse.json({ error: 'empty' }, { status: 400 })

  for (const item of cart.items) {
    if (item.quantity > item.stock) {
      return NextResponse.json({ error: 'stock' }, { status: 409 })
    }
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const stripe = getStripe()
  const currency = method === 'pix' ? 'brl' : 'eur'
  const totalCents =
    method === 'pix' ? Math.round(cart.totalCents * 5.5) : cart.totalCents

  const order = await prisma.order.create({
    data: {
      email,
      totalCents,
      currency,
      method,
      status: stripe && method === 'card' ? 'pending' : 'paid',
      pixCode: method === 'pix' ? pixPayload(crypto.randomUUID(), totalCents) : null,
      items: {
        create: cart.items.map((item) => ({
          variantId: item.variantId,
          title: item.name,
          color: item.color,
          size: item.size,
          priceCents: item.priceCents,
          quantity: item.quantity,
        })),
      },
    },
  })

  if (order.status === 'paid') {
    await prisma.$transaction(
      cart.items.map((item) =>
        prisma.variant.update({
          where: { id: item.variantId },
          data: { stock: { decrement: item.quantity } },
        }),
      ),
    )
    await prisma.cartItem.deleteMany({ where: { cartId } })
    const copy = orderMail(locale, order.id, formatEuro(cart.totalCents, locale), method)
    await sendMail({ kind: 'order', to: email, ...copy })
  }

  if (method === 'pix') {
    return NextResponse.json({
      url: `${origin}/checkout/success?order=${order.id}`,
      pixCode: order.pixCode,
    })
  }

  if (!stripe) {
    return NextResponse.json({ url: `${origin}/checkout/success?order=${order.id}` })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    metadata: { orderId: order.id },
    payment_method_types: ['card'],
    line_items: cart.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'eur',
        unit_amount: item.priceCents,
        product_data: { name: `${item.name} · ${item.color} · ${item.size}` },
      },
    })),
  })

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  })

  return NextResponse.json({ url: session.url })
}
