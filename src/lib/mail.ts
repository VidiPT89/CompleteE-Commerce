import { Resend } from 'resend'
import { prisma } from './prisma'

export async function sendMail(input: { kind: string; to: string; subject: string; body: string }) {
  let delivered = false
  const key = process.env.RESEND_API_KEY
  if (key) {
    const resend = new Resend(key)
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'FORJA <onboarding@resend.dev>',
      to: input.to,
      subject: input.subject,
      text: input.body,
    })
    delivered = true
  }

  await prisma.emailLog.create({ data: { ...input, delivered } })
  return delivered
}

export function orderMail(locale: string, orderId: string, total: string, method: string) {
  if (locale === 'en') {
    return {
      subject: `FORJA order ${orderId.slice(0, 8)}`,
      body: `Thank you. Order ${orderId} is confirmed (${method}). Total ${total}.\n\nDeveloped by David Arsénio Martins\nhttps://ividi.dev/\nhttps://github.com/VidiPT89/`,
    }
  }
  return {
    subject: `Encomenda FORJA ${orderId.slice(0, 8)}`,
    body: `Obrigado. A encomenda ${orderId} está confirmada (${method}). Total ${total}.\n\nDeveloped by David Arsénio Martins\nhttps://ividi.dev/\nhttps://github.com/VidiPT89/`,
  }
}
