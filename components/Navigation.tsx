// components/Navigation.tsx
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Menu, 
  X, 
  Calendar,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  ChevronDown,
  Globe
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface Country {
  code: string
  name: string
  flag: string
}

const countries: Country[] = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "IM", name: "Isle of Man", flag: "🇮🇲" },
  { code: "JE", name: "Jersey", flag: "🇯🇪" },
  { code: "WW", name: "Worldwide", flag: "🌍" },
]

const socialLinks = [
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/company/strategicconsulting", 
    label: "LinkedIn",
    qrValue: "https://linkedin.com/company/strategicconsulting"
  },
  { 
    icon: Twitter, 
    href: "https://twitter.com/strategicconsulting", 
    label: "Twitter",
    qrValue: "https://twitter.com/strategicconsulting"
  },
  { 
    icon: Instagram, 
    href: "https://instagram.com/strategicconsulting", 
    label: "Instagram",
    qrValue: "https://instagram.com/strategicconsulting"
  },
  { 
    icon: Facebook, 
    href: "https://facebook.com/strategicconsulting", 
    label: "Facebook",
    qrValue: "https://facebook.com/strategicconsulting"
  },
  { 
    icon: Youtube, 
    href: "https://youtube.com/@strategicconsulting", 
    label: "YouTube",
    qrValue: "https://youtube.com/@strategicconsulting"
  },
]

const navItems = [
  { label: "About Us", href: "#about" },
  { label: "Business Strategy", href: "#services" },
  { label: "Keynote Speaker", href: "#keynote" },
  { label: "Books", href: "#books" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleBookMeeting = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
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
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-primary hover:bg-gray-100 h-9 px-3"
                >
                  <span className="mr-2 text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium hidden xl:inline">{selectedCountry.name}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 bg-white backdrop-blur-md border-gray-200 shadow-lg">
                <div className="space-y-1">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => setSelectedCountry(country)}
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

            {/* Social Media Icons */}
            <div className="flex items-center space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Popover key={social.label}>
                    <PopoverTrigger asChild>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredSocial(social.label)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.a>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg"
                      onMouseEnter={() => setHoveredSocial(social.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <QRCodeSVG
                          value={social.qrValue}
                          size={120}
                          level="H"
                          includeMargin={true}
                          className="bg-white p-2 rounded-lg"
                        />
                        <p className="text-xs text-gray-600 text-center">
                          Scan to visit {social.label}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                )
              })}
            </div>

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
            <div className="flex items-center space-x-1">
              {socialLinks.slice(0, 3).map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-white/80 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-gray-700 hover:text-primary hover:bg-gray-100 h-12"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{selectedCountry.flag}</span>
                        <span className="text-base font-medium">{selectedCountry.name}</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 bg-white backdrop-blur-md border-gray-200 shadow-lg">
                    <div className="space-y-1">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country)
                            setIsMobileMenuOpen(false)
                          }}
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
              </div>

              {/* Social Media Icons (Mobile) */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm mb-3">Follow Us</p>
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    )
                  })}
                </div>
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

