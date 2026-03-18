import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const STATS_PASSWORD = process.env.STATS_PASSWORD || "change-me-in-env"
const COOKIE_NAME = "stats_auth"
const COOKIE_VALUE = "granted"

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== STATS_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Неверный пароль" }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 дней
    path: "/",
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ ok: true })
}
