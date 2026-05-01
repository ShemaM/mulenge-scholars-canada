import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'
import { 
  Users, GraduationCap, BookOpen, Wrench, 
  ArrowRight 
} from 'lucide-react'
import { getPrograms } from '@/lib/payload'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { SITE_NAME, SITE_URL } from '@/lib/site'

// Map slugs to their respective icons
const ICON_MAP: Record<string, any> = {
  'workshops': Users,
  'high-school': GraduationCap,
  'adult-learning': BookOpen,
  'rebuilding-futures': Wrench
}

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

// 1. Generate Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  // Cast to any to bypass exact string literal checks for dynamic slugs
  const t: any = await getTranslations({ locale, namespace: `ProgramDetails.${slug}` as any }).catch(() => null)
  
  if (!t) return { title: `Program Not Found | ${SITE_NAME}` }

  return {
    title: `${t('title')} | ${SITE_NAME}`,
    description: t('intro'),
    alternates: {
      canonical: `${SITE_URL}/${locale}/programs/${slug}`,
    },
    openGraph: {
      title: `${t('title')} | ${SITE_NAME}`,
      description: t('intro'),
      url: `${SITE_URL}/${locale}/programs/${slug}`,
      siteName: SITE_NAME,
      locale: locale,
      type: 'website',
    },
  }
}

// 2. Server Component
export default async function ProgramDetailPage({ params }: Props) {
  const { slug, locale } = await params
  
  // Try to fetch localization for this specific slug. 
  // If it fails, the slug doesn't exist in our PDF structure.
  let t: any;
  try {
    t = await getTranslations({ locale, namespace: `ProgramDetails.${slug}` as any })
  } catch (error) {
    notFound()
  }

  const ui: any = await getTranslations({ locale, namespace: 'ProgramDetails.ui' as any })
  const Icon = ICON_MAP[slug] || BookOpen
  
  // Fetch from Payload CMS to see if we have dynamic overlays (like images/dates), 
  // but keep the text strictly from the PDF (translations).
  const allPrograms = await getPrograms(locale).catch(() => [])
  const cmsProgram = allPrograms.find((p: any) => p.slug === slug)

  // Explicitly map bullets since next-intl returns objects/arrays differently based on config
  const bulletsKeys = ['0', '1', '2', '3', '4', '5']
  const bullets = bulletsKeys.map(key => t(`bullets.${key}`)).filter((b: any): b is string => typeof b === 'string' && !b.includes('ProgramDetails'))

  return (
    <main className="min-h-screen bg-white pb-32">
      
      {/* ─── EDITORIAL HERO ─── */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-paper-50 border-b border-border overflow-hidden">
        
        {/* Large Typographic Watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[30vw] font-display text-primary/5 leading-none pointer-events-none select-none tracking-tighter">
          {t('index')}
        </div>
        
        <div className="container-editorial relative z-10">
          
          <div className="mb-12">
             <Breadcrumb auto />
          </div>
          
          <div className="max-w-5xl space-y-8">
            <div className="flex items-center gap-4">
              <span className="w-12 h-0.5 bg-secondary" aria-hidden="true" />
              <span className="font-bold text-2xs uppercase tracking-widest text-secondary">
                {ui('chapter')} {t('index')}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-primary leading-none tracking-tighter">
              {t('title')}
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed border-l-4 border-secondary pl-6 md:pl-8 max-w-3xl mt-8">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── THESIS BODY: CURRICULUM ─── */}
      <section className="pt-24 md:pt-32">
        <div className="container-editorial">
          
          {/* Editorial Divider */}
          <div className="w-full mb-16 md:mb-24">
            <div className="h-0.75 bg-primary w-full" />
            <div className="h-px bg-border w-full mt-1" />
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: The "Approach" Context Sidebar */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-10">
              <div className="w-20 h-20 rounded-4xl flex items-center justify-center bg-paper-50 border border-border mb-8">
                <Icon className="w-10 h-10 text-secondary" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl lg:text-4xl font-display text-primary tracking-tight leading-tight">
                {ui('curriculumTitle')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {ui('curriculumDesc')}
              </p>
            </aside>

            {/* Right: The Curriculum Flow */}
            <div className="lg:col-span-8 space-y-12">
              
              <div className="grid sm:grid-cols-1 gap-4">
                {bullets.map((bullet: string, i: number) => (
                  <article 
                    key={i} 
                    className="group p-8 md:p-10 border border-border bg-white hover:bg-paper-50 hover:border-secondary transition-all duration-500 ease-out flex items-start gap-6"
                  >
                    <span className="text-nav font-bold text-muted-foreground/40 mt-1.5 group-hover:text-secondary transition-colors duration-500">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl font-display text-primary leading-snug group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {bullet}
                    </h3>
                  </article>
                ))}
              </div>

              {/* Dynamic Footer Context (If exists) */}
              {t('footer') && t('footer') !== 'ProgramDetails.' + slug + '.footer' && (
                <div className="mt-16 p-10 md:p-14 bg-paper-50 border-l-4 border-primary">
                  <p className="text-xl md:text-2xl text-primary font-serif italic leading-relaxed">
                    "{t('footer')}"
                  </p>
                </div>
              )}

              {/* Action Call */}
              <div className="pt-16 border-t border-border mt-16 flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display text-primary mb-2">{ui('ctaTitle')}</h3>
                  <p className="text-muted-foreground">{ui('ctaDesc')}</p>
                </div>
                <Link 
                  href="/join"
                  className="btn btn-primary h-14 px-10 group"
                >
                  {ui('ctaButton')}
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
      
    </main>
  )
}