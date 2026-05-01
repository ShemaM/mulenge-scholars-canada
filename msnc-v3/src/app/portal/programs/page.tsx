import { getPrograms } from '@/lib/payload'
import { ProgramCard } from '@/components/admin/ProgramCard'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const dynamic = 'force-dynamic'

export type Program = {
  id: string
  title?: string
  pillar?: string
  phase?: string
  status?: string
  description?: string
  slug?: string
}

export default async function ProgramsPage() {
  const result = await getPrograms()
  const programs = Array.isArray(result) ? result : result.docs || []

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl text-primary mb-2">Programs Management</h1>
          <p className="text-slate-600">{programs.length} programs</p>
        </div>
        <Link href="/admin/programs/new">
          <Button size="lg" className="bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-8 h-12 rounded-2xl font-bold shadow-lg">
            + New Program
          </Button>
        </Link>
      </div>

      {programs.length === 0 ? (
        <Card className="border-slate-200 p-16 text-center">
          <p className="text-xl text-slate-500 mb-4">No programs created yet</p>
          <Link href="/admin/programs/new">
            <Button variant="outline" size="lg">Create First Program</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program: Program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      )}
    </div>
  )
}

