"use client";

interface InfraData {
  cpu: number;
  ram: { used: number; total: number };
  disk: number;
  containers: number;
}

function ProgressBar({ value, amber, red }: { value: number; amber: number; red: number }) {
  const color = value >= red ? "#EF4444" : value >= amber ? "#F59E0B" : "#10B981";
  return (
    <div style={{ width: "100%", height: 4, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
      <div
        style={{
          width: `${Math.min(value, 100)}%`,
          height: "100%",
          background: color,
          borderRadius: 4,
          transition: "width 0.3s",
        }}
      />
    </div>
  );
}

interface InfraStripProps {
  data: InfraData;
}

export default function InfraStrip({ data }: InfraStripProps) {
  const ramPct = Math.round((data.ram.used / data.ram.total) * 100);

  const cards = [
    {
      label: "CPU",
      value: `${data.cpu}%`,
      sub: "8 vCPU available",
      pct: data.cpu,
      amber: 70,
      red: 90,
    },
    {
      label: "RAM",
      value: `${data.ram.used} GB`,
      sub: `${ramPct}% of ${data.ram.total} GB`,
      pct: ramPct,
      amber: 80,
      red: 92,
    },
    {
      label: "Disk",
      value: `${data.disk}%`,
      sub: data.disk >= 90 ? "Critical — clean up now" : data.disk >= 75 ? "Getting full — monitor closely" : "Healthy",
      pct: data.disk,
      amber: 75,
      red: 90,
    },
    {
      label: "Containers",
      value: String(data.containers),
      sub: "Running",
      pct: (data.containers / 12) * 100,
      amber: 100,
      red: 100,
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: "#fff",
            border: "1px solid #E4E4E7",
            borderRadius: 10,
            padding: "14px 16px",
          }}
        >
          <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {card.label}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#111", marginBottom: 4 }}>{card.value}</div>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 10 }}>{card.sub}</div>
          <ProgressBar value={card.pct} amber={card.amber} red={card.red} />
        </div>
      ))}
    </div>
  );
}
