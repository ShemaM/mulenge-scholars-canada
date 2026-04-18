'use client'

import React from 'react'
import Image from 'next/image'
import styles from './PartnerMarquee.module.css'

interface Partner {
  id: string | number
  name: string
  logoUrl: string
}

export default function PartnerMarquee({ partners = [] }: { partners?: Partner[] }) {
  if (partners.length === 0) return null

  const marqueePartners = [...partners, ...partners, ...partners]

  return (
    <section className={styles.marqueeContainer}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 uppercase tracking-tight">
          Our Partners
        </h2>
        <div className="flex overflow-hidden group">
          <div className={styles.marqueeWrapper}>
            {marqueePartners.map((partner, i) => (
              <div key={`${partner.id}-${i}`} className={styles.marqueeItem}>
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={200}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                  priority={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
