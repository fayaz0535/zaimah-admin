"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";

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

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-[44px] px-3 sm:px-5 gap-2 sm:gap-3"
      style={{ background: "#fff", borderBottom: "1px solid #E4E4E7" }}
    >
      {/* Hamburger — mobile only (< 1024px) */}
      <button
        onClick={onMenuClick}
        className="flex lg:hidden items-center justify-center w-[44px] h-[44px] -ml-2 shrink-0"
        style={{ background: "none", border: "none", cursor: "pointer" }}
        aria-label="Open navigation menu"
      >
        <Menu size={20} color="#374151" />
      </button>

      {/* Brand wordmark */}
      <div className="flex items-center gap-2 shrink-0">
        <div
          style={{
            width: 28, height: 28, background: "#111", borderRadius: 6,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800, fontStyle: "italic" }}>Z</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111", letterSpacing: "0.05em" }}>ZAIMAH</span>
      </div>

      {/* Divider + Control Panel badge — desktop only */}
      <div className="hidden lg:block w-px h-5" style={{ background: "#E4E4E7" }} />
      <span
        className="hidden lg:inline-flex shrink-0 items-center"
        style={{
          fontSize: 11, fontWeight: 600, color: "#fff", background: "#4F46E5",
          borderRadius: 4, padding: "2px 8px", letterSpacing: "0.06em", textTransform: "uppercase",
        }}
      >
        Control Panel
      </span>
      <div className="hidden lg:block w-px h-5" style={{ background: "#E4E4E7" }} />

      {/* Nav tabs — desktop only */}
      <nav className="hidden lg:flex items-center gap-0.5 flex-1">
        {NAV_TABS.map((tab) => {
          const active = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                fontSize: 12, fontWeight: active ? 600 : 400,
                color: active ? "#4F46E5" : "#6B7280",
                padding: "4px 10px", borderRadius: 4,
                background: active ? "#EEF2FF" : "transparent",
                textDecoration: "none", transition: "background 0.1s",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile spacer */}
      <div className="flex-1 lg:hidden" />

      {/* Right: clock + bell + avatar */}
      <div className="flex items-center gap-1 sm:gap-3 shrink-0">
        <span className="hidden sm:block"><UAEClock /></span>

        <button
          className="relative flex items-center justify-center w-[44px] h-[44px]"
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Notifications"
        >
          <Bell size={16} color="#6B7280" />
          <span
            className="absolute top-[10px] right-[10px]"
            style={{
              width: 7, height: 7, background: "#EF4444",
              borderRadius: "50%", border: "1.5px solid #fff",
            }}
          />
        </button>

        <div
          style={{
            width: 32, height: 32, borderRadius: "50%", background: "#4F46E5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0,
          }}
        >
          FZ
        </div>
      </div>
    </header>
  );
}
