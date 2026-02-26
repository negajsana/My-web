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
  page: "home" | "about" | "services" | "contact" | "howWeWork" | "projects"
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
          lang === "uk"
            ? "Про мене"
            : lang === "ru"
              ? "Обо мне"
              : lang === "es"
                ? "Sobre mí"
                : lang === "de"
                  ? "Über mich"
                  : "About"
        )
      )
      break
    case "services":
      schemas.push(generateServicesSchema(lang))
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "services",
          lang === "uk"
            ? "Послуги"
            : lang === "ru"
              ? "Услуги"
              : lang === "es"
                ? "Servicios"
                : lang === "de"
                  ? "Leistungen"
                  : "Services"
        )
      )
      break
    case "contact":
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "contact",
          lang === "uk"
            ? "Контакти"
            : lang === "ru"
              ? "Контакты"
              : lang === "es"
                ? "Contacto"
                : lang === "de"
                  ? "Kontakt"
                  : "Contact"
        )
      )
      break
    case "howWeWork":
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "how-we-work",
          lang === "uk"
            ? "Як ми працюємо"
            : lang === "ru"
              ? "Как мы работаем"
              : lang === "es"
                ? "Cómo trabajamos"
                : lang === "de"
                  ? "Wie wir arbeiten"
                  : "How We Work"
        )
      )
      break
    case "projects":
      schemas.push(
        generateBreadcrumbSchema(
          lang,
          "projects",
          lang === "uk"
            ? "Портфоліо"
            : lang === "ru"
              ? "Портфолио"
              : lang === "es"
                ? "Portafolio"
                : lang === "de"
                  ? "Portfolio"
                  : "Portfolio"
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
