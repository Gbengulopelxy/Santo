// contexts/RegionContext.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Region = "UK" | "Isle of Man" | "Jersey" | "Worldwide"

interface RegionContent {
  currency: string
  currencySymbol: string
  vatRate: number
  vatLabel: string
  phoneFormat: string
  timezone: string
  pricing: {
    base: string
    withVat: string
    withoutVat: string
  }
  cta: {
    primary: string
    secondary: string
  }
  legal: {
    termsUrl: string
    privacyUrl: string
  }
}

const regionContent: Record<Region, RegionContent> = {
  UK: {
    currency: "GBP",
    currencySymbol: "£",
    vatRate: 20,
    vatLabel: "VAT",
    phoneFormat: "+44",
    timezone: "Europe/London",
    pricing: {
      base: "£5,000",
      withVat: "£6,000",
      withoutVat: "£5,000",
    },
    cta: {
      primary: "Book Your Free Strategy Call",
      secondary: "Get Started Today",
    },
    legal: {
      termsUrl: "/terms-uk",
      privacyUrl: "/privacy-uk",
    },
  },
  "Isle of Man": {
    currency: "GBP",
    currencySymbol: "£",
    vatRate: 0,
    vatLabel: "No VAT",
    phoneFormat: "+44",
    timezone: "Europe/Isle_of_Man",
    pricing: {
      base: "£5,000",
      withVat: "£5,000",
      withoutVat: "£5,000",
    },
    cta: {
      primary: "Book Your Free Strategy Call",
      secondary: "Get Started Today",
    },
    legal: {
      termsUrl: "/terms-iom",
      privacyUrl: "/privacy-iom",
    },
  },
  Jersey: {
    currency: "GBP",
    currencySymbol: "£",
    vatRate: 0,
    vatLabel: "No VAT",
    phoneFormat: "+44",
    timezone: "Europe/Jersey",
    pricing: {
      base: "£5,000",
      withVat: "£5,000",
      withoutVat: "£5,000",
    },
    cta: {
      primary: "Book Your Free Strategy Call",
      secondary: "Get Started Today",
    },
    legal: {
      termsUrl: "/terms-jersey",
      privacyUrl: "/privacy-jersey",
    },
  },
  Worldwide: {
    currency: "USD",
    currencySymbol: "$",
    vatRate: 0,
    vatLabel: "No VAT",
    phoneFormat: "+1",
    timezone: "UTC",
    pricing: {
      base: "$6,500",
      withVat: "$6,500",
      withoutVat: "$6,500",
    },
    cta: {
      primary: "Book Your Free Strategy Call",
      secondary: "Get Started Today",
    },
    legal: {
      termsUrl: "/terms",
      privacyUrl: "/privacy",
    },
  },
}

interface RegionContextType {
  region: Region
  setRegion: (region: Region) => void
  content: RegionContent
  isVatApplicable: boolean
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>("UK")

  // Listen for country changes from Header component
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateRegion = (countryName: string) => {
      const countryToRegion: Record<string, Region> = {
        "United Kingdom": "UK",
        "Isle of Man": "Isle of Man",
        "Jersey": "Jersey",
        "Worldwide": "Worldwide",
      }
      setRegion(countryToRegion[countryName] || "UK")
    }

    // Check initial value
    const storedCountry = localStorage.getItem("selectedCountry")
    if (storedCountry) {
      updateRegion(storedCountry)
    }

    // Listen for storage events (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "selectedCountry" && e.newValue) {
        updateRegion(e.newValue)
      }
    }

    // Listen for custom events (from same window)
    const handleCustomStorage = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; newValue: string }>
      if (customEvent.detail?.key === "selectedCountry" && customEvent.detail?.newValue) {
        updateRegion(customEvent.detail.newValue)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("countryChanged", handleCustomStorage as EventListener)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("countryChanged", handleCustomStorage as EventListener)
    }
  }, [])

  const content = regionContent[region]
  const isVatApplicable = content.vatRate > 0

  return (
    <RegionContext.Provider value={{ region, setRegion, content, isVatApplicable }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}

