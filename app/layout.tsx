import type { Metadata, Viewport } from "next";
import { Inter, Lobster, Montserrat, Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

/*
  Backend team: also send the X-Robots-Tag: noindex, nofollow response header for this URL.
*/

/* Brochure fonts: Lobster (title), Montserrat ≈ Gotham (body), Sorts Mill Goudy ≈ Goudy Old Style (tagline) */
const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const goudy = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-goudy",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Normalising the Normal | Motherhood Hospitals",
    template: "%s | Motherhood Hospitals",
  },
  description:
    "Normalising the Normal — a day of scientific learning on 4 October 2026 at The Chancery Pavilion, Bengaluru.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Natural Birthing Event | Motherhood Hospitals",
    description:
      "Hospital-based natural and water birth CME — agenda, messages from our leaders, and faculty.",
    type: "website",
    url: "/",
    siteName: "Motherhood Hospitals",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Natural Birthing Event by Motherhood Hospitals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Natural Birthing Event | Motherhood Hospitals",
    description:
      "CME on natural birthing — agenda, videos, speakers, and venue. Motherhood Hospitals India.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#DB5070",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lobster.variable} ${montserrat.variable} ${goudy.variable} ${sans.variable}`}>
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
