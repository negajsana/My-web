"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { TranslationKey } from "@/lib/translations"

interface FAQSectionProps {
  t: TranslationKey
}

export function FAQSection({ t }: FAQSectionProps) {
  const title = t.nav.home === "Головна" 
    ? "Часті запитання" 
    : t.nav.home === "Home" 
      ? "Frequently Asked Questions" 
      : "Часто задаваемые вопросы"

  return (
    <section className="py-20 bg-muted/30" id="faq">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-balance">
          {title}
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {t.faq.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-background border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
