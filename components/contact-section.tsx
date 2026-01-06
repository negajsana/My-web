import type { TranslationKey } from "@/lib/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Phone, Send } from "lucide-react"

interface ContactSectionProps {
  t: TranslationKey
}

export function ContactSection({ t }: ContactSectionProps) {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.contact.title}</h2>
          <p className="text-lg text-muted-foreground mb-16 leading-relaxed">{t.contact.subtitle}</p>

          <div className="grid sm:grid-cols-2 gap-8">
            <Card className="hover:border-primary/50 transition-all duration-300">
              <CardHeader className="pb-4 pt-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.contact.phone}</CardTitle>
                <CardDescription className="text-base">+4915154730846</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-8">
                <a href="tel:+4915154730846" className="w-full block">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Phone className="mr-2 h-4 w-4" />
                    {t.contact.phone}
                  </Button>
                </a>
                <a
                  href="https://wa.me/4915154730846"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button className="w-full bg-transparent" variant="outline">
                    <Send className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/50 transition-all duration-300">
              <CardHeader className="pb-4 pt-8">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.contact.telegram}</CardTitle>
                <CardDescription className="text-base">@NE_106</CardDescription>
              </CardHeader>
              <CardContent className="pb-8">
                <a href="https://t.me/NE_106" target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    {t.contact.telegram}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-10 pb-10">
                <p className="text-xl font-semibold mb-6">{t.contact.letsTalk}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="https://t.me/NE_106" target="_blank" rel="noopener noreferrer">
                    <Button size="lg">Telegram</Button>
                  </a>
                  <a href="https://wa.me/4915154730846" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="bg-transparent">
                      WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+4915154730846">
                    <Button variant="outline" size="lg" className="bg-transparent">
                      {t.contact.phone}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
