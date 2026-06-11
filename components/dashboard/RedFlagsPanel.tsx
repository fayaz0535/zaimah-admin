"use client";

const FLAGS = [
  {
    color: "#EF4444",
    bg: "#FEF2F2",
    border: "#FECACA",
    label: "Disk at 82%",
    detail: "Run: docker system prune",
  },
  {
    color: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    label: "WhatsApp not in live mode",
    detail: "Submit to Meta Business Manager",
  },
  {
    color: "#4F46E5",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    label: "SprintX auth is stub",
    detail: "Pre-launch only — replace before go-live",
  },
  {
    color: "#4F46E5",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    label: "UptimeRobot not configured",
    detail: "Add monitoring for all 3 services",
  },
  {
    color: "#6B7280",
    bg: "#F9FAFB",
    border: "#E4E4E7",
    label: "KPI API not connected",
    detail: "funnl metrics showing — placeholder",
  },
];

export default function RedFlagsPanel() {
  return (
    <div style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: 10, overflow: "hidden" }}>
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #E4E4E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Red flags to resolve</span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            background: "#FEF2F2",
            color: "#EF4444",
            border: "1px solid #FECACA",
            borderRadius: 20,
            padding: "2px 8px",
          }}
        >
          {FLAGS.length} open
        </span>
      </div>

      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        {FLAGS.map((flag, i) => (
          <div
            key={i}
            style={{
              background: flag.bg,
              border: `1px solid ${flag.border}`,
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: flag.color }}>{flag.label}</div>
            <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>{flag.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
