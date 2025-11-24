// components/analytics/Analytics.tsx
"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Analytics component - ready for integration
 * Supports Google Analytics, Plausible, or custom analytics
 */
export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    if (typeof window !== "undefined") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return null
}

/**
 * Track page view
 */
export function trackPageView(url: string): void {
  if (typeof window === "undefined") return

  // Google Analytics 4
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: url,
    })
  }

  // Plausible Analytics
  if (typeof window.plausible !== "undefined") {
    window.plausible("pageview", { props: { path: url } })
  }

  // Custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview", url }),
    }).catch(console.error)
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
): void {
  if (typeof window === "undefined") return

  // Google Analytics 4
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, eventData)
  }

  // Plausible Analytics
  if (typeof window.plausible !== "undefined") {
    window.plausible(eventName, { props: eventData })
  }

  // Custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "event", name: eventName, data: eventData }),
    }).catch(console.error)
  }
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, success: boolean): void {
  trackEvent("form_submit", {
    form_name: formName,
    success,
  })
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (event: string, options?: { props?: Record<string, any> }) => void
  }
}

