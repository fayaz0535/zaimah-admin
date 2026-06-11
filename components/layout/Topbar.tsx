"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const NAV_TABS = [
  { label: "Overview",  href: "/" },
  { label: "Clients",   href: "/clients" },
  { label: "Health",    href: "/health" },
  { label: "Analytics", href: "/analytics" },
  { label: "Logs",      href: "/logs" },
];

function UAEClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-AE", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontSize: 12, color: "#6B7280", fontVariantNumeric: "tabular-nums" }}>
      {time} UAE
    </span>
  );
}

export default function Topbar() {
  const pathname = usePathname();
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        background: "#fff",
        borderBottom: "1px solid #E4E4E7",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 16,
        zIndex: 50,
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <div
          style={{
            width: 28,
            height: 28,
            background: "#111",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontStyle: "italic" }}>Z</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111", letterSpacing: "0.05em" }}>ZAIMAH</span>
      </div>

      <div style={{ width: 1, height: 20, background: "#E4E4E7" }} />

      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#fff",
          background: "#4F46E5",
          borderRadius: 4,
          padding: "2px 8px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        Control Panel
      </span>

      <div style={{ width: 1, height: 20, background: "#E4E4E7" }} />

      {/* Nav tabs */}
      <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
        {NAV_TABS.map((tab) => {
          const active = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                fontSize: 12,
                fontWeight: active ? 600 : 400,
                color: active ? "#4F46E5" : "#6B7280",
                padding: "4px 10px",
                borderRadius: 4,
                background: active ? "#EEF2FF" : "transparent",
                textDecoration: "none",
                transition: "background 0.1s",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <UAEClock />
        <div style={{ position: "relative", cursor: "pointer" }}>
          <Bell size={16} color="#6B7280" />
          <span
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 7,
              height: 7,
              background: "#EF4444",
              borderRadius: "50%",
              border: "1.5px solid #fff",
            }}
          />
        </div>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#4F46E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          FZ
        </div>
      </div>
    </header>
  );
}
