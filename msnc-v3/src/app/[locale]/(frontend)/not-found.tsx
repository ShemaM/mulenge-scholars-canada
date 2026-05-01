import { Link } from '@/navigation'
import Container from '@/components/ui/Container'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getLocale } from 'next-intl/server'
import { normalizeSiteLocale } from '@/lib/site-copy'

export default async function NotFound() {
  const locale = normalizeSiteLocale(await getLocale())
  const copy =
    locale === 'fr'
      ? {
          title: 'Page introuvable',
          body: "La page que vous cherchez n'existe pas ou est en construction.",
          goHome: "Retour a l'accueil",
          viewBlog: 'Voir le journal',
          note: 'Toutes les pages resistent aux pannes de base de donnees. Le site fonctionne hors ligne.',
        }
      : {
          title: 'Page Not Found',
          body: "The page you're looking for doesn't exist or may be under construction.",
          goHome: 'Go Home',
          viewBlog: 'View Blog',
          note: 'All pages are resilient to database failures. Site works offline.',
        }

  return (
    <Container className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
<h2 className="text-4xl text-primary">{copy.title}</h2>
          <p className="text-lg text-muted-foreground">{copy.body}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-8 rounded-xl font-bold shadow-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {copy.goHome}
            </Button>
          </Link>
          <Link href="/blog" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto px-8 rounded-xl font-bold border-2">
              {copy.viewBlog}
            </Button>
          </Link>
        </div>
        <p className="text-sm text-primary/90">{copy.note}</p>
      </div>
    </Container>
  )
}

