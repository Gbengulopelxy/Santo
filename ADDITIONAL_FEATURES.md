# Additional Features Documentation

This document outlines the additional features implemented for the Strategic Business Consulting website.

## 1. Smooth Scroll to Sections

### Implementation
Smooth scrolling is implemented using CSS and JavaScript utilities.

**Files:**
- `lib/smoothScroll.ts` - Smooth scroll utility functions
- `app/globals.css` - CSS smooth scroll behavior

### Usage

```tsx
import { scrollToSection } from "@/lib/smoothScroll"

// Scroll to a section by ID
scrollToSection("contact")

// With options
scrollToSection("contact", {
  offset: 100,
  behavior: "smooth",
  onComplete: () => console.log("Scrolled!")
})
```

### Features
- ✅ Smooth scroll behavior
- ✅ Offset for fixed header (80px default)
- ✅ Automatic anchor link handling
- ✅ Respects `prefers-reduced-motion`

## 2. Dynamic Region-Based Content

### Implementation
Region-based content system that adapts pricing, currency, VAT, and legal content based on selected region.

**Files:**
- `contexts/RegionContext.tsx` - Region context provider

### Supported Regions
- **UK**: GBP, 20% VAT
- **Isle of Man**: GBP, No VAT
- **Jersey**: GBP, No VAT
- **Worldwide**: USD, No VAT

### Usage

```tsx
import { useRegion } from "@/contexts/RegionContext"

function PricingComponent() {
  const { region, content, isVatApplicable } = useRegion()
  
  return (
    <div>
      <p>Price: {content.pricing.base}</p>
      {isVatApplicable && <p>VAT: {content.vatRate}%</p>}
      <p>Currency: {content.currencySymbol}</p>
    </div>
  )
}
```

### Features
- ✅ Automatic region detection from country selector
- ✅ Dynamic pricing display
- ✅ VAT calculation
- ✅ Currency formatting
- ✅ Region-specific legal links
- ✅ Timezone information

## 3. Multi-Language Support Preparation

### Implementation
i18n structure prepared for future multi-language implementation.

**Files:**
- `lib/i18n.ts` - Internationalization utilities

### Supported Locales (Prepared)
- English (en) - Default
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Chinese (zh)
- Japanese (ja)

### Usage

```tsx
import { getLocale, formatDate, formatCurrency } from "@/lib/i18n"

const locale = getLocale()
const date = formatDate(new Date(), locale)
const price = formatCurrency(5000, "GBP", locale)
```

### Features
- ✅ Locale detection
- ✅ Locale storage
- ✅ Date formatting
- ✅ Currency formatting
- ✅ Text direction support (LTR/RTL)
- ✅ Translation key structure ready

### Next Steps
To implement full i18n:
1. Install `next-intl` or `react-i18next`
2. Create translation files for each locale
3. Wrap app with i18n provider
4. Replace hardcoded strings with translation keys

## 4. Analytics Integration Ready

### Implementation
Analytics component ready for Google Analytics, Plausible, or custom analytics.

**Files:**
- `components/analytics/Analytics.tsx` - Analytics component

### Supported Analytics
- Google Analytics 4 (GA4)
- Plausible Analytics
- Custom analytics endpoint

### Environment Variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ANALYTICS_ENDPOINT=https://your-endpoint.com/track
```

### Usage

```tsx
import { trackEvent, trackCTAClick, trackFormSubmission } from "@/components/analytics/Analytics"

// Track custom event
trackEvent("button_click", { button_name: "CTA" })

// Track CTA click
trackCTAClick("Book Meeting", "Header")

// Track form submission
trackFormSubmission("contact", true)
```

### Features
- ✅ Automatic page view tracking
- ✅ Custom event tracking
- ✅ Form submission tracking
- ✅ CTA click tracking
- ✅ Multiple analytics providers support

## 5. Contact Form with Email Notification

### Implementation
Contact form with email notifications using Resend API.

**Files:**
- `app/api/contact/route.ts` - Contact form API route
- `components/ContactForm.tsx` - Contact form component

### Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=admin@yourdomain.com
```

### Features
- ✅ Form validation
- ✅ Email notification to admin
- ✅ Confirmation email to user
- ✅ GDPR consent handling
- ✅ Error handling
- ✅ Success/error states

### Email Templates

**Admin Notification:**
- Sender name and email
- Company and budget (if provided)
- Full message
- GDPR consent status
- Timestamp

**User Confirmation:**
- Personalized greeting
- Confirmation message
- Copy of submitted message
- Professional signature

### Setup

1. Sign up for Resend: https://resend.com
2. Get your API key
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@yourdomain.com
   TO_EMAIL=admin@yourdomain.com
   ```
4. Install Resend: `npm install resend`

## 6. Calendar Booking Integration (Calendly)

### Implementation
Calendly widget integration for booking consultations.

**Files:**
- `components/booking/CalendlyWidget.tsx` - Calendly widget component

### Environment Variables

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
```

### Usage

```tsx
import CalendlyWidget from "@/components/booking/CalendlyWidget"

// Inline widget
<CalendlyWidget
  url="https://calendly.com/strategic-consulting/consultation"
  inline={true}
  height="700px"
/>

// Popup widget (default)
<CalendlyWidget
  url="https://calendly.com/strategic-consulting/consultation"
  buttonText="Book Your Free Strategy Call"
/>
```

### Features
- ✅ Inline embed mode
- ✅ Popup widget mode
- ✅ Custom button text
- ✅ Custom styling
- ✅ Fallback to new tab
- ✅ Automatic script loading

### Setup

1. Create a Calendly account: https://calendly.com
2. Create an event type (e.g., "Consultation")
3. Get your Calendly URL
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/consultation
   ```

## Integration Guide

### 1. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### 2. Install Dependencies

```bash
npm install resend
```

### 3. Configure Services

#### Email (Resend)
1. Sign up at https://resend.com
2. Verify your domain
3. Get API key
4. Add to `.env.local`

#### Analytics
1. Set up Google Analytics or Plausible
2. Get tracking ID
3. Add to `.env.local`

#### Calendly
1. Create Calendly account
2. Create event type
3. Get URL
4. Add to `.env.local`

### 4. Test Features

- ✅ Test smooth scroll navigation
- ✅ Test region selector changes
- ✅ Test contact form submission
- ✅ Test email notifications
- ✅ Test Calendly widget
- ✅ Test analytics tracking

## Component Integration

### Header Navigation
- Smooth scroll to sections
- Analytics tracking on CTA clicks

### Contact Form
- Email notifications
- Analytics tracking
- Success/error handling

### CTAs Throughout Site
- Calendly integration ready
- Analytics tracking
- Smooth scroll to contact

## Best Practices

1. **Email Service**: Use Resend or similar service for reliable delivery
2. **Analytics**: Respect user privacy (GDPR compliance)
3. **Calendly**: Customize event types for different consultation types
4. **Smooth Scroll**: Test on different devices and browsers
5. **Region Content**: Keep pricing and legal content up to date
6. **i18n**: Plan translation strategy before implementing

## Troubleshooting

### Email Not Sending
- Check Resend API key is correct
- Verify domain is verified in Resend
- Check spam folder
- Review Resend dashboard for errors

### Analytics Not Tracking
- Verify tracking ID is correct
- Check browser console for errors
- Ensure analytics script is loaded
- Test with browser extensions disabled

### Calendly Not Loading
- Check Calendly URL is correct
- Verify script is loading
- Check browser console for errors
- Test in incognito mode

### Smooth Scroll Not Working
- Check section IDs exist
- Verify CSS smooth scroll is enabled
- Test with JavaScript enabled
- Check for conflicting scroll libraries

