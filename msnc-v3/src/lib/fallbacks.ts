/**
 * FALLBACK DATA - COMPLETE SET
 * Centralized fallbacks for graceful degradation when Payload/DB unavailable.
 */

export const fallbackPartners = [
  { id: "1", name: "University of Toronto", logoUrl: "https://placehold.co/200x60/002147/ffffff?text=UofT" },
  { id: "2", name: "RBC Future Launch", logoUrl: "https://placehold.co/200x60/EF4444/ffffff?text=RBC" },
  { id: "3", name: "Scotiabank", logoUrl: "https://placehold.co/200x60/3B82F6/ffffff?text=Scotiabank" },
  { id: "4", name: "McGill University", logoUrl: "https://placehold.co/200x60/10B981/ffffff?text=McGill" },
  { id: "5", name: "Google.org", logoUrl: "https://placehold.co/200x60/4285F4/ffffff?text=Google" },
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
    image: { url: "https://placehold.co/600x400/002147/ffffff?text=Leadership" },
    order: 0
  },
  {
    id: "p2",
    title: "Academic Excellence",
    slug: "academic-excellence",
    description: "University preparation and scholarship guidance.",
    image: { url: "https://placehold.co/600x400/3B82F6/ffffff?text=Academic" },
    order: 1
  },
  {
    id: "p3",
    title: "Tech Mentorship",
    slug: "tech-mentorship",
    description: "Software engineering and tech career acceleration.",
    image: { url: "https://placehold.co/600x400/10B981/ffffff?text=Tech" },
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
  // ... existing ...
];

export const fallbackTestimonials = [
  // ... existing ...
];

export const fallbackSiteSettings = {
  heroTitle: "Empowering Mulenge Youth Through Education & Leadership.",
  featuredQuote: "MSNC showed me I belonged in tech.",
  youthCount: '500+',
  successRate: '94%'
};

