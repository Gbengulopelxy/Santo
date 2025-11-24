// components/CTA.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, TrendingUp, Sparkles } from "lucide-react"

interface CTAProps {
  variant?: "primary" | "secondary" | "minimal"
  title?: string
  description?: string
  buttonText?: string
  showIcon?: boolean
  className?: string
}

export default function CTA({
  variant = "primary",
  title = "Ready to Transform Your Business?",
  description = "Book a free strategy call and discover how we can help you achieve your goals.",
  buttonText = "Book Free Strategy Call",
  showIcon = true,
  className = "",
}: CTAProps) {
  const handleClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const variants = {
    primary: "bg-gradient-to-r from-secondary via-secondary/90 to-secondary",
    secondary: "bg-gradient-to-r from-gray-700 to-gray-600",
    minimal: "bg-transparent border-2 border-primary",
  }

  const textVariants = {
    primary: "text-white",
    secondary: "text-white",
    minimal: "text-primary",
  }

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-center ${className}`}
      >
        <Button
          onClick={handleClick}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          {showIcon && <Calendar className="mr-2 h-5 w-5" />}
          {buttonText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`py-16 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-12 backdrop-blur-sm relative overflow-hidden shadow-lg">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 text-center">
              {variant === "primary" && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/20 border border-primary/30 rounded-full text-primary text-sm font-medium"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Limited Availability</span>
                </motion.div>
              )}

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading-bold text-gray-900 mb-4">
                {title}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98, y: 0 }}
                className="inline-block"
              >
                <Button
                  onClick={handleClick}
                  size="lg"
                  className={`${variants[variant]} ${textVariants[variant]} px-8 py-7 text-lg font-semibold shadow-2xl shadow-secondary/30 hover:shadow-secondary/40 transition-all duration-300 btn-micro`}
                >
                  {showIcon && <Calendar className="mr-2 h-5 w-5" />}
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              {variant === "primary" && (
                <p className="text-sm text-gray-600 mt-6">
                  No obligation • Free consultation • Expert insights
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

