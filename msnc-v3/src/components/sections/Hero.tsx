import { ArrowRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'

export default async function Hero() {
  const t = await getTranslations('Hero')
  const title = t('title').trim()
  const titleItalic = t('titleItalic').trim()
  const subtitle = t('subtitle').trim()

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden border-b border-border bg-background pb-16 pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(circle_at_top,_rgba(3,105,161,0.14),_transparent_62%)]" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border/60" />
        <div className="absolute inset-x-6 top-10 h-px bg-gradient-to-r from-transparent via-border to-transparent md:inset-x-20" />
        <span
          className="absolute right-0 top-4 select-none font-display text-[clamp(10rem,26vw,22rem)] leading-none text-primary/[0.04]"
        >
          M
        </span>
      </div>

      <div className="container-editorial relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-12 shrink-0 bg-secondary" aria-hidden="true" />
          <span className="section-label text-secondary">{t('label')}</span>
        </div>

        <div className="max-w-6xl">
          <h1
            className="mb-0 text-pretty font-display text-primary"
            style={{
            fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)',
            lineHeight: '1.05',
            }}
          >
            {title}
            {titleItalic ? (
              <>
                {' '}
                <span className="text-secondary">{titleItalic}</span>
              </>
            ) : null}
          </h1>
        </div>

        <div className="my-10 flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-border" />
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
          <div className="h-px w-10 bg-secondary/60" />
        </div>

        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-0 text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {subtitle}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link href="/programs" className="btn btn-primary group gap-2.5 px-7 py-3.5">
              {t('ctaPrimary')}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/about"
              className="btn btn-outline gap-2 px-7 py-3.5 text-primary hover:text-primary"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
