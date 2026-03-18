import type { Metadata } from "next"
import { translations, type Language } from "./translations"

// ─────────────────────────────────────────────────────────────────────────────
// Company: Code Architect
// Domains: https://codearchitect.site | https://dvl.yachts
// Lead Developer: Alexander
// Geography: Ukraine, Europe, International
// Active languages with deployed routes: en, uk, ru
// Defined but not yet routed: es, de (hreflang excluded until routes exist)
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://codearchitect.site"

// Languages that have actual deployed routes.
// Add "es" | "de" here only after you create app/[lang]/*/page.tsx for them.
const ACTIVE_LANGUAGES: Language[] = ["en", "uk", "ru"]

// ─────────────────────────────────────────────────────────────────────────────
// PAGE METADATA
// ─────────────────────────────────────────────────────────────────────────────

export function generatePageMetadata(
  lang: Language,
  page: "home" | "about" | "services" | "contact" | "howWeWork" | "projects"
): Metadata {
  const t = translations[lang]
  const seo = t.seo[page]

  const langToLocale: Record<Language, string> = {
    uk: "uk_UA",
    en: "en_US",
    ru: "ru_RU",
    es: "es_ES",
    de: "de_DE",
  }
  const langCode = langToLocale[lang]

  const pagePath =
    page === "home" ? "" : `/${page === "howWeWork" ? "how-we-work" : page}`

  const canonicalUrl = `${SITE_URL}/${lang}${pagePath}`

  // Only include hreflang for languages with actual deployed routes.
  // Hreflang pointing to 404s is a GSC error and wastes crawl budget.
  const alternateLanguages: Record<string, string> = {}
  for (const l of ACTIVE_LANGUAGES) {
    alternateLanguages[l] = `${SITE_URL}/${l}${pagePath}`
  }
  // x-default always points to English
  alternateLanguages["x-default"] = `${SITE_URL}/en${pagePath}`

  const ogSiteName: Record<Language, string> = {
    uk: "Code Architect — Веб-розробка та розробка ПЗ",
    ru: "Code Architect — Веб-разработка и разработка ПО",
    es: "Code Architect — Desarrollo Web y Software",
    de: "Code Architect — Webentwicklung & Softwareentwicklung",
    en: "Code Architect — Web & Software Development",
  }

  const ogImage = {
    url: `${SITE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: ogSiteName[lang],
    type: "image/jpeg",
  }

  // Build alternateLocale list for OG (exclude current)
  const allLocales = Object.values(langToLocale)
  const alternateLocales = allLocales.filter((l) => l !== langCode) as string[]

  return {
    title: seo.title,
    description: seo.description,
    keywords: getKeywords(lang, page),
    authors: [
      { name: "Alexander", url: SITE_URL },
      { name: "Code Architect", url: SITE_URL },
    ],
    creator: "Code Architect",
    publisher: "Code Architect",
    category: "technology",
    icons: {
      icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
      apple: { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: ogSiteName[lang],
      locale: langCode,
      type: "website",
      alternateLocale: alternateLocales,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [`${SITE_URL}/og-image.jpg`],
      creator: "@codearchitect",
      site: "@codearchitect",
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
    // NOTE: geo.* meta tags are legacy and have no confirmed ranking impact.
    // Removed to reduce HTML bloat. Geo targeting is handled via hreflang + GSC.
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// KEYWORDS — per language, per page
// ─────────────────────────────────────────────────────────────────────────────

function getKeywords(lang: Language, page: string): string[] {
  const keywords: Record<Language, Record<string, string[]>> = {
    uk: {
      home: [
        "розробка сайтів Україна",
        "створення веб-сайту",
        "замовити сайт",
        "веб-розробка компанія",
        "розробка чат-ботів",
        "telegram бот розробка",
        "автоматизація бізнес-процесів",
        "full-stack розробник",
        "створення лендінгу",
        "веб-додаток на замовлення",
        "розробка програмного забезпечення",
        "SaaS розробка",
        "IT компанія Україна",
        "UI UX дизайн",
        "технічна підтримка сайту",
        "інтеграція API",
        "корпоративний сайт замовити",
        "інтернет-магазин розробка",
        "Code Architect",
      ],
      about: [
        "IT команда Україна",
        "веб-розробники досвід",
        "react next.js розробник",
        "node.js python розробник",
        "full-stack команда",
        "SEO спеціаліст",
        "розробка сайтів портфоліо",
        "Code Architect команда",
        "junior fullstack developer",
        "проєктний менеджер IT",
      ],
      services: [
        "послуги веб-розробки",
        "розробка telegram бота ціна",
        "створення сайту ціна",
        "автоматизація бізнес-процесів",
        "інтеграція API CRM",
        "розробка веб-додатків",
        "розробка програмного забезпечення на замовлення",
        "SaaS розробка Україна",
        "UI UX дизайн послуги",
        "технічна підтримка сайту",
        "корпоративний сайт розробка",
        "лендінг розробка ціна",
      ],
      projects: [
        "портфоліо веб-розробника",
        "приклади робіт IT компанія",
        "реалізовані проєкти сайтів",
        "кейси веб-розробки",
        "корпоративні сайти приклади",
        "освітня платформа розробка",
        "юридичний сайт розробка",
      ],
      contact: [
        "замовити розробку сайту",
        "консультація веб-розробника безкоштовно",
        "зв'язатися з IT компанією",
        "Code Architect контакти",
        "замовити розробку застосунку",
        "IT консультація безкоштовно",
      ],
      howWeWork: [
        "процес розробки сайту",
        "як замовити сайт",
        "етапи веб-розробки",
        "співпраця з IT компанією",
        "строки розробки сайту",
        "agile розробка",
        "технічне завдання сайт",
      ],
    },

    en: {
      home: [
        "web development company Europe",
        "website development services",
        "software development company",
        "custom web development",
        "web developer Europe",
        "chatbot development",
        "telegram bot development",
        "business automation",
        "full-stack development team",
        "landing page development",
        "custom web application",
        "SaaS development company",
        "IT company Europe",
        "UI UX design services",
        "API integration services",
        "web development Ukraine",
        "ecommerce development",
        "corporate website development",
        "Code Architect",
      ],
      about: [
        "IT development team Europe",
        "web development company team",
        "react next.js developer",
        "node.js python developer",
        "full-stack development team",
        "SEO specialist marketing",
        "junior fullstack developer",
        "Code Architect team",
        "software development professionals",
        "project manager IT",
      ],
      services: [
        "web development services Europe",
        "telegram bot development price",
        "website development cost",
        "business process automation",
        "API CRM integration",
        "web application development",
        "custom software development",
        "SaaS development services",
        "UI UX design company",
        "technical support website",
        "corporate website development",
        "landing page development price",
        "software development outsourcing Europe",
      ],
      projects: [
        "web development portfolio",
        "IT company case studies",
        "delivered web projects",
        "next.js portfolio projects",
        "corporate website examples",
        "education platform development",
        "law firm website development",
      ],
      contact: [
        "order website development",
        "free web development consultation",
        "contact IT company",
        "Code Architect contact",
        "hire web development team",
        "software development quote",
      ],
      howWeWork: [
        "web development process",
        "how to order a website",
        "software development stages",
        "working with IT company",
        "website development timeline",
        "agile development process",
        "technical specification website",
      ],
    },

    ru: {
      home: [
        "разработка сайтов",
        "создание веб-сайта",
        "заказать сайт",
        "веб-разработка компания",
        "разработка чат-ботов",
        "telegram бот разработка",
        "автоматизация бизнеса",
        "full-stack разработчик",
        "разработка программного обеспечения",
        "SaaS разработка",
        "IT компания",
        "UI UX дизайн",
        "интеграция API",
        "корпоративный сайт заказать",
        "интернет-магазин разработка",
        "Code Architect",
      ],
      about: [
        "IT команда веб-разработка",
        "веб-разработчики опыт",
        "react next.js разработчик",
        "node.js python разработчик",
        "full-stack команда",
        "SEO специалист маркетолог",
        "Code Architect команда",
        "junior fullstack developer",
        "проектный менеджер IT",
      ],
      services: [
        "услуги веб-разработки",
        "разработка telegram бота цена",
        "создание сайта цена",
        "автоматизация бизнес-процессов",
        "интеграция API CRM",
        "разработка веб-приложений",
        "разработка программного обеспечения на заказ",
        "SaaS разработка",
        "UI UX дизайн услуги",
        "техническая поддержка сайта",
        "корпоративный сайт разработка",
      ],
      projects: [
        "портфолио веб-разработчика",
        "примеры работ IT компания",
        "реализованные проекты сайтов",
        "кейсы веб-разработки",
        "корпоративные сайты примеры",
      ],
      contact: [
        "заказать разработку сайта",
        "консультация веб-разработчика бесплатно",
        "связаться с IT компанией",
        "Code Architect контакты",
        "заказать разработку приложения",
      ],
      howWeWork: [
        "процесс разработки сайта",
        "как заказать сайт",
        "этапы веб-разработки",
        "сотрудничество с IT компанией",
        "сроки разработки сайта",
        "техническое задание сайт",
      ],
    },

    es: {
      home: [
        "empresa de desarrollo web Europa",
        "servicios de desarrollo web",
        "empresa de software a medida",
        "desarrollo web personalizado",
        "desarrollador web Europa",
        "desarrollo de chatbots",
        "desarrollo bot telegram",
        "automatización de negocios",
        "equipo full-stack",
        "landing page a medida",
        "aplicación web personalizada",
        "empresa SaaS",
        "IT company Europa",
        "diseño UI UX",
        "integración API",
        "desarrollo web Ucrania",
        "Code Architect",
      ],
      about: [
        "equipo de desarrollo IT Europa",
        "empresa de desarrollo web equipo",
        "desarrollador react next.js",
        "desarrollador node.js python",
        "equipo full-stack",
        "especialista SEO marketing",
        "Code Architect equipo",
        "junior fullstack developer",
        "project manager IT",
      ],
      services: [
        "servicios de desarrollo web Europa",
        "precio desarrollo bot telegram",
        "precio creación de página web",
        "automatización de procesos empresariales",
        "integración API CRM",
        "desarrollo de aplicaciones web",
        "desarrollo software a medida",
        "empresa SaaS desarrollo",
        "diseño UI UX servicios",
        "soporte técnico web",
        "desarrollo sitio corporativo",
      ],
      projects: [
        "portafolio empresa desarrollo web",
        "casos de éxito IT",
        "proyectos web realizados",
        "proyectos portfolio next.js",
        "sitios corporativos ejemplos",
      ],
      contact: [
        "encargar desarrollo web",
        "consultoría IT gratuita",
        "contactar empresa IT",
        "Code Architect contacto",
        "contratar equipo desarrollo web",
      ],
      howWeWork: [
        "proceso de desarrollo web",
        "cómo encargar una página web",
        "etapas del desarrollo software",
        "trabajar con empresa IT",
        "plazos desarrollo de sitio",
        "especificación técnica web",
      ],
    },

    de: {
      home: [
        "Webentwicklung Unternehmen Europa",
        "Webseiten Entwicklung Dienstleistungen",
        "Softwareentwicklung Unternehmen",
        "individuelle Webentwicklung",
        "Webentwickler Europa",
        "Chatbot Entwicklung",
        "Telegram Bot Entwicklung",
        "Geschäftsautomatisierung",
        "Full-Stack Entwicklungsteam",
        "Landingpage Entwicklung",
        "individuelle Webanwendung",
        "SaaS Entwicklung Unternehmen",
        "IT Unternehmen Europa",
        "UI UX Design Agentur",
        "API Integration",
        "Webagentur Europa",
        "Software Entwicklung",
        "Webentwicklung Ukraine",
        "Code Architect",
      ],
      about: [
        "IT Entwicklungsteam Europa",
        "Webentwicklung Unternehmen Team",
        "React Next.js Entwickler",
        "Node.js Python Entwickler",
        "Full-Stack Entwicklungsteam",
        "SEO Spezialist Marketing",
        "Code Architect Team",
        "Junior Fullstack Developer",
        "Projektmanager IT",
      ],
      services: [
        "Webentwicklung Dienstleistungen Europa",
        "Telegram Bot Entwicklung Preis",
        "Kosten Website Entwicklung",
        "Geschäftsprozessautomatisierung",
        "API CRM Integration",
        "Webanwendungsentwicklung",
        "individuelle Softwareentwicklung",
        "SaaS Entwicklung",
        "UI UX Design Agentur",
        "technischer Support Website",
        "Unternehmenswebsite Entwicklung",
        "Software Entwicklung Outsourcing Europa",
      ],
      projects: [
        "Portfolio Webentwicklung Unternehmen",
        "IT Unternehmen Referenzen",
        "realisierte Webprojekte",
        "Next.js Portfolio Projekte",
        "Unternehmenswebsite Beispiele",
      ],
      contact: [
        "Website Entwicklung beauftragen",
        "kostenlose IT Beratung",
        "IT Unternehmen kontaktieren",
        "Code Architect Kontakt",
        "Webentwicklungsteam beauftragen",
        "Softwareentwicklung Angebot",
      ],
      howWeWork: [
        "Ablauf Webentwicklung",
        "wie Website beauftragen",
        "Phasen der Softwareentwicklung",
        "Zusammenarbeit mit IT Unternehmen",
        "Dauer Website Entwicklung",
        "agile Entwicklung",
        "technisches Lastenheft Website",
      ],
    },
  }

  return keywords[lang]?.[page] || []
}

// ─────────────────────────────────────────────────────────────────────────────
// STRUCTURED DATA — JSON-LD SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export function generateOrganizationSchema(lang: Language) {
  const description = translations[lang].seo.home.description

  const jobTitles = {
    alexander: {
      uk: "Головний розробник / Project Manager",
      ru: "Главный разработчик / Project Manager",
      es: "Desarrollador principal / Project Manager",
      de: "Hauptentwickler / Project Manager",
      en: "Lead Developer / Project Manager",
    },
    evgeny: {
      uk: "SEO-спеціаліст / Маркетолог",
      ru: "SEO-специалист / Маркетолог",
      es: "Especialista SEO / Marketing Strategist",
      de: "SEO-Spezialist / Marketing-Stratege",
      en: "SEO Specialist / Marketing Strategist",
    },
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Code Architect",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.svg`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.jpg`,
    description,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web & Software Development Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chatbot Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "API Integration" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical Support" } },
      ],
    },
    employee: [
      {
        "@type": "Person",
        name: "Alexander",
        jobTitle: jobTitles.alexander[lang],
        image: `${SITE_URL}/Alexander.jpg`,
      },
      {
        "@type": "Person",
        name: "Evgeny",
        jobTitle: jobTitles.evgeny[lang],
        image: `${SITE_URL}/Evgeny.jpg`,
      },
      {
        "@type": "Person",
        name: "Egor",
        jobTitle: "Junior Fullstack Developer",
        image: `${SITE_URL}/Egor.jpg`,
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English", "Russian"],
      url: `${SITE_URL}/${lang}/contact`,
    },
    sameAs: [
      "https://t.me/NE_106",
      "https://dvl.yachts",
    ],
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Poland" },
      { "@type": "Continent", name: "Europe" },
    ],
    foundingDate: "2022",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 3,
    },
  }
}

export function generatePersonSchema(lang: Language) {
  const jobTitle: Record<Language, string> = {
    uk: "Головний розробник — Code Architect",
    ru: "Главный разработчик — Code Architect",
    es: "Desarrollador principal — Code Architect",
    de: "Hauptentwickler — Code Architect",
    en: "Lead Developer — Code Architect",
  }

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#lead-developer`,
    name: "Alexander",
    jobTitle: jobTitle[lang],
    url: SITE_URL,
    image: `${SITE_URL}/Alexander.jpg`,
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Code Architect",
      url: SITE_URL,
    },
    knowsAbout: [
      "Web Development",
      "Software Development",
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "Telegram Bots",
      "Business Automation",
      "API Integration",
      "SaaS Development",
      "UI/UX Design",
    ],
  }
}

export function generateServicesSchema(lang: Language) {
  const t = translations[lang]

  const provider = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Code Architect",
    url: SITE_URL,
  }

  const areaServed = [
    { "@type": "Country", name: "Ukraine" },
    { "@type": "Continent", name: "Europe" },
  ]

  const listName: Record<Language, string> = {
    uk: "Послуги веб-розробки та автоматизації",
    ru: "Услуги веб-разработки и автоматизации",
    es: "Servicios de Desarrollo Web y Automatización",
    de: "Webentwicklung & Automatisierungsleistungen",
    en: "Web Development & Automation Services",
  }

  const softwareName: Record<Language, string> = {
    uk: "Розробка програмного забезпечення",
    ru: "Разработка программного обеспечения",
    es: "Desarrollo de Software a Medida",
    de: "Individuelle Softwareentwicklung",
    en: "Custom Software Development",
  }

  const uiuxName: Record<Language, string> = {
    uk: "UI/UX Дизайн",
    ru: "UI/UX Дизайн",
    es: "Diseño UI/UX",
    de: "UI/UX Design",
    en: "UI/UX Design",
  }

  const saasName: Record<Language, string> = {
    uk: "SaaS Розробка",
    ru: "SaaS Разработка",
    es: "Desarrollo SaaS",
    de: "SaaS Entwicklung",
    en: "SaaS Development",
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName[lang],
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: t.services.web.title,
          description: t.services.web.description,
          provider,
          areaServed,
          serviceType: "Web Development",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: t.services.chatbots.title,
          description: t.services.chatbots.description,
          provider,
          areaServed,
          serviceType: "Chatbot Development",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: t.services.automation.title,
          description: t.services.automation.description,
          provider,
          areaServed,
          serviceType: "Business Automation",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: t.services.integration.title,
          description: t.services.integration.description,
          provider,
          areaServed,
          serviceType: "API Integration",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: softwareName[lang],
          provider,
          areaServed,
          serviceType: "Software Development",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: uiuxName[lang],
          provider,
          areaServed,
          serviceType: "UI/UX Design",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "Service",
          name: saasName[lang],
          provider,
          areaServed,
          serviceType: "SaaS Development",
          url: `${SITE_URL}/${lang}/services`,
        },
      },
    ],
  }
}

export function generateFAQSchema(lang: Language) {
  const t = translations[lang]

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(lang: Language, page: string, pageName: string) {
  const homeName: Record<Language, string> = {
    uk: "Головна",
    ru: "Главная",
    es: "Inicio",
    de: "Startseite",
    en: "Home",
  }

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeName[lang],
      item: `${SITE_URL}/${lang}`,
    },
  ]

  if (page !== "home") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: pageName,
      item: `${SITE_URL}/${lang}/${page}`,
    })
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  }
}

export function generateWebsiteSchema(lang: Language) {
  const name: Record<Language, string> = {
    uk: "Code Architect — Веб-розробка та розробка ПЗ",
    ru: "Code Architect — Веб-разработка и разработка ПО",
    es: "Code Architect — Desarrollo Web y Software",
    de: "Code Architect — Webentwicklung & Softwareentwicklung",
    en: "Code Architect — Web & Software Development",
  }

  const inLanguage: Record<Language, string> = {
    uk: "uk-UA",
    ru: "ru-RU",
    es: "es-ES",
    de: "de-DE",
    en: "en-US",
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: name[lang],
    url: SITE_URL,
    inLanguage: inLanguage[lang],
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    // NOTE: SearchAction removed — /search?q= route does not exist.
    // A SearchAction pointing to a non-existent URL is invalid schema
    // and will produce GSC errors. Add back only when search is implemented.
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO SCHEMA — for projects page
// ─────────────────────────────────────────────────────────────────────────────
export function generatePortfolioSchema(lang: Language) {
  const t = translations[lang]
  const projects = [
    { key: "advokats", image: "project-law.jpg" },
    { key: "oratorica", image: "project-education.jpg" },
    { key: "luerssen", image: "project-luerssen.jpg" },
    { key: "isarAerospace", image: "project-isar-aerospace.jpg" },
    { key: "providentLaw", image: "project-provident-law.jpg" },
    { key: "rcnb", image: "project-rcnb.jpg" },
  ] as const

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      lang === "uk" ? "Портфоліо — реалізовані проєкти"
      : lang === "ru" ? "Портфолио — реализованные проекты"
      : lang === "de" ? "Portfolio — realisierte Projekte"
      : lang === "es" ? "Portafolio — proyectos realizados"
      : "Portfolio — Delivered Projects",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: t.projects[p.key].title,
        description: t.projects[p.key].description,
        image: `${SITE_URL}/${p.image}`,
        creator: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
        },
      },
    })),
  }
}
