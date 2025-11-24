// components/About.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Award, TrendingUp, Users, Target, CheckCircle2 } from "lucide-react"
import AnimatedCounter from "@/components/shared/AnimatedCounter"
import FadeInUp from "@/components/animations/FadeInUp"

const impactMetrics = [
  {
    icon: TrendingUp,
    value: 500,
    suffix: "+",
    label: "Businesses Transformed",
    color: "text-primary",
  },
  {
    icon: Users,
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    color: "text-primary",
  },
  {
    icon: Target,
    value: 95,
    suffix: "%",
    label: "Success Rate",
    color: "text-primary",
  },
  {
    icon: Award,
    value: 6,
    suffix: " Figures",
    label: "Monthly Revenue Achieved",
    color: "text-primary",
  },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column - Professional Headshot */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative">
              {/* Frame Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl transform rotate-3 blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-primary/20 rounded-2xl transform -rotate-3 blur-xl"></div>
              
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-[#1e293b] p-4 rounded-2xl border-2 border-primary/30 shadow-2xl"
              >
                {/* Professional Headshot */}
                <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl overflow-hidden">
                  <Image
                    src="/images/headshot.jpg"
                    alt="Professional headshot - Forbes Business Council Member"
                    fill
                    className="object-contain rounded-xl"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/30 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Section Title */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-heading-bold text-white leading-tight"
            >
              Take Action -{" "}
              <span className="font-accent-bold bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
                Reach Heights Never Imagined
              </span>
            </motion.h2>

            {/* Detailed Bio Content */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-lg text-slate-300 leading-relaxed"
            >
              <p>
                As an official member of the Forbes Business Council, I've dedicated over 15 years to transforming businesses from 5-figure operations into 6-figure monthly revenue generators. My proven methodology combines strategic insight, data-driven decision-making, and hands-on implementation to deliver measurable results.
              </p>
              <p>
                Through my work with 500+ companies across various industries, I've developed a unique approach that identifies growth opportunities, eliminates inefficiencies, and creates sustainable competitive advantages. Every business I work with receives personalized strategies tailored to their specific market, resources, and goals.
              </p>
              <p>
                My commitment extends beyond strategy development—I work alongside your team to ensure successful implementation, providing ongoing support and guidance as you scale. The results speak for themselves: 95% of businesses I've worked with have achieved their growth targets within the first 12 months.
              </p>
            </motion.div>

            {/* Legacy and Credibility Statements */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 pt-4 border-t border-slate-700/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0 mt-1">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-heading mb-1">Forbes Business Council Member</h3>
                  <p className="text-slate-400 text-sm">
                    Recognized as an official member of the exclusive Forbes Business Council, representing the top business leaders and entrepreneurs worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0 mt-1">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-heading mb-1">Proven Track Record</h3>
                  <p className="text-slate-400 text-sm">
                    Over a decade and a half of experience helping businesses scale, with a consistent record of delivering 6-figure monthly revenue transformations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0 mt-1">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-heading mb-1">Trusted by Industry Leaders</h3>
                  <p className="text-slate-400 text-sm">
                    Selected by 500+ companies worldwide to guide their strategic growth, from startups to established enterprises seeking transformation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Animated Counter - Impact Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-6"
            >
              {impactMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 ${metric.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl sm:text-3xl font-heading-bold text-white">
                          <AnimatedCounter
                            end={metric.value}
                            suffix={metric.suffix}
                            duration={2}
                          />
                        </div>
                        <div className="text-xs sm:text-sm text-slate-400 mt-1">
                          {metric.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

