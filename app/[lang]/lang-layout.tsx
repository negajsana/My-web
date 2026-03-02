import { FloatingContactButton } from "@/components/floating-contact-button"
import { translations, type Language } from "@/lib/translations"

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang: rawLang } = await params
  const lang = rawLang as Language

  // Only render button for valid languages
  const validLang = translations[lang] ? lang : "uk"

  return (
    <>
      {children}
      <FloatingContactButton lang={validLang} />
    </>
  )
}
