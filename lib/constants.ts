export const PRODUCTS = [
  {
    id: "funnl",
    name: "funnl",
    url: "https://funnl.zaimahtech.ae",
    description: "WhatsApp AI CRM",
    icon: "💬",
    color: "#5B5BF6",
  },
  {
    id: "sprintx",
    name: "SprintX",
    url: "https://sprintx.zaimahtech.ae",
    description: "AI Agile Delivery",
    icon: "⚡",
    color: "#00C9A7",
  },
  {
    id: "landing",
    name: "zaimahtech.ae",
    url: "https://zaimahtech.ae",
    description: "Company Landing",
    icon: "🌐",
    color: "#4F46E5",
  },
] as const;

export const NAV_GROUPS = [
  {
    label: "Platform",
    items: [
      { label: "Overview",   href: "/",          icon: "LayoutDashboard" },
      { label: "Products",   href: "/products",  icon: "Package" },
      { label: "Clients",    href: "/clients",   icon: "Users" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "System Health",  href: "/health",     icon: "HeartPulse" },
      { label: "Infrastructure", href: "/infra",      icon: "Server" },
      { label: "Webhooks",       href: "/webhooks",   icon: "Webhook" },
      { label: "Audit Logs",     href: "/logs",       icon: "ScrollText", badge: 2 },
      { label: "Alerts",         href: "/alerts",     icon: "Bell",       badge: 1 },
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
] as const;
