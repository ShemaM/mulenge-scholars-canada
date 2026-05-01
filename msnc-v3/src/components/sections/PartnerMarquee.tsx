import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

// ─── Types — mirrors Partners collection schema ────────────────────────────────

interface PartnerMedia {
  url: string
  alt?: string
  width?: number
  height?: number
}

interface Partner {
  id: string | number
  name: string
  logo: PartnerMedia | string
  url?: string
  description?: string
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function getPartners(): Promise<Partner[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'partners',
      limit: 30,
      depth: 1,
    })
    return (result.docs ?? []) as Partner[]
  } catch {
    return []
  }
}

// ─── PartnerMarquee ───────────────────────────────────────────────────────────

export default async function PartnerMarquee() {
  const partners = await getPartners()

  if (partners.length === 0) return null

  const track = [...partners, ...partners, ...partners]

  return (
    <section className="section-sm border-y border-border bg-paper-50" aria-label="Our partners">
      <div className="container-editorial">

        <div className="mb-10 flex items-center justify-center gap-4">
          <div className="h-px w-10 bg-secondary" />
          <span className="section-label text-secondary">Our Partners</span>
          <div className="h-px w-10 bg-secondary" />
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
            {track.map((partner, i) => {
              const media = typeof partner.logo === 'object'
                ? (partner.logo as PartnerMedia)
                : null

              if (!media?.url) return null

              const logo = (
                <div className="flex h-16 w-40 shrink-0 items-center justify-center grayscale opacity-50 transition-all duration-300 hover:grayscale-0 hover:opacity-100">
                  <Image
                    src={media.url}
                    alt={media.alt || partner.name}
                    width={160}
                    height={64}
                    className="max-h-full max-w-full object-contain"
                    priority={false}
                  />
                </div>
              )

              return partner.url ? (
                <a
                  key={`${partner.id}-${i}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name}`}
                >
                  {logo}
                </a>
              ) : (
                <div key={`${partner.id}-${i}`}>{logo}</div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}