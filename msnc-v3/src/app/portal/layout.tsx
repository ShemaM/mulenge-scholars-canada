import { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/admin/Logo'
import Icon from '@/components/admin/Icon'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  try {
    await requireAdmin()
  } catch {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <Container>
          <div className="flex items-center h-16">
            <Link href="/portal" className="flex items-center space-x-3">
              <Icon className="h-8 w-8" />
              <Logo className="h-6" />
            </Link>
            <nav className="ml-auto flex items-center space-x-4">
              <Link
                href="/portal/events"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Events
              </Link>
              <Link
                href="/portal/programs"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Programs
              </Link>
              <Link
                href="/portal"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 border rounded-md border-slate-200 hover:bg-slate-50"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </Container>
      </header>
      {/* Main Content */}
      <div className="flex">
        <aside className="w-64 bg-white border-r border-slate-200 p-6">
          <nav className="space-y-2">
            <Link
              href="/portal/events"
              className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Icon className="h-4 w-4" />
              <span>Manage Events</span>
            </Link>
            <Link
              href="/portal/programs"
              className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
            >
              <Icon className="h-4 w-4" />
              <span>Manage Programs</span>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
