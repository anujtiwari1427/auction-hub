import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiaChat } from "@/components/features/SiaChat";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AuctionHub AI — India's AI-Powered Bank Auction Property Marketplace",
    template: "%s | AuctionHub AI",
  },
  description:
    "Discover bank auction properties across India at 20-40% below market price. AI-powered search, investment analysis, legal verification, and loan assistance — all in one platform.",
  keywords: [
    "bank auction properties",
    "property auction India",
    "AI real estate",
    "cheap properties Mumbai",
    "bank auction flats",
    "NPA properties",
    "investment properties India",
    "AuctionHub",
  ],
  authors: [{ name: "AuctionHub AI" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "AuctionHub AI",
    title: "AuctionHub AI — India's AI Real Estate Intelligence Platform",
    description:
      "Search 10,000+ bank auction properties. AI-powered investment analysis. Save 20-40% on your next property.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuctionHub AI",
    description: "India's First AI-Powered Bank Auction Property Marketplace",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiaChat />
      </body>
    </html>
  );
}
