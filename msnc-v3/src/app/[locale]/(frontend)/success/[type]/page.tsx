import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { Link } from '@/navigation';
import { normalizeSiteLocale } from '@/lib/site-copy';

type SuccessPageProps = {
  params: Promise<{
    locale: string;
    type: string;
  }>;
};

const copyByType: Record<string, { title: string; description: string; ctaLabel: string; ctaHref: string }> = {
  join: {
    title: 'Application Received',
    description: 'Thank you for taking this step with MSNC. Our leadership team will review your submission and reach out within 2-3 business days.',
    ctaLabel: 'Back to Home',
    ctaHref: '/',
  },
  contact: {
    title: 'Message Dispatched',
    description: 'Your message is with our team. Expect a response within 24-48 hours.',
    ctaLabel: 'Return to Contact',
    ctaHref: '/contact',
  },
  donate: {
    title: 'Thank You for Your Support',
    description: 'Your contribution fuels opportunity for Mulenge scholars. A confirmation is on its way.',
    ctaLabel: 'Explore Our Programs',
    ctaHref: '/programs',
  },
};

export const metadata: Metadata = {
  title: 'Submission Success | MSNC',
  description: 'Your submission has been received by the Mulenge Scholars Network.',
};

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { type, locale } = await params;
  const activeLocale = normalizeSiteLocale(locale);

  const defaultsByLocale =
    activeLocale === 'fr'
      ? {
          title: 'Soumission recue',
          description: 'Merci. Votre soumission a ete recue par MSNC.',
          ctaLabel: "Retour a l'accueil",
          ctaHref: '/',
          badge: 'Succes',
        }
      : {
          title: 'Submission Received',
          description: 'Thank you. Your submission has been received by MSNC.',
          ctaLabel: 'Back to Home',
          ctaHref: '/',
          badge: 'Success',
        };

  const localizedByType =
    activeLocale === 'fr'
      ? {
          join: {
            title: 'Candidature recue',
            description:
              'Merci pour cette etape avec MSNC. Notre equipe de leadership examinera votre soumission et vous contactera sous 2 a 3 jours ouvrables.',
            ctaLabel: "Retour a l'accueil",
            ctaHref: '/',
          },
          contact: {
            title: 'Message envoye',
            description: 'Votre message est avec notre equipe. Une reponse est prevue sous 24 a 48 heures.',
            ctaLabel: 'Retour au contact',
            ctaHref: '/contact',
          },
          donate: {
            title: 'Merci pour votre soutien',
            description:
              'Votre contribution alimente les opportunites pour les boursiers Mulenge. Une confirmation est en route.',
            ctaLabel: 'Explorer nos programmes',
            ctaHref: '/programs',
          },
        }
      : copyByType;

  const content = localizedByType[type] || defaultsByLocale;

  return (
    <main className="min-h-screen bg-white selection:bg-secondary/20">
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 transform origin-top pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-secondary font-black uppercase tracking-widest text-sm mb-6">
              <span className="w-8 h-0.5 bg-secondary" />
              {defaultsByLocale.badge}
            </div>
            <h1 className="text-5xl md:text-7xl text-primary leading-tight tracking-tight font-display mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed font-medium max-w-2xl border-l-4 border-secondary pl-6">
              {content.description}
            </p>
            <div className="mt-10">
              <Link
                href={content.ctaHref}
                className="inline-flex items-center justify-center h-14 px-8 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm shadow-xl hover:bg-secondary transition-all"
              >
                {content.ctaLabel}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
