// components/booking/CalendlyWidget.tsx
"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendlyWidgetProps {
  /** Calendly username or event URL */
  url?: string
  /** Event type (if using username) */
  eventType?: string
  /** Widget height */
  height?: string
  /** Inline embed or popup */
  inline?: boolean
  /** Custom button text */
  buttonText?: string
  /** Custom button variant */
  variant?: "default" | "outline" | "secondary" | "ghost"
}

/**
 * Calendly booking widget component
 * Supports both inline embed and popup modes
 */
export default function CalendlyWidget({
  url = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/strategic-consulting/consultation",
  eventType,
  height = "700px",
  inline = false,
  buttonText = "Book Your Free Strategy Call",
  variant = "default",
}: CalendlyWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showWidget, setShowWidget] = useState(inline)

  useEffect(() => {
    // Load Calendly script
    if (!isLoaded) {
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      script.onload = () => setIsLoaded(true)
      document.body.appendChild(script)

      return () => {
        // Cleanup
        const existingScript = document.querySelector(
          'script[src="https://assets.calendly.com/assets/external/widget.js"]'
        )
        if (existingScript) {
          document.body.removeChild(existingScript)
        }
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded && showWidget && typeof window !== "undefined") {
      // Initialize Calendly widget
      if (window.Calendly) {
        const calendlyUrl = eventType
          ? `${url}/${eventType}`
          : url

        if (inline) {
          window.Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: document.getElementById("calendly-inline-widget"),
          })
        } else {
          window.Calendly.initPopupWidget({
            url: calendlyUrl,
          })
        }
      }
    }
  }, [isLoaded, showWidget, url, eventType, inline])

  const handleButtonClick = () => {
    if (inline) {
      setShowWidget(true)
    } else if (isLoaded && window.Calendly) {
      const calendlyUrl = eventType ? `${url}/${eventType}` : url
      window.Calendly.initPopupWidget({
        url: calendlyUrl,
      })
    } else {
      // Fallback: open in new tab
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  if (inline && showWidget) {
    return (
      <div className="w-full">
        <div
          id="calendly-inline-widget"
          className="calendly-inline-widget"
          style={{ minWidth: "320px", height }}
        />
      </div>
    )
  }

  return (
    <div className="w-full">
      <Button
        onClick={handleButtonClick}
        variant={variant}
        size="lg"
        className="w-full md:w-auto"
      >
        <Calendar className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>
    </div>
  )
}

// Extend Window interface for Calendly
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement | null
      }) => void
    }
  }
}



