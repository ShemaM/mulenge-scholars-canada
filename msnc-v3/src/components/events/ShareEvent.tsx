'use client'

import { Share2, Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function ShareEvent({ title, slug }: { title: string; slug: string }) {
  const t = useTranslations('EventPreview')
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/events/${slug}`
    
    // Use native share sheet on mobile (Best for Instagram/System share)
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: `MSNC: ${title}`, 
          url 
        })
      } catch (err) { 
        console.error('Share failed:', err) 
      }
    } else {
      // Desktop Fallback: Copy to clipboard (Essential for Instagram Manual Share)
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Clipboard failed:', err)
      }
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleShare}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
          copied 
            ? "border-secondary bg-secondary text-white" 
            : "border-border text-muted-foreground hover:text-primary hover:border-primary bg-white shadow-sm"
        )}
        title={copied ? t('share.copied') : t('share.label')}
      >
        {copied ? (
          <Check className="w-5 h-5 animate-in zoom-in duration-300" />
        ) : (
          <Share2 className="w-5 h-5" />
        )}
      </button>

      {/* Persistent Email Fallback for Desktop UX */}
      <a 
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${window.location.origin}/events/${slug}`)}`}
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary bg-white transition-all duration-300 shadow-sm"
        aria-label="Share via Email"
      >
        <Mail className="w-5 h-5" />
      </a>
      
      {copied && (
        <span className="section-label text-secondary animate-in fade-in slide-in-from-left-2">
          {t('share.copied')}
        </span>
      )}
    </div>
  )
}