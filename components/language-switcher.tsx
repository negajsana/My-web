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

  const languages = [
    { code: "uk", label: "UA" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "de", label: "DE" },
  ]

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => switchLanguage(lang.code)}
            className={`text-xs tracking-[0.15em] uppercase px-2 py-1 transition-all duration-300 ${
              currentLang === lang.code
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-border text-xs">/</span>
          )}
        </span>
      ))}
    </div>
  )
}
