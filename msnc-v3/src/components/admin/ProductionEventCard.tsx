import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import FallbackImage from '@/components/ui/FallbackImage'
import { cn } from '@/lib/utils'

type Event = {
  id: string
  title?: string
  eventDate?: string
  location?: string
  description?: string
  mainImage?: {
    url?: string
  }
  slug?: string
  isPublished?: boolean
}

interface ProductionEventCardProps {
  event: Event
  className?: string
}

export function ProductionEventCard({ event, className }: ProductionEventCardProps) {
  const imageUrl = event.mainImage?.url
    ? `https://msnc-canada.sgp1.digitaloceanspaces.com${event.mainImage.url}`
    : '/placeholder-event.jpg'

  return (
    <Card className={cn('hover:shadow-lg transition-shadow h-full', className)}>
      <CardHeader className="pb-2">
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          <FallbackImage
            src={imageUrl}
            alt={event.title || 'Event'}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-4 space-y-2">
        <CardTitle className="text-lg leading-tight line-clamp-2">{event.title}</CardTitle>
        <div className="space-y-1 text-sm text-slate-600">
          {event.eventDate && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{new Date(event.eventDate).toLocaleDateString()}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
          {event.isPublished === false && (
            <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              Draft
            </span>
          )}
        </div>
        <Link
          href={`/portal/events/${event.slug || event.id}/edit`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 space-x-1"
        >
          Edit
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.5h3m1.5-3l-3-3 3-3 3 3z"
            />
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}
