"use client"

import type { TranslationKey } from "@/lib/translations"
import { Code2, Sparkles, Target } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface AboutSectionProps {
  t: TranslationKey
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function AboutSection({ t }: AboutSectionProps) {
  const { ref, inView } = useInView()

  const cards = [
    { icon: Code2, text: t.about.intro, label: "01" },
    { icon: Sparkles, text: t.about.experience, label: "02" },
    { icon: Target, text: t.about.focus, label: "03" },
  ]

  return (
    <section id="about" className="relative py-32 lg:py-40" ref={ref}>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
              {"// "}about
            </span>
            <div className={`h-px flex-1 bg-border/30 ${inView ? "animate-line-grow" : "opacity-0"}`} />
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tight mb-20 ${
              inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            {t.about.title}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {cards.map((card, i) => {
              const Icon = card.icon
              return (
                <div
                  key={i}
                  className={`group relative p-8 lg:p-10 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 hover:bg-card/60 ${
                    inView ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${200 + i * 150}ms` }}
                >
                  {/* Number label */}
                  <span className="absolute top-6 right-6 text-xs font-mono text-muted-foreground/30">
                    {card.label}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-primary/15 group-hover:border-primary/20">
                    <Icon className="h-5 w-5 text-primary/80" />
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-base">
                    {card.text}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
