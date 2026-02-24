"use client"

import React from "react"

import type { TranslationKey } from "@/lib/translations"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useEffect, useRef } from "react"

interface HeroSectionProps {
  t: TranslationKey
  lang: string
}

export function HeroSection({ t, lang }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      containerRef.current.style.setProperty("--mouse-x", `${x}%`)
      containerRef.current.style.setProperty("--mouse-y", `${y}%`)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      {/* Animated background orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, oklch(0.78 0.12 75 / 0.08), transparent 70%)",
          left: "var(--mouse-x, 50%)",
          top: "var(--mouse-y, 50%)",
          transform: "translate(-50%, -50%)",
          transition: "left 1.5s ease-out, top 1.5s ease-out",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full animate-float opacity-20"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.08 40 / 0.15), transparent 70%)",
          right: "10%",
          top: "20%",
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.95 0.01 80 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.95 0.01 80 / 0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium tracking-widest uppercase mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t.hero.greeting}
            </span>
          </div>

          {/* Name */}
          <h1 className="animate-fade-up delay-100 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none mb-8">
            <span className="text-gradient">{t.hero.name}</span>
          </h1>

          {/* Decorative line */}
          <div className="animate-line-grow delay-300 h-px w-32 bg-primary/40 mb-10" />

          {/* Title */}
          <p className="animate-fade-up delay-300 text-xl sm:text-2xl md:text-3xl text-foreground/90 max-w-3xl leading-relaxed font-light tracking-tight text-balance mb-6">
            {t.hero.title}
          </p>

          {/* Description */}
          <p className="animate-fade-up delay-400 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12">
            {t.hero.description}
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => (window.location.href = `/${lang}/contact`)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              {t.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("projects")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-border/50 text-foreground/80 font-medium rounded-xl transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:bg-primary/5"
            >
              {t.hero.viewWork}
              <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-[-2px]" />
            </button>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-700 mt-20 pt-10 border-t border-border/20 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient">2+</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {lang === "uk" ? "Роки досвіду" : lang === "ru" ? "Года опыта" : "Years exp."}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient">15+</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {lang === "uk" ? "Проєктів" : lang === "ru" ? "Проектов" : "Projects"}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-gradient">100%</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {lang === "uk" ? "Задоволених" : lang === "ru" ? "Довольных" : "Satisfied"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
