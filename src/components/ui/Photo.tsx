'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  sizes: string
  priority?: boolean
}

export function Photo({ src, alt, className, sizes, priority }: Props) {
  const [current, setCurrent] = useState(src)

  return (
    <Image
      src={current}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => {
        if (current !== '/photos/hero.jpg') setCurrent('/photos/hero.jpg')
      }}
    />
  )
}
