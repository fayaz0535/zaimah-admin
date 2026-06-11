const EVENTS = [
  { type: "booking",  dot: "#10B981", message: "New booking — Aya Beauty, 3 services", product: "funnl",      time: "2 min ago" },
  { type: "deploy",   dot: "#10B981", message: "SprintX v0.9.2 deployed successfully", product: "SprintX",    time: "18 min ago" },
  { type: "alert",    dot: "#F59E0B", message: "WhatsApp rate limit reached — 10 min backoff", product: "funnl", time: "34 min ago" },
  { type: "booking",  dot: "#10B981", message: "Booking confirmed — Sarah Al Mansoori", product: "funnl",     time: "51 min ago" },
  { type: "system",   dot: "#4F46E5", message: "Health check passed — all 3 services up", product: "System", time: "1 hr ago" },
  { type: "error",    dot: "#EF4444", message: "No-show — booking ID bk_9fa2 not attended", product: "funnl", time: "2 hr ago" },
  { type: "deploy",   dot: "#10B981", message: "zaimahtech.ae rebuild completed (Nginx cache cleared)", product: "Landing", time: "3 hr ago" },
  { type: "alert",    dot: "#F59E0B", message: "Disk usage crossed 80% threshold", product: "System",        time: "4 hr ago" },
  { type: "booking",  dot: "#10B981", message: "Viewing booked — Al Barsha 2BR apartment", product: "funnl", time: "5 hr ago" },
  { type: "system",   dot: "#4F46E5", message: "Server reboot completed — all containers up", product: "System", time: "Yesterday" },
];

export default function ActivityFeed() {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E4E4E7",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #E4E4E7",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Activity Feed</span>
        <span style={{ fontSize: 11, color: "#9CA3AF" }}>Last 10 events</span>
      </div>

      <div>
        {EVENTS.map((ev, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "10px 16px",
              borderBottom: i < EVENTS.length - 1 ? "1px solid #F3F4F6" : "none",
            }}
          >
            <span
              style={{
                marginTop: 5,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: ev.dot,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12, color: "#111", margin: 0, lineHeight: 1.4 }}>{ev.message}</p>
              <p style={{ fontSize: 11, color: "#9CA3AF", margin: "2px 0 0" }}>
                {ev.product} · {ev.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
