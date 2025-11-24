// lib/smoothScroll.ts
/**
 * Smooth scroll utility functions
 * Provides smooth scrolling to sections with offset for fixed header
 */

export interface SmoothScrollOptions {
  /** Offset from top in pixels (default: 80) */
  offset?: number
  /** Scroll behavior (default: 'smooth') */
  behavior?: ScrollBehavior
  /** Callback after scroll completes */
  onComplete?: () => void
}

/**
 * Smoothly scroll to an element by ID
 */
export function scrollToSection(
  sectionId: string,
  options: SmoothScrollOptions = {}
): void {
  const { offset = 80, behavior = 'smooth', onComplete } = options

  const element = document.getElementById(sectionId)
  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior,
  })

  // Call onComplete after scroll animation (approximate duration)
  if (onComplete) {
    const duration = behavior === 'smooth' ? 800 : 0
    setTimeout(onComplete, duration)
  }
}

/**
 * Smoothly scroll to an element by selector
 */
export function scrollToElement(
  selector: string,
  options: SmoothScrollOptions = {}
): void {
  const element = document.querySelector(selector) as HTMLElement
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`)
    return
  }

  const sectionId = element.id || selector.replace(/[.#]/, '')
  scrollToSection(sectionId, options)
}

/**
 * Handle anchor link clicks with smooth scroll
 */
export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>): void {
  const href = e.currentTarget.getAttribute('href')
  if (!href || !href.startsWith('#')) return

  e.preventDefault()
  const sectionId = href.substring(1)
  scrollToSection(sectionId)
}

/**
 * Hook to add smooth scroll to all anchor links on mount
 */
export function initSmoothScroll(): () => void {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a[href^="#"]')
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href || href === '#') return

    e.preventDefault()
    const sectionId = href.substring(1)
    scrollToSection(sectionId)
  }

  document.addEventListener('click', handleClick)
  return () => document.removeEventListener('click', handleClick)
}

