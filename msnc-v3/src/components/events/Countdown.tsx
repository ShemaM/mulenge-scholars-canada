'use client'
import { useState, useEffect } from 'react'

export function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number } | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - Date.now()
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) return null

  return (
    <div className="flex gap-6 border-y border-slate-100 py-6">
      {[
        { label: 'Days', val: timeLeft.d },
        { label: 'Hours', val: timeLeft.h },
        { label: 'Mins', val: timeLeft.m },
      ].map((t) => (
        <div key={t.label}>
          <div className="text-3xl font-black tracking-tighter text-[#002147]">{String(t.val).padStart(2, '0')}</div>
          <div className="text-[9px] font-black uppercase tracking-widest text-blue-600">{t.label}</div>
        </div>
      ))}
    </div>
  )
}