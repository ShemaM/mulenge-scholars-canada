import type { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'

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
      'Unless otherwise stated, the content on this website, including text, branding, graphics, layouts, and other materials, belongs to Mulenge Scholars’ Network Canada or is used with permission.',
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
      'This website and its content are provided on an “as is” and “as available” basis. While we aim for accuracy and reliability, we do not guarantee that the site will always be error-free, uninterrupted, or current.',
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 pt-32 pb-16">
        <Container className="max-w-5xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sky-700">
            Legal
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] text-[#002147] md:text-6xl">
            Terms of Use
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            These terms govern your use of the Mulenge Scholars&apos; Network Canada website,
            including informational pages, forms, donations, and other digital interactions.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>Effective date: April 19, 2026</span>
            <Link href="/privacy" className="font-medium text-[#002147] transition hover:text-sky-700">
              View privacy policy
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
                Contact
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                If you have questions about these Terms of Use, contact MSNC at{' '}
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
