// components/shared/CountrySelector.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"

export interface Country {
  code: string
  name: string
  flag: string
}

export const countries: Country[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IM", name: "Isle of Man", flag: "🇮🇲" },
  { code: "JE", name: "Jersey", flag: "🇯🇪" },
  { code: "WW", name: "Worldwide", flag: "🌍" },
]

interface CountrySelectorProps {
  selectedCountry: Country
  onCountryChange: (country: Country) => void
  variant?: "desktop" | "mobile"
}

export default function CountrySelector({
  selectedCountry,
  onCountryChange,
  variant = "desktop",
}: CountrySelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={variant === "desktop" 
            ? "text-gray-700 hover:text-primary hover:bg-gray-100 h-9 px-3"
            : "w-full justify-between text-gray-700 hover:text-primary hover:bg-gray-100 h-12"
          }
        >
          <span className="mr-2 text-lg">{selectedCountry.flag}</span>
          <span className={`text-sm font-medium ${variant === "desktop" ? "hidden xl:inline" : ""}`}>
            {selectedCountry.name}
          </span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2 bg-white backdrop-blur-md border-gray-200 shadow-lg">
        <div className="space-y-1">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => onCountryChange(country)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCountry.code === country.code
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-primary"
              }`}
            >
              <span className="text-xl">{country.flag}</span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

