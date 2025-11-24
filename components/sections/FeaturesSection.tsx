// components/Features.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import FadeInUp from "@/components/animations/FadeInUp"
import { 
  TrendingUp, 
  Lightbulb, 
  Sparkles, 
  Target, 
  CheckCircle2,
  ArrowRight
} from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "Revenue Growth Strategies",
    description: "Data-driven approaches to scale your revenue from 5 to 6 figures monthly. Proven methodologies that identify untapped opportunities and optimize your revenue streams for sustainable growth.",
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/30",
  },
  {
    icon: Lightbulb,
    title: "Strategic Expertise",
    description: "Leverage 15+ years of experience and Forbes Business Council insights to develop winning strategies. Expert guidance that transforms challenges into competitive advantages.",
    color: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-400",
    borderColor: "border-yellow-500/30",
  },
  {
    icon: Sparkles,
    title: "Brand Enhancement",
    description: "Elevate your brand positioning and market presence. Strategic brand development that resonates with your target audience and differentiates you from competitors.",
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Target,
    title: "Mission Alignment",
    description: "Align your business operations, team, and resources with your core mission and values. Create cohesive strategies that drive both profit and purpose.",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30",
  },
  {
    icon: CheckCircle2,
    title: "Sustainable Success",
    description: "Build long-term, sustainable growth that withstands market changes. Implement systems and processes that ensure continued success beyond initial transformation.",
    color: "from-primary/20 to-primary/10",
    iconColor: "text-primary",
    borderColor: "border-primary/30",
  },
]

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Key Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Transform Your Business with
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent"> Proven Strategies</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to accelerate your growth and maximize your potential
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card */}
                <div className={`relative h-full bg-gradient-to-br ${feature.color} backdrop-blur-sm border ${feature.borderColor} rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 ease-in-out overflow-hidden card-micro`}>
                  {/* Animated Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 border ${feature.borderColor} group-hover:border-opacity-60 transition-all duration-300`}
                    >
                      <Icon className={`h-8 w-8 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                      {feature.description}
                    </p>

                    {/* Learn More Link */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Experience These Benefits?
            </h3>
            <p className="text-slate-300 mb-6">
              Book a free strategy call and discover how we can transform your business
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300">
                Get Started Today
                <ArrowRight className="inline-block ml-2 h-5 w-5" />
              </button>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

