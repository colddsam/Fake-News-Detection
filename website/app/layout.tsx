import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Truth Guardian AI - Fake News Detection",
  description: "Truth Guardian AI uses advanced artificial intelligence to detect fake news from text, social media content, and images with high accuracy.",
  keywords: [
    "fake news detection",
    "AI news checker",
    "image verification",
    "social media verification",
    "truth checker",
    "news authenticity",
    "AI fake detector"
  ],
  metadataBase: new URL("https://fake-news-detection-inky.vercel.app/"), 
  openGraph: {
    title: "Truth Guardian AI - Fake News Detection",
    description: "AI tool to detect fake news across text, images, and social media.",
    url: "https://fake-news-detection-inky.vercel.app/", 
    siteName: "Truth Guardian AI",
    images: [
      {
        url: "/content.png", 
        width: 1200,
        height: 630,
        alt: "Truth Guardian AI Fake News Detection",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truth Guardian AI - Fake News Detection",
    description: "Detects fake news from text, social, and image content using AI.",
    site: "@colddsam", 
    images: ["/content.png"], 
  },
  authors: [{ name: "colddsam", url: "https://colddsam.dev" }],
  creator: "colddsam",
  publisher: "colddsam",
  alternates: {
    canonical: "https://colddsam.vercel.app"
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <meta name="theme-color" content="#000000" />
    </head>
  <body
    className={`${inter.className} min-h-screen bg-black text-white`}
    itemScope
    itemType="http://schema.org/WebPage"
      >
        <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
