"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, Users, HeartPulse, Server,
  Webhook, ScrollText, Bell, BarChart3, CreditCard, Settings, X,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, Package, Users, HeartPulse, Server,
  Webhook, ScrollText, Bell, BarChart3, CreditCard, Settings,
};

const NAV_GROUPS = [
  {
    label: "Platform",
    items: [
      { label: "Overview",   href: "/",        icon: "LayoutDashboard" },
      { label: "Products",   href: "/products", icon: "Package" },
      { label: "Clients",    href: "/clients",  icon: "Users" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "System Health",  href: "/health",   icon: "HeartPulse" },
      { label: "Infrastructure", href: "/infra",    icon: "Server" },
      { label: "Webhooks",       href: "/webhooks", icon: "Webhook" },
      { label: "Audit Logs",     href: "/logs",     icon: "ScrollText", badge: 2 },
      { label: "Alerts",         href: "/alerts",   icon: "Bell",       badge: 1 },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Analytics", href: "/analytics", icon: "BarChart3" },
      { label: "Billing",   href: "/billing",   icon: "CreditCard" },
      { label: "Settings",  href: "/settings",  icon: "Settings" },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop overlay — mobile only */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-black/50 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar — drawer on mobile, fixed panel on desktop */}
      <aside
        className={`fixed top-[44px] left-0 bottom-0 z-50 overflow-y-auto
          w-[280px] lg:w-[180px]
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
        style={{ background: "#fff", borderRight: "1px solid #E4E4E7", paddingTop: 8 }}
      >
        {/* Mobile close button */}
        <div className="flex justify-end px-3 pb-1 lg:hidden">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-[44px] h-[44px] rounded-lg"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Close menu"
          >
            <X size={18} color="#374151" />
          </button>
        </div>

        {/* Nav groups */}
        {NAV_GROUPS.map((group) => (
          <div key={group.label} style={{ marginBottom: 8 }}>
            <div
              style={{
                fontSize: 10, fontWeight: 600, color: "#9CA3AF",
                textTransform: "uppercase", letterSpacing: "0.08em",
                padding: "8px 16px 4px",
              }}
            >
              {group.label}
            </div>

            {group.items.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-2 min-h-[44px] lg:min-h-0"
                  style={{
                    padding: "10px 16px",
                    fontSize: 13, fontWeight: active ? 600 : 400,
                    color: active ? "#4F46E5" : "#374151",
                    background: active ? "#EEF2FF" : "transparent",
                    borderRight: active ? "2px solid #4F46E5" : "2px solid transparent",
                    textDecoration: "none", transition: "background 0.1s",
                  }}
                >
                  <Icon size={14} color={active ? "#4F46E5" : "#6B7280"} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {"badge" in item && item.badge ? (
                    <span
                      style={{
                        fontSize: 10, fontWeight: 600,
                        background: item.label === "Alerts" ? "#EF4444" : "#E4E4E7",
                        color: item.label === "Alerts" ? "#fff" : "#374151",
                        borderRadius: 10, padding: "1px 6px", lineHeight: "16px",
                      }}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ))}
      </aside>
    </>
  );
}
