'use client'

import { useLocale } from '@/i18n/LocaleProvider'
import { motion } from 'framer-motion'
import Image from 'next/image'
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

type Product = {
  slug: string
  brand: string
  name: string
  nameEn: string
  imageUrl: string
  variants: { priceCents: number }[]
}

export function HomeDesk() {
  const { t, locale } = useLocale()
  const [collections, setCollections] = useState<Collection[]>([])
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    void fetch('/api/collections').then(async (res) => setCollections((await res.json()) as Collection[]))
    void fetch('/api/products').then(async (res) => {
      const all = (await res.json()) as Product[]
      setFeatured(all.slice(0, 4))
    })
  }, [])

  return (
    <div>
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
        <div className="flex flex-col justify-end py-6">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[#ff7a00]">{t.heroLead}</p>
          <h1 className="display mt-3 text-7xl uppercase leading-[0.85] text-[#ffaa00] md:text-[7.5rem]">
            {t.brand}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-[#f4e6c8]/80">{t.heroCopy}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn">
              {t.shop}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-black/15">↗</span>
            </Link>
            <Link href="/atelier" className="rounded-full border border-[#f4e6c8]/20 px-5 py-3 text-sm">
              {t.atelier}
            </Link>
          </div>
        </div>
        <div className="shell">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.1rem]">
            <Image
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.22em] text-[#f4e6c8]">
              FM2n · Cascais
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <p className="text-[11px] uppercase tracking-[0.28em] text-[#ff7a00]">{t.collections}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <Link href={`/shop?collection=${collection.slug}`} className="card group block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={collection.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                    sizes="33vw"
                  />
                </div>
                <div className="p-5">
                  <h2 className="display text-3xl uppercase text-[#ffaa00]">
                    {locale === 'en' ? collection.nameEn : collection.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#f4e6c8]/70">
                    {locale === 'en' ? collection.leadEn : collection.lead}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-5 flex items-end justify-between">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#ff7a00]">{t.browse}</p>
          <Link href="/shop" className="text-sm text-[#ff7a00]">
            {t.shop}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="card group">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  sizes="25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#ff7a00]">{product.brand}</p>
                <h3 className="display mt-1 text-xl uppercase">
                  {locale === 'en' ? product.nameEn : product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
