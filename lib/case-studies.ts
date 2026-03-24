import type { Language } from "@/lib/translations"

export interface CaseStudy {
  slug: string
  image: string
  projectUrl: string
  title: string
  shortDescription: string
  industry: string
  about: string
  clientDoes: string
  problem: string
  solution: string
  built: string[]
  services: string[]
  duration: string
  results: Array<{
    value: string
    label: string
  }>
}

const caseStudies: Record<Language, CaseStudy[]> = {
  en: [
    {
      slug: "sviuryst-law-firm",
      image: "/project-law.jpg",
      projectUrl: "https://www.advokats24.com.ua/",
      title: "Sviuryst Law Firm",
      shortDescription: "A conversion-focused legal website with fast consultations and lead capture funnels.",
      industry: "Legal Services",
      about: "Sviuryst is a law firm helping individuals and businesses with legal representation and urgent legal support.",
      clientDoes: "They provide legal consulting, court support, and contract services for private and corporate clients.",
      problem: "The old site generated weak lead quality, low trust, and inconsistent consultation requests.",
      solution: "We redesigned the funnel around credibility, service clarity, and simplified consultation requests.",
      built: ["Conversion-focused service pages", "High-intent lead forms", "Fast mobile experience", "SEO-ready content structure"],
      services: ["UI/UX Design", "Web Development", "SEO Optimization", "Conversion Optimization"],
      duration: "8 months",
      results: [
        { value: "+230%", label: "clients" },
        { value: "+180%", label: "leads" },
        { value: "+65%", label: "conversion" },
      ],
    },
    {
      slug: "oratorica-language-school",
      image: "/project-education.jpg",
      projectUrl: "https://www.oratorica.ua/",
      title: "Oratorica Language School",
      shortDescription: "A growth platform for student acquisition, enrollment automation, and online sales.",
      industry: "Education",
      about: "Oratorica is a language school offering online and offline language programs for adults and children.",
      clientDoes: "They provide language courses, teacher-led programs, and flexible enrollment options.",
      problem: "Manual processing slowed admissions and limited scaling of paid traffic and applications.",
      solution: "We built a scalable acquisition system with automated enrollment and clear offer-based journeys.",
      built: ["Enrollment automation", "Course landing funnels", "Payment-ready user flow", "CRM-friendly lead routing"],
      services: ["Web Development", "Automation", "Payment Integration", "Growth UX"],
      duration: "10 months",
      results: [
        { value: "EUR 200K+", label: "revenue" },
        { value: "+150%", label: "students" },
        { value: "+300%", label: "applications" },
      ],
    },
    {
      slug: "lurssen-yachts",
      image: "/project-luerssen.jpg",
      projectUrl: "https://www.lurssen.com/",
      title: "Lurssen Yachts",
      shortDescription: "Premium digital positioning for investor trust and high-value lead generation.",
      industry: "Yachting and Luxury",
      about: "Lurssen is a world-class yacht builder serving a high-net-worth global audience.",
      clientDoes: "They design and build luxury superyachts for private owners and investors.",
      problem: "The digital presence did not communicate exclusivity clearly or convert premium traffic effectively.",
      solution: "We created a premium storytelling structure with stronger engagement paths and intent capture.",
      built: ["High-end visual experience", "Investor-focused content architecture", "Performance optimization", "Lead pathways for premium inquiries"],
      services: ["UI/UX Design", "Web Development", "Content Architecture", "Performance Optimization"],
      duration: "6 months",
      results: [
        { value: "+70%", label: "investor engagement" },
        { value: "+220%", label: "traffic" },
        { value: "+40%", label: "high-net-worth leads" },
      ],
    },
    {
      slug: "sr-aerospace",
      image: "/project-isar-aerospace.jpg",
      projectUrl: "https://isaraerospace.com/",
      title: "SR Aerospace",
      shortDescription: "A B2B aerospace platform designed for partnerships, credibility, and investment growth.",
      industry: "Aerospace",
      about: "SR Aerospace builds next-generation aerospace systems and works with strategic B2B partners.",
      clientDoes: "They attract investment, manage industrial partnerships, and showcase launch technology.",
      problem: "The old digital experience did not clearly support investor confidence and partner conversion.",
      solution: "We rebuilt the website around proof, strategic messaging, and enterprise lead generation.",
      built: ["B2B-focused information design", "Investment storytelling", "Partnership conversion pages", "Scalable technical frontend"],
      services: ["Web Development", "B2B UX", "Technical SEO", "Digital Strategy"],
      duration: "12 months",
      results: [
        { value: "$500M+", label: "investments" },
        { value: "+35%", label: "partnerships" },
        { value: "+120%", label: "B2B leads" },
      ],
    },
    {
      slug: "provident-law-llp",
      image: "/project-provident-law.jpg",
      projectUrl: "https://providentlawllp.ca",
      title: "Provident Law LLP",
      shortDescription: "A legal acquisition website built to increase trust and convert organic demand.",
      industry: "Legal Services",
      about: "Provident Law LLP is a legal practice serving individuals and businesses across multiple legal areas.",
      clientDoes: "They provide legal consultation, defense, and structured legal support for clients.",
      problem: "Organic traffic potential was underused and conversion from site visits was too low.",
      solution: "We structured content by intent, simplified contact points, and improved service discoverability.",
      built: ["SEO service hubs", "Conversion-oriented legal pages", "Faster mobile UX", "Improved navigation architecture"],
      services: ["SEO Optimization", "Web Development", "Information Architecture", "Conversion UX"],
      duration: "9 months",
      results: [
        { value: "5000+", label: "clients" },
        { value: "+90%", label: "conversion" },
        { value: "+200%", label: "organic traffic" },
      ],
    },
    {
      slug: "real-club-nautico-barcelona",
      image: "/project-rcnb.jpg",
      projectUrl: "https://www.rcnb.com/en/",
      title: "Real Club Nautico de Barcelona",
      shortDescription: "A membership and bookings growth platform for an international yacht club.",
      industry: "Sports and Hospitality",
      about: "RCNB is one of Barcelona's top yacht clubs, managing events, memberships, and marina services.",
      clientDoes: "They offer club memberships, marina bookings, and international nautical events.",
      problem: "The previous site did not convert event interest into memberships and bookings efficiently.",
      solution: "We redesigned journeys for members and visitors with clear actions and trust-building content.",
      built: ["Membership conversion funnels", "Booking-first user journeys", "Event visibility architecture", "Mobile-first UX improvements"],
      services: ["UI/UX Design", "Web Development", "Conversion Optimization", "Content Strategy"],
      duration: "7 months",
      results: [
        { value: "+85%", label: "membership" },
        { value: "+140%", label: "bookings" },
        { value: "+160%", label: "engagement" },
      ],
    },
  ],
  uk: [],
  ru: [],
  es: [],
  de: [],
}

caseStudies.uk = caseStudies.en
caseStudies.ru = caseStudies.en
caseStudies.es = caseStudies.en
caseStudies.de = caseStudies.en

export function getCaseStudies(lang: Language): CaseStudy[] {
  return caseStudies[lang]
}

export function getCaseStudyBySlug(lang: Language, slug: string): CaseStudy | undefined {
  return caseStudies[lang].find((caseStudy) => caseStudy.slug === slug)
}
