import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZAIMAH Control Panel",
  description: "Unified admin dashboard for ZAIMAH Technologies platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, background: "#F4F4F5" }}>
        {children}
      </body>
    </html>
  );
}
