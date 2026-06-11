import { runAllChecks } from "@/lib/health";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  const report = await runAllChecks();
  const services = [
    { name: "funnl",       health: report.funnl },
    { name: "SprintX",     health: report.sprintx },
    { name: "zaimahtech.ae", health: report.landing },
  ];
  const statusColor = { up: "#10B981", degraded: "#F59E0B", down: "#EF4444" } as const;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 6px" }}>System Health</h1>
      <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 24px" }}>
        Last checked: {new Date(report.checkedAt).toLocaleTimeString("en-AE", { timeZone: "Asia/Dubai" })} UAE
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {services.map((s) => (
          <div
            key={s.name}
            style={{
              background: "#fff",
              border: "1px solid #E4E4E7",
              borderRadius: 10,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{s.name}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                {s.health.responseTime > 0 ? `${s.health.responseTime}ms response time` : "No response"}
              </div>
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: statusColor[s.health.status],
                background: statusColor[s.health.status] + "18",
                borderRadius: 20,
                padding: "4px 12px",
                textTransform: "capitalize",
              }}
            >
              {s.health.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
