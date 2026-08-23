'use client'

import { Photo } from '@/components/ui/Photo'
import { readJson } from '@/lib/http'
import { useLocale } from '@/i18n/LocaleProvider'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Collection = {
  slug: string
  name: string
  nameEn: string
  lead: string
  leadEn: string
  imageUrl: string
}

export function CollectionsDesk() {
  const { locale, t } = useLocale()
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    void fetch('/api/collections').then(async (res) => {
      const data = await readJson<Collection[]>(res, [])
      setCollections(Array.isArray(data) ? data : [])
    })
  }, [])

  return (
    <div>
      <h1 className="display text-6xl uppercase text-[#ffaa00]">{t.collections}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.slug} href={`/shop?collection=${collection.slug}`} className="card group">
            <div className="relative h-64 overflow-hidden">
              <Photo
                src={collection.imageUrl}
                alt=""
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                sizes="50vw"
              />
            </div>
            <div className="p-5">
              <h2 className="display text-3xl uppercase">
                {locale === 'en' ? collection.nameEn : collection.name}
              </h2>
              <p className="mt-2 text-[#f4e6c8]/70">{locale === 'en' ? collection.leadEn : collection.lead}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
