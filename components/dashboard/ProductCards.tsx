"use client";

import type { HealthReport } from "@/lib/health";

const STATUS_STYLES = {
  up:       { bg: "#ECFDF5", color: "#10B981", label: "Live" },
  degraded: { bg: "#FFFBEB", color: "#F59E0B", label: "Degraded" },
  down:     { bg: "#FEF2F2", color: "#EF4444", label: "Down" },
} as const;

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      style={{
        width: 22, height: 22, borderRadius: 4, background: color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 8, fontWeight: 700, color: "#fff", flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function ClientRow({ initials, avatarColor, name, type, badge, badgeColor }: {
  initials: string;
  avatarColor: string;
  name: string;
  type: string;
  badge: string;
  badgeColor: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 0" }}>
      <Avatar initials={initials} color={avatarColor} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
        </div>
        <div style={{ fontSize: 10, color: "#9CA3AF" }}>{type}</div>
      </div>
      <span style={{ fontSize: 9, fontWeight: 600, color: badgeColor, background: badgeColor + "18", borderRadius: 20, padding: "1px 7px", flexShrink: 0 }}>
        {badge}
      </span>
    </div>
  );
}

function MetricTile({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div style={{ background: "#F9FAFB", borderRadius: 6, padding: "7px 8px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: valueColor ?? "#111" }}>{value}</div>
      <div style={{ fontSize: 9, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 1 }}>{label}</div>
    </div>
  );
}

function ActionLinks({ url }: { url: string }) {
  return (
    <div style={{ display: "flex", gap: 12, marginLeft: 4 }}>
      {[
        { label: "Open ↗", href: url, ext: true },
        { label: "Config",  href: "/settings", ext: false },
        { label: "Logs",    href: "/logs", ext: false },
      ].map((a) => (
        <a
          key={a.label}
          href={a.href}
          target={a.ext ? "_blank" : undefined}
          rel={a.ext ? "noopener noreferrer" : undefined}
          style={{ fontSize: 11, color: "#6B7280", textDecoration: "none", fontWeight: 500 }}
        >
          {a.label}
        </a>
      ))}
    </div>
  );
}

interface ProductCardsProps {
  report: HealthReport;
}

export default function ProductCards({ report }: ProductCardsProps) {
  const funnlSt   = STATUS_STYLES[report.funnl.status];
  const sprintxSt = STATUS_STYLES[report.sprintx.status];
  const landingSt = STATUS_STYLES[report.landing.status];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>

      {/* ─── funnl ─── */}
      <div style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: 10, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#5B5BF6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>💬</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>funnl</span>
          <span style={{ fontSize: 10, color: "#9CA3AF", background: "#F3F4F6", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
            funnl.zaimahtech.ae
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10, fontWeight: 600, background: funnlSt.bg, color: funnlSt.color, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
            {funnlSt.label}
          </span>
          <ActionLinks url="https://funnl.zaimahtech.ae" />
        </div>
        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-b border-[#F3F4F6] lg:border-b-0 lg:border-r" style={{ padding: "12px 14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              <MetricTile label="Clients"    value="—" />
              <MetricTile label="Bookings"   value="—" />
              <MetricTile label="Messages"   value="—" />
              <MetricTile label="AI Quality" value="—" />
              <MetricTile label="Response"   value={report.funnl.status === "up" ? `${report.funnl.responseTime}ms` : "—"} />
              <MetricTile label="WA Mode"    value="SBX" valueColor="#D97706" />
            </div>
            <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 20, fontSize: 10, color: "#D97706" }}>
              ⚠ WhatsApp in sandbox — submit for live mode approval
            </div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Clients (3)
            </div>
            <ClientRow initials="SC" avatarColor="#4F46E5" name="Shave Crave Salon"     type="Salon & Beauty" badge="Active"   badgeColor="#10B981" />
            <ClientRow initials="SK" avatarColor="#10B981" name="Sheik Salon"            type="Salon & Beauty" badge="Active"   badgeColor="#10B981" />
            <ClientRow initials="ZT" avatarColor="#7C3AED" name="ZAIMAH Technologies"    type="Super Admin"    badge="Internal" badgeColor="#4F46E5" />
          </div>
        </div>
      </div>

      {/* ─── SprintX ─── */}
      <div style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: 10, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#00C9A7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>⚡</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>SprintX</span>
          <span style={{ fontSize: 10, color: "#9CA3AF", background: "#F3F4F6", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
            sprintx.zaimahtech.ae
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10, fontWeight: 600, background: sprintxSt.bg, color: sprintxSt.color, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
            {sprintxSt.label}
          </span>
          <ActionLinks url="https://sprintx.zaimahtech.ae" />
        </div>
        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-b border-[#F3F4F6] lg:border-b-0 lg:border-r" style={{ padding: "12px 14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              <MetricTile label="Tenants"   value="1" />
              <MetricTile label="Sprints"   value="—" />
              <MetricTile label="AI Agents" value="—" />
              <MetricTile label="Branch"    value="dev" />
              <MetricTile label="API Port"  value="5000" />
              <MetricTile label="Auth"      value="Stub" valueColor="#D97706" />
            </div>
            <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 20, fontSize: 10, color: "#D97706" }}>
              ⚠ Auth is localStorage stub — not production ready
            </div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Clients (1)
            </div>
            <ClientRow initials="ZT" avatarColor="#1F2937" name="ZAIMAH Technologies" type="Internal" badge="Phase 1 ✓" badgeColor="#10B981" />
            <div style={{ marginTop: 8, background: "#F9FAFB", border: "1px solid #E4E4E7", borderRadius: 7, padding: "7px 10px" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>Roadmap</div>
              <div style={{ fontSize: 10, color: "#6B7280", lineHeight: 1.7 }}>
                Phase 2 — QA gates &nbsp;·&nbsp; Phase 3 — Delivery &nbsp;·&nbsp; Phase 4 — Multi-tenant
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── zaimahtech.ae ─── */}
      <div style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: 10, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>🌐</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>zaimahtech.ae</span>
          <span style={{ fontSize: 10, color: "#9CA3AF", background: "#F3F4F6", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
            zaimahtech.ae
          </span>
          <span style={{ flex: 1 }} />
          <span style={{ fontSize: 10, fontWeight: 600, background: landingSt.bg, color: landingSt.color, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
            {landingSt.label}
          </span>
          <ActionLinks url="https://zaimahtech.ae" />
        </div>
        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-b border-[#F3F4F6] lg:border-b-0 lg:border-r" style={{ padding: "12px 14px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              <MetricTile label="HTTP"      value={report.landing.status === "up" ? "200 OK" : "—"} valueColor="#10B981" />
              <MetricTile label="Response"  value={report.landing.status === "up" ? `${report.landing.responseTime}ms` : "—"} />
              <MetricTile label="Container" value="1" />
              <MetricTile label="Stack"     value="Next.js" />
              <MetricTile label="Port"      value="3001" />
              <MetricTile label="Status"    value="Clean" valueColor="#10B981" />
            </div>
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Quick Links
            </div>
            {[
              { label: "funnl.zaimahtech.ae",   href: "https://funnl.zaimahtech.ae" },
              { label: "sprintx.zaimahtech.ae", href: "https://sprintx.zaimahtech.ae" },
              { label: "admin.zaimahtech.ae",   href: "https://admin.zaimahtech.ae" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", fontSize: 11, color: "#4F46E5", textDecoration: "none", padding: "3px 0", lineHeight: 1.5 }}
              >
                ↗ {link.label}
              </a>
            ))}
            <div style={{ marginTop: 8, background: "#ECFDF5", border: "1px solid #D1FAE5", borderRadius: 7, padding: "7px 10px", fontSize: 11, color: "#065F46", fontWeight: 500 }}>
              ✓ All checks passing
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
