import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import AnalyticsWrapper from "@/components/analytics-wrapper";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;
const FACEBOOK_APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!;

export const metadata: Metadata = {
  title: "Truth Guardian AI - Fake News Detection",
  description: "Truth Guardian AI uses cutting-edge artificial intelligence to detect fake news from articles, images, and social media posts with remarkable precision.",
  keywords: [
    "fake news detection", "AI news checker", "news authenticity checker",
    "misinformation detection", "AI for fake news", "colddsam", "colddsam project",
    "colddsam creation", "image verification AI", "deepfake detection",
    "truth verification AI", "fact checker tool", "AI media scanner"
  ],
  metadataBase: new URL("https://truthguardian.vercel.app/"),
  openGraph: {
    title: "Truth Guardian AI - Fake News Detection",
    description: "An AI-powered tool to verify news, social posts, and images for misinformation.",
    url: "https://truthguardian.vercel.app/",
    siteName: "Truth Guardian AI",
    images: [{
      url: "/content.png",
      width: 1200,
      height: 630,
      alt: "Truth Guardian AI Fake News Detection",
      type: "image/png",
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Truth Guardian AI - Fake News Detection",
    description: "AI-based misinformation detector. Analyze text, images, and social content in real-time.",
    site: "@colddsam",
    creator: "@colddsam",
    images: ["/content.png"],
  },
  authors: [{ name: "colddsam", url: "https://colddsam.dev" }],
  creator: "colddsam",
  publisher: "colddsam",
  alternates: {
    canonical: "https://truthguardian.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="language" content="English" />
        <meta name="author" content="colddsam" />
        <meta name="copyright" content="© 2025 Truth Guardian AI" />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="7 days" />

        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Truth Guardian AI",
              url: "https://truthguardian.vercel.app/",
              description: "Truth Guardian AI is an advanced AI platform that helps detect fake news from text, images, and social media posts.",
              publisher: {
                "@type": "Person",
                name: "colddsam",
                url: "https://colddsam.dev",
              },
              sameAs: ["https://x.com/colddsam", "https://colddsam.dev"],
            }),
          }}
        />

        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}

        {FACEBOOK_APP_ID && (
          <Script
            id="facebook-sdk"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '${FACEBOOK_APP_ID}',
                    xfbml      : true,
                    version    : 'v22.0'
                  });
                  FB.AppEvents.logPageView();
                };
                (function(d, s, id){
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `,
            }}
          />
        )}
      </head>

      <body
        className={`${inter.className} min-h-screen bg-black text-white`}
        itemScope
        itemType="http://schema.org/WebPage"
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div style={{ minHeight: "64px" }}>
              <Navbar />
            </div>
            <main>{children}</main>
            <AnalyticsWrapper />
            <div style={{ minHeight: "200px" }}>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
