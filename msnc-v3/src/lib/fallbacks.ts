/**
 * FALLBACK DATA
 * Centralized file to prevent Turbopack import errors and provide 
 * immediate UI feedback during development.
 */

export const fallbackPartners = [
  { id: "1", name: "University of Toronto", logoUrl: "https://placehold.co/200x60/002147/ffffff?text=UofT" },
  { id: "2", name: "RBC Future Launch", logoUrl: "https://placehold.co/200x60/EF4444/ffffff?text=RBC" },
  { id: "3", name: "Scotiabank", logoUrl: "https://placehold.co/200x60/3B82F6/ffffff?text=Scotiabank" },
  { id: "4", name: "McGill University", logoUrl: "https://placehold.co/200x60/10B981/ffffff?text=McGill" },
  { id: "5", name: "Google.org", logoUrl: "https://placehold.co/200x60/4285F4/ffffff?text=Google" }
];

export const fallbackEvents = [
  {
    id: "e1",
    title: "Global Leadership & Innovation Summit 2026",
    slug: "global-leadership-summit-2026",
    eventDate: "2026-06-15T09:00:00Z",
    category: "Summit",
    description: "Our flagship annual gathering bringing together Mulenge scholars, industry leaders, and policy makers to discuss the future of the diaspora in global tech and governance.",
    mainImage: { url: "https://placehold.co/800x500/002147/ffffff?text=Leadership+Summit" },
    location: "Toronto, ON",
    isFeatured: true
  },
  {
    id: "e2",
    title: "Academic Excellence Workshop: University Admissions",
    slug: "academic-excellence-workshop-2026",
    eventDate: "2026-04-20T14:00:00Z",
    category: "Workshop",
    description: "A deep dive into navigating the Canadian university application process, securing scholarships, and writing compelling personal statements.",
    mainImage: { url: "https://placehold.co/800x500/3B82F6/ffffff?text=Academic+Workshop" },
    location: "Virtual / Zoom",
    isFeatured: false
  },
  {
    id: "e3",
    title: "MSNC Community Gala 2025",
    slug: "community-gala-2025",
    eventDate: "2025-12-10T18:00:00Z",
    category: "Community",
    description: "Celebrating a year of transformative impact, scholar success stories, and our dedicated network of mentors and donors.",
    mainImage: { url: "https://placehold.co/800x500/EF4444/ffffff?text=Community+Gala" },
    location: "Ottawa, ON",
    isFeatured: false
  },
  {
    id: "e4",
    title: "STEM Mentorship Kick-off",
    slug: "stem-mentorship-2025",
    eventDate: "2025-09-05T10:00:00Z",
    category: "Mentorship",
    description: "Launching the 2025-2026 mentorship cohort specifically focused on Software Engineering and Data Science career paths.",
    mainImage: { url: "https://placehold.co/800x500/10B981/ffffff?text=STEM+Mentorship" },
    location: "Montreal, QC",
    isFeatured: false
  }
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

export const fallbackTestimonials = [
  {
    id: 't1',
    authorName: "Manassé N.",
    authorRole: "Lead Software Engineer",
    institution: "USIU-Africa",
    location: "Nairobi, KE",
    cohortYear: "2024",
    quote: "The MSNC network provided the blueprint for my transition into international tech. It's more than a network; it's a launchpad for the Mulenge diaspora.",
    imageUrl: null,
    journey: "Great Lakes Region → Academic Excellence → Tech Leadership",
    stats: {
      Projects_Launched: "5+",
      Mentorship_Hours: "120",
      Success_Rate: "98%"
    }
  },
  {
    id: 't2',
    authorName: "Clarisse M.",
    authorRole: "Public Policy Advocate",
    institution: "University of Ottawa",
    location: "Ottawa, ON",
    cohortYear: "2023",
    quote: "Advocating for educational equity is personal. MSNC gave me the platform to ensure that every youth, regardless of their background, has a seat at the table.",
    imageUrl: null,
    journey: "Refugee Status → Policy Research → Government Relations",
    stats: {
      Policy_Briefs: "3",
      Youth_Reached: "200+",
      Awards: "2"
    }
  }
];