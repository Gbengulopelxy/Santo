// components/HeroContent.tsx
"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, TrendingUp, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface HeroContentProps {
  /** Primary CTA click handler */
  onPrimaryCtaClick?: () => void
}

const valuePropositions = [
  {
    icon: CheckCircle2,
    text: "Business Review & Assessment",
  },
  {
    icon: CheckCircle2,
    text: "Implementing Strategy",
  },
  {
    icon: CheckCircle2,
    text: "Taking Your Business To The Next Level",
  },
]

export default function HeroContent({
  onPrimaryCtaClick,
}: HeroContentProps) {
  const handlePrimaryClick = () => {
    if (onPrimaryCtaClick) {
      onPrimaryCtaClick()
    } else {
      // Default behavior: scroll to contact section
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        {/* Animated Attention-Grabber Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border border-primary/30 rounded-full text-primary text-sm font-semibold backdrop-blur-sm shadow-lg shadow-primary/20"
        >
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="w-2 h-2 bg-primary rounded-full"
          />
          <Sparkles className="h-4 w-4" />
          <span>Limited Availability - Book Your Free Call Now</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading-bold text-white mb-6 leading-tight drop-shadow-2xl"
        >
          <span className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent">
            Transform Your Business From{" "}
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
            5 Figures to 6 Figures Monthly
          </span>
        </motion.h1>

        {/* Subheadline with Forbes Badge */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-forbes-blue/20 to-forbes-blue/10 backdrop-blur-md rounded-xl border border-forbes-blue/30 shadow-lg"
          >
            {/* Forbes Logo - Replace with actual Forbes logo image if available */}
            <div className="text-2xl font-heading-bold tracking-wider" style={{ color: '#0066CC' }}>FORBES</div>
            <div className="w-px h-7 bg-white/40" />
            <span className="text-sm sm:text-base text-white font-accent-semibold">Official Business Counsellor</span>
          </motion.div>
        </motion.div>

        {/* Value Proposition List */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10"
        >
          {valuePropositions.map((prop, index) => {
            const Icon = prop.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
              >
                <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/90 text-sm sm:text-base font-medium">{prop.text}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Primary CTA */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              size="lg"
              className="text-lg sm:text-xl px-8 sm:px-12 py-7 sm:py-8 bg-gradient-to-r from-secondary via-secondary/90 to-secondary hover:from-secondary/90 hover:via-secondary/80 hover:to-secondary/90 text-white shadow-2xl shadow-secondary/30 hover:shadow-secondary/40 transition-all duration-300 group font-bold"
              onClick={handlePrimaryClick}
              aria-label="Book a free call"
            >
              <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-center">
                Book A Free Call! Worst Case Scenario You Leave With Info Worth 6 Figures
              </span>
              <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-full"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-white/70 cursor-pointer group"
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }}
          >
            <span className="text-xs font-medium group-hover:text-white transition-colors">Scroll to explore</span>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="group-hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
