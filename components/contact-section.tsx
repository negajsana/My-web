"use client"

import type { TranslationKey } from "@/lib/translations"
import { ArrowUpRight, Phone, Send, MessageCircle } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ContactSectionProps {
  t: TranslationKey
}

const contacts = [
  {
    key: "telegram",
    label: "Telegram",
    handle: "@code_architect_pm",
    href: "https://t.me/code_architect_pm",
    icon: Send,
    primary: true,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    handle: "+49 151 5473 0846",
    href: "https://wa.me/4915154730846",
    icon: MessageCircle,
    primary: false,
  },
  {
    key: "phone",
    label: "Phone",
    handle: "+49 151 5473 0846",
    href: "tel:+4915154730846",
    icon: Phone,
    primary: false,
  },
]

export function ContactSection({ t }: ContactSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section id="contact" className="py-32 lg:py-40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-3xl mx-auto text-center">

          {/* Header */}
          <div ref={titleRef}>
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
              style={{ transitionDelay: "150ms" }}
            >
              {t.contact.letsTalk}
            </h2>

            <p
              className={`text-muted-foreground text-lg mt-6 leading-relaxed transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {t.contact.subtitle}
            </p>

            <div
              className={`h-px w-16 bg-primary/40 mx-auto mt-8 mb-16 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "500ms" }}
            />
          </div>

          {/* Contact buttons */}
          <div
            ref={contentRef}
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {contacts.map((contact, i) => {
              const Icon = contact.icon
              return (
                <a
                  key={contact.key}
                  href={contact.href}
                  target={contact.key !== "phone" ? "_blank" : undefined}
                  rel={contact.key !== "phone" ? "noopener noreferrer" : undefined}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`group inline-flex items-center gap-3 px-7 py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 ${
                    contact.primary
                      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_rgba(180,150,80,0.25)] hover:brightness-110"
                      : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{contact.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )
            })}
          </div>

          {/* Response note */}
          <p
            className={`text-muted-foreground/60 text-xs uppercase tracking-widest mt-12 transition-all duration-700 ${
              contentVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            ↳ {t.contact.subtitle}
          </p>

        </div>
      </div>
    </section>
  )
}
