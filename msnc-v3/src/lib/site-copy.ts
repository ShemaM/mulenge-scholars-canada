export const siteLocales = ['en', 'fr'] as const

export type SiteLocale = (typeof siteLocales)[number]

export function isSiteLocale(value: string): value is SiteLocale {
  return siteLocales.includes(value as SiteLocale)
}

export function normalizeSiteLocale(value?: string): SiteLocale {
  return value === 'fr' ? 'fr' : 'en'
}

export function getSiteDateLocale(locale: string): string {
  return locale === 'fr' ? 'fr-CA' : 'en-CA'
}

export const uiCopy = {
  en: {
    navbar: {
      donate: 'Support Us',
      mobileDonate: 'Support Our Mission',
      viewPage: 'View Page',
      copyright: '© 2026 MSNC Canada',
      nav: [
        {
          id: '01',
          name: 'About',
          href: '/about',
          tagline: 'Legacy & Vision',
          desc: 'Redefining educational pathways for global scholars.',
        },
        {
          id: '02',
          name: 'Programs',
          href: '/programs',
          tagline: 'Core Pillars',
          desc: 'Specialized support tracks from bridging to adult learning.',
        },
        {
          id: '03',
          name: 'Impact',
          href: '/impact/rebuilding-futures',
          tagline: 'Real Results',
          desc: 'Success stories from our global community.',
        },
        {
          id: '04',
          name: 'Journal',
          href: '/blog',
          tagline: 'Latest Insights',
          desc: 'Research, updates, and leadership pieces.',
        },
        {
          id: '05',
          name: 'Contact',
          href: '/contact',
          tagline: 'Get Involved',
          desc: 'Connect for partnerships or volunteering.',
        },
      ],
    },
    footer: {
      brand: 'Empowering Mulenge diaspora youth through education, mentorship, and leadership for sustainable futures.',
      primaryHeading: 'MSNC',
      actionsHeading: 'Actions',
      contactHeading: 'Get in touch',
      newsletterHeading: 'Newsletter',
      newsletterBody: 'Stay updated with program launches and impact stories.',
      newsletterSubject: 'Newsletter Signup',
      newsletterPlaceholder: 'your@email.com',
      newsletterAria: 'Email for newsletter',
      newsletterCta: 'Subscribe',
      legal: {
        privacy: 'Privacy',
        terms: 'Terms',
        sitemap: 'Sitemap',
      },
      rights: "© {year} Mulenge Scholars' Network Canada. All rights reserved.",
      navLinks: [
        { name: 'About', href: '/about' },
        { name: 'Programs', href: '/programs' },
        { name: 'Events', href: '/events' },
        { name: 'Leadership', href: '/leadership' },
      ],
      actionLinks: [
        { name: 'Join', href: '/join' },
        { name: 'Donate', href: '/donate' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ],
      contactInfo: {
        email: { label: 'Email', value: 'info@mulengescholars.org' },
        location: { label: 'Locations', value: 'Canada' },
      },
    },
    hero: {
      country: 'Canada',
      commitmentLabel: 'I. The Commitment',
      commitmentLead:
        'We are dedicated to empowering youth across Canada through mentorship, academic guidance, and leadership development.',
      commitmentBody:
        'By fostering a strong sense of community and belonging, we bridge the gap between migration and scholarly success.',
      learnMore: 'Learn More',
      programs: 'Our Programs',
      heritageLabel: 'II. Heritage',
      heritageBody:
        'Founded by Banyamulenge students, MSNC carries the legacy of the highlands, transforming a history of migration and resilience into a catalyst for professional growth.',
      tags: ['Mentorship', 'Equity', 'Leadership', 'Excellence'],
      visionLabel: 'III. The Vision',
      visionQuote:
        'A future where our youth are successful in their academic journeys and established as leaders giving back to their communities.',
      principles: 'Our Guiding Principles',
      principlesValue: 'Equity & Excellence',
    },
    pages: {
      strategySummary: 'Our Strategy & Programs',
      upcomingEvents: 'Upcoming Events',
      networkLabel: 'Our Network',
      networkHeading: 'Trusted By Global Institutions',
    },
  },
  fr: {
    navbar: {
      donate: 'Nous soutenir',
      mobileDonate: 'Soutenir notre mission',
      viewPage: 'Voir la page',
      copyright: '© 2026 MSNC Canada',
      nav: [
        {
          id: '01',
          name: 'À propos',
          href: '/about',
          tagline: 'Héritage et vision',
          desc: 'Redéfinir les parcours éducatifs pour les boursiers de la diaspora.',
        },
        {
          id: '02',
          name: 'Programmes',
          href: '/programs',
          tagline: 'Piliers clés',
          desc: "Des parcours d'accompagnement spécialisés, du soutien scolaire à la formation des adultes.",
        },
        {
          id: '03',
          name: 'Impact',
          href: '/impact/rebuilding-futures',
          tagline: 'Résultats concrets',
          desc: 'Des histoires de réussite au sein de notre communauté mondiale.',
        },
        {
          id: '04',
          name: 'Journal',
          href: '/blog',
          tagline: 'Dernières réflexions',
          desc: 'Recherches, actualités et prises de parole du leadership.',
        },
        {
          id: '05',
          name: 'Contact',
          href: '/contact',
          tagline: 'S’impliquer',
          desc: 'Échangez avec nous pour un partenariat ou du bénévolat.',
        },
      ],
    },
    footer: {
      brand:
        'Renforcer les jeunes de la diaspora mulenge par l’éducation, le mentorat et le leadership pour un avenir durable.',
      primaryHeading: 'MSNC',
      actionsHeading: 'Actions',
      contactHeading: 'Nous joindre',
      newsletterHeading: 'Infolettre',
      newsletterBody: 'Recevez nos nouveautés sur les programmes et les histoires d’impact.',
      newsletterSubject: "Inscription à l’infolettre",
      newsletterPlaceholder: 'votre@email.com',
      newsletterAria: "Courriel pour l’infolettre",
      newsletterCta: "S'abonner",
      legal: {
        privacy: 'Confidentialité',
        terms: 'Conditions',
        sitemap: 'Plan du site',
      },
      rights: "© {year} Réseau des Boursiers Mulenge Canada. Tous droits réservés.",
      navLinks: [
        { name: 'À propos', href: '/about' },
        { name: 'Programmes', href: '/programs' },
        { name: 'Événements', href: '/events' },
        { name: 'Leadership', href: '/leadership' },
      ],
      actionLinks: [
        { name: 'Rejoindre', href: '/join' },
        { name: 'Donner', href: '/donate' },
        { name: 'Journal', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ],
      contactInfo: {
        email: { label: 'Courriel', value: 'info@mulengescholars.org' },
        location: { label: 'Présence', value: 'Canada' },
      },
    },
    hero: {
      country: 'Canada',
      commitmentLabel: 'I. Notre engagement',
      commitmentLead:
        'Nous nous engageons à accompagner les jeunes à travers le Canada par le mentorat, l’orientation scolaire et le développement du leadership.',
      commitmentBody:
        'En renforçant le sentiment d’appartenance et de communauté, nous comblons l’écart entre migration et réussite scolaire.',
      learnMore: 'En savoir plus',
      programs: 'Nos programmes',
      heritageLabel: 'II. Héritage',
      heritageBody:
        'Fondé par des étudiants banyamulenge, le MSNC porte l’héritage des hauts plateaux et transforme une histoire de migration et de résilience en moteur de progression professionnelle.',
      tags: ['Mentorat', 'Équité', 'Leadership', 'Excellence'],
      visionLabel: 'III. La vision',
      visionQuote:
        'Un avenir où nos jeunes réussissent leur parcours scolaire et deviennent des leaders qui redonnent à leurs communautés.',
      principles: 'Nos principes directeurs',
      principlesValue: 'Équité et excellence',
    },
    pages: {
      strategySummary: 'Notre stratégie et nos programmes',
      upcomingEvents: 'Événements à venir',
      networkLabel: 'Notre réseau',
      networkHeading: 'La confiance des institutions mondiales',
    },
  },
} as const

export function getUiCopy(locale: string) {
  return uiCopy[normalizeSiteLocale(locale)]
}
