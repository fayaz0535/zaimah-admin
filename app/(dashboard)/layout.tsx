"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <Topbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="mt-[44px] lg:ml-[180px] min-h-[calc(100vh-44px)] bg-[#F4F4F5] overflow-y-auto">

        {/* Slim alerts bar — sticky below topbar, visible on all dashboard pages */}
        <div
          className="sticky top-0 z-30 flex items-center gap-4 overflow-hidden"
          style={{
            background: "#FFFBEB",
            borderBottom: "1px solid #FDE68A",
            padding: "7px 20px",
            fontSize: "11px",
            color: "#78350F",
          }}
        >
          <span className="shrink-0">⚠ Disk at 82% — prune Docker cache</span>
          <div className="hidden sm:block shrink-0 w-px h-[14px]" style={{ background: "#FDE68A" }} />
          <span className="hidden sm:inline shrink-0">⚠ WhatsApp sandbox mode — live approval pending</span>
          <div className="hidden lg:block shrink-0 w-px h-[14px]" style={{ background: "#FDE68A" }} />
          <span className="hidden lg:inline shrink-0">⚠ SprintX auth is stub — pre-launch only</span>
          <span className="ml-auto shrink-0 cursor-pointer font-semibold" style={{ color: "#D97706" }}>
            View all alerts →
          </span>
        </div>

        {/* Page content */}
        <div className="p-3 sm:p-4 lg:p-5">
          {children}
        </div>
      </main>
    </>
  );
}
