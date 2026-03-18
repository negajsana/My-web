import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

// Инициализируем таблицы при первом запросе
async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id         SERIAL PRIMARY KEY,
      slug       TEXT        NOT NULL,
      ip_hash    TEXT        NOT NULL,
      user_agent TEXT,
      referrer   TEXT,
      viewed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at ON page_views(viewed_at)
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_page_views_slug ON page_views(slug)
  `
}

// Простой хэш IP (не храним сырой IP)
function hashIp(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

export async function POST(request: Request) {
  try {
    const { slug, ip, userAgent, referrer } = await request.json()

    await ensureTables()

    const ipHash = hashIp(ip || "unknown")

    await sql`
      INSERT INTO page_views (slug, ip_hash, user_agent, referrer)
      VALUES (${slug}, ${ipHash}, ${userAgent || null}, ${referrer || null})
    `

    return NextResponse.json({ ok: true })
  } catch (error) {
    // Не возвращаем ошибку пользователю — трекинг не должен ломать сайт
    console.error("Track error:", error)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
