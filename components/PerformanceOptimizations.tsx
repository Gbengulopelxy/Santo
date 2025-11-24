// components/PerformanceOptimizations.tsx
"use client"

import { useEffect } from "react"

/**
 * Performance optimization component
 * Implements various performance enhancements for Lighthouse 90+ scores
 */
export default function PerformanceOptimizations() {
  useEffect(() => {
    // Preconnect to external domains for faster loading
    const preconnectDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
    ]

    preconnectDomains.forEach((domain) => {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = domain
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    })

    // Prefetch critical resources
    const prefetchResources = [
      "/videos/Hero4.mp4",
      "/images/hero-poster.png",
    ]

    prefetchResources.forEach((resource) => {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = resource
      document.head.appendChild(link)
    })

    // Cleanup
    return () => {
      // Links are automatically cleaned up when component unmounts
    }
  }, [])

  return null
}

