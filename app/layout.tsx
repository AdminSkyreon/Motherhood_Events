import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";

/*
  Backend team: also send the X-Robots-Tag: noindex, nofollow response header for this URL.
*/

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
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
    default: "Natural Birthing Event | Motherhood Hospitals",
    template: "%s | Motherhood Hospitals",
  },
  description:
    "Join Motherhood Hospitals for the Natural Birthing CME — agenda, faculty videos, speakers, and venue details for clinical teams.",
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
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
