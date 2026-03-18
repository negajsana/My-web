/**
 * JSON-LD structured data component
 * Company: Code Architect | Lead Developer: Alexander
 */
import {
  generateOrganizationSchema,
  generatePersonSchema,
  generateServicesSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
  generatePortfolioSchema,
} from "@/lib/seo"
import type { Language } from "@/lib/translations"

interface JsonLdProps {
  lang: Language
  page: "home" | "about" | "services" | "contact" | "howWeWork" | "projects"
}

// Breadcrumb page names per language
const pageName: Record<string, Record<Language, string>> = {
  about: {
    uk: "Про нас",
    ru: "О нас",
    en: "About Us",
    es: "Sobre Nosotros",
    de: "Über uns",
  },
  services: {
    uk: "Послуги",
    ru: "Услуги",
    en: "Services",
    es: "Servicios",
    de: "Leistungen",
  },
  contact: {
    uk: "Контакти",
    ru: "Контакты",
    en: "Contact",
    es: "Contacto",
    de: "Kontakt",
  },
  "how-we-work": {
    uk: "Як ми працюємо",
    ru: "Как мы работаем",
    en: "How We Work",
    es: "Cómo trabajamos",
    de: "Wie wir arbeiten",
  },
  projects: {
    uk: "Портфоліо",
    ru: "Портфолио",
    en: "Portfolio",
    es: "Portafolio",
    de: "Portfolio",
  },
}

export function JsonLd({ lang, page }: JsonLdProps) {
  const schemas: object[] = []

  // Always include base schemas on every page
  schemas.push(generateOrganizationSchema(lang))
  schemas.push(generateWebsiteSchema(lang))

  switch (page) {
    case "home":
      // Home: person (E-E-A-T signal) + FAQ (SERP rich result opportunity)
      schemas.push(generatePersonSchema(lang))
      schemas.push(generateFAQSchema(lang))
      break

    case "about":
      // About: person schema for E-E-A-T + breadcrumb
      schemas.push(generatePersonSchema(lang))
      schemas.push(
        generateBreadcrumbSchema(lang, "about", pageName.about[lang])
      )
      break

    case "services":
      // Services: full service list schema + breadcrumb
      schemas.push(generateServicesSchema(lang))
      schemas.push(
        generateBreadcrumbSchema(lang, "services", pageName.services[lang])
      )
      break

    case "contact":
      // Contact: breadcrumb only (org schema already covers contactPoint)
      schemas.push(
        generateBreadcrumbSchema(lang, "contact", pageName.contact[lang])
      )
      break

    case "howWeWork":
      schemas.push(
        generateBreadcrumbSchema(lang, "how-we-work", pageName["how-we-work"][lang])
      )
      break

    case "projects":
      // Projects: portfolio ItemList schema for rich results + breadcrumb
      schemas.push(generatePortfolioSchema(lang))
      schemas.push(
        generateBreadcrumbSchema(lang, "projects", pageName.projects[lang])
      )
      break
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
