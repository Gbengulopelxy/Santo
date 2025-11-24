// components/Pricing.tsx - "HOW IT WORKS" SECTION
"use client"

import { Button } from "@/components/ui/button"
import { 
  Calendar, 
  Search, 
  Target, 
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface Step {
  number: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

const steps: Step[] = [
  {
    number: 1,
    title: "Initial Consultation",
    description: "Schedule a free 60-minute strategy session. We'll discuss your business challenges, goals, and explore how strategic consulting can drive your growth.",
    icon: Calendar,
  },
  {
    number: 2,
    title: "Strategic Assessment",
    description: "We conduct a comprehensive analysis of your business, market position, competitive landscape, and opportunities. Our team creates a detailed strategic roadmap tailored to your objectives.",
    icon: Search,
  },
  {
    number: 3,
    title: "Strategy Development",
    description: "We develop and refine your strategic plan with actionable initiatives, KPIs, and success metrics. You'll receive a clear roadmap with timelines and resource requirements.",
    icon: Target,
  },
  {
    number: 4,
    title: "Implementation & Support",
    description: "We work alongside your team to implement the strategy, provide ongoing guidance, monitor progress, and adjust as needed to ensure you achieve your goals.",
    icon: Rocket,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleBookCall = () => {
    // Scroll to contact section or open calendar
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    } else {
      // Fallback to calendar link
      window.open(process.env.NEXT_PUBLIC_CALENDAR_URL || "https://calendly.com/strategic-consulting/consultation", "_blank")
    }
  }

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Our Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            How We Work Together
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A proven methodology that transforms your business from strategy to execution
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Connection Line (desktop only) */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary transform -translate-x-1/2"
            />

            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-12 lg:space-y-20"
            >
              {steps.map((step, index) => {
                const Icon = step.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div
                    key={step.number}
                    variants={stepVariants}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Step Content Card */}
                    <div className={`flex-1 ${isEven ? "lg:pr-8" : "lg:pl-8"}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group"
                      >
                        <div className="flex items-start gap-6 mb-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center border border-primary/30 flex-shrink-0"
                          >
                            <Icon className="h-8 w-8 text-primary" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/30">
                                STEP {step.number}
                              </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                              {step.title}
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Step Number Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center border-4 border-[#0f172a] shadow-2xl shadow-primary/50"
                      >
                        <span className="text-3xl font-bold text-white">{step.number}</span>
                      </motion.div>
                      {index < steps.length - 1 && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                          className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-primary/80 to-primary/40"
                        />
                      )}
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-10 max-w-3xl mx-auto backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30"
              >
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                Start your transformation today with a free strategy consultation. No obligation, just expert insights and a clear path forward.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleBookCall}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg font-semibold shadow-2xl shadow-primary/50 hover:shadow-primary/60 transition-all duration-300"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <p className="text-sm text-slate-400 mt-6">
                Available Monday - Friday, 9 AM - 6 PM EST
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
