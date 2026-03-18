"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const STORAGE_KEY = "ca-lang-selected"

const languages = [
  { code: "uk", native: "Українська", label: "UA" },
  { code: "ru", native: "Русский", label: "RU" },
  { code: "en", native: "English", label: "EN" },
  { code: "es", native: "Español", label: "ES" },
  { code: "de", native: "Deutsch", label: "DE" },
]

const supportedCodes = languages.map((l) => l.code)

function detectBrowserLang(): string | null {
  if (typeof navigator === "undefined") return null

  const preferred = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean)

  for (const locale of preferred) {
    const base = locale.toLowerCase().split("-")[0]

    if (supportedCodes.includes(base)) return base

    if (["be", "kk", "ky"].includes(base)) return "ru"
    if (["ca", "gl", "pt"].includes(base)) return "es"
    if (["fr", "it", "nl", "pl", "cs", "sv", "da", "fi", "no"].includes(base)) return "en"
  }

  return null
}

export function LanguageSelectScreen() {
  const [showPicker, setShowPicker] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Не трогаем служебные страницы
    if (pathname.startsWith("/stats-")) return

    // 1. Previously saved choice -> redirect silently, no screen shown
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && supportedCodes.includes(saved)) {
        applyLang(saved, false)
        return
      }
    } catch {}

    // 2. Detect from browser -> redirect silently, no screen shown
    const detected = detectBrowserLang()
    if (detected) {
      try {
        localStorage.setItem(STORAGE_KEY, detected)
        localStorage.setItem("preferred-lang", detected)
      } catch {}
      applyLang(detected, false)
      return
    }

    // 3. Unknown language -> show manual picker
    setShowPicker(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function applyLang(code: string, animate: boolean) {
    const currentLang = pathname.split("/")[1]
    if (currentLang === code) return

    if (animate) {
      setLeaving(true)
      setTimeout(() => {
        setShowPicker(false)
        pushRoute(code)
      }, 380)
    } else {
      pushRoute(code)
    }
  }

  function pushRoute(code: string) {
    const segments = pathname.split("/")
    segments[1] = code
    router.replace(segments.join("/") || `/${code}`)
  }

  const choose = (code: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, code)
      localStorage.setItem("preferred-lang", code)
    } catch {}
    applyLang(code, true)
  }

  if (!showPicker) return null

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background ${
        leaving ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ transition: "opacity 0.38s ease, transform 0.38s ease" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/20 to-background" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 px-6">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-serif tracking-wide text-foreground">
            Code Architect
          </span>
          <span className="text-primary text-3xl leading-none">.</span>
        </div>

        <div className="h-px w-16 bg-primary/40" />

        <p className="text-xs uppercase tracking-[0.4em] text-primary text-center">
          Оберіть мову / Choose the language
        </p>

        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => choose(lang.code)}
              className="group w-full flex items-center justify-between px-8 py-4 border border-border/40 hover:border-primary/50 bg-transparent hover:bg-primary/5 transition-all duration-300 text-left"
            >
              <span className="text-base font-serif text-foreground group-hover:text-primary transition-colors duration-300">
                {lang.native}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {lang.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
