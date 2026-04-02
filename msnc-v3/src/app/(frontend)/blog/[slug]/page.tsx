import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'

export default function BlogPost({ params }: { params: { slug: string } }) {
  // TODO: Implement dynamic blog post fetching from Payload
  notFound()
}
