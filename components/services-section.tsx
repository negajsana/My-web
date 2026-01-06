import type { TranslationKey } from "@/lib/translations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Globe, MessageSquare, Zap, Link2 } from "lucide-react"

interface ServicesSectionProps {
  t: TranslationKey
}

export function ServicesSection({ t }: ServicesSectionProps) {
  const services = [
    {
      icon: Globe,
      title: t.services.web.title,
      description: t.services.web.description,
    },
    {
      icon: MessageSquare,
      title: t.services.chatbots.title,
      description: t.services.chatbots.description,
    },
    {
      icon: Zap,
      title: t.services.automation.title,
      description: t.services.automation.description,
    },
    {
      icon: Link2,
      title: t.services.integration.title,
      description: t.services.integration.description,
    },
  ]

  return (
    <section id="services" className="py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t.services.title}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className="group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur"
                >
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="leading-relaxed text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
