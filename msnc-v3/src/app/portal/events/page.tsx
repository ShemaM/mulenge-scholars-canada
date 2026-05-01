import { getEvents } from '@/lib/payload'
import { ProductionEventCard } from '@/components/admin/ProductionEventCard'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const dynamic = 'force-dynamic'

export type Event = {
  id: string | number
  title?: string
  eventDate?: string
  location?: string
  description?: string
  image?: { url?: string | null } | number | null
  slug?: string
  _status?: ('draft' | 'published') | null
}

export default async function EventsPage() {
  const result = await getEvents({ limit: 100 })
  const events = Array.isArray(result) ? result : result.docs || []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-primary mb-2">Events Management</h1>
          <p className="text-slate-600">{events.length} total events</p>
        </div>
        <Link href="/admin/events/new">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 h-12 rounded-2xl font-bold shadow-lg">
            + New Event
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <Card className="border-slate-200 p-16 text-center">
          <p className="text-xl text-slate-500 mb-4">No events created yet</p>
          <Link href="/admin/events/new">
            <Button variant="outline" size="lg">Create First Event</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event: Event) => (
            <ProductionEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

