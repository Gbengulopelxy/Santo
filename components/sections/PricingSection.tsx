// components/sections/PricingSection.tsx
"use client"

import Pricing from "@/components/Pricing"
import PricingDisplay from "@/components/PricingDisplay"

interface PricingSectionProps {
  selectedCountry?: string
}

export default function PricingSection({ selectedCountry = "GB" }: PricingSectionProps) {
  return (
    <>
      <Pricing />
      <PricingDisplay selectedCountry={selectedCountry} />
    </>
  )
}

