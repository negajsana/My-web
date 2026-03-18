import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { StatsClient } from "./stats-client"
import type { Metadata } from "next"

// Явно запрещаем индексацию
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

const COOKIE_NAME = "stats_auth"
const COOKIE_VALUE = "granted"

export default async function StatsPage() {
  const cookieStore = await cookies()
  const isAuthed = cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE

  return <StatsClient isAuthed={isAuthed} />
}
