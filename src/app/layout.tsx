import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ClaudeRL - 3D AI Reinforcement Learning Sandbox",
  description: "A 3D reinforcement learning sandbox where AI models (Claude, ChatGPT, Grok, Gemini) learn to navigate courses as geometric shapes.",
  keywords: ["AI", "reinforcement learning", "3D", "machine learning", "Claude", "Anthropic", "ChatGPT", "Grok", "Gemini"],
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
    url: "https://ClaudeRL.com",
    title: "ClaudeRL - 3D AI Reinforcement Learning Sandbox",
    description: "Watch AI models learn and adapt in 3D environments. Compare how Claude, ChatGPT, Grok, and Gemini navigate challenges.",
    siteName: "ClaudeRL",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ClaudeRL - 3D AI Reinforcement Learning Sandbox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClaudeRL - 3D AI Reinforcement Learning Sandbox",
    description: "Watch AI models learn and adapt in 3D environments.",
    creator: "@ClaudeRL",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF9F7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ backgroundColor: 'var(--claude-cream)', color: 'var(--claude-charcoal)' }}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded z-50">
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
