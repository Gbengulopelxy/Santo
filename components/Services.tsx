// components/Services.tsx
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Target, 
  TrendingUp, 
  Users, 
  BarChart3,
  Lightbulb,
  Zap,
  Network,
  Briefcase,
  ArrowRight
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Business Strategy Consulting Services
const services = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Develop comprehensive strategic plans that align with your vision, market position, and long-term objectives. We create actionable roadmaps that drive measurable results.",
    features: ["Market Analysis", "Competitive Positioning", "Goal Setting"],
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    description: "Accelerate your business growth with data-driven strategies for market expansion, revenue optimization, and sustainable scaling across all business functions.",
    features: ["Revenue Growth", "Market Expansion", "Scalability Planning"],
  },
  {
    icon: Users,
    title: "Organizational Development",
    description: "Transform your organizational structure, culture, and capabilities to support strategic objectives and drive high-performance teams.",
    features: ["Team Optimization", "Culture Transformation", "Leadership Development"],
  },
  {
    icon: BarChart3,
    title: "Performance Optimization",
    description: "Identify and eliminate inefficiencies, optimize processes, and improve operational performance to maximize profitability and competitive advantage.",
    features: ["Process Improvement", "Cost Optimization", "Efficiency Gains"],
  },
  {
    icon: Lightbulb,
    title: "Innovation Strategy",
    description: "Foster innovation and digital transformation initiatives that keep your business ahead of the curve and responsive to market changes.",
    features: ["Digital Transformation", "Innovation Frameworks", "Technology Strategy"],
  },
  {
    icon: Briefcase,
    title: "Business Transformation",
    description: "Navigate major business transformations, mergers, acquisitions, and restructuring with expert guidance and change management support.",
    features: ["M&A Strategy", "Change Management", "Restructuring"],
  },
]

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
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-[#0f172a] via-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Zap className="h-4 w-4" />
            <span>Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Strategic Consulting Services
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive business strategy solutions tailored to your unique challenges and growth objectives
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="flex flex-col bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50 hover:border-primary/50 transition-all duration-500 group h-full">
                  <CardHeader className="pb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 border border-primary/30"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <CardDescription className="text-base text-slate-300 leading-relaxed">
                      {service.description}
                    </CardDescription>
                    
                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-slate-700/50">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors group-hover:gap-3"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Network className="h-12 w-12 text-primary mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Transform Your Business?
            </h3>
            <p className="text-slate-300 mb-6">
              Let's discuss how our strategic consulting services can drive your business forward.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="#contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
