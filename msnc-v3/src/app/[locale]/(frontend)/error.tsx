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
    <main className="min-h-screen bg-background flex items-center justify-center relative">
      <div className="relative z-10 text-center px-6">
        <h1 className="text-7xl md:text-9xl text-primary mb-4">
          {copy.heading}
        </h1>
        <p className="text-xl text-muted-foreground font-medium mb-12">{copy.body}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary"
          >
            <RefreshCcw className="w-4 h-4" />
            {copy.retry}
          </button>

          <Link
            href="/"
            className="btn btn-outline"
          >
            <Home className="w-4 h-4" />
            {copy.home}
          </Link>
        </div>
      </div>
    </main>
  )
}

