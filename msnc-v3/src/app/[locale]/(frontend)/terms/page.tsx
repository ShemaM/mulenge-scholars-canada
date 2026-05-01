import type { Metadata } from 'next'
import { Link } from '@/navigation'
import Container from '@/components/ui/Container'
import { normalizeSiteLocale } from '@/lib/site-copy'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    "Read the terms that apply to using Mulenge Scholars' Network Canada's website and services.",
}

const sections = [
  {
    title: 'Acceptance of Terms',
    body: [
      'By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the site.',
    ],
  },
  {
    title: 'Use of the Website',
    body: [
      'You may use this website only for lawful purposes and in a way that does not interfere with the rights of others, the security of the site, or the operation of MSNC programs and services.',
      'You agree not to misuse forms, submit false information, attempt unauthorized access, distribute malicious content, or use the site in a way that could damage or disrupt our systems.',
    ],
  },
  {
    title: 'Program and Application Information',
    body: [
      'Information on this website is provided for general informational purposes. Program details, eligibility criteria, event information, and opportunities may change without notice.',
      'Submitting a form, inquiry, application, or donation through the website does not guarantee acceptance into a program, partnership, volunteer role, or any other opportunity.',
    ],
  },
  {
    title: 'Donations and External Services',
    body: [
      'Donations, newsletters, event registrations, and other interactions may be processed through third-party tools or service providers. Additional terms or policies from those providers may also apply.',
      'MSNC is not responsible for the content, policies, or practices of third-party websites linked from this site.',
    ],
  },
  {
    title: 'Intellectual Property',
    body: [
      "Unless otherwise stated, the content on this website, including text, branding, graphics, layouts, and other materials, belongs to Mulenge Scholars' Network Canada or is used with permission.",
      'You may not copy, reproduce, republish, distribute, or modify site content for commercial use without prior written permission.',
    ],
  },
  {
    title: 'User Submissions',
    body: [
      'If you submit information, messages, or materials through this website, you confirm that the information is accurate to the best of your knowledge and that you have the right to share it.',
      'By submitting content, you grant MSNC the right to review, store, and use it as reasonably necessary to respond to your request or administer our programs and services.',
    ],
  },
  {
    title: 'Disclaimer',
    body: [
      'This website and its content are provided on an "as is" and "as available" basis. While we aim for accuracy and reliability, we do not guarantee that the site will always be error-free, uninterrupted, or current.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, MSNC is not liable for any indirect, incidental, consequential, or special damages arising from your use of, or inability to use, this website.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We may revise these Terms of Use from time to time. Updated terms will be posted on this page and become effective when published unless otherwise stated.',
    ],
  },
  {
    title: 'Governing Principles',
    body: [
      'These terms are intended to support the lawful, respectful, and mission-aligned use of the MSNC website and related services.',
    ],
  },
] as const

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const activeLocale = normalizeSiteLocale(locale)
  const copy =
    activeLocale === 'fr'
      ? {
          legal: 'Mentions légales',
          title: "Conditions d'utilisation",
          intro:
            "Ces conditions régissent votre utilisation du site du Mulenge Scholars' Network Canada, y compris les pages d'information, formulaires, dons et autres interactions numériques.",
          effective: "Date d'entrée en vigueur : 19 avril 2026",
          privacy: 'Voir la politique de confidentialité',
          contact: 'Contact',
          contactIntro:
            "Si vous avez des questions sur ces conditions d'utilisation, contactez le MSNC à ",
        }
      : {
          legal: 'Legal',
          title: 'Terms of Use',
          intro:
            "These terms govern your use of the Mulenge Scholars' Network Canada website, including informational pages, forms, donations, and other digital interactions.",
          effective: 'Effective date: April 19, 2026',
          privacy: 'View privacy policy',
          contact: 'Contact',
          contactIntro: 'If you have questions about these Terms of Use, contact MSNC at ',
        }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-paper-50 pt-32 pb-16">
        <Container className="max-w-5xl">
          <p className="section-label text-secondary">
            {copy.legal}
          </p>
          <h1 className="mt-4 text-5xl text-primary md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {copy.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span>{copy.effective}</span>
            <Link href="/privacy" className="font-medium text-primary transition hover:text-secondary">
              {copy.privacy}
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="border-b border-border pb-10 last:border-b-0 last:pb-0">
                <h2 className="text-2xl text-primary">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-border bg-paper-50 px-6 py-8 sm:px-8">
              <h2 className="text-2xl text-primary">
                {copy.contact}
              </h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                {copy.contactIntro}
                <a
                  href="mailto:info@mulengescholars.org"
                  className="font-medium text-primary transition hover:text-secondary"
                >
                  info@mulengescholars.org
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </section>
    </main>
  )
}
