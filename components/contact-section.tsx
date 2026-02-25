"use client"

import type { TranslationKey } from "@/lib/translations"
import { ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ContactSectionProps {
  t: TranslationKey
}

export function ContactSection({ t }: ContactSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()

  return (
    <section id="contact" className="py-32 lg:py-40 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-20">
            <span
              className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {t.contact.title}
            </span>
            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground text-balance transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {t.contact.title}
            </h2>
            <p
              className={`text-muted-foreground text-lg mt-6 max-w-xl mx-auto leading-relaxed transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {t.contact.subtitle}
            </p>
            <div
              className={`h-px w-16 bg-primary/50 mx-auto mt-8 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "600ms" }}
            />
          </div>

          {/* Bottom CTA */}
          <div className="relative p-12 lg:p-16 border border-primary/20 bg-primary/5">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/40" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/40" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />

            <p className="text-2xl font-serif font-semibold text-foreground mb-8">
              {t.contact.letsTalk}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://t.me/NE_106"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(180,150,80,0.2)]"
              >
                Telegram
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/4915154730846"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+4915154730846"
                className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                {t.contact.phone}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
