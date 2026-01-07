import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClaudeRL - Frontier Intelligence, Quantified",
  description: "Watch Opus 4.5 outthink, outmaneuver, and outperform every frontier model in real-time. 15 adversarial environments. 4 frontier models. Real-time reasoning on display.",
  keywords: ["AI", "reinforcement learning", "3D", "machine learning", "Claude", "Anthropic", "Opus 4.5", "GPT-4o", "Grok-2", "Gemini Ultra", "frontier models", "AI benchmark"],
  authors: [{ name: "ClaudeRL Team" }],
  creator: "ClaudeRL",
  publisher: "ClaudeRL",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://clauderl.xyz",
    title: "ClaudeRL - Frontier Intelligence, Quantified",
    description: "Watch Opus 4.5 outthink, outmaneuver, and outperform every frontier model in real-time across 15 adversarial environments.",
    siteName: "ClaudeRL",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClaudeRL - Opus 4.5 Dominance Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaudeRL - Frontier Intelligence, Quantified",
    description: "Watch Opus 4.5 outthink, outmaneuver, and outperform every frontier model in real-time.",
    creator: "@ClaudeRL",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2F2F2C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased`}
        style={{ 
          fontFamily: 'var(--font-sans)',
          backgroundColor: 'var(--bg-primary)', 
          color: 'var(--text-primary)' 
        }}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 text-white px-4 py-2 rounded z-50" style={{ backgroundColor: 'var(--accent)' }}>
          Skip to main content
        </a>

        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
