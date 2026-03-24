import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const TRACKED_SLUGS = ["/", "/about", "/contact", "/how-we-work", "/projects", "/services"]
const LANGS = ["en", "uk", "ru", "es", "de"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Не трогаем страницу статистики и API
  if (
    pathname.startsWith("/stats-") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Определяем slug страницы (убираем язык)
  let slug = pathname
  for (const lang of LANGS) {
    if (pathname === `/${lang}`) { slug = "/"; break }
    if (pathname.startsWith(`/${lang}/`)) { slug = pathname.slice(lang.length + 1); break }
  }

  // Трекаем только известные страницы
  if (!TRACKED_SLUGS.includes(slug)) {
    return NextResponse.next()
  }

  // Отправляем трекинг асинхронно
  const trackUrl = new URL("/api/track", request.url)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"

  fetch(trackUrl.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug,
      ip,
      userAgent: request.headers.get("user-agent") || "",
      referrer: request.headers.get("referer") || "",
    }),
  }).catch(() => {})

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon|.*\\..*).*)",
  ],
}
