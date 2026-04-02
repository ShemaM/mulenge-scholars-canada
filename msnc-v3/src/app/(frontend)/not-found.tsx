import Link from 'next/link'
import Container from '@/components/ui/Container'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Page Not Found</h2>
          <p className="text-lg text-slate-500">
            The page you&apos;re looking for doesn&apos;t exist or may be under construction.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto px-8 rounded-xl font-bold shadow-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link href="/blog" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto px-8 rounded-xl font-bold border-2">
              View Blog
            </Button>
          </Link>
        </div>
        <p className="text-sm text-primary/90">
          All pages are resilient to database failures. Site works offline.
        </p>
      </div>
    </Container>
  )
}
