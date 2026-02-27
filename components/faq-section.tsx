"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { TranslationKey } from "@/lib/translations"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface FAQSectionProps {
  t: TranslationKey
}

/**
 * FAQSection component
 * Company: Code Architect | Lead Developer: Alexander
 */
export function FAQSection({ t }: FAQSectionProps) {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.05 })

  // Determine FAQ heading by language using nav key
  const title =
    t.nav.home === "Головна"
      ? "Часті запитання"
      : t.nav.home === "Home"
        ? "Frequently Asked Questions"
        : t.nav.home === "Inicio"
          ? "Preguntas frecuentes"
          : t.nav.home === "Startseite"
            ? "Häufig gestellte Fragen"
            : "Часто задаваемые вопросы"

  return (
    <section className="py-32 lg:py-40 relative" id="faq">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16">
            <span
              className={`text-xs uppercase tracking-[0.4em] text-primary mb-4 block transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              FAQ
            </span>
            <h2
              className={`text-4xl md:text-5xl font-serif font-bold text-foreground text-balance transition-all duration-700 ${
                titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {title}
            </h2>
            <div
              className={`h-px w-16 bg-primary/50 mx-auto mt-8 transition-all duration-1000 ${
                titleVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            />
          </div>

          {/* Accordion */}
          <div
            ref={contentRef}
            className={`transition-all duration-700 ${
              contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Accordion type="single" collapsible className="w-full">
              {t.faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border/30 py-2"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5 text-foreground hover:text-primary transition-colors duration-300 group">
                    <span className="flex items-center gap-4">
                      <span className="text-xs text-primary/50 font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-lg font-medium">{item.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 pl-10 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
