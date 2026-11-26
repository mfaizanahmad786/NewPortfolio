import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/data/site";
import { Chrome } from "@/components/Chrome";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        <Nav />
        {children}
        <Footer />
        <Chrome />
      </body>
    </html>
  );
}
