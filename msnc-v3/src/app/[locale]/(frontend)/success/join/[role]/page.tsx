import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import Container from '@/components/ui/Container'

export default async function SuccessJoinPage({
  params,
}: {
  params: Promise<{ locale: string; role: string }>
}) {
  const { locale, role } = await params
  const t = await getTranslations({ locale, namespace: 'SuccessPage' })
  const roleLabel = t.has(`roles.${role}` as any) ? t(`roles.${role}` as any) : role

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-paper-50 pt-32 pb-16 h-full flex flex-col items-center justify-center min-h-[60vh]">
        <Container className="max-w-3xl text-center">
          <h1 className="mt-4 text-5xl font-display tracking-tight text-primary md:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            {t('message')}
          </p>
          <p className="mt-4 text-lg text-secondary italic font-display">
            {t('roleContext', { role: roleLabel })}
          </p>
          <div className="mt-12 flex justify-center">
            <Link href="/" className="btn btn-primary">
              {t('backToHome')}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  )
}
