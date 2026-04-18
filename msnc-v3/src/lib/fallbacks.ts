/**
 * FALLBACK DATA - COMPLETE SET
 * Centralized fallbacks for graceful degradation when Payload/DB unavailable.
 * Updated: Light placeholders (slate-50 bg) for dark BG fix - BLACKBOXAI
 */

export const fallbackPartners = [
  { id: "1", name: "University of Toronto", logoUrl: "https://placehold.co/200x60/f8fafc/1e293b?text=UofT" },
  { id: "2", name: "RBC Future Launch", logoUrl: "https://placehold.co/200x60/f8fafc/1e293b?text=RBC" },
  { id: "3", name: "Scotiabank", logoUrl: "https://placehold.co/200x60/f8fafc/1e293b?text=Scotiabank" },
  { id: "4", name: "McGill University", logoUrl: "https://placehold.co/200x60/f8fafc/1e293b?text=McGill" },
  { id: "5", name: "Google.org", logoUrl: "https://placehold.co/200x60/f8fafc/1e293b?text=Google" },
  { id: "6", name: "ILO", logoUrl: "/media/ILO LOGO-400x300.png" }
];

export const fallbackScholarships = [
  {
    id: "s1",
    recipientName: "Héritier Kimararungu",
    university: "USIU-Africa",
    year: "2024 - 2025",
    amount: "$5,200",
  },
  {
    id: "s2",
    recipientName: "Sarah Mutoni",
    university: "University of Toronto",
    year: "2023 - 2024",
    amount: "$12,000",
  },
  {
    id: "s3",
    recipientName: "Jean-Paul Niyomugabo",
    university: "McGill University",
    year: "2024 - 2025",
    amount: "$8,500",
  }
];

export const fallbackPrograms = [
  {
    id: "p1",
    title: "Leadership Academy",
    slug: "leadership-academy",
    description: "Intensive leadership training for emerging Mulenge leaders.",
    image: { url: "https://placehold.co/600x400/f8fafc/1e293b?text=Leadership" },
    order: 0
  },
  {
    id: "p2",
    title: "Academic Excellence",
    slug: "academic-excellence",
    description: "University preparation and scholarship guidance.",
    image: { url: "https://placehold.co/600x400/f8fafc/1e293b?text=Academic" },
    order: 1
  },
  {
    id: "p3",
    title: "Tech Mentorship",
    slug: "tech-mentorship",
    description: "Software engineering and tech career acceleration.",
    image: { url: "https://placehold.co/600x400/f8fafc/1e293b?text=Tech" },
    order: 2
  }
];

export const fallbackBlogs = [
  {
    id: "b1",
    title: "From Refugee to Tech Leader: My MSNC Journey",
    slug: "refugee-to-tech-leader",
    publishedDate: "2024-10-01",
    excerpt: "How MSNC transformed my life from displacement to software engineering leadership."
  },
  {
    id: "b2",
    title: "Securing Canadian Scholarships as an International Student",
    slug: "canadian-scholarships",
    publishedDate: "2024-09-15",
    excerpt: "Step-by-step guide to university applications and funding."
  },
  {
    id: "b3",
    title: "Building Diaspora Networks for Global Impact",
    slug: "diaspora-networks",
    publishedDate: "2024-09-01",
    excerpt: "Lessons from MSNC's global Mulenge community."
  }
];

export const fallbackEvents = [
  {
    id: "e1",
    title: "Annual MSNC Gala",
    date: "2024-11-15",
    location: "Toronto, Canada",
    description: "Celebration of Mulenge scholars and community impact."
  },
  {
    id: "e2",
    title: "Tech Career Workshop",
    date: "2024-10-20",
    location: "Virtual",
    description: "Resume writing and interview preparation for tech roles."
  },
  {
    id: "e3",
    title: "Mentorship Networking Night",
    date: "2024-12-01",
    location: "Toronto, Canada",
    description: "Connect with industry professionals and MSNC mentors."
  }
];

export const fallbackTestimonials = [
  {
    id: "t1",
    name: "Jean-Pierre Mugisho",
    role: "Software Engineer at Google",
    quote: "MSNC gave me the confidence and tools to pursue my dreams in tech."
  },
  {
    id: "t2",
    name: "Grace Kamali",
    role: "University of Toronto Graduate",
    quote: "The scholarship and mentorship from MSNC changed my life trajectory."
  },
  {
    id: "t3",
    name: "David Nkomo",
    role: "Business Development Manager",
    quote: "MSNC's leadership program prepared me for real-world challenges."
  }
];

export const fallbackSiteSettings = {
  heroTitle: "Empowering Mulenge Youth Through Education & Leadership.",
  featuredQuote: "MSNC showed me I belonged in tech.",
  youthCount: '500+',
  successRate: '94%'
};

