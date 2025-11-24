// components/accessibility/SkipToMain.tsx
"use client"

import { useEffect, useRef } from "react"

/**
 * Skip to main content link for keyboard navigation
 * WCAG 2.1 AA compliance - Bypass Blocks (2.4.1)
 */
export default function SkipToMain() {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip link when Tab is pressed
      if (e.key === "Tab" && !e.shiftKey && linkRef.current) {
        linkRef.current.style.display = "block"
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const main = document.querySelector("main")
    if (main) {
      main.focus()
      main.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <a
      ref={linkRef}
      href="#main-content"
      onClick={handleClick}
      className="skip-to-main"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}


