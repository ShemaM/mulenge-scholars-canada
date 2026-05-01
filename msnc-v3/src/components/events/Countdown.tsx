'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function Countdown({ targetDate, className }: { targetDate: string; className?: string }) {
  const t = useTranslations('EventPreview') // Reusing Namespace or creating a specific one
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - Date.now()
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft(null)
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  // Prevents hydration error by not rendering until client-side mount
  if (!isMounted || !timeLeft) return null

  const units = [
    { label: t('countdown.days'), val: timeLeft.d },
    { label: t('countdown.hours'), val: timeLeft.h },
    { label: t('countdown.mins'), val: timeLeft.m },
    { label: t('countdown.secs'), val: timeLeft.s },
  ]

  return (
    <div className={cn("flex gap-8 border-y border-border py-8", className)}>
      {units.map((unit, idx) => (
        <div key={unit.label} className="relative group">
          <div className="text-4xl md:text-5xl font-display font-normal text-primary tracking-tighter leading-none">
            {String(unit.val).padStart(2, '0')}
            {idx < units.length - 1 && (
              <span className="absolute -right-5 top-0 text-border font-sans font-light">:</span>
            )}
          </div>
          <div className="section-label text-secondary mt-2 block">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}