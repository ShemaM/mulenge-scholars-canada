'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────────────────────────

type LocaleSwitchIntent = {
  type: 'locale-switch';
  from: string;
  to: string;
};

type LoadingIntent = LocaleSwitchIntent | null;

// ─── Constants ───────────────────────────────────────────────────────────────

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  fr: 'Français',
};

/**
 * Maps a stripped pathname segment to locale-aware loading labels.
 * Add new routes here as the site grows.
 */
const PAGE_LABELS: Record<string, Record<'en' | 'fr', string>> = {
  '/': {
    en: 'Loading home page…',
    fr: "Chargement de l'accueil…",
  },
  '/contact': {
    en: 'Loading contact page…',
    fr: 'Chargement de la page contact…',
  },
  '/about': {
    en: 'Loading about page…',
    fr: 'Chargement de la page à propos…',
  },
  '/programs': {
    en: 'Loading programs…',
    fr: 'Chargement des programmes…',
  },
  '/scholars': {
    en: 'Loading scholars…',
    fr: 'Chargement des boursiers…',
  },
  '/apply': {
    en: 'Loading application form…',
    fr: "Chargement du formulaire d'inscription…",
  },
};

const FALLBACK_LABEL: Record<'en' | 'fr', string> = {
  en: 'Loading…',
  fr: 'Chargement…',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Strips the locale prefix from a pathname and returns a
 * human-readable loading label for that page.
 *
 * /en/contact → "Loading contact page…"
 * /fr/about   → "Chargement de la page à propos…"
 */
function resolvePageLabel(pathname: string, locale: 'en' | 'fr'): string {
  const stripped = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
  return PAGE_LABELS[stripped]?.[locale] ?? FALLBACK_LABEL[locale];
}

/**
 * Reads and immediately consumes the loading intent from sessionStorage.
 * Returns null if nothing is stored or the value can't be parsed.
 */
function consumeLoadingIntent(): LoadingIntent {
  try {
    const raw = sessionStorage.getItem('loadingIntent');
    if (!raw) return null;
    sessionStorage.removeItem('loadingIntent');
    return JSON.parse(raw) as LoadingIntent;
  } catch {
    return null;
  }
}

/**
 * Builds the switch message in the *destination* locale so the
 * arriving user can read it.
 *
 * Switching to French → message is in French
 * Switching to English → message is in English
 */
function resolveLocateSwitchMessage(intent: LocaleSwitchIntent): string {
  const from = LOCALE_NAMES[intent.from] ?? intent.from;
  const to = LOCALE_NAMES[intent.to] ?? intent.to;

  if (intent.to === 'fr') {
    return `Changement de ${from} vers ${to}…`;
  }
  return `Switching from ${from} to ${to}…`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Loading() {
  const locale = useLocale() as 'en' | 'fr';
  const pathname = usePathname();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const intent = consumeLoadingIntent();

    if (intent?.type === 'locale-switch') {
      setMessage(resolveLocateSwitchMessage(intent));
    } else {
      setMessage(resolvePageLabel(pathname, locale));
    }
  }, [pathname, locale]);

  return (
    <div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary/10 border-t-primary" />
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-secondary/10 border-b-secondary [animation-duration:3s]" />
        <div className="absolute font-display text-primary text-xl">M</div>
      </div>

      {/* Message */}
      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-primary">
          Mulenge Scholars
        </p>
        <p className="text-sm text-muted-foreground font-medium min-h-5">
          {message}
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="h-1 w-1 rounded-full bg-secondary animate-pulse" />
          <span className="h-1 w-1 rounded-full bg-secondary animate-pulse delay-75" />
          <span className="h-1 w-1 rounded-full bg-secondary animate-pulse delay-150" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden bg-paper-50">
        <div className="h-full w-full bg-linear-to-r from-primary via-secondary to-primary origin-left animate-pulse" />
      </div>
    </div>
  );
}