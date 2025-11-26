# Component Structure

This document outlines the organized component structure for the landing page.

## Directory Structure

```
/app
  /page.tsx                    # Main landing page
  /layout.tsx                  # Root layout with providers
  /globals.css                 # Global styles

/components
  /layout                      # Layout components (Header, Footer, CookieBanner)
    - Header.tsx               # Navigation header with glassmorphism
    - Footer.tsx               # Footer with newsletter, social links, legal
    - CookieBanner.tsx         # GDPR-compliant cookie consent

  /sections                    # Page sections
    - HeroSection.tsx          # Hero section with video background
    - AboutSection.tsx         # About/Introduction section
    - FeaturesSection.tsx      # Features/Benefits section
    - PricingSection.tsx       # Pricing display section
    - CTASection.tsx           # Call-to-action sections
    - SocialProofSection.tsx   # Social proof and trust indicators

  /shared                      # Reusable shared components
    - VideoBackground.tsx      # Video background with parallax
    - SocialLinks.tsx          # Social media links with QR codes
    - CountrySelector.tsx      # Country/Region selector
    - AnimatedCounter.tsx      # Number counting animation

  /ui                          # shadcn/ui components
    - button.tsx
    - card.tsx
    - input.tsx
    - form.tsx
    - dialog.tsx
    - popover.tsx
    - select.tsx
    - textarea.tsx
    - toast.tsx
    - label.tsx
    - etc.

  /animations                  # Animation components
    - FadeInUp.tsx             # Fade-in-up scroll animation
    - Parallax.tsx             # Parallax scrolling component
    - AnimatedCounter.tsx     # (also in /shared)

  # Legacy components (still in use)
  - HeroContent.tsx            # Hero content (used by HeroSection)
  - Services.tsx               # Services section
  - CaseStudies.tsx            # Case studies section
  - Testimonials.tsx           # Testimonials carousel
  - Pricing.tsx                # Pricing "How it works" section
  - PricingDisplay.tsx         # Pricing display with VAT
  - ContactForm.tsx            # Contact form
  - FeaturesBenefitsDetailed.tsx
  - SocialProof.tsx            # (being replaced by SocialProofSection)
  - ParticleBackground.tsx     # Particle animation background
  - StructuredData.tsx        # SEO structured data
  - LegalComplianceSidebar.tsx # Legal terms sidebar
```

## Component Organization

### Layout Components (`/components/layout`)
Components that appear on every page or control page structure.

- **Header.tsx**: Sticky navigation with glassmorphism, country selector, social links, CTA button
- **Footer.tsx**: Newsletter signup, social media links, Free University, legal links, back-to-top
- **CookieBanner.tsx**: GDPR-compliant cookie consent with preferences management

### Section Components (`/components/sections`)
Main content sections of the landing page.

- **HeroSection.tsx**: Combines VideoBackground and HeroContent
- **AboutSection.tsx**: Two-column layout with headshot, bio, credentials, animated counters
- **FeaturesSection.tsx**: Grid of feature cards with hover effects
- **PricingSection.tsx**: Combines Pricing and PricingDisplay components
- **CTASection.tsx**: Reusable call-to-action sections with variants
- **SocialProofSection.tsx**: Forbes banner, sticky side panel, trust indicators

### Shared Components (`/components/shared`)
Reusable components used across multiple sections.

- **VideoBackground.tsx**: Video background with parallax effect and fallbacks
- **SocialLinks.tsx**: Social media icons with QR code popovers (desktop/mobile/footer variants)
- **CountrySelector.tsx**: Country/region selector with flags (desktop/mobile variants)
- **AnimatedCounter.tsx**: Number counting animation for statistics

### UI Components (`/components/ui`)
shadcn/ui base components for building interfaces.

## Usage Examples

### Using Section Components
```tsx
import HeroSection from "@/components/sections/HeroSection"
import AboutSection from "@/components/sections/AboutSection"

export default function Page() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  )
}
```

### Using Shared Components
```tsx
import SocialLinks from "@/components/shared/SocialLinks"
import CountrySelector, { countries } from "@/components/shared/CountrySelector"

// Desktop variant
<SocialLinks variant="desktop" showQR={true} />

// Footer variant
<SocialLinks variant="footer" showQR={true} />
```

### Using Layout Components
```tsx
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CookieBanner from "@/components/layout/CookieBanner"

// In layout.tsx
<Header />
{children}
<Footer />
<CookieBanner />
```

## Import Paths

All components use absolute imports with `@/` alias:

- Layout: `@/components/layout/Header`
- Sections: `@/components/sections/HeroSection`
- Shared: `@/components/shared/SocialLinks`
- UI: `@/components/ui/button`
- Animations: `@/components/animations/FadeInUp`

## Migration Notes

### Old Structure → New Structure
- `Navigation.tsx` → `layout/Header.tsx`
- `Footer.tsx` → `layout/Footer.tsx`
- `CookieConsent.tsx` → `layout/CookieBanner.tsx`
- `VideoHero.tsx` → `shared/VideoBackground.tsx`
- `About.tsx` → `sections/AboutSection.tsx`
- `Features.tsx` → `sections/FeaturesSection.tsx`
- `CTA.tsx` → `sections/CTASection.tsx`
- `SocialProof.tsx` → `sections/SocialProofSection.tsx`
- `animations/AnimatedCounter.tsx` → `shared/AnimatedCounter.tsx`

### New Shared Components
- `shared/CountrySelector.tsx` - Extracted from Header
- `shared/SocialLinks.tsx` - Extracted from Header and Footer

## Benefits

1. **Organization**: Clear separation of concerns
2. **Reusability**: Shared components can be used anywhere
3. **Maintainability**: Easy to find and update components
4. **Scalability**: Easy to add new sections or shared components
5. **Consistency**: Standardized import paths and naming



