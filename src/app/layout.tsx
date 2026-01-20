import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { Fira_Code, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ClaudeArena - Can Your Model Beat Opus 4.5?",
  description: "The arena where AI challengers face Claude Opus 4.5. GPT-5, Grok 4, Gemini 3 Pro have tried across 15 cognitive battlegrounds. All have failed. Watch the defeats live.",
  keywords: ["AI", "Claude Opus 4.5", "AI benchmark", "AI competition", "GPT-5 vs Claude", "Grok vs Claude", "Gemini vs Claude", "AI arena", "AI battle", "frontier models", "AI champion"],
  authors: [{ name: "ClaudeArena Team" }],
  creator: "ClaudeArena",
  publisher: "ClaudeArena",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://claudearena.xyz",
    title: "ClaudeArena - Can Your Model Beat Opus 4.5?",
    description: "The arena where AI challengers face Claude Opus 4.5. GPT-5, Grok 4, Gemini 3 Pro have tried. All have failed.",
    siteName: "ClaudeArena",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClaudeArena - Challenge the Champion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaudeArena - Can Your Model Beat Opus 4.5?",
    description: "The arena where AI challengers face Claude Opus 4.5. GPT-5, Grok 4, Gemini 3 Pro have tried. All have failed.",
    creator: "@ClaudeArena",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1A17",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${firaCode.variable} ${jetbrainsMono.variable} antialiased`}
        style={{ 
          fontFamily: 'var(--font-mono)',
          backgroundColor: 'var(--bg-primary)', 
          color: 'var(--text-primary)',
          overflowX: 'hidden',
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
