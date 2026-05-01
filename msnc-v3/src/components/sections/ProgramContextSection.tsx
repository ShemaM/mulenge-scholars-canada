import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface StatItem {
  icon: LucideIcon
  value: string
  label: string
}

interface ProgramContextSectionProps {
  chapterNumber: string
  label: string
  dropcap: string
  paragraph1: string
  paragraph2: ReactNode
  stats: StatItem[]
  accentColor?: 'secondary' | 'primary'
}

export function ProgramContextSection({
  chapterNumber,
  label,
  dropcap,
  paragraph1,
  paragraph2,
  stats,
  accentColor = 'secondary',
}: ProgramContextSectionProps) {
  const accentBorder = accentColor === 'secondary' ? 'border-l-secondary' : 'border-l-primary'
  const accentText = accentColor === 'secondary' ? 'text-secondary' : 'text-primary'
  const accentBg = accentColor === 'secondary' ? 'bg-secondary/10' : 'bg-primary/10'

  return (
    <section className="section border-y border-border bg-paper-50">
      <div className="container-editorial">
        <div className="grid items-start gap-12 lg:grid-cols-12">

          {/* ── Left: Sidebar with chapter number, label, and stats ── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8">

              {/* Chapter number */}
              <div className="relative">
                <span
                  className="font-display text-[8rem] leading-none tracking-tighter text-foreground/[0.04] select-none"
                  aria-hidden="true"
                >
                  {chapterNumber}
                </span>
                <div className="absolute bottom-4 left-0">
                  <span className={`section-label ${accentText}`}>{label}</span>
                </div>
              </div>

              {/* Vertical accent line */}
              <div className={`h-24 w-0.5 rounded-full bg-gradient-to-b ${accentColor === 'secondary' ? 'from-secondary' : 'from-primary'} to-transparent`} />

              {/* Stat mini-cards */}
              <div className="space-y-3">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accentBg}`}>
                      <Icon className={`h-5 w-5 ${accentText}`} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-display text-xl text-primary leading-none mb-0">{value}</p>
                      <span className="section-label mt-0.5">{label}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* ── Right: Content with dropcap and card styling ── */}
          <div className="lg:col-span-8">
            <div className={`relative rounded-2xl border border-border bg-background p-8 md:p-12 shadow-sm ${accentBorder} border-l-[3px]`}>

              {/* Decorative corner accent */}
              <div className={`absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-tr-2xl`}>
                <div className={`absolute -right-8 -top-8 h-16 w-16 rotate-45 ${accentBg}`} />
              </div>

              <div className="space-y-6">
                {/* Paragraph 1 with dropcap */}
                <p className="text-lg font-medium leading-relaxed text-foreground/80">
                  <span className="float-left mr-4 mt-1 font-display text-7xl leading-none text-primary select-none">
                    {dropcap}
                  </span>
                  {paragraph1}
                </p>

                {/* Paragraph 2 */}
                <p className="text-lg font-medium leading-relaxed text-foreground/80">
                  {paragraph2}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

