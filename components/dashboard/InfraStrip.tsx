"use client";

interface InfraData {
  cpu: number;
  ram: { used: number; total: number };
  disk: number;
  containers: number;
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ width: "100%", height: 3, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
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
  const ramPct    = Math.round((data.ram.used / data.ram.total) * 100);
  const diskAmber = data.disk >= 75;
  const diskRed   = data.disk >= 90;
  const diskBar   = diskRed ? "#EF4444" : diskAmber ? "#F59E0B" : "#10B981";

  const cards = [
    {
      label: "CPU",
      value: `${data.cpu}%`,
      sub: "8 vCPU",
      pct: data.cpu,
      barColor: data.cpu >= 90 ? "#EF4444" : data.cpu >= 70 ? "#F59E0B" : "#10B981",
      bg: "#fff",
      border: "1px solid #E4E4E7",
      badge: null as string | null,
    },
    {
      label: "RAM",
      value: `${data.ram.used} GB`,
      sub: `${ramPct}% of ${data.ram.total}GB`,
      pct: ramPct,
      barColor: ramPct >= 92 ? "#EF4444" : ramPct >= 80 ? "#F59E0B" : "#10B981",
      bg: "#fff",
      border: "1px solid #E4E4E7",
      badge: null as string | null,
    },
    {
      label: "Disk",
      value: `${data.disk}%`,
      sub: diskRed ? "Critical" : diskAmber ? "Monitor closely" : "Healthy",
      pct: data.disk,
      barColor: diskBar,
      bg: diskAmber ? "#FFFDF5" : "#fff",
      border: diskAmber ? "1px solid #FCD34D" : "1px solid #E4E4E7",
      badge: null as string | null,
    },
    {
      label: "Containers",
      value: String(data.containers),
      sub: "Running",
      pct: Math.round((data.containers / 12) * 100),
      barColor: "#10B981",
      bg: "#fff",
      border: "1px solid #D1FAE5",
      badge: null as string | null,
    },
    {
      label: "SSL",
      value: "90d",
      sub: "Expires Sep 2026",
      pct: 85,
      barColor: "#10B981",
      bg: "#fff",
      border: "1px solid #D1FAE5",
      badge: "OK" as string | null,
    },
  ];

  return (
    /* 2-col mobile → 3-col tablet → 5-col desktop */
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
      {cards.map((card) => (
        <div
          key={card.label}
          style={{ background: card.bg, border: card.border, borderRadius: 8, padding: "10px 12px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <div style={{ fontSize: 10, color: "#9CA3AF", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {card.label}
            </div>
            {card.badge && (
              <span style={{ fontSize: 9, fontWeight: 700, color: "#10B981", background: "#ECFDF5", borderRadius: 20, padding: "1px 6px" }}>
                {card.badge}
              </span>
            )}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 1 }}>{card.value}</div>
          <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 7 }}>{card.sub}</div>
          <ProgressBar value={card.pct} color={card.barColor} />
        </div>
      ))}
    </div>
  );
}
