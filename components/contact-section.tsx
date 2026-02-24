"use client"

import type { TranslationKey } from "@/lib/translations"
import { Phone, Send, ArrowUpRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface ContactSectionProps {
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

export function ContactSection({ t }: ContactSectionProps) {
  const { ref, inView } = useInView()

  return (
    <section id="contact" className="relative py-32 lg:py-40" ref={ref}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
              {"// "}contact
            </span>
            <div className={`h-px flex-1 bg-border/30 ${inView ? "animate-line-grow" : "opacity-0"}`} />
          </div>

          <h2
            className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 ${
              inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            {t.contact.title}
          </h2>

          <p
            className={`text-lg text-muted-foreground leading-relaxed mb-16 max-w-2xl ${
              inView ? "animate-fade-up delay-100" : "opacity-0"
            }`}
          >
            {t.contact.subtitle}
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {/* Phone / WhatsApp */}
            <div
              className={`group p-8 lg:p-10 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:bg-card/50 ${
                inView ? "animate-fade-up delay-200" : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-8">
                <Phone className="h-6 w-6 text-primary/80" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{t.contact.phone}</h3>
              <p className="text-muted-foreground text-sm mb-8 font-mono">+4915154730846</p>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+4915154730846"
                  className="flex items-center justify-between px-5 py-3 rounded-xl border border-border/40 text-sm text-foreground/80 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-primary/60" />
                    {t.contact.phone}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                </a>
                <a
                  href="https://wa.me/4915154730846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-3 rounded-xl border border-border/40 text-sm text-foreground/80 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <Send className="h-4 w-4 text-primary/60" />
                    WhatsApp
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                </a>
              </div>
            </div>

            {/* Telegram */}
            <div
              className={`group p-8 lg:p-10 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all duration-500 hover:border-primary/25 hover:bg-card/50 ${
                inView ? "animate-fade-up delay-300" : "opacity-0"
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-8">
                <Send className="h-6 w-6 text-primary/80" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{t.contact.telegram}</h3>
              <p className="text-muted-foreground text-sm mb-8 font-mono">@NE_106</p>

              <a
                href="https://t.me/NE_106"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                {t.contact.telegram}
              </a>
            </div>
          </div>

          {/* CTA Banner */}
          <div
            className={`relative overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.03] p-10 lg:p-14 text-center ${
              inView ? "animate-fade-up delay-400" : "opacity-0"
            }`}
          >
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <p className="text-xl md:text-2xl font-semibold mb-8 text-foreground/90">
              {t.contact.letsTalk}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://t.me/NE_106"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02]"
              >
                Telegram
              </a>
              <a
                href="https://wa.me/4915154730846"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border/50 text-foreground/80 font-medium rounded-xl transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:bg-primary/5"
              >
                WhatsApp
              </a>
              <a
                href="tel:+4915154730846"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border/50 text-foreground/80 font-medium rounded-xl transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:bg-primary/5"
              >
                {t.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
