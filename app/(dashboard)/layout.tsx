import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Sidebar />
      <main
        style={{
          marginTop: 44,
          marginLeft: 180,
          minHeight: "calc(100vh - 44px)",
          background: "#F4F4F5",
          padding: "24px",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </>
  );
}
