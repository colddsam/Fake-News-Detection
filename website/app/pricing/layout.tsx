import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Buy Credits - Truth Guardian AI",
  description: "Purchase verification credits to analyze content using AI. Flexible packages with support for text, image, and social verification.",
  keywords: [
    "buy AI credits",
    "fake news credit packages",
    "AI verification pricing",
    "misinformation detection tool",
    "image verification AI pricing",
    "text analysis pricing",
    "social media fact check tool"
  ],
  openGraph: {
    title: "Buy Credits - Truth Guardian AI",
    description: "Choose a credit package to analyze more content using advanced AI.",
    url: "https://truthguardian.vercel.app/pricing",
    images: [
      {
        url: "/content.png",
        width: 1200,
        height: 630,
        alt: "Truth Guardian AI Credit Packages",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Credits - Truth Guardian AI",
    description: "Flexible pricing to analyze content with AI.",
    site: "@colddsam",
    images: ["/content.png"],
  },
  alternates: {
    canonical: "https://truthguardian.vercel.app/pricing",
  }
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
