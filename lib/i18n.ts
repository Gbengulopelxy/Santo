// lib/i18n.ts
/**
 * Internationalization (i18n) preparation
 * Ready for multi-language support implementation
 */

export type Locale = "en" | "es" | "fr" | "de" | "it" | "pt" | "zh" | "ja"

export const defaultLocale: Locale = "en"

export const supportedLocales: Locale[] = [
  "en", // English
  "es", // Spanish
  "fr", // French
  "de", // German
  "it", // Italian
  "pt", // Portuguese
  "zh", // Chinese
  "ja", // Japanese
]

export interface Translations {
  [key: string]: string | Translations
}

// Translation keys structure (ready for implementation)
export const translationKeys = {
  // Navigation
  nav: {
    about: "About Us",
    services: "Business Strategy",
    keynote: "Keynote Speaker",
    books: "Books",
    blog: "Blog",
    contact: "Contact",
  },
  // Hero Section
  hero: {
    title: "Transform Your Business From 5 Figures to 6 Figures Monthly",
    subtitle: "Official Forbes Business Counsellor",
    cta: "Book A Free Call! Worst Case Scenario You Leave With Info Worth 6 Figures",
  },
  // Common
  common: {
    readMore: "Read More",
    learnMore: "Learn More",
    getStarted: "Get Started",
    bookMeeting: "Book Meeting",
    contactUs: "Contact Us",
    submit: "Submit",
    cancel: "Cancel",
    close: "Close",
  },
  // Forms
  form: {
    name: "Full Name",
    email: "Email",
    phone: "Phone Number",
    company: "Company",
    message: "Message",
    required: "Required",
    optional: "Optional",
    submit: "Submit",
    submitting: "Submitting...",
    success: "Message sent successfully!",
    error: "Something went wrong. Please try again.",
  },
} as const

/**
 * Get locale from browser or default
 */
export function getLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale

  const browserLang = navigator.language.split("-")[0]
  return supportedLocales.includes(browserLang as Locale)
    ? (browserLang as Locale)
    : defaultLocale
}

/**
 * Store locale preference
 */
export function setLocale(locale: Locale): void {
  if (typeof window === "undefined") return
  localStorage.setItem("locale", locale)
}

/**
 * Get stored locale preference
 */
export function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("locale")
  return stored && supportedLocales.includes(stored as Locale)
    ? (stored as Locale)
    : null
}

/**
 * Format date according to locale
 */
export function formatDate(date: Date, locale: Locale = defaultLocale): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

/**
 * Format currency according to locale and region
 */
export function formatCurrency(
  amount: number,
  currency: string = "GBP",
  locale: Locale = defaultLocale
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount)
}

/**
 * Get locale-specific text direction
 */
export function getTextDirection(locale: Locale): "ltr" | "rtl" {
  const rtlLocales: Locale[] = ["ar", "he", "fa", "ur"]
  return rtlLocales.includes(locale) ? "rtl" : "ltr"
}


