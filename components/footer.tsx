import type { TranslationKey } from "@/lib/translations"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="py-8 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">{t.footer.rights}</div>
      </div>
    </footer>
  )
}
