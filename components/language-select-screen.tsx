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

export function LanguageSelectScreen() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    try {
      const chosen = localStorage.getItem(STORAGE_KEY)
      if (!chosen) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const choose = (code: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, code)
      localStorage.setItem("preferred-lang", code)
    } catch {}

    setLeaving(true)
    setTimeout(() => {
      setVisible(false)
      // Navigate to chosen language keeping current path structure
      const segments = pathname.split("/")
      segments[1] = code
      const newPath = segments.join("/") || `/${code}`
      router.push(newPath)
    }, 400)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background transition-all duration-400 ${
        leaving ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ transition: "opacity 0.4s ease, transform 0.4s ease" }}
    >
      {/* Subtle background texture */}
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
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-2xl font-serif tracking-wide text-foreground">
            Code Architect
          </span>
          <span className="text-primary text-3xl leading-none">.</span>
        </div>

        {/* Divider */}
        <div className="h-px w-16 bg-primary/40" />

        {/* Heading */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            Оберіть мову / Choose the language
          </p>
        </div>

        {/* Language buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => choose(lang.code)}
              className="group w-full flex items-center justify-between px-8 py-4 border border-border/40 hover:border-primary/50 bg-transparent hover:bg-primary/5 transition-all duration-300 text-left"
              style={{
                animationDelay: `${index * 60}ms`,
              }}
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
