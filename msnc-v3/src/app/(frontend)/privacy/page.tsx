import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Learn how Mulenge Scholars' Network Canada collects, uses, and protects personal information.",
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We may collect personal information you provide directly to us, including your name, email address, phone number, application details, volunteer information, donation information, and any message you submit through our forms.',
      'We may also collect limited technical information such as browser type, device information, referring pages, and basic analytics data to improve the website experience.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use information to respond to inquiries, review program applications, process donations, manage volunteer and partnership requests, send organizational updates, and improve our programs and website.',
      'We only use personal information where there is a reasonable organizational purpose connected to our mission and operations.',
    ],
  },
  {
    title: 'Communications',
    body: [
      'If you subscribe to updates, we may send you newsletters, event announcements, scholarship information, or other community communications related to MSNC.',
      'You can opt out of non-essential email communications at any time by using the unsubscribe option in the message or by contacting us directly.',
    ],
  },
  {
    title: 'Sharing of Information',
    body: [
      'We do not sell personal information. We may share information with trusted service providers who help us operate the website, process donations, manage communications, or support program administration.',
      'We may also disclose information when required by law, to protect our organization, or to prevent fraud, abuse, or security threats.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We keep personal information only for as long as needed for the purpose it was collected, to meet legal or operational obligations, or to maintain appropriate organizational records.',
      'When information is no longer required, we aim to delete it securely or anonymize it where appropriate.',
    ],
  },
  {
    title: 'Cookies and Analytics',
    body: [
      'This website may use cookies or similar technologies for performance, analytics, and basic functionality. These tools help us understand how visitors use the site and how we can improve it.',
      'You can manage cookies through your browser settings, though some site functionality may be affected if certain cookies are disabled.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We take reasonable administrative, technical, and organizational measures to protect personal information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Your Rights and Choices',
    body: [
      'Depending on your location, you may have the right to request access to, correction of, or deletion of certain personal information we hold about you.',
      'To make a privacy-related request, contact us using the details below and we will respond within a reasonable time.',
    ],
  },
  {
    title: 'Children and Youth',
    body: [
      'Because our work serves students and young people, some information may relate to youth participants. We handle that information with particular care and limit collection to what is reasonably necessary for our programs and communications.',
    ],
  },
  {
    title: 'Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, legal obligations, or website functionality. Updated versions will be posted on this page with a revised effective date.',
    ],
  },
] as const

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 pt-32 pb-16">
        <Container className="max-w-5xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-700">
            Legal
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#002147] md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            This policy explains how Mulenge Scholars&apos; Network Canada collects, uses, stores,
            and protects personal information shared through this website and related forms.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>Effective date: April 19, 2026</span>
            <Link href="/contact" className="font-medium text-[#002147] transition hover:text-sky-700">
              Contact MSNC
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-5xl">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="border-b border-slate-100 pb-10 last:border-b-0 last:pb-0">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#002147]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-8 sm:px-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#002147]">
                Contact for Privacy Questions
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                If you have questions about this Privacy Policy or would like to request access to
                or correction of your information, contact MSNC at{' '}
                <a
                  href="mailto:info@mulengescholars.org"
                  className="font-medium text-[#002147] transition hover:text-sky-700"
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
