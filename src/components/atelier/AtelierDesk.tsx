'use client'

import { Photo } from '@/components/ui/Photo'
import { useLocale } from '@/i18n/LocaleProvider'
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
        <div className="relative h-[28rem] overflow-hidden rounded-[1.05rem]">
          <Photo src="/photos/darkroom.jpg" alt="Quarto escuro: ampliadora, luz de segurança e tinas" className="object-cover" />
          <p className="absolute bottom-4 left-4 z-10 text-xs uppercase tracking-[0.22em] text-[#f4e6c8]">
            Quarto escuro · FORJA
          </p>
        </div>
      </div>
    </div>
  )
}
