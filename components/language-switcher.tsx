"use client"

import { usePathname, useRouter } from "next/navigation"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = pathname.split("/")[1] || "uk"

  const switchLanguage = (lang: string) => {
    const segments = pathname.split("/")
    segments[1] = lang
    router.push(segments.join("/") || `/${lang}`)
  }

  const langs = [
    { code: "uk", label: "UA" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
  ]

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-lg border border-border/30 bg-secondary/30">
      {langs.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => switchLanguage(lang.code)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
            currentLang === lang.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
