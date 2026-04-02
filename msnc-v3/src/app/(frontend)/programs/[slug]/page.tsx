import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import { getPrograms } from '@/lib/payload'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

type ProgramDoc = {
  id?: string
  title?: string
  description?: string
  slug?: string
  phase?: string
  status?: string
}

type PageArgs = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

const PROGRAM_FALLBACKS: Record<string, ProgramDoc> = {
  'academic-support': {
    title: 'Academic Support & Educational Access',
    description:
      'Guidance for navigating the Canadian education system, course planning, admissions, and scholarship opportunities.',
    phase: 'foundation',
    status: 'active',
    slug: 'academic-support',
  },
  mentorship: {
    title: 'Mentorship & Career Development',
    description:
      'Structured mentorship, career exploration, skill development, and professional readiness for sustainable career pathways.',
    phase: 'growth',
    status: 'active',
    slug: 'mentorship',
  },
  leadership: {
    title: 'Leadership Development',
    description:
      'Leadership training, workshops, and hands-on opportunities to build confidence, responsibility, and impact.',
    phase: 'growth',
    status: 'active',
    slug: 'leadership',
  },
  'community-empowerment': {
    title: 'Community Empowerment & Global Connection',
    description:
      'Strengthening unity across Canada and globally, with particular focus on supporting youth in refugee communities.',
    phase: 'impact',
    status: 'active',
    slug: 'community-empowerment',
  },
  partnerships: {
    title: 'Partnerships & Collaboration',
    description:
      'Strategic partnerships that expand resources, opportunities, and long-term impact for Mulenge youth.',
    phase: 'impact',
    status: 'active',
    slug: 'partnerships',
  },
  advocacy: {
    title: 'Advocacy & Access to Opportunity',
    description:
      'Advocating for equitable access to education and opportunity, and amplifying the voices of underserved youth.',
    phase: 'impact',
    status: 'active',
    slug: 'advocacy',
  },
  'technical-vocational': {
    title: 'Technical & Vocational Skills Development',
    description:
      'Job-ready training and practical skills pathways that lead to employment, self-reliance, and entrepreneurship.',
    phase: 'foundation',
    status: 'active',
    slug: 'technical-vocational',
  },
}

export default async function ProgramDetailPage({ params }: PageArgs) {
  const { slug } = await params
  const allPrograms = (await getPrograms()) as ProgramDoc[]
  const program = allPrograms.find((item) => item?.slug === slug) ?? PROGRAM_FALLBACKS[slug]

  if (!program) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-24 pb-10">
        <Container>
          <Button asChild variant="outline" size="sm">
            <Link href="/programs">Back to Programs</Link>
          </Button>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            {program.phase || 'pillar'}
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-primary tracking-tight leading-[1.05] mb-6">
            {program.title}
          </h1>
          <p className="text-lg md:text-xl text-primary/70 leading-relaxed font-medium">
            {program.description}
          </p>
        </Container>
      </section>
    </main>
  )
}
