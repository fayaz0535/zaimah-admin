"use client";

import type { HealthReport } from "@/lib/health";

interface Metric {
  label: string;
  value: string;
}

interface ProductCardDef {
  id: keyof Omit<HealthReport, "server" | "checkedAt">;
  name: string;
  url: string;
  description: string;
  color: string;
  icon: string;
  metrics: (report: HealthReport) => Metric[];
  alert?: (report: HealthReport) => { level: "amber" | "red"; text: string } | null;
}

const CARDS: ProductCardDef[] = [
  {
    id: "funnl",
    name: "funnl",
    url: "https://funnl.zaimahtech.ae",
    description: "WhatsApp AI CRM",
    color: "#5B5BF6",
    icon: "💬",
    metrics: (r) => [
      { label: "Active clients",  value: "—" },
      { label: "Bookings today",  value: "—" },
      { label: "Total messages",  value: "—" },
      { label: "Uptime",          value: r.funnl.status === "up" ? `${r.funnl.responseTime}ms` : "Down" },
    ],
    alert: (r) =>
      r.funnl.status !== "up"
        ? { level: "red", text: "Service unreachable" }
        : null,
  },
  {
    id: "sprintx",
    name: "SprintX",
    url: "https://sprintx.zaimahtech.ae",
    description: "AI Agile Delivery",
    color: "#00C9A7",
    icon: "⚡",
    metrics: (r) => [
      { label: "Active tenants",  value: "—" },
      { label: "Sprints run",     value: "—" },
      { label: "AI agents",       value: "—" },
      { label: "Auth status",     value: r.sprintx.status === "up" ? "Stub (pre-launch)" : "Down" },
    ],
    alert: () => ({ level: "amber", text: "Auth is stub — pre-launch only" }),
  },
  {
    id: "landing",
    name: "zaimahtech.ae",
    url: "https://zaimahtech.ae",
    description: "Company Landing",
    color: "#4F46E5",
    icon: "🌐",
    metrics: (r) => [
      { label: "HTTP status",  value: r.landing.status === "up" ? "200 OK" : "Down" },
      { label: "Stack",        value: "Next.js 14" },
      { label: "Containers",   value: "1" },
      { label: "Uptime",       value: r.landing.status === "up" ? `${r.landing.responseTime}ms` : "Down" },
    ],
    alert: (r) =>
      r.landing.status !== "up"
        ? { level: "red", text: "Landing page unreachable" }
        : null,
  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  up:       { bg: "#ECFDF5", color: "#10B981", label: "Live" },
  degraded: { bg: "#FFFBEB", color: "#F59E0B", label: "Degraded" },
  down:     { bg: "#FEF2F2", color: "#EF4444", label: "Down" },
};

interface ProductCardsProps {
  report: HealthReport;
}

export default function ProductCards({ report }: ProductCardsProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
      {CARDS.map((card) => {
        const health = report[card.id];
        const st = STATUS_STYLES[health.status];
        const metrics = card.metrics(report);
        const alert = card.alert ? card.alert(report) : null;

        return (
          <div
            key={card.id}
            style={{
              background: "#fff",
              border: "1px solid #E4E4E7",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid #F3F4F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{card.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{card.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{card.description}</div>
                </div>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  background: st.bg,
                  color: st.color,
                  borderRadius: 20,
                  padding: "3px 10px",
                }}
              >
                {st.label}
              </span>
            </div>

            {/* Inline alert */}
            {alert && (
              <div
                style={{
                  padding: "7px 16px",
                  background: alert.level === "red" ? "#FEF2F2" : "#FFFBEB",
                  borderBottom: "1px solid",
                  borderColor: alert.level === "red" ? "#FECACA" : "#FDE68A",
                  fontSize: 12,
                  color: alert.level === "red" ? "#EF4444" : "#D97706",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>{alert.level === "red" ? "⚠️" : "⚡"}</span>
                {alert.text}
              </div>
            )}

            {/* Metrics 2×2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
              }}
            >
              {metrics.map((m, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderRight: i % 2 === 0 ? "1px solid #F3F4F6" : "none",
                    borderBottom: i < 2 ? "1px solid #F3F4F6" : "none",
                  }}
                >
                  <div style={{ fontSize: 10, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{m.value}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "9px 16px",
                borderTop: "1px solid #F3F4F6",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}
            >
              {[
                { label: "Open ↗", href: card.url },
                { label: "Clients", href: "/clients" },
                { label: "Config",  href: "/settings" },
                { label: "Logs",    href: "/logs" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Open ↗" ? "_blank" : undefined}
                  rel={link.label === "Open ↗" ? "noopener noreferrer" : undefined}
                  style={{ fontSize: 11, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
