// components/layout/Footer.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Mail,
  ArrowRight,
  ArrowUp,
  GraduationCap,
  BookOpen,
  CheckCircle2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SocialLinks from "@/components/shared/SocialLinks"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"
import { useDecision } from "@/contexts/DecisionContext"

const secondaryNav = [
  { label: "About Us", href: "#about" },
  { label: "Business Strategy", href: "#services" },
  { label: "Keynote Speaker", href: "#keynote" },
  { label: "Books", href: "#books" },
  { label: "Blog", href: "#blog" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
]

const universityModules = [
  "Strategic Planning Fundamentals",
  "Revenue Growth Strategies",
  "Market Analysis & Positioning",
  "Operational Excellence",
  "Team Building & Leadership",
  "Digital Transformation",
  "Financial Management",
  "Scaling Your Business",
  "Exit Strategies",
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { isFormComplete } = useDecision() // Decision Point 2: Show footer only when form is complete

  // Show/hide back to top button based on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      })
      return
    }

    setIsSubscribing(true)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed Successfully!",
        description: "You'll receive free updates and strategic insights.",
      })
      setEmail("")
      setIsSubscribing(false)
    }, 1000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Decision Point 2: Only show footer if form is complete
  if (!isFormComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white text-gray-900 border-t border-gray-200 py-12"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 text-sm">
            Complete the contact form above to access the footer section with additional resources.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <>
      <footer className="bg-gradient-to-b from-white to-gray-50 text-gray-900 border-t border-gray-200 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:20px_20px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Three-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-5 w-5 text-primary" />
                <h4 className="font-heading text-gray-900 text-lg">Free Updates</h4>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Get strategic insights, growth tips, and exclusive content delivered to your inbox. No spam, unsubscribe anytime.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubscribing}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white"
                >
                  {isSubscribing ? (
                    "Subscribing..."
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Subscribe for Free Updates
                    </>
                  )}
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </motion.div>

            {/* Column 2: Social Media Links with QR Codes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <SocialLinks variant="footer" showQR={true} showLabels={true} iconSize="lg" />
              
              {/* View My Publications Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6"
              >
                <a
                  href="https://www.santoshkumar.co.uk/books"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-[#8B0000] hover:bg-[#7A0000] transition-colors duration-300 rounded-lg overflow-hidden group"
                  >
                    {/* Top dark strip */}
                    <div className="h-1 bg-gray-900"></div>
                    
                    {/* Main button area */}
                    <div className="px-6 py-4 flex items-center justify-center">
                      <div className="border-2 border-white rounded px-6 py-3">
                        <span className="text-white font-bold text-base sm:text-lg tracking-wide">
                          View My Publications
                        </span>
                      </div>
                    </div>
                    
                    {/* Bottom light strip */}
                    <div className="h-1 bg-gray-200"></div>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>

            {/* Column 3: Free University Offering */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h4 className="font-heading text-gray-900 text-lg">Free University</h4>
              </div>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Access our comprehensive business strategy course with 30+ lessons across 9 modules. Learn proven strategies at your own pace.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>30+ Video Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>9 Comprehensive Modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Free Forever Access</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => {
                  // Link to university/course page
                  window.location.href = "#university"
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Access Free University
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="mt-3 text-xs text-gray-500">
                <p className="mb-1 font-semibold text-gray-600">Modules Include:</p>
                <ul className="space-y-1">
                  {universityModules.slice(0, 3).map((module, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      <span>{module}</span>
                    </li>
                  ))}
                  <li className="text-primary">+ 6 more modules</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Secondary Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="border-t border-slate-800 pt-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h4 className="font-semibold text-gray-900 text-sm">Navigation</h4>
              <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {secondaryNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-primary text-sm transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Terms & Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-slate-800 pt-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
              <a
                href="/terms"
                className="text-gray-600 hover:text-primary transition-colors underline"
              >
                Terms of Service
              </a>
              <span className="text-gray-400 hidden md:inline">•</span>
              <a
                href="/privacy"
                className="text-gray-600 hover:text-primary transition-colors underline"
              >
                Privacy Policy
              </a>
              <span className="text-gray-400 hidden md:inline">•</span>
              <a
                href="/data-protection"
                className="text-gray-600 hover:text-primary transition-colors underline"
              >
                Data Protection
              </a>
              <span className="text-gray-400 hidden md:inline">•</span>
              <a
                href="/cookies"
                className="text-gray-600 hover:text-primary transition-colors underline"
              >
                Cookie Policy
              </a>
            </div>
          </motion.div>

          {/* Bottom Bar with Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600"
          >
            <p>© {currentYear} Strategic Business Consulting. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/sitemap" className="hover:text-primary transition-colors">
                Sitemap
              </a>
              <span className="text-slate-600">•</span>
              <a href="/accessibility" className="hover:text-primary transition-colors">
                Accessibility
              </a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
