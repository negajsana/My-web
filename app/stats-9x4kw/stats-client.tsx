"use client"

import { useState, useEffect, useCallback } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

interface DayData {
  day: string
  views: number
  visitors: number
}

interface PageData {
  slug: string
  views: number
  visitors: number
}

interface OverviewData {
  totalVisitors: number
  totalViews: number
  byPage: PageData[]
  byDay: DayData[]
}

interface DayDetail {
  date: string
  views: number
  visitors: number
  byPage: PageData[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const PAGE_NAMES: Record<string, string> = {
  "/": "Главная",
  "/about": "О нас",
  "/contact": "Контакты",
  "/how-we-work": "Как мы работаем",
  "/projects": "Проекты",
  "/services": "Услуги",
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
}

function formatFullDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value.toLocaleString("ru-RU")}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="mini-bar-track">
      <div className="mini-bar-fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

function Chart({
  data,
  onDayClick,
}: {
  data: DayData[]
  onDayClick: (day: string) => void
}) {
  const maxViews = Math.max(...data.map((d) => d.views), 1)

  return (
    <div className="chart-wrap">
      {data.length === 0 ? (
        <div className="empty">Нет данных за последние 30 дней</div>
      ) : (
        <div className="chart-bars">
          {data.map((d) => {
            const h = Math.max(4, Math.round((d.views / maxViews) * 100))
            return (
              <button
                key={d.day}
                className="chart-col"
                onClick={() => onDayClick(d.day)}
                title={`${formatFullDate(d.day)}: ${d.views} просм., ${d.visitors} уник.`}
              >
                <div className="chart-bar-wrap">
                  <div className="chart-bar" style={{ height: `${h}%` }} />
                </div>
                <div className="chart-label">{formatDate(d.day)}</div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function DayModal({
  detail,
  onClose,
}: {
  detail: DayDetail
  onClose: () => void
}) {
  const maxViews = Math.max(...detail.byPage.map((p) => p.views), 1)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-title">{formatFullDate(detail.date)}</div>
        <div className="modal-stats">
          <div className="modal-stat">
            <span className="modal-stat-val">{detail.views.toLocaleString("ru-RU")}</span>
            <span className="modal-stat-lbl">просмотров</span>
          </div>
          <div className="modal-sep" />
          <div className="modal-stat">
            <span className="modal-stat-val">{detail.visitors.toLocaleString("ru-RU")}</span>
            <span className="modal-stat-lbl">уникальных</span>
          </div>
        </div>
        <div className="modal-pages">
          {detail.byPage.length === 0 ? (
            <div className="empty">Нет данных</div>
          ) : (
            detail.byPage.map((p) => (
              <div key={p.slug} className="modal-page-row">
                <div className="modal-page-info">
                  <span className="modal-page-name">{PAGE_NAMES[p.slug] ?? p.slug}</span>
                  <span className="modal-page-nums">{p.views} / {p.visitors}</span>
                </div>
                <MiniBar value={p.views} max={maxViews} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Login screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/stats-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    })
    setLoading(false)
    if (res.ok) {
      onSuccess()
    } else {
      setError("Неверный пароль")
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-title">Статистика</div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Пароль"
            className="login-input"
            autoFocus
          />
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn" disabled={loading || !pw}>
            {loading ? "..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [dayDetail, setDayDetail] = useState<DayDetail | null>(null)
  const [dayLoading, setDayLoading] = useState(false)

  const loadOverview = useCallback(async () => {
    setLoading(true)
    const res = await fetch("/api/stats-data?mode=overview")
    if (res.ok) {
      setData(await res.json())
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadOverview()
  }, [loadOverview])

  async function handleDayClick(day: string) {
    setSelectedDay(day)
    setDayLoading(true)
    const res = await fetch(`/api/stats-data?mode=day&date=${day}`)
    if (res.ok) {
      setDayDetail(await res.json())
    }
    setDayLoading(false)
  }

  async function handleLogout() {
    await fetch("/api/stats-auth", { method: "DELETE" })
    onLogout()
  }

  const maxPageViews = data ? Math.max(...data.byPage.map((p) => p.views), 1) : 1

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-title">Статистика сайта</div>
        <button className="logout-btn" onClick={handleLogout}>Выйти</button>
      </header>

      {loading ? (
        <div className="loading">Загрузка...</div>
      ) : !data ? (
        <div className="empty">Не удалось загрузить данные</div>
      ) : (
        <>
          {/* Общие карточки */}
          <div className="cards-row">
            <StatCard label="Уникальных посетителей" value={data.totalVisitors} />
            <StatCard label="Просмотров страниц" value={data.totalViews} />
          </div>

          {/* График по дням */}
          <section className="section">
            <div className="section-title">
              Последние 30 дней
              <span className="section-hint">← нажмите на день для деталей</span>
            </div>
            <Chart data={data.byDay} onDayClick={handleDayClick} />
          </section>

          {/* Страницы */}
          <section className="section">
            <div className="section-title">Страницы</div>
            <div className="pages-header">
              <span>Страница</span>
              <span>Просм. / Уник.</span>
            </div>
            {data.byPage.length === 0 ? (
              <div className="empty">Нет данных</div>
            ) : (
              data.byPage.map((p) => (
                <div key={p.slug} className="page-row">
                  <div className="page-info">
                    <span className="page-name">{PAGE_NAMES[p.slug] ?? p.slug}</span>
                    <span className="page-slug">{p.slug}</span>
                  </div>
                  <span className="page-nums">{p.views} / {p.visitors}</span>
                  <MiniBar value={p.views} max={maxPageViews} />
                </div>
              ))
            )}
          </section>
        </>
      )}

      {/* Модалка дня */}
      {selectedDay && (
        dayLoading ? (
          <div className="modal-overlay" onClick={() => setSelectedDay(null)}>
            <div className="modal">
              <div className="loading">Загрузка...</div>
            </div>
          </div>
        ) : dayDetail ? (
          <DayModal detail={dayDetail} onClose={() => { setSelectedDay(null); setDayDetail(null) }} />
        ) : null
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function StatsClient({ isAuthed }: { isAuthed: boolean }) {
  const [authed, setAuthed] = useState(isAuthed)

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #0d0d0d; }

        /* ── Login ── */
        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0d0d;
          font-family: 'Courier New', monospace;
        }
        .login-box {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 40px;
          width: 320px;
        }
        .login-title {
          color: #e8e0cc;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 28px;
          letter-spacing: 0.05em;
        }
        .login-form { display: flex; flex-direction: column; gap: 12px; }
        .login-input {
          background: #0d0d0d;
          border: 1px solid #333;
          border-radius: 8px;
          color: #e8e0cc;
          font-family: inherit;
          font-size: 14px;
          padding: 10px 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .login-input:focus { border-color: #c9a84c; }
        .login-error { color: #e05252; font-size: 13px; }
        .login-btn {
          background: #c9a84c;
          border: none;
          border-radius: 8px;
          color: #0d0d0d;
          cursor: pointer;
          font-family: inherit;
          font-size: 14px;
          font-weight: 700;
          padding: 10px;
          letter-spacing: 0.05em;
          transition: opacity 0.2s;
        }
        .login-btn:disabled { opacity: 0.4; cursor: default; }
        .login-btn:not(:disabled):hover { opacity: 0.85; }

        /* ── Dashboard ── */
        .dash {
          min-height: 100vh;
          background: #0d0d0d;
          color: #e8e0cc;
          font-family: 'Courier New', monospace;
          padding: 32px 24px;
          max-width: 860px;
          margin: 0 auto;
        }
        .dash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }
        .dash-title {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #e8e0cc;
        }
        .logout-btn {
          background: none;
          border: 1px solid #333;
          border-radius: 6px;
          color: #888;
          cursor: pointer;
          font-family: inherit;
          font-size: 12px;
          padding: 5px 12px;
          transition: border-color 0.2s, color 0.2s;
        }
        .logout-btn:hover { border-color: #888; color: #e8e0cc; }

        /* ── Cards ── */
        .cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        .stat-card {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 24px;
        }
        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: #c9a84c;
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label { font-size: 12px; color: #666; letter-spacing: 0.04em; }

        /* ── Section ── */
        .section { margin-bottom: 32px; }
        .section-title {
          font-size: 12px;
          color: #666;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-hint { color: #444; font-size: 11px; text-transform: none; letter-spacing: 0; }

        /* ── Chart ── */
        .chart-wrap {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 20px;
          overflow-x: auto;
        }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 120px;
          min-width: max-content;
        }
        .chart-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          flex: 1;
          min-width: 28px;
          max-width: 40px;
          height: 100%;
          justify-content: flex-end;
        }
        .chart-bar-wrap {
          width: 100%;
          display: flex;
          align-items: flex-end;
          height: 90px;
        }
        .chart-bar {
          width: 100%;
          background: #c9a84c33;
          border-radius: 3px 3px 0 0;
          transition: background 0.15s;
          min-height: 4px;
        }
        .chart-col:hover .chart-bar { background: #c9a84c; }
        .chart-label { font-size: 9px; color: #444; white-space: nowrap; }

        /* ── Pages ── */
        .pages-header {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #444;
          padding: 0 0 8px;
          letter-spacing: 0.06em;
        }
        .page-row {
          display: grid;
          grid-template-columns: 1fr auto 140px;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-top: 1px solid #1c1c1c;
        }
        .page-info { display: flex; flex-direction: column; gap: 2px; }
        .page-name { font-size: 14px; color: #e8e0cc; }
        .page-slug { font-size: 11px; color: #444; }
        .page-nums { font-size: 13px; color: #888; white-space: nowrap; }

        /* ── MiniBar ── */
        .mini-bar-track {
          height: 4px;
          background: #1c1c1c;
          border-radius: 2px;
          overflow: hidden;
        }
        .mini-bar-fill {
          height: 100%;
          background: #c9a84c;
          border-radius: 2px;
          transition: width 0.4s ease;
        }

        /* ── Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 16px;
        }
        .modal {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 16px;
          padding: 32px;
          width: 100%;
          max-width: 460px;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #444;
          cursor: pointer;
          font-size: 16px;
          line-height: 1;
          transition: color 0.2s;
        }
        .modal-close:hover { color: #e8e0cc; }
        .modal-title {
          font-size: 18px;
          font-weight: 700;
          color: #e8e0cc;
          margin-bottom: 20px;
        }
        .modal-stats {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }
        .modal-stat { display: flex; flex-direction: column; gap: 4px; }
        .modal-stat-val { font-size: 28px; font-weight: 700; color: #c9a84c; line-height: 1; }
        .modal-stat-lbl { font-size: 11px; color: #666; }
        .modal-sep { width: 1px; height: 40px; background: #2a2a2a; }
        .modal-pages { display: flex; flex-direction: column; gap: 10px; }
        .modal-page-row { display: flex; flex-direction: column; gap: 6px; }
        .modal-page-info { display: flex; justify-content: space-between; align-items: baseline; }
        .modal-page-name { font-size: 13px; color: #e8e0cc; }
        .modal-page-nums { font-size: 12px; color: #666; }

        /* ── Utils ── */
        .loading { color: #444; font-size: 14px; padding: 24px 0; }
        .empty { color: #444; font-size: 13px; padding: 16px 0; }

        @media (max-width: 540px) {
          .cards-row { grid-template-columns: 1fr; }
          .page-row { grid-template-columns: 1fr auto; }
          .page-row .mini-bar-track { display: none; }
          .dash { padding: 20px 16px; }
        }
      `}</style>

      {!authed ? (
        <LoginScreen onSuccess={() => setAuthed(true)} />
      ) : (
        <Dashboard onLogout={() => setAuthed(false)} />
      )}
    </>
  )
}
