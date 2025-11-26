// components/accessibility/KeyboardNavigation.tsx
"use client"

import { useEffect } from "react"

/**
 * Keyboard navigation utilities for WCAG 2.1 AA compliance
 * Implements keyboard navigation support for interactive elements
 */
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to close modals/dropdowns
      if (e.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement
        if (activeElement?.getAttribute("role") === "dialog") {
          const closeButton = activeElement.querySelector('[aria-label*="close" i]')
          if (closeButton instanceof HTMLElement) {
            closeButton.click()
          }
        }
      }

      // Enter/Space on buttons and links
      if (e.key === "Enter" || e.key === " ") {
        const target = e.target as HTMLElement
        if (target.tagName === "BUTTON" || target.tagName === "A") {
          if (e.key === " ") {
            e.preventDefault() // Prevent page scroll on space
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])
}

/**
 * Hook to trap focus within a modal or dropdown
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isOpen: boolean) {
  useEffect(() => {
    if (!isOpen || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener("keydown", handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen, containerRef])
}



