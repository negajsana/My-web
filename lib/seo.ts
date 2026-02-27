import type { Metadata } from "next"
import { translations, type Language } from "./translations"

// Company name: Code Architect | Lead Developer: Alexander
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://codearchitect.dev"

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
  const pagePath = page === "home" ? "" : `/${page === "howWeWork" ? "how-we-work" : page}`
  const canonicalUrl = `${SITE_URL}/${lang}${pagePath}`

  const alternateLanguages: Record<string, string> = {
    uk: `${SITE_URL}/uk${pagePath}`,
    en: `${SITE_URL}/en${pagePath}`,
    ru: `${SITE_URL}/ru${pagePath}`,
    es: `${SITE_URL}/es${pagePath}`,
    de: `${SITE_URL}/de${pagePath}`,
    "x-default": `${SITE_URL}/uk${pagePath}`,
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: getKeywords(lang, page),
    // Lead Developer: Alexander | Company: Code Architect
    authors: [{ name: "Alexander", url: SITE_URL }],
    creator: "Code Architect",
    publisher: "Code Architect",
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
      // Open Graph siteName — всі мови: Code Architect
      siteName:
        lang === "uk"
          ? "Code Architect — Веб-розробка"
          : lang === "ru"
            ? "Code Architect — Веб-разработка"
            : lang === "es"
              ? "Code Architect — Desarrollo Web"
              : lang === "de"
                ? "Code Architect — Webentwicklung"
                : "Code Architect — Web Development",
      locale: langCode,
      type: "website",
      alternateLocale: ["uk-UA", "en-US", "ru-RU", "es-ES", "de-DE"].filter(
        l => l !== langCode
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
    other: {
      "geo.region": "UA",
      "geo.placename": "Ukraine",
    },
  }
}

function getKeywords(lang: Language, page: string): string[] {
  const keywords: Record<Language, Record<string, string[]>> = {
    uk: {
      home: [
        "розробка сайтів україна",
        "створення веб-сайту",
        "замовити сайт",
        "веб-розробник україна",
        "розробка чат-ботів",
        "telegram бот розробка",
        "автоматизація бізнесу",
        "full-stack розробник",
        "створення лендінгу",
        "веб-додаток на замовлення",
      ],
      about: [
        "full-stack розробник україна",
        "веб-розробник досвід",
        "react next.js розробник",
        "node.js python розробник",
        "портфоліо веб-розробника",
      ],
      services: [
        "послуги веб-розробки",
        "розробка telegram бота ціна",
        "створення сайту ціна",
        "автоматизація процесів",
        "інтеграція api crm",
        "розробка веб-додатків",
      ],
      projects: [
        "портфоліо веб-розробника",
        "приклади робіт",
        "реалізовані проєкти сайтів",
        "кейси веб-розробки",
      ],
      contact: [
        "замовити розробку сайту",
        "консультація веб-розробника",
        "зв'язатися з розробником",
        "безкоштовна консультація сайт",
      ],
      howWeWork: [
        "процес розробки сайту",
        "як замовити сайт",
        "етапи розробки",
        "співпраця з веб-розробником",
        "скільки часу розробка сайту",
      ],
    },
    en: {
      home: [
        "web development europe",
        "website development services",
        "order website",
        "web developer europe",
        "chatbot development",
        "telegram bot development",
        "business automation",
        "full-stack developer",
        "landing page development",
        "custom web application",
      ],
      about: [
        "full-stack developer europe",
        "web developer experience",
        "react next.js developer",
        "node.js python developer",
        "web developer portfolio",
      ],
      services: [
        "web development services",
        "telegram bot development price",
        "website development cost",
        "process automation",
        "api crm integration",
        "web application development",
      ],
      projects: [
        "web developer portfolio",
        "case studies websites",
        "delivered web projects",
        "next.js portfolio projects",
      ],
      contact: [
        "order website development",
        "web developer consultation",
        "contact developer",
        "free consultation website",
      ],
      howWeWork: [
        "web development process",
        "how to order a website",
        "development stages",
        "working with web developer",
        "website development timeline",
      ],
    },
    ru: {
      home: [
        "разработка сайтов",
        "создание веб-сайта",
        "заказать сайт",
        "веб-разработчик",
        "разработка чат-ботов",
        "telegram бот разработка",
        "автоматизация бизнеса",
        "full-stack разработчик",
      ],
      about: [
        "full-stack разработчик",
        "веб-разработчик опыт",
        "react next.js разработчик",
        "портфолио веб-разработчика",
      ],
      services: [
        "услуги веб-разработки",
        "разработка telegram бота цена",
        "создание сайта цена",
        "автоматизация процессов",
      ],
      projects: [
        "портфолио веб-разработчика",
        "примеры работ сайтов",
        "реализованные проекты",
        "кейсы веб-разработки",
      ],
      contact: [
        "заказать разработку сайта",
        "консультация веб-разработчика",
        "связаться с разработчиком",
      ],
      howWeWork: [
        "процесс разработки сайта",
        "как заказать сайт",
        "этапы разработки",
        "сотрудничество с веб-разработчиком",
        "сроки разработки сайта",
      ],
    },
    es: {
      home: [
        "desarrollo web europa",
        "servicios de desarrollo web",
        "encargar sitio web",
        "desarrollador web freelance",
        "desarrollo de chatbots",
        "desarrollo bot telegram",
        "automatización de negocios",
        "desarrollador full-stack",
        "landing page a medida",
        "aplicación web personalizada",
      ],
      about: [
        "desarrollador full-stack europa",
        "experiencia desarrollador web",
        "desarrollador react next.js",
        "desarrollador node.js python",
        "portafolio desarrollador web",
      ],
      services: [
        "servicios de desarrollo web",
        "precio desarrollo bot telegram",
        "precio creación de página web",
        "automatización de procesos",
        "integración api crm",
        "desarrollo de aplicaciones web",
      ],
      projects: [
        "portafolio desarrollador web",
        "casos de éxito sitios web",
        "proyectos web realizados",
        "proyectos portfolio next.js",
      ],
      contact: [
        "encargar desarrollo web",
        "consultoría desarrollador web",
        "contactar desarrollador",
        "consultoría web gratuita",
      ],
      howWeWork: [
        "proceso de desarrollo web",
        "cómo encargar una página web",
        "etapas del desarrollo web",
        "trabajar con un desarrollador web",
        "plazos desarrollo de sitio",
      ],
    },
    de: {
      home: [
        "webentwicklung europa",
        "webseiten entwicklung dienstleistungen",
        "website erstellen lassen",
        "freelance webentwickler",
        "chatbot entwicklung",
        "telegram bot entwicklung",
        "geschäftsautomatisierung",
        "full-stack entwickler",
        "landingpage entwicklung",
        "individuelle webanwendung",
      ],
      about: [
        "full-stack entwickler europa",
        "erfahrener webentwickler",
        "react next.js entwickler",
        "node.js python entwickler",
        "webentwickler portfolio",
      ],
      services: [
        "leistungen webentwicklung",
        "telegram bot entwicklung preis",
        "kosten website entwicklung",
        "prozessautomatisierung",
        "api crm integration",
        "webanwendungsentwicklung",
      ],
      projects: [
        "portfolio webentwickler",
        "webseiten referenzen",
        "realisierte webprojekte",
        "next.js portfolio projekte",
      ],
      contact: [
        "website entwicklung beauftragen",
        "beratung webentwickler",
        "webentwickler kontakt",
        "kostenlose webberatung",
      ],
      howWeWork: [
        "ablauf webentwicklung",
        "wie website beauftragen",
        "phasen der webentwicklung",
        "zusammenarbeit mit webentwickler",
        "dauer website entwicklung",
      ],
    },
  }

  return keywords[lang][page] || []
}

export function generateOrganizationSchema(lang: Language) {
  // Organization name: Code Architect (all languages)
  const name = "Code Architect"
  const description = translations[lang].seo.home.description

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description,
    // Lead Developer: Alexander
    employee: {
      "@type": "Person",
      name: "Alexander",
      jobTitle:
        lang === "uk"
          ? "Головний розробник"
          : lang === "ru"
            ? "Главный разработчик"
            : lang === "es"
              ? "Desarrollador principal"
              : lang === "de"
                ? "Hauptentwickler"
                : "Lead Developer",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English", "Russian", "Spanish", "German"],
    },
    sameAs: [
      "https://t.me/NE_106",
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Ukraine",
      },
      {
        "@type": "Continent",
        name: "Europe",
      },
    ],
  }
}

export function generatePersonSchema(lang: Language) {
  // Person schema: Alexander — Lead Developer of Code Architect
  const name = "Alexander"
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
    name,
    jobTitle,
    url: SITE_URL,
    worksFor: {
      "@type": "Organization",
      name: "Code Architect",
    },
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "Telegram Bots",
      "Business Automation",
      "API Integration",
    ],
  }
}

export function generateServicesSchema(lang: Language) {
  const t = translations[lang]

  // Provider: Code Architect (organization); Lead Developer: Alexander
  const providerSchema = {
    "@type": "Organization",
    name: "Code Architect",
    employee: { "@type": "Person", name: "Alexander" },
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: t.services.web.title,
        description: t.services.web.description,
        provider: providerSchema,
        areaServed: ["Ukraine", "Europe"],
        serviceType: "Web Development",
      },
      {
        "@type": "Service",
        position: 2,
        name: t.services.chatbots.title,
        description: t.services.chatbots.description,
        provider: providerSchema,
        areaServed: ["Ukraine", "Europe"],
        serviceType: "Chatbot Development",
      },
      {
        "@type": "Service",
        position: 3,
        name: t.services.automation.title,
        description: t.services.automation.description,
        provider: providerSchema,
        areaServed: ["Ukraine", "Europe"],
        serviceType: "Business Automation",
      },
      {
        "@type": "Service",
        position: 4,
        name: t.services.integration.title,
        description: t.services.integration.description,
        provider: providerSchema,
        areaServed: ["Ukraine", "Europe"],
        serviceType: "API Integration",
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
  // Website name: Code Architect (all languages)
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name:
      lang === "uk"
        ? "Code Architect — Веб-розробка"
        : lang === "ru"
          ? "Code Architect — Веб-разработка"
          : lang === "es"
            ? "Code Architect — Desarrollo Web"
            : lang === "de"
              ? "Code Architect — Webentwicklung"
              : "Code Architect — Web Development",
    url: SITE_URL,
    inLanguage:
      lang === "uk"
        ? "uk-UA"
        : lang === "ru"
          ? "ru-RU"
          : lang === "es"
            ? "es-ES"
            : lang === "de"
              ? "de-DE"
              : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}
