'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'

interface FallbackImageProps extends ImageProps {
  fallbackSrc: string
}

export default function FallbackImage({ src, fallbackSrc, alt, className = 'bg-slate-50', ...rest }: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}