// app/(root)/page.tsx
"use client"

/**
 * Main landing page for EchoWorks AI
 * 
 * SETUP INSTRUCTIONS FOR VIDEO AND POSTER IMAGE:
 * 
 * 1. VIDEO FILE (MP4):
 *    - Place your MP4 video file in: public/videos/Robot.mp4
 *    - Current file: Robot.mp4
 *    - Recommended: H.264 codec, 1920x1080 (Full HD), under 10MB for fast loading
 *    - Format: MP4 (.mp4 extension)
 *    - Update the 'src' prop below if using a different filename/path
 * 
 * 2. POSTER IMAGE (Fallback):
 *    - Place your poster image in: public/images/hero-poster.png
 *    - Recommended: JPG or PNG, 1920x1080, under 500KB
 *    - Should be a representative frame from your video or branded image
 *    - Update the 'poster' prop below if using a different filename/path
 * 
 * 3. OPEN GRAPH IMAGE (Social Sharing):
 *    - Place OG image in: public/images/og-image.jpg
 *    - Recommended: 1200x630px, JPG or PNG
 *    - This is used for social media sharing previews
 *    - Update metadata in app/layout.tsx if using a different path
 * 
 * PAGE STRUCTURE:
 * - Hero section with video background (VideoHero + HeroContent)
 * - Services section (5 service cards in responsive grid)
 * - Case Studies section (6 case study cards)
 * - Testimonials section (carousel with 5 testimonials)
 * - Pricing section (3 pricing tiers with expandable details)
 * - Contact Form section (form + calendar booking CTA)
 * - Footer (social links, newsletter, legal)
 */

import VideoHero from "@/components/VideoHero"
import HeroContent from "@/components/HeroContent"
import Services from "@/components/Services"
import CaseStudies from "@/components/CaseStudies"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 
        HERO SECTION
        - Full-screen video background with overlay
        - Contains headline, subheadline, and CTA buttons
        - Uses semantic h1 heading inside HeroContent component
      */}
      <VideoHero
        src="/videos/Robot.mp4"
        poster="/images/hero-poster.png"
        title="Background video showcasing AI technology and business automation"
        overlay={true}
      >
        <HeroContent
          headlineVariant={1}
          subheadline="Automation, voice agents, chatbots, and end-to-end AI solutions that drive real results"
        />
      </VideoHero>

      {/* 
        SERVICES SECTION
        - Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop
        - Uses semantic h2 heading
        - 5 service cards with icons and descriptions
      */}
      <Services />

      {/* 
        CASE STUDIES SECTION
        - Responsive grid: 1 col mobile, 2 cols tablet, 3 cols desktop
        - Uses semantic h2 heading
        - 6 case study cards with "View case study" CTAs
      */}
      <CaseStudies />

      {/* 
        TESTIMONIALS SECTION
        - Auto-rotating carousel (5 seconds)
        - Manual navigation with prev/next buttons and dots
        - Uses semantic h2 heading
        - 5 client testimonials
      */}
      <Testimonials />

      {/* 
        PRICING SECTION
        - Responsive grid: 1 col mobile, 3 cols desktop
        - Uses semantic h2 heading
        - 3 pricing tiers with expandable details
        - "View Pricing Details" button toggles additional info
      */}
      <Pricing />

      {/* 
        CONTACT FORM SECTION
        - Responsive layout: stacked mobile, side-by-side desktop
        - Uses semantic h2 heading
        - Contact form (name, email, company, budget, message)
        - Calendar booking CTA card
      */}
      <ContactForm />

      {/* 
        FOOTER
        - Responsive grid layout
        - Social media links, newsletter signup, legal links
        - Copyright information
      */}
      <Footer />
    </main>
  )
}
