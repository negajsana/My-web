import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function ContactsAliasPage({ params }: PageProps) {
  const { lang } = await params
  redirect(`/${lang}/contact`)
}

