import type { Metadata } from "next"
import { Reddit_Sans } from "next/font/google"

import "./globals.css"

const redditSans = Reddit_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MoodFlow - Daily Mood & Sleep Tracking App",
  description: "Track your daily mood, sleep patterns, and emotions with visual insights. Get personalized statistics, trend analysis, and improve your emotional wellness.",
  keywords: ["mood tracking", "sleep tracking", "emotional wellness", "mental health", "daily journal", "mood patterns", "sleep analysis"],
  authors: [{ name: "Ahmed Zougari" }],
  
  openGraph: {
    title: "MoodFlow - Track Your Daily Mood & Sleep",
    description: "Visual mood and sleep tracking with personalized insights. Monitor your emotional wellness patterns over time.",
    type: "website",
    locale: "en_US",
    siteName: "MoodFlow",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "MoodFlow - Daily Mood & Sleep Tracking",
    description: "Track your mood, sleep, and emotions with beautiful visual insights and personalized statistics.",
  },
  
  themeColor: "#4865DB",
  colorScheme: "light",
  
  
  applicationName: "MoodFlow",
  category: "Health & Wellness",
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
