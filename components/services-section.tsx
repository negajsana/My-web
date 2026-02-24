"use client"

import type { TranslationKey } from "@/lib/translations"
import { Globe, MessageSquare, Zap, Link2, ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ServicesSectionProps {
  t: TranslationKey
}

function useInView(threshold = 0.15) {
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

export function ServicesSection({ t }: ServicesSectionProps) {
  const { ref, inView } = useInView()

  const services = [
    { icon: Globe, title: t.services.web.title, description: t.services.web.description },
    { icon: MessageSquare, title: t.services.chatbots.title, description: t.services.chatbots.description },
    { icon: Zap, title: t.services.automation.title, description: t.services.automation.description },
    { icon: Link2, title: t.services.integration.title, description: t.services.integration.description },
  ]

  return (
    <section id="services" className="relative py-32 lg:py-40" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
              {"// "}services
            </span>
            <div className={`h-px flex-1 bg-border/30 ${inView ? "animate-line-grow" : "opacity-0"}`} />
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tight mb-8 ${
              inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            {t.services.title}
          </h2>

          <div className="h-px w-20 bg-primary/30 mb-20" />

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <div
                  key={i}
                  className={`group relative p-8 lg:p-10 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:bg-card/50 ${
                    inView ? "animate-fade-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary/15 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/5">
                        <Icon className="h-6 w-6 text-primary/80" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground/20 transition-all duration-300 group-hover:text-primary/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <h3 className="text-xl font-semibold mb-4 text-foreground/90 group-hover:text-foreground transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
