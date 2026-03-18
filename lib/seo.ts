import type { Metadata } from "next"
import { translations, type Language } from "./translations"

// ─────────────────────────────────────────────
// Company: Code Architect
// Domains: https://codearchitect.site | https://dvl.yachts
// Lead Developer: Alexander
// Geography: Ukraine, Europe, International
// ─────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://codearchitect.site"

// ─────────────────────────────────────────────
// PAGE METADATA
// ─────────────────────────────────────────────

export function generatePageMetadata(
  lang: Language,
  page: "home" | "about" | "services" | "contact" | "howWeWork" | "projects"
): Metadata {
  const t = translations[lang]
  const seo = t.seo[page]

  const langCode =
    lang === "uk"
      ? "uk-UA"
      : lang === "en"
        ? "en-US"
        : lang === "ru"
          ? "ru-RU"
          : lang === "es"
            ? "es-ES"
            : "de-DE"

  const pagePath =
    page === "home" ? "" : `/${page === "howWeWork" ? "how-we-work" : page}`

  const canonicalUrl = `${SITE_URL}/${lang}${pagePath}`

  const alternateLanguages: Record<string, string> = {
    uk: `${SITE_URL}/uk${pagePath}`,
    en: `${SITE_URL}/en${pagePath}`,
    ru: `${SITE_URL}/ru${pagePath}`,
    es: `${SITE_URL}/es${pagePath}`,
    de: `${SITE_URL}/de${pagePath}`,
    "x-default": `${SITE_URL}/en${pagePath}`,
  }

  // OG site name per language
  const ogSiteName =
    lang === "uk"
      ? "Code Architect — Веб-розробка та розробка ПЗ"
      : lang === "ru"
        ? "Code Architect — Веб-разработка и разработка ПО"
        : lang === "es"
          ? "Code Architect — Desarrollo Web y Software"
          : lang === "de"
            ? "Code Architect — Webentwicklung & Softwareentwicklung"
            : "Code Architect — Web & Software Development"

  // OG image (shared across all pages)
  const ogImage = {
    url: `${SITE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: ogSiteName,
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: getKeywords(lang, page),
    icons: {
      icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
      apple: { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    },
    authors: [
      { name: "Alexander", url: SITE_URL },
      { name: "Code Architect", url: SITE_URL },
    ],
    creator: "Code Architect",
    publisher: "Code Architect",
    category: "technology",
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
      siteName: ogSiteName,
      locale: langCode,
      type: "website",
      alternateLocale: ["uk-UA", "en-US", "ru-RU", "es-ES", "de-DE"].filter(
        (l) => l !== langCode
      ),
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
    other: {
      // Geographic targeting — Ukraine + Europe
      "geo.region": "UA",
      "geo.placename": "Ukraine",
      // Business type signal for Google
      "og:type": "website",
      // Additional domains signal
      "al:web:url": SITE_URL,
    },
  }
}

// ─────────────────────────────────────────────
// KEYWORDS — per language, per page
// Full coverage: UA / EN / RU / ES / DE
// B2B commercial intent, international market
// ─────────────────────────────────────────────

function getKeywords(lang: Language, page: string): string[] {
  const keywords: Record<Language, Record<string, string[]>> = {
    // ── UKRAINIAN ────────────────────────────
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

    // ── ENGLISH ──────────────────────────────
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

    // ── RUSSIAN ───────────────────────────────
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

    // ── SPANISH ───────────────────────────────
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

    // ── GERMAN ────────────────────────────────
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
        "Software Entwicklung Deutschland",
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

// ─────────────────────────────────────────────
// STRUCTURED DATA — JSON-LD SCHEMAS
// ─────────────────────────────────────────────

export function generateOrganizationSchema(lang: Language) {
  const description = translations[lang].seo.home.description

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
    // Services offered
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
    // Team
    employee: [
      {
        "@type": "Person",
        name: "Alexander",
        jobTitle:
          lang === "uk"
            ? "Головний розробник / Project Manager"
            : lang === "ru"
              ? "Главный разработчик / Project Manager"
              : lang === "es"
                ? "Desarrollador principal / Project Manager"
                : lang === "de"
                  ? "Hauptentwickler / Project Manager"
                  : "Lead Developer / Project Manager",
      },
      {
        "@type": "Person",
        name: "Evgeny",
        jobTitle:
          lang === "uk"
            ? "SEO-спеціаліст / Маркетолог"
            : lang === "ru"
              ? "SEO-специалист / Маркетолог"
              : lang === "es"
                ? "Especialista SEO / Marketing Strategist"
                : lang === "de"
                  ? "SEO-Spezialist / Marketing-Stratege"
                  : "SEO Specialist / Marketing Strategist",
      },
      {
        "@type": "Person",
        name: "Egor",
        jobTitle: "Junior Fullstack Developer",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English", "Russian", "Spanish", "German"],
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
  const jobTitle =
    lang === "uk"
      ? "Головний розробник — Code Architect"
      : lang === "ru"
        ? "Главный разработчик — Code Architect"
        : lang === "es"
          ? "Desarrollador principal — Code Architect"
          : lang === "de"
            ? "Hauptentwickler — Code Architect"
            : "Lead Developer — Code Architect"

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#lead-developer`,
    name: "Alexander",
    jobTitle,
    url: SITE_URL,
    worksFor: {
      "@type": "Organization",
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

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      lang === "uk"
        ? "Послуги веб-розробки та автоматизації"
        : lang === "ru"
          ? "Услуги веб-разработки и автоматизации"
          : lang === "es"
            ? "Servicios de Desarrollo Web y Automatización"
            : lang === "de"
              ? "Webentwicklung & Automatisierungsleistungen"
              : "Web Development & Automation Services",
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
      // Additional services (schema-only, no separate page yet)
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name:
            lang === "uk" ? "Розробка програмного забезпечення"
            : lang === "ru" ? "Разработка программного обеспечения"
            : lang === "es" ? "Desarrollo de Software a Medida"
            : lang === "de" ? "Individuelle Softwareentwicklung"
            : "Custom Software Development",
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
          name:
            lang === "uk" ? "UI/UX Дизайн"
            : lang === "ru" ? "UI/UX Дизайн"
            : lang === "de" ? "UI/UX Design"
            : "UI/UX Design",
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
          name:
            lang === "uk" ? "SaaS Розробка"
            : lang === "ru" ? "SaaS Разработка"
            : lang === "de" ? "SaaS Entwicklung"
            : lang === "es" ? "Desarrollo SaaS"
            : "SaaS Development",
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
  const homeName =
    lang === "uk"
      ? "Головна"
      : lang === "ru"
        ? "Главная"
        : lang === "es"
          ? "Inicio"
          : lang === "de"
            ? "Startseite"
            : "Home"

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: homeName,
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
  const name =
    lang === "uk"
      ? "Code Architect — Веб-розробка та розробка ПЗ"
      : lang === "ru"
        ? "Code Architect — Веб-разработка и разработка ПО"
        : lang === "es"
          ? "Code Architect — Desarrollo Web y Software"
          : lang === "de"
            ? "Code Architect — Webentwicklung & Softwareentwicklung"
            : "Code Architect — Web & Software Development"

  const inLanguage =
    lang === "uk" ? "uk-UA"
    : lang === "ru" ? "ru-RU"
    : lang === "es" ? "es-ES"
    : lang === "de" ? "de-DE"
    : "en-US"

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name,
    url: SITE_URL,
    inLanguage,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}
