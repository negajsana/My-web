import {
  generateOrganizationSchema,
  generatePersonSchema,
  generateServicesSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
} from "@/lib/seo"
import type { Language } from "@/lib/translations"

interface JsonLdProps {
  lang: Language
  page: "home" | "about" | "services" | "contact"
}

export function JsonLd({ lang, page }: JsonLdProps) {
  const schemas = []

  // Always include organization and website schema
  schemas.push(generateOrganizationSchema(lang))
  schemas.push(generateWebsiteSchema(lang))

  // Page-specific schemas
  switch (page) {
    case "home":
      schemas.push(generatePersonSchema(lang))
      schemas.push(generateFAQSchema(lang))
      break
    case "about":
      schemas.push(generatePersonSchema(lang))
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "about",
          lang === "uk" ? "Про мене" : lang === "en" ? "About" : "Обо мне"
        )
      )
      break
    case "services":
      schemas.push(generateServicesSchema(lang))
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "services",
          lang === "uk" ? "Послуги" : lang === "en" ? "Services" : "Услуги"
        )
      )
      break
    case "contact":
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "contact",
          lang === "uk" ? "Контакти" : lang === "en" ? "Contact" : "Контакты"
        )
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
