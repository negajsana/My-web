import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://codearchitect.site"

// Only include languages with deployed routes.
// Add "es" | "de" when those routes exist.
const ACTIVE_LANGUAGES = ["en", "uk", "ru"] as const

const PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/how-we-work", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of ACTIVE_LANGUAGES) {
    for (const page of PAGES) {
      const url = `${SITE_URL}/${lang}${page.path}`

      // Build alternates for hreflang in sitemap
      const alternates: Record<string, string> = {}
      for (const l of ACTIVE_LANGUAGES) {
        alternates[l] = `${SITE_URL}/${l}${page.path}`
      }
      alternates["x-default"] = `${SITE_URL}/en${page.path}`

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      })
    }
  }

  return entries
}
