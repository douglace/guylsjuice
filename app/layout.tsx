import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guyl's Juice | Jus Détox Naturels — Cameroun",
  description:
    "Découvrez nos jus détox 100% naturels. TanGavis, Détox Skinny, Skin Glow, Red Boost, Green Energy et Shots Détox. Livraison à Douala et Yaoundé.",
  keywords: [
    "jus détox",
    "detox juice",
    "Cameroun",
    "Douala",
    "Yaoundé",
    "jus naturel",
    "guylsjuice",
  ],
  openGraph: {
    title: "Guyl's Juice | Jus Détox Naturels",
    description: "Jus détox 100% naturels. Livraison Douala & Yaoundé.",
    type: "website",
    locale: "fr_CM",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
