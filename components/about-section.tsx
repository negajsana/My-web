import type { TranslationKey } from "@/lib/translations"
import { Card, CardContent } from "./ui/card"
import { Code2, Sparkles, Target } from "lucide-react"

interface AboutSectionProps {
  t: TranslationKey
}

export function AboutSection({ t }: AboutSectionProps) {
  return (
    <section id="about" className="py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t.about.title}</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card/50 border-border/50 backdrop-blur">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-base">{t.about.intro}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-base">{t.about.experience}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-base">{t.about.focus}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
