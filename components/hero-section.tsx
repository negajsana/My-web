"use client"

import type { TranslationKey } from "@/lib/translations"
import { Button } from "./ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

interface HeroSectionProps {
  t: TranslationKey
  lang: string
}

export function HeroSection({ t, lang }: HeroSectionProps) {
  return (
    <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center justify-center pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground tracking-widest uppercase">{t.hero.greeting}</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-foreground">{t.hero.name}</span>
            </h1>
            <div className="h-1 w-24 bg-primary mx-auto" />
          </div>

          <p className="text-2xl md:text-3xl text-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            {t.hero.title}
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-2">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="group text-base" onClick={() => (window.location.href = `/${lang}/contact`)}>
              {t.hero.cta}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group bg-transparent text-base"
              onClick={() => {
                const el = document.getElementById("projects")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t.hero.viewWork}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
