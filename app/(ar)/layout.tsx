import type { Metadata } from "next";
import "../globals.css";
import { fontVars, SITE_URL } from "@/lib/fonts";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
};

export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={fontVars}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
