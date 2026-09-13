import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { inter, instrumentSerif, instrumentSerifItalic } from "@/lib/fonts";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "career-ops — official web experience",
  description: "The official, local-first web experience for career-ops.",
  // Home-screen / standalone (iOS): let our theme-color flow up to the status bar
  // + Dynamic Island; safe-area insets handle the layout.
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "career-ops" },
};

export const viewport: Viewport = {
  // viewport-fit=cover → env(safe-area-inset-*) become non-zero so the header can
  // sit flush under the notch / Dynamic Island.
  viewportFit: "cover",
  // Default (corrected to the real theme before paint, then kept in sync by the theme toggle).
  // Dark flows seamlessly into the black island.
  themeColor: "#0a0a0a",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("career-ops:theme")?.value || "dark";
  const isDark = theme === "dark";

  return (
    <html
      lang="en"
      className={`${isDark ? "dark" : ""} ${inter.variable} ${instrumentSerif.variable} ${instrumentSerifItalic.variable}`}
    >
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

