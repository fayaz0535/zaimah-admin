"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close drawer on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <Topbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="mt-[44px] lg:ml-[180px] min-h-[calc(100vh-44px)] bg-[#F4F4F5] p-3 sm:p-4 lg:p-5 overflow-y-auto">
        {children}
      </main>
    </>
  );
}
