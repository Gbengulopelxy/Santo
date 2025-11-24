import type { Metadata } from "next"
import { Inter, Montserrat, Open_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import StructuredData from "@/components/StructuredData"
import Header from "@/components/layout/Header"
import CookieBanner from "@/components/layout/CookieBanner"
import { DecisionProvider } from "@/contexts/DecisionContext"
import LegalComplianceSidebar from "@/components/LegalComplianceSidebar"
import PerformanceOptimizations from "@/components/PerformanceOptimizations"
import SkipToMain from "@/components/accessibility/SkipToMain"
// Analytics component - only works in client components
// import Analytics from "@/components/analytics/Analytics"
import { RegionProvider } from "@/contexts/RegionContext"

// Body font: Inter or Open Sans (Regular, 400 weight)
const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

const openSans = Open_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
})

// Heading font: Inter or Montserrat (Bold, 700-800 weight)
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
})

// Accent font: Playfair Display for elegant touches
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://strategicconsulting.com"),
  title: {
    default: "Strategic Business Consulting - Transform Your Business Strategy",
    template: "%s | Strategic Business Consulting",
  },
  description: "Expert business strategy consulting services to help you achieve sustainable growth, optimize operations, and unlock your company's full potential. Official Forbes Business Council member with 15+ years of experience transforming businesses from 5 to 6 figures monthly.",
  keywords: [
    "business strategy",
    "strategic consulting",
    "business growth",
    "strategy consultant",
    "business transformation",
    "corporate strategy",
    "Forbes Business Council",
    "revenue growth",
    "business scaling",
    "strategic planning",
  ],
  authors: [{ name: "Strategic Business Consulting" }],
  creator: "Strategic Business Consulting",
  publisher: "Strategic Business Consulting",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://strategicconsulting.com",
    siteName: "Strategic Business Consulting",
    title: "Strategic Business Consulting - Transform Your Business Strategy",
    description: "Expert business strategy consulting services to help you achieve sustainable growth and unlock your company's full potential. Official Forbes Business Council member.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Strategic Business Consulting - Business Strategy Experts",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Business Consulting - Transform Your Business Strategy",
    description: "Expert business strategy consulting services to help you achieve sustainable growth and unlock your company's full potential.",
    images: ["/images/twitter-image.jpg"],
    creator: "@strategicconsulting",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://strategicconsulting.com",
  },
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable} ${montserrat.variable} ${playfairDisplay.variable}`}>
      <body className={`${inter.className} font-sans`}>
        <DecisionProvider>
          <RegionProvider>
            <SkipToMain />
            <PerformanceOptimizations />
            {/* <Analytics /> - Moved to client component */}
            <StructuredData />
            <Header />
            {children}
            <Toaster />
            <CookieBanner />
            <LegalComplianceSidebar />
          </RegionProvider>
        </DecisionProvider>
      </body>
    </html>
  )
}

