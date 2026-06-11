"use client";

const EVENTS = [
  {
    id: 1,
    dot: "#10B981",
    text: "funnl — Shave Crave booked appointment via WhatsApp",
    time: "2m ago",
  },
  {
    id: 2,
    dot: "#10B981",
    text: "funnl — AI replied to Sheik Salon inquiry in 4s",
    time: "11m ago",
  },
  {
    id: 3,
    dot: "#4F46E5",
    text: "Admin — Docker containers restarted (scheduled)",
    time: "34m ago",
  },
  {
    id: 4,
    dot: "#F59E0B",
    text: "funnl — WhatsApp sandbox rate limit hit (200/day)",
    time: "1h ago",
  },
  {
    id: 5,
    dot: "#10B981",
    text: "SprintX — Phase 1 sprint board accessed by ZAIMAH team",
    time: "2h ago",
  },
  {
    id: 6,
    dot: "#4F46E5",
    text: "Admin — SSL certificate auto-renewed (valid 90d)",
    time: "4h ago",
  },
  {
    id: 7,
    dot: "#EF4444",
    text: "Server — Disk usage crossed 80% threshold (now 82%)",
    time: "6h ago",
  },
  {
    id: 8,
    dot: "#10B981",
    text: "zaimahtech.ae — Uptime check passed (200 OK, 240ms)",
    time: "8h ago",
  },
];

export default function ActivityFeed() {
  return (
    <div style={{ background: "#fff", border: "1px solid #E4E4E7", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Activity feed</div>
          <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 1 }}>Last 8 events</div>
        </div>
        <span style={{ fontSize: 11, color: "#4F46E5", cursor: "pointer" }}>View all →</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {EVENTS.map((ev, i) => (
          <div
            key={ev.id}
            style={{
              display: "flex",
              gap: 10,
              paddingTop: i === 0 ? 0 : 10,
              paddingBottom: i === EVENTS.length - 1 ? 0 : 10,
              borderBottom: i === EVENTS.length - 1 ? "none" : "1px solid #F3F4F6",
            }}
          >
            <div style={{ paddingTop: 3, flexShrink: 0 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: ev.dot }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.5 }}>{ev.text}</div>
            </div>
            <div style={{ fontSize: 10, color: "#9CA3AF", flexShrink: 0, paddingTop: 2 }}>{ev.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
