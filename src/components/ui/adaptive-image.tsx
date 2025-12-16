'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface AdaptiveImageProps {
  src: string
  alt: string
  priority?: boolean
}

export function AdaptiveImage({ src, alt, priority = false }: AdaptiveImageProps) {
  const [aspectRatio, setAspectRatio] = useState<number>(16/9)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = document.createElement('img')
      img.onload = () => {
        setAspectRatio(img.width / img.height)
        setLoading(false)
      }
      img.src = src
    }
  }, [src])

  const isPortrait = aspectRatio < 1
  const isSquarish = aspectRatio >= 0.9 && aspectRatio <= 1.1
  
  return (
    <div 
      className={`relative w-full overflow-hidden rounded-lg ${
        loading ? 'animate-pulse bg-gray-200' : ''
      } ${
        isPortrait ? 'h-[400px]' : 
        isSquarish ? 'h-[300px]' :
        'h-[250px]'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
      />
    </div>
  )
}