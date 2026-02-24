"use client"

import type { TranslationKey } from "@/lib/translations"
import { Phone, Send, ArrowUpRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ContactSectionProps {
  t: TranslationKey
}

export function ContactSection({ t }: ContactSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.1 })
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.2 })

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

          {/* Contact Cards */}
          <div
            ref={cardsRef}
            className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-20"
          >
            {/* Phone/WhatsApp Card */}
            <div
              className={`group relative p-8 lg:p-10 border border-border/30 bg-surface/50 transition-all duration-700 hover:border-primary/30 hover:bg-surface-elevated/50 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />

              <Phone className="h-6 w-6 text-primary mb-6" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                {t.contact.phone}
              </h3>
              <p className="text-muted-foreground mb-8 text-sm">+4915154730846</p>

              <div className="flex flex-col gap-3">
                <a
                  href="tel:+4915154730846"
                  className="group/btn flex items-center justify-between px-5 py-3 border border-border/50 text-sm uppercase tracking-widest text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <span>{t.contact.phone}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
                <a
                  href="https://wa.me/4915154730846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-between px-5 py-3 border border-border/50 text-sm uppercase tracking-widest text-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Telegram Card */}
            <div
              className={`group relative p-8 lg:p-10 border border-border/30 bg-surface/50 transition-all duration-700 hover:border-primary/30 hover:bg-surface-elevated/50 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40 transition-all duration-500 group-hover:w-6 group-hover:h-6 group-hover:border-primary/70" />

              <Send className="h-6 w-6 text-primary mb-6" />
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                {t.contact.telegram}
              </h3>
              <p className="text-muted-foreground mb-8 text-sm">@NE_106</p>

              <a
                href="https://t.me/NE_106"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn flex items-center justify-between px-5 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(180,150,80,0.15)]"
              >
                <span>{t.contact.telegram}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </div>
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
      </div>
    </section>
  )
}
