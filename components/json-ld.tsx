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
  page: "home" | "about" | "services" | "contact" | "howWeWork"
}

export function JsonLd({ lang, page }: JsonLdProps) {
  const schemas = []

  schemas.push(generateOrganizationSchema(lang))
  schemas.push(generateWebsiteSchema(lang))

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
    case "howWeWork":
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "how-we-work",
          lang === "uk" ? "Як ми працюємо" : lang === "en" ? "How We Work" : "Как мы работаем"
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
