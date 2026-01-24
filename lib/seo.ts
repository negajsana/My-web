import type { Metadata } from "next"
import { translations, type Language } from "./translations"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oleksandr.dev"

export function generatePageMetadata(
  lang: Language,
  page: "home" | "about" | "services" | "contact"
): Metadata {
  const t = translations[lang]
  const seo = t.seo[page]
  
  const langCode = lang === "uk" ? "uk-UA" : lang === "en" ? "en-US" : "ru-RU"
  const pagePath = page === "home" ? "" : `/${page}`
  const canonicalUrl = `${SITE_URL}/${lang}${pagePath}`
  
  const alternateLanguages: Record<string, string> = {
    "uk": `${SITE_URL}/uk${pagePath}`,
    "en": `${SITE_URL}/en${pagePath}`,
    "ru": `${SITE_URL}/ru${pagePath}`,
    "x-default": `${SITE_URL}/uk${pagePath}`,
  }

  return {
    title: seo.title,
    description: seo.description,
    keywords: getKeywords(lang, page),
    authors: [{ name: "Oleksandr", url: SITE_URL }],
    creator: "Oleksandr",
    publisher: "Oleksandr",
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
      siteName: lang === "uk" ? "Олександр — Веб-розробник" : lang === "en" ? "Oleksandr — Web Developer" : "Александр — Веб-разработчик",
      locale: langCode,
      type: "website",
      alternateLocale: ["uk-UA", "en-US", "ru-RU"].filter(l => l !== langCode),
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
      contact: [
        "замовити розробку сайту",
        "консультація веб-розробника",
        "зв'язатися з розробником",
        "безкоштовна консультація сайт",
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
      contact: [
        "order website development",
        "web developer consultation",
        "contact developer",
        "free consultation website",
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
      contact: [
        "заказать разработку сайта",
        "консультация веб-разработчика",
        "связаться с разработчиком",
      ],
    },
  }

  return keywords[lang][page] || []
}

// Schema.org structured data generators
export function generateOrganizationSchema(lang: Language) {
  const name = lang === "uk" ? "Олександр — Веб-розробник" : lang === "en" ? "Oleksandr — Web Developer" : "Александр — Веб-разработчик"
  const description = translations[lang].seo.home.description

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "English", "Russian"],
    },
    sameAs: [
      "https://t.me/oleksandr_dev",
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
  const name = lang === "uk" ? "Олександр" : lang === "en" ? "Oleksandr" : "Александр"
  const jobTitle = lang === "uk" ? "Full-Stack Веб-розробник" : lang === "en" ? "Full-Stack Web Developer" : "Full-Stack Веб-разработчик"

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url: SITE_URL,
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
    worksFor: {
      "@type": "Organization",
      name: lang === "uk" ? "Фріланс" : lang === "en" ? "Freelance" : "Фриланс",
    },
  }
}

export function generateServicesSchema(lang: Language) {
  const t = translations[lang]
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: t.services.web.title,
        description: t.services.web.description,
        provider: {
          "@type": "Person",
          name: lang === "uk" ? "Олександр" : lang === "en" ? "Oleksandr" : "Александр",
        },
        areaServed: ["Ukraine", "Europe"],
        serviceType: "Web Development",
      },
      {
        "@type": "Service",
        position: 2,
        name: t.services.chatbots.title,
        description: t.services.chatbots.description,
        provider: {
          "@type": "Person",
          name: lang === "uk" ? "Олександр" : lang === "en" ? "Oleksandr" : "Александр",
        },
        areaServed: ["Ukraine", "Europe"],
        serviceType: "Chatbot Development",
      },
      {
        "@type": "Service",
        position: 3,
        name: t.services.automation.title,
        description: t.services.automation.description,
        provider: {
          "@type": "Person",
          name: lang === "uk" ? "Олександр" : lang === "en" ? "Oleksandr" : "Александр",
        },
        areaServed: ["Ukraine", "Europe"],
        serviceType: "Business Automation",
      },
      {
        "@type": "Service",
        position: 4,
        name: t.services.integration.title,
        description: t.services.integration.description,
        provider: {
          "@type": "Person",
          name: lang === "uk" ? "Олександр" : lang === "en" ? "Oleksandr" : "Александр",
        },
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
  const homeName = lang === "uk" ? "Головна" : lang === "en" ? "Home" : "Главная"
  
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
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: lang === "uk" ? "Олександр — Веб-розробник" : lang === "en" ? "Oleksandr — Web Developer" : "Александр — Веб-разработчик",
    url: SITE_URL,
    inLanguage: lang === "uk" ? "uk-UA" : lang === "en" ? "en-US" : "ru-RU",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}
