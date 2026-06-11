"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Plus, Server, Boxes, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HealthReport } from "@/lib/health";
import ProductCards from "@/components/dashboard/ProductCards";
import InfraStrip from "@/components/dashboard/InfraStrip";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import RedFlagsPanel from "@/components/dashboard/RedFlagsPanel";

const DEFAULT_REPORT: HealthReport = {
  funnl:   { status: "up", responseTime: 0 },
  sprintx: { status: "up", responseTime: 0 },
  landing: { status: "up", responseTime: 0 },
  server:  { cpu: 8, ram: { used: 1.8, total: 3.7 }, disk: 82, containers: 9 },
  checkedAt: new Date().toISOString(),
};

function formatUAEDate() {
  return new Date().toLocaleDateString("en-AE", {
    timeZone: "Asia/Dubai",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatRefreshTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-AE", {
    timeZone: "Asia/Dubai",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function SectionHeader({ icon: Icon, label, action }: { icon: LucideIcon; label: string; action?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
      <span
        style={{
          fontSize: 10, fontWeight: 700, color: "#9CA3AF",
          letterSpacing: "1px", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 6,
        }}
      >
        <Icon size={12} />
        {label}
      </span>
      {action && (
        <span style={{ fontSize: 11, color: "#4F46E5", cursor: "pointer" }}>{action}</span>
      )}
    </div>
  );
}

export default function OverviewPage() {
  const [report, setReport] = useState<HealthReport>(DEFAULT_REPORT);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (res.ok) setReport(await res.json() as HealthReport);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [refresh]);

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>

      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h1 style={{ fontSize: 16, fontWeight: 600, color: "#111", margin: 0 }}>Platform Overview</h1>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
            All systems · {formatUAEDate()} · Last refreshed {formatRefreshTime(report.checkedAt)} UAE
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[44px] sm:min-h-0"
            style={{
              padding: "7px 12px", background: "#fff", border: "1px solid #E4E4E7",
              borderRadius: 7, fontSize: 12, fontWeight: 500, color: "#374151", cursor: "pointer",
            }}
          >
            <RefreshCw size={12} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
            Refresh
          </button>
          <button
            className="flex items-center justify-center gap-1.5 w-full sm:w-auto min-h-[44px] sm:min-h-0"
            style={{
              padding: "7px 12px", background: "#4F46E5", border: "none",
              borderRadius: 7, fontSize: 12, fontWeight: 500, color: "#fff", cursor: "pointer",
            }}
          >
            <Plus size={12} />
            New Client
          </button>
        </div>
      </div>

      {/* Infrastructure */}
      <section style={{ marginBottom: 20 }}>
        <SectionHeader icon={Server} label="Infrastructure — Hetzner VPS 62.238.22.128" action="View details →" />
        <InfraStrip data={report.server} />
      </section>

      {/* Products */}
      <section style={{ marginBottom: 20 }}>
        <SectionHeader icon={Boxes} label="SaaS Products" />
        <ProductCards report={report} />
      </section>

      {/* Activity */}
      <section>
        <SectionHeader icon={Activity} label="Platform Activity" />
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <ActivityFeed />
          </div>
          <div className="w-full lg:w-[280px] lg:shrink-0">
            <RedFlagsPanel />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
