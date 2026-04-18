import { getEvents, getPrograms } from '@/lib/payload'
import { ProductionEventCard } from '@/components/admin/ProductionEventCard'
import { ProgramCard } from '@/components/admin/ProgramCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Icon } from '@/components/admin/Icon'

export const dynamic = 'force-dynamic'

type DashboardEvent = {
  id: string
  title?: string
  eventDate?: string
  location?: string
  description?: string
  mainImage?: string
  category?: string
  slug?: string
  isPublished?: boolean
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

  const stats = [
    { label: 'Events', value: totalEvents.toString(), icon: Icon },
    { label: 'Programs', value: totalPrograms.toString(), icon: Icon },
    { label: 'Users', value: '0', icon: Icon }, // Fetch from Payload later
    { label: 'Draft', value: '0', icon: Icon },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Manage Events, Programs, and content for MSNC.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-slate-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Recent Events</h2>
            <Link href="/portal/events">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {events.slice(0, 2).map((event: DashboardEvent) => (
              <ProductionEventCard key={event.id} event={event} />
            ))}
            {events.length === 0 && (
              <p className="text-slate-500 text-center py-8">No events yet. Create one!</p>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Active Programs</h2>
            <Link href="/portal/programs">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="space-y-4">
            {programs.slice(0, 3).map((program: DashboardProgram) => (
              <ProgramCard key={program.id} program={program} />
            ))}
            {programs.length === 0 && (
              <p className="text-slate-500 text-center py-8">No programs yet. Create one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

