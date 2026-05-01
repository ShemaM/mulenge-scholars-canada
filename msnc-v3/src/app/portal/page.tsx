import { getEvents, getPrograms } from '@/lib/payload'
import { ProductionEventCard } from '@/components/admin/ProductionEventCard'
import { ProgramCard } from '@/components/admin/ProgramCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Calendar, LayoutGrid, Users, FileEdit } from 'lucide-react'

export const dynamic = 'force-dynamic'

type DashboardEvent = {
  id: string | number
  title?: string
  eventDate?: string
  location?: string
  description?: string
  image?: { url?: string | null } | number | null
  slug?: string
  _status?: ('draft' | 'published') | null
}

type DashboardProgram = {
  id: string
  title?: string
  pillar?: string
  phase?: string
  status?: string
  description?: string
  slug?: string
}

export default async function AdminDashboard() {
  const [events, programs] = await Promise.all([
    getEvents({ limit: 4 }),
    getPrograms(),
  ])

  const totalEvents = events.length
  const totalPrograms = programs.length
  const totalDrafts = (events as DashboardEvent[]).filter((e) => e._status === 'draft').length

  const stats = [
    { label: 'Events', value: totalEvents.toString(), icon: Calendar },
    { label: 'Programs', value: totalPrograms.toString(), icon: LayoutGrid },
    { label: 'Users', value: '—', icon: Users },
    { label: 'Drafts', value: totalDrafts.toString(), icon: FileEdit },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl text-primary">Admin Dashboard</h1>
        <p className="text-slate-600">Manage Events, Programs, and content for MSNC.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-slate-400" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-primary">Recent Events</h2>
            <Link href="/portal/events">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {events.length > 0 ? (
              events
                .slice(0, 2)
                .map((event: DashboardEvent) => (
                  <ProductionEventCard key={event.id} event={event} />
                ))
            ) : (
              <p className="text-slate-500 text-center py-8">No events yet. Create one!</p>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-primary">Active Programs</h2>
            <Link href="/portal/programs">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {programs.length > 0 ? (
              programs
                .slice(0, 3)
                .map((program: DashboardProgram) => (
                  <ProgramCard key={program.id} program={program} />
                ))
            ) : (
              <p className="text-slate-500 text-center py-8">No programs yet. Create one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}