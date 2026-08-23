'use client'

import { useLocale } from '@/i18n/LocaleProvider'
import Image from 'next/image'
import Link from 'next/link'

export function AtelierDesk() {
  const { t } = useLocale()
  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#ff7a00]">{t.atelier}</p>
        <h1 className="display mt-3 text-6xl uppercase text-[#ffaa00]">{t.brand}</h1>
        <p className="mt-6 text-lg text-[#f4e6c8]/80">{t.labCopy}</p>
        <p className="mt-6 text-sm text-[#f4e6c8]/60">{t.developed}</p>
        <Link href="/shop" className="btn mt-8">
          {t.shop}
        </Link>
      </div>
      <div className="shell">
        <div className="relative min-h-[420px] overflow-hidden rounded-[1.05rem]">
          <Image
            src="https://images.unsplash.com/photo-1478720568477-1520f6b5d3d4?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  )
}
