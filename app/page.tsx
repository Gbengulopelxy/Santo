// app/page.tsx
"use client"

/**
 * Main landing page for Strategic Business Consulting
 * 
 * This page uses the new component structure:
 * - /components/layout: Header, Footer, CookieBanner
 * - /components/sections: HeroSection, AboutSection, FeaturesSection, etc.
 * - /components/shared: VideoBackground, SocialLinks, CountrySelector, AnimatedCounter
 */

import HeroSection from "@/components/sections/HeroSection"
import SocialProofSection from "@/components/sections/SocialProofSection"
import AboutSection from "@/components/sections/AboutSection"
import Services from "@/components/Services"
import FeaturesSection from "@/components/sections/FeaturesSection"
import FeaturesBenefitsDetailed from "@/components/FeaturesBenefitsDetailed"
import CTASection from "@/components/sections/CTASection"
import CaseStudies from "@/components/CaseStudies"
import Testimonials from "@/components/Testimonials"
import PricingSection from "@/components/sections/PricingSection"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/layout/Footer"

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-white" tabIndex={-1}>
      <HeroSection />

      <SocialProofSection />

      <AboutSection />

      <Services />

      <FeaturesSection />

      <FeaturesBenefitsDetailed />

      <CTASection
        title="Ready to Scale Your Business?"
        description="Book a free strategy call with a Forbes Business Council member and unlock your next level of growth."
        buttonText="Book Your Free Strategy Call"
        variant="primary"
        className="mt-24"
      />

      <CaseStudies />

      <Testimonials />

      <CTASection
        title="What Are You Waiting For?"
        description="Don't let your competitors get ahead. Take action today and transform your business with expert guidance."
        buttonText="Get Started Now"
        variant="secondary"
        className="mt-24"
      />

      <PricingSection />

      <CTASection
        title="Still Have Questions?"
        description="Reach out to us directly. We're here to provide clarity and guide you towards your business objectives."
        buttonText="Contact Our Team"
        variant="minimal"
        className="mt-24"
      />

      <ContactForm />

      <Footer />
    </main>
  )
}
