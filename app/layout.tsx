import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { Chrome } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

// Self-hosted latin variable Archivo (weights 300–900). next/font/google on
// Next 15.5 fetches Google at build time and crashes when Google returns an
// extensionless /l/font?kit= URL (loader.js assumes a .woff2 suffix).
const archivo = localFont({
  src: "./fonts/Archivo-latin.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className="bg-cream font-sans text-ink antialiased">
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
        <Chrome />
      </body>
    </html>
  );
}
