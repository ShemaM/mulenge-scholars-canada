'use client'

import { Link } from '@/navigation'
import { RefreshCcw, Home } from 'lucide-react'
import { useLocale } from 'next-intl'
import { normalizeSiteLocale } from '@/lib/site-copy'

export default function Error({ reset }: { reset: () => void }) {
  const locale = normalizeSiteLocale(useLocale())
  const copy =
    locale === 'fr'
      ? {
          heading: 'Erreur.',
          body: 'La page demandee a rencontre un probleme inattendu.',
          retry: 'Reessayer',
          home: "Retour a l'accueil",
        }
      : {
          heading: 'Error.',
          body: 'The requested page encountered an unexpected issue.',
          retry: 'Try Again',
          home: 'Go Home',
        }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center relative">
      {/* Structural Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[40px_40px] opacity-40 pointer-events-none" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-7xl md:text-9xl font-black text-[#002147] tracking-tighter mb-4">
          {copy.heading}
        </h1>
        <p className="text-xl text-slate-500 font-medium mb-12">{copy.body}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="h-14 px-8 bg-primary-500 text-white rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-blue-700 transition-all active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            {copy.retry}
          </button>

          <Link
            href="/"
            className="h-14 px-8 border-2 border-slate-200 text-[#002147] rounded-full flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-widest hover:bg-slate-50 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  )
}
