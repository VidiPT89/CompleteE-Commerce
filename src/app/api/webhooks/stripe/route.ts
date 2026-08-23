import { formatEuro } from '@/lib/catalog'
import { orderMail, sendMail } from '@/lib/mail'
import { prisma } from '@/lib/prisma'
import { getStripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) return NextResponse.json({ received: true })

  const body = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''
  const event = stripe.webhooks.constructEvent(body, signature, secret)
  if (event.type !== 'checkout.session.completed') return NextResponse.json({ received: true })

  const session = event.data.object
  const orderId = session.metadata?.orderId
  if (!orderId) return NextResponse.json({ received: true })

  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } })
  if (!order || order.status === 'paid') return NextResponse.json({ received: true })

  await prisma.$transaction([
    prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } }),
    ...order.items.map((item) =>
      prisma.variant.update({
        where: { id: item.variantId },
        data: { stock: { decrement: item.quantity } },
      }),
    ),
  ])

  const copy = orderMail('pt', order.id, formatEuro(order.totalCents, 'pt'), order.method)
  await sendMail({ kind: 'order', to: order.email, ...copy })
  return NextResponse.json({ received: true })
}
