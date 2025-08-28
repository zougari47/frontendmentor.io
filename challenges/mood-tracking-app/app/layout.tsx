import type { Metadata } from "next"
import { Geist, Reddit_Sans } from "next/font/google"

import "./globals.css"

// NOTE: THE REDDIT SANS WAS NOT SHOWING LIKE THE DESING (BROKEN)
const redditSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mood Tracking App",
  description: "Track your mood and get statistic.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${redditSans.variable} bg-gradient min-h-screen font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
