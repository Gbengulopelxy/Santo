// components/layout/Header.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"
import CountrySelector, { countries, type Country } from "@/components/shared/CountrySelector"
import SocialLinks from "@/components/shared/SocialLinks"
import { scrollToSection } from "@/lib/smoothScroll"
import { trackCTAClick } from "@/components/analytics/Analytics"

const navItems = [
  { label: "About Us", href: "#about" },
  { label: "Business Strategy", href: "#services" },
  { label: "Keynote Speaker", href: "#keynote" },
  { label: "Books", href: "#books" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])

  const handleBookMeeting = () => {
    trackCTAClick("Book Meeting", "Header")
    scrollToSection("contact")
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBookMeeting = () => {
    trackCTAClick("Book Meeting", "Header")
    scrollToSection("contact")
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-forbes-blue bg-clip-text text-transparent"
            >
              Strategic
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary text-sm font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Country Selector */}
            <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              variant="desktop"
            />

            {/* Social Media Icons */}
            <SocialLinks variant="desktop" showQR={true} />

            {/* Book Meeting Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleBookMeeting}
                className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2 text-sm font-semibold shadow-lg shadow-secondary/30"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Meeting
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Social Icons (Mobile) */}
            <SocialLinks variant="mobile" showQR={false} limit={3} />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
              }}
              className="text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-menu"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* Navigation Links */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-primary py-2 text-base font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Country Selector (Mobile) */}
              <div className="pt-4 border-t border-gray-200">
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onCountryChange={(country) => {
                    setSelectedCountry(country)
                    setIsMobileMenuOpen(false)
                  }}
                  variant="mobile"
                />
              </div>

              {/* Social Media Icons (Mobile) */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-3">Follow Us</p>
                <SocialLinks variant="mobile" showQR={false} />
              </div>

              {/* Book Meeting Button (Mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-4"
              >
                <Button
                  onClick={handleBookMeeting}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 text-base font-semibold shadow-lg shadow-secondary/30"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Meeting
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

