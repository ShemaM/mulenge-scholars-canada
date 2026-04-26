import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'

const images = {
  '01': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
  '02': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop',
  '03': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  '04': 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
} as const

const links = {
  '01': '/programs/workshops-community',
  '02': '/programs/high-school-support',
  '03': '/programs/adult-learning-pathways',
  '04': '/impact/rebuilding-futures',
} as const

export default async function StrategicPillars() {
  const t = await getTranslations('StrategicPillars')
  const pillars = ['01', '02', '03', '04'] as const

  return (
    <section
      className="overflow-hidden border-t border-slate-200 bg-slate-50 py-24 md:py-32"
      aria-labelledby="programs-heading"
    >
      <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="programs-heading"
              className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
            >
              {t('heading')}
            </h2>
          </div>
          <p className="pb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-blue-600">
            {t('subheading')}
          </p>
        </div>

        <div className="mb-16 w-full">
          <div className="h-[3px] w-full bg-slate-900" />
          <div className="mt-1 h-px w-full bg-slate-200" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {pillars.map((id) => {
            const bullets = t.raw(`pillars.${id}.bullets`) as string[]
            const footer = t.has(`pillars.${id}.footer`) ? t(`pillars.${id}.footer`) : ''

            return (
              <Link
                key={id}
                href={links[id]}
                className="group flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white transition-all duration-500 ease-out hover:-translate-y-2 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4"
              >
                <div className="relative h-64 w-full overflow-hidden border-b border-slate-200 bg-slate-100 md:h-72">
                  <img
                    src={images[id]}
                    alt={t(`pillars.${id}.title`)}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/90 font-serif text-xl italic text-slate-900 shadow-sm backdrop-blur-sm transition-colors duration-500 group-hover:bg-blue-600 group-hover:text-white">
                    {id}
                  </div>
                </div>

                <div className="relative z-10 flex flex-grow flex-col p-8 md:p-10 lg:p-12">
                  <h3 className="mb-6 text-2xl font-black leading-tight text-slate-900 transition-colors duration-500 group-hover:text-blue-600 md:text-3xl">
                    {t(`pillars.${id}.title`)}
                  </h3>

                  <p className="mb-6 font-medium leading-relaxed text-slate-600">
                    {t(`pillars.${id}.intro`)}
                  </p>

                  <ul className="mb-8 flex-grow space-y-3">
                    {bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 font-medium text-slate-800">
                        <span className="mt-0.5 font-serif font-bold italic text-blue-600">›</span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {footer && (
                    <div className="mb-8 border-t border-slate-100 pt-6">
                      <p className="text-sm font-medium italic leading-relaxed text-slate-500">
                        {footer}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 transition-colors duration-500 group-hover:text-blue-600">
                      {t('exploreLabel')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 transition-colors duration-500 group-hover:border-blue-600 group-hover:bg-blue-600">
                      <ArrowUpRight className="h-5 w-5 text-slate-400 transition-all duration-500 group-hover:rotate-12 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
