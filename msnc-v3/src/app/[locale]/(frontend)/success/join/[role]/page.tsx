import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import Container from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

type Role = 'scholar' | 'volunteer' | 'partner'

const validRoles = new Set<Role>(['scholar', 'volunteer', 'partner'])

interface PageProps {
  params: Promise<{ locale: string; role: string }>
}

export default async function SuccessPage({ params }: PageProps) {
  const { locale, role } = await params

  if (!validRoles.has(role as Role)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'SuccessPage' })

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 border-b border-border">
        <Container className="max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mb-8">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            {t(`${role}.title`)}
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed mb-10">
            {t(`${role}.message`)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-8 rounded-xl font-bold shadow-lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('goHome')}
              </Button>
            </Link>
            <Link href="/programs" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto px-8 rounded-xl font-bold border-2">
                {t('viewPrograms')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
