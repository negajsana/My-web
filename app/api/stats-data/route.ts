import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

const COOKIE_NAME = "stats_auth"
const COOKIE_VALUE = "granted"

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE
}

export async function GET(request: Request) {
  if (!await checkAuth()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const sql = neon(process.env.POSTGRES_URL!)
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get("mode") || "overview"
  const date = searchParams.get("date")

  try {
    if (mode === "overview") {
      const totalVisitors = await sql`SELECT COUNT(DISTINCT ip_hash) AS count FROM page_views`
      const totalViews = await sql`SELECT COUNT(*) AS count FROM page_views`
      const byPage = await sql`
        SELECT slug, COUNT(*) AS views, COUNT(DISTINCT ip_hash) AS visitors
        FROM page_views GROUP BY slug ORDER BY views DESC
      `
      const byDay = await sql`
        SELECT DATE(viewed_at) AS day, COUNT(*) AS views, COUNT(DISTINCT ip_hash) AS visitors
        FROM page_views
        WHERE viewed_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(viewed_at) ORDER BY day ASC
      `
      return NextResponse.json({
        totalVisitors: Number(totalVisitors[0].count),
        totalViews: Number(totalViews[0].count),
        byPage: byPage.map((r: any) => ({ slug: r.slug, views: Number(r.views), visitors: Number(r.visitors) })),
        byDay: byDay.map((r: any) => ({ day: r.day, views: Number(r.views), visitors: Number(r.visitors) })),
      })
    }

    if (mode === "day" && date) {
      const dayStats = await sql`
        SELECT slug, COUNT(*) AS views, COUNT(DISTINCT ip_hash) AS visitors
        FROM page_views WHERE DATE(viewed_at) = ${date}::date
        GROUP BY slug ORDER BY views DESC
      `
      const totals = await sql`
        SELECT COUNT(*) AS views, COUNT(DISTINCT ip_hash) AS visitors
        FROM page_views WHERE DATE(viewed_at) = ${date}::date
      `
      return NextResponse.json({
        date,
        views: Number(totals[0].views),
        visitors: Number(totals[0].visitors),
        byPage: dayStats.map((r: any) => ({ slug: r.slug, views: Number(r.views), visitors: Number(r.visitors) })),
      })
    }

    return NextResponse.json({ error: "Invalid params" }, { status: 400 })
  } catch (error) {
    console.error("Stats query error:", error)
    return NextResponse.json({ error: "DB error" }, { status: 500 })
  }
}
