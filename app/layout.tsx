import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const plusJakartaDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "MetaSoft | Enterprise Database Administration & Oracle Support",
  description:
    "MetaSoft provides mission-critical database administration, Oracle EBS support, and systems engineering for global enterprises.",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/site/navbar"
import { Footer } from "@/components/site/footer"
import { SiteAnalyticsEvents } from "@/components/site/site-analytics-events"
import { FilmGrain } from "@/components/site/film-grain"
import { CinematicPreloader } from "@/components/site/preloader"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${plusJakartaDisplay.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CinematicPreloader />
          <FilmGrain />
          <div className="overflow-x-hidden bg-base selection:bg-brand/20 selection:text-ink min-h-screen flex flex-col">
            <SiteAnalyticsEvents />
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
