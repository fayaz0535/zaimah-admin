import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZAIMAH Control Panel",
  description: "Unified admin dashboard — funnl, SprintX, zaimahtech.ae",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body style={{ margin: 0, fontFamily: "var(--font-inter), Inter, sans-serif", background: "#F4F4F5" }}>
        {children}
      </body>
    </html>
  );
}
