'use client'
import { Share2, Check, Copy } from 'lucide-react'
import { useState } from 'react'

export function ShareEvent({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/events/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch (err) { console.log(err) }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 text-slate-400 hover:text-[#002147] hover:border-[#002147] transition-all"
    >
      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
    </button>
  )
}