"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, Plus, AlertTriangle, Zap } from "lucide-react";
import type { HealthReport } from "@/lib/health";
import ProductCards from "@/components/dashboard/ProductCards";
import InfraStrip from "@/components/dashboard/InfraStrip";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import RedFlagsPanel from "@/components/dashboard/RedFlagsPanel";

const DEFAULT_REPORT: HealthReport = {
  funnl:    { status: "up", responseTime: 0 },
  sprintx:  { status: "up", responseTime: 0 },
  landing:  { status: "up", responseTime: 0 },
  server:   { cpu: 8, ram: { used: 1.8, total: 3.7 }, disk: 82, containers: 9 },
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

interface KPICardProps {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}

function KPICard({ label, value, sub, color = "#4F46E5" }: KPICardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E4E4E7",
        borderRadius: 10,
        padding: "16px 20px",
        flex: 1,
      }}
    >
      <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#6B7280" }}>{sub}</div>}
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

  const diskAlert = report.server.disk >= 75;
  const diskCritical = report.server.disk >= 90;

  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>

      {/* Section 1 — Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: 0 }}>Platform Overview</h1>
          <p style={{ fontSize: 13, color: "#6B7280", margin: "4px 0 0" }}>
            All systems · {formatUAEDate()} · Last refreshed {formatRefreshTime(report.checkedAt)} UAE
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={refresh}
            disabled={refreshing}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "#fff",
              border: "1px solid #E4E4E7",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              color: "#374151",
              cursor: "pointer",
            }}
          >
            <RefreshCw size={13} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
            Refresh
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              background: "#4F46E5",
              border: "none",
              borderRadius: 7,
              fontSize: 13,
              fontWeight: 500,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            <Plus size={13} />
            New Client
          </button>
        </div>
      </div>

      {/* Section 2 — Alert banners */}
      {(diskAlert || true) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {(diskCritical || diskAlert) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                background: diskCritical ? "#FEF2F2" : "#FFFBEB",
                border: `1px solid ${diskCritical ? "#FECACA" : "#FDE68A"}`,
                borderRadius: 8,
                fontSize: 13,
                color: diskCritical ? "#EF4444" : "#D97706",
              }}
            >
              <AlertTriangle size={15} />
              <span>
                Disk space at {report.server.disk}% on primary VPS —&nbsp;
                {diskCritical
                  ? "Critical! Clean up immediately."
                  : "At current growth rate disk will reach 95% in ~14 days"}
              </span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: 8,
              fontSize: 13,
              color: "#D97706",
            }}
          >
            <Zap size={15} />
            <span>funnl WhatsApp still in sandbox mode — Submit for live mode approval</span>
          </div>
        </div>
      )}

      {/* Section 3 — KPI strip */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <KPICard label="Active Clients"  value="—" sub="funnl CRM"            color="#4F46E5" />
        <KPICard label="Bookings Today"  value="—" sub="All salons"            color="#10B981" />
        <KPICard label="WA Messages"     value="—" sub="Total sent + received" color="#00C9A7" />
        <KPICard label="AI Quality Avg"  value="—" sub="Chat rating score"     color="#F59E0B" />
      </div>

      {/* Section 4 — Product cards */}
      <ProductCards report={report} />

      {/* Section 5 — Infrastructure strip */}
      <InfraStrip data={report.server} />

      {/* Section 6 — Two column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        <ActivityFeed />
        <div>
          <ClientsWidget />
          <RedFlagsPanel />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function ClientsWidget() {
  const CLIENTS = [
    { name: "Aya Beauty Lounge",     sector: "Salon",      status: "active",   color: "#10B981" },
    { name: "Al Jouri Medical Spa",  sector: "Healthcare", status: "active",   color: "#10B981" },
    { name: "Al Reem Properties",    sector: "Real Estate",status: "active",   color: "#10B981" },
    { name: "Taste Arabia",          sector: "F&B",        status: "trial",    color: "#F59E0B" },
    { name: "Nada Wellness Studio",  sector: "Wellness",   status: "inactive", color: "#9CA3AF" },
  ];
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E4E4E7",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #E4E4E7", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>Active Clients</span>
        <a href="/clients" style={{ fontSize: 11, color: "#4F46E5", textDecoration: "none" }}>View all →</a>
      </div>
      {CLIENTS.map((c, i) => (
        <div
          key={i}
          style={{
            padding: "9px 16px",
            borderBottom: i < CLIENTS.length - 1 ? "1px solid #F3F4F6" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#111" }}>{c.name}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF" }}>{c.sector}</div>
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: c.color,
              background: c.color + "18",
              borderRadius: 20,
              padding: "2px 8px",
              flexShrink: 0,
            }}
          >
            {c.status}
          </span>
        </div>
      ))}
    </div>
  );
}
