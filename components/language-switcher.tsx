"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = pathname.split("/")[1] || "uk"

  const languages = [
    { code: "uk", label: "UA" },
    { code: "ru", label: "RU" },
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "de", label: "DE" },
  ]

  const current = languages.find((l) => l.code === currentLang) || languages[0]
  const STORAGE_KEY = "ca-lang-selected"

  const switchLanguage = (lang: string) => {
    const segments = pathname.split("/")
    segments[1] = lang
    router.push(segments.join("/") || `/${lang}`)
    setOpen(false)
    // Save language preference
    try {
      localStorage.setItem(STORAGE_KEY, lang)
      localStorage.setItem("preferred-lang", lang)
    } catch {}
  }

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label="Select language"
      >
        <span>{current.label}</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-full mt-2 min-w-[72px] border border-border/40 bg-background/95 backdrop-blur-xl shadow-lg transition-all duration-300 origin-top-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ zIndex: 10000 }}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`w-full text-left px-4 py-2.5 text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
              lang.code === currentLang
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-surface/50"
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}
