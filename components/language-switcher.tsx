"use client"

import { Button } from "@/components/ui/button"
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

  return (
    <div className="flex items-center gap-1 border border-border rounded-md p-1">
      <Button
        variant={currentLang === "uk" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLanguage("uk")}
        className="h-7 px-2 text-xs"
      >
        UA
      </Button>
      <Button
        variant={currentLang === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLanguage("ru")}
        className="h-7 px-2 text-xs"
      >
        RU
      </Button>
      <Button
        variant={currentLang === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => switchLanguage("en")}
        className="h-7 px-2 text-xs"
      >
        EN
      </Button>
    </div>
  )
}
