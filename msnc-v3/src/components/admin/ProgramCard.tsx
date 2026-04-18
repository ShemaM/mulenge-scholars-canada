import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

type Program = {
  id: string
  title?: string
  pillar?: string
  phase?: string
  status?: string
  description?: string
  slug?: string
}

interface ProgramCardProps {
  program: Program
  className?: string
}

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <Card className={cn('hover:shadow-lg transition-shadow h-full', className)}>
      <CardHeader className="pb-3">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
          {program.pillar || 'General'}
        </div>
        {program.phase && <div className="text-sm text-slate-500 mt-1">{program.phase}</div>}
      </CardHeader>
      <CardContent className="pb-4 space-y-2">
        <CardTitle className="text-lg leading-tight line-clamp-2">{program.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {program.description || 'No description available.'}
        </CardDescription>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              program.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {program.status || 'Inactive'}
          </span>
          <Link
            href={`/portal/programs/${program.slug || program.id}/edit`}
            className="font-medium text-blue-600 hover:text-blue-500 flex items-center space-x-1"
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
        </div>
      </CardContent>
    </Card>
  )
}
