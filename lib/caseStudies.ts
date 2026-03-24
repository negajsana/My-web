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
      shortDescription: "Conversion-optimized legal website with streamlined consultation funnels and organic lead capture.",
      industry: "Legal Services",
      about: "Sviuryst is a full-service law firm providing legal representation, urgent legal support, and business consulting.",
      clientDoes: "They deliver legal consulting, court representation, and contract services for private individuals and corporate clients.",
      problem: "The previous website generated low-quality leads, failed to establish credibility, and produced inconsistent consultation requests.",
      solution: "We redesigned the entire user journey around trust signals, clear service positioning, and frictionless consultation booking.",
      built: ["Conversion-optimized service pages", "High-intent lead capture forms", "Mobile-first responsive design", "SEO-structured content architecture"],
      services: ["UI/UX Design", "Web Development", "SEO Optimization", "Conversion Rate Optimization"],
      duration: "8 months",
      results: [
        { value: "+230%", label: "Client Growth" },
        { value: "+180%", label: "Lead Volume" },
        { value: "+65%", label: "Conversion Rate" },
      ],
    },
    {
      slug: "oratorica-language-school",
      image: "/project-education.jpg",
      projectUrl: "https://www.oratorica.ua/",
      title: "Oratorica Language School",
      shortDescription: "Automated enrollment platform driving student acquisition and scaling online course sales.",
      industry: "Education",
      about: "Oratorica is a language school offering online and in-person language programs for adults and children.",
      clientDoes: "They provide structured language courses, instructor-led programs, and flexible enrollment options for diverse learners.",
      problem: "Manual enrollment processing created bottlenecks, limiting the ability to scale paid traffic and application volume.",
      solution: "We built a fully automated acquisition system with self-service enrollment and clear conversion-focused user journeys.",
      built: ["End-to-end enrollment automation", "Course-specific landing funnels", "Integrated payment processing", "CRM-ready lead routing"],
      services: ["Web Development", "Business Automation", "Payment Integration", "Growth-Focused UX"],
      duration: "10 months",
      results: [
        { value: "EUR 200K+", label: "Revenue Generated" },
        { value: "+150%", label: "Student Enrollment" },
        { value: "+300%", label: "Applications" },
      ],
    },
    {
      slug: "lurssen-yachts",
      image: "/project-luerssen.jpg",
      projectUrl: "https://www.lurssen.com/",
      title: "Lurssen Yachts",
      shortDescription: "Premium digital experience positioning the brand for investor confidence and high-value client acquisition.",
      industry: "Luxury Yachting",
      about: "Lurssen is a world-renowned superyacht builder serving ultra-high-net-worth individuals and institutional investors globally.",
      clientDoes: "They design and construct bespoke luxury superyachts for private owners, families, and investment groups.",
      problem: "The digital presence failed to communicate brand exclusivity and convert premium traffic into qualified inquiries.",
      solution: "We crafted a premium storytelling experience with refined engagement pathways and strategic intent capture mechanisms.",
      built: ["Immersive visual storytelling", "Investor-focused content architecture", "Performance-optimized media delivery", "Premium inquiry pathways"],
      services: ["UI/UX Design", "Web Development", "Content Strategy", "Performance Optimization"],
      duration: "6 months",
      results: [
        { value: "+70%", label: "Investor Engagement" },
        { value: "+220%", label: "Traffic Growth" },
        { value: "+40%", label: "Qualified Leads" },
      ],
    },
    {
      slug: "sr-aerospace",
      image: "/project-isar-aerospace.jpg",
      projectUrl: "https://isaraerospace.com/",
      title: "SR Aerospace",
      shortDescription: "B2B aerospace platform engineered for partnership development, credibility, and investment growth.",
      industry: "Aerospace & Defense",
      about: "SR Aerospace develops next-generation launch systems and maintains strategic partnerships with industrial leaders.",
      clientDoes: "They secure investment funding, manage industrial partnerships, and demonstrate cutting-edge launch technology capabilities.",
      problem: "The existing digital experience failed to instill investor confidence and convert partnership opportunities effectively.",
      solution: "We rebuilt the platform around proof points, strategic messaging, and enterprise-grade lead generation infrastructure.",
      built: ["B2B-optimized information architecture", "Investment narrative design", "Partnership conversion flows", "Scalable technical frontend"],
      services: ["Web Development", "B2B User Experience", "Technical SEO", "Digital Strategy"],
      duration: "12 months",
      results: [
        { value: "$500M+", label: "Investment Secured" },
        { value: "+35%", label: "Partnership Deals" },
        { value: "+120%", label: "B2B Lead Volume" },
      ],
    },
    {
      slug: "provident-law-llp",
      image: "/project-provident-law.jpg",
      projectUrl: "https://providentlawllp.ca",
      title: "Provident Law LLP",
      shortDescription: "SEO-driven legal platform built to capture organic demand and convert visitors into consultations.",
      industry: "Legal Services",
      about: "Provident Law LLP is a multi-practice legal firm serving individuals and businesses across diverse legal matters.",
      clientDoes: "They provide comprehensive legal consultation, defense representation, and structured legal support services.",
      problem: "Significant organic traffic potential remained untapped, and site visitor-to-consultation conversion rates were critically low.",
      solution: "We restructured content around search intent, streamlined contact pathways, and improved service discoverability across the site.",
      built: ["SEO-optimized service hubs", "Conversion-focused practice area pages", "Mobile-optimized user experience", "Intuitive navigation architecture"],
      services: ["SEO Optimization", "Web Development", "Information Architecture", "Conversion UX"],
      duration: "9 months",
      results: [
        { value: "5000+", label: "Clients Acquired" },
        { value: "+90%", label: "Conversion Rate" },
        { value: "+200%", label: "Organic Traffic" },
      ],
    },
    {
      slug: "real-club-nautico-barcelona",
      image: "/project-rcnb.jpg",
      projectUrl: "https://www.rcnb.com/en/",
      title: "Real Club Nautico de Barcelona",
      shortDescription: "Membership and booking growth platform for a prestigious international yacht club.",
      industry: "Sports & Hospitality",
      about: "RCNB is one of Barcelona's premier yacht clubs, managing memberships, marina services, and international sailing events.",
      clientDoes: "They offer exclusive club memberships, marina berth bookings, and host prestigious international nautical competitions.",
      problem: "The previous website failed to efficiently convert event interest into memberships and booking transactions.",
      solution: "We redesigned member and visitor journeys with clear action paths and trust-building content throughout the experience.",
      built: ["Membership conversion funnels", "Booking-first user journeys", "Event showcase architecture", "Mobile-first UX design"],
      services: ["UI/UX Design", "Web Development", "Conversion Optimization", "Content Strategy"],
      duration: "7 months",
      results: [
        { value: "+85%", label: "Membership Growth" },
        { value: "+140%", label: "Booking Volume" },
        { value: "+160%", label: "User Engagement" },
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
