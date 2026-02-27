"use client"

import type { TranslationKey } from "@/lib/translations"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroSectionProps {
  t: TranslationKey
  lang: string
}

export function HeroSection({ t, lang }: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.4
  const textOpacity = Math.max(0, 1 - scrollY / 600)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src="/hero-abstract.jpg"
          alt=""
          className="w-full h-[120%] object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${5 + i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Content
          Отступы по breakpoints:
          - mobile (base):  pt-20 pb-24  — достаточно для nav (~64px) + scroll indicator (~80px)
          - sm (640px+):    pt-24 pb-24
          - lg (1024px+):   pt-28 pb-24
          Это гарантирует, что greeting не залезает под nav на любом экране.
      */}
      <div
        className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 sm:pt-24 lg:pt-28 pb-24"
        style={{ opacity: textOpacity }}
      >
        <div className="max-w-5xl mx-auto text-center">

          {/* Greeting Line */}
          <div
            className={`overflow-hidden mb-4 sm:mb-6 transition-all duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.4em] text-primary">
              {t.hero.greeting}
            </p>
          </div>

          {/* Main Name
              Размеры шрифта по breakpoints:
              - base (320–639px):  text-4xl (36px)  — «Code Architect» в одну строку на узких экранах
              - sm   (640–767px):  text-5xl (48px)
              - md   (768–1023px): text-7xl (72px)
              - lg   (1024px+):    text-[7rem] (112px) — помещается в одну строку на десктопе
              leading-tight вместо leading-[0.95] — корректный межстрочный при переносе
          */}
          <div className="overflow-hidden mb-6 sm:mb-8">
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-serif font-bold leading-tight tracking-tight transition-all duration-1000 ${
                loaded ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <span className="gold-shimmer">{t.hero.name}</span>
            </h1>
          </div>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-4 mb-6 sm:mb-10">
            <div
              className={`h-px bg-primary/40 transition-all duration-1000 ease-out ${
                loaded ? "w-12 md:w-24" : "w-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            />
            <div
              className={`w-2 h-2 rotate-45 border border-primary/60 transition-all duration-500 ${
                loaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            />
            <div
              className={`h-px bg-primary/40 transition-all duration-1000 ease-out ${
                loaded ? "w-12 md:w-24" : "w-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            />
          </div>

          {/* Subtitle
              - mobile: text-lg  (меньше, чтобы длинные тексты не переполняли экран)
              - md+:    text-2xl
              - lg+:    text-3xl
              mb уменьшен на мобильном: mb-4 → sm:mb-6
          */}
          <p
            className={`text-lg md:text-2xl lg:text-3xl font-serif text-foreground/90 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 text-balance transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            {t.hero.title}
          </p>

          {/* Description
              mb-8 на mobile вместо mb-14 — освобождает место для кнопок,
              чтобы они не уходили за экран или не перекрывались со Scroll indicator
          */}
          <p
            className={`text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 md:mb-14 text-pretty transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1300ms" }}
          >
            {t.hero.description}
          </p>

          {/* CTA Buttons
              На mobile: flex-col (кнопки стопкой), на sm+: flex-row (в ряд)
              w-full на mobile чтобы кнопки не были слишком узкими
          */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center transition-all duration-1000 ${
              loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1500ms" }}
          >
            <button
              onClick={() => (window.location.href = `/${lang}/contact`)}
              className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(180,150,80,0.2)] w-full sm:w-auto"
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("projects")
                el?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 border border-border text-foreground font-medium tracking-wide uppercase text-sm transition-all duration-500 hover:border-primary/50 hover:text-primary w-full sm:w-auto"
            >
              <span>{t.hero.viewWork}</span>
              <span className="w-5 h-5 flex items-center justify-center border border-current rounded-full transition-all duration-300 group-hover:border-primary">
                <ArrowRight className="h-3 w-3" />
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator
          bottom-6 на mobile (вместо bottom-10) — чтобы не выходил за экран
          на sm+ возвращается bottom-10
      */}
      <div
        className={`absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "2000ms" }}
      >
        <button
          onClick={() => {
            const el = document.getElementById("about")
            el?.scrollIntoView({ behavior: "smooth" })
          }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  )
}
