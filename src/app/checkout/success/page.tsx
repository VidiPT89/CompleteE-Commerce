'use client'

import { useLocale } from '@/i18n/LocaleProvider'
import Link from 'next/link'

export default function SuccessPage() {
  const { t } = useLocale()
  return (
    <div className="card mx-auto max-w-lg p-8 text-center">
      <h1 className="display text-5xl uppercase text-[#ffaa00]">{t.success}</h1>
      <p className="mt-4 text-[#f4e6c8]/80">{t.successBody}</p>
      <Link href="/" className="btn mt-6 inline-flex">
        {t.shop}
      </Link>
    </div>
  )
}
