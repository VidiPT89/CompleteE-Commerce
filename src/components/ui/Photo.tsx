'use client'

import { useState } from 'react'

type Props = {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

export function Photo({ src, alt, className, priority }: Props) {
  const [current, setCurrent] = useState(src)

  return (
    // Native img: local JPEGs in public/photos, no Next optimizer.
    <img
      src={current}
      alt={alt}
      fetchPriority={priority ? 'high' : undefined}
      className={`absolute inset-0 h-full w-full object-cover ${className ?? ''}`}
      onError={() => {
        if (current !== '/photos/hero.jpg') setCurrent('/photos/hero.jpg')
      }}
    />
  )
}
