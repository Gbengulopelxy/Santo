// components/CaseStudies.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowRight, TrendingUp, DollarSign, Users, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Sample data object
interface CaseStudy {
  id: string
  title: string
  thumbnail: string
  problem: string
  solution: string
  outcome: string
  metrics: string
  industry: string
  keyResults: {
    metric: string
    value: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Tech Startup Revenue Growth Strategy",
    thumbnail: "/images/case-study-thumb-1.jpg",
    problem: "A fast-growing SaaS startup was struggling to scale revenue beyond $5M ARR. Despite strong product-market fit, they lacked a clear go-to-market strategy and were burning cash inefficiently.",
    solution: "Developed a comprehensive growth strategy including market segmentation, pricing optimization, sales process redesign, and customer acquisition funnel improvements. Implemented data-driven decision frameworks and KPIs.",
    outcome: "Achieved 300% revenue growth in 18 months, improved unit economics, and secured Series B funding. The company is now on a clear path to profitability.",
    metrics: "300% revenue growth, 40% improvement in CAC payback, 2.5x increase in LTV:CAC ratio",
    industry: "Technology",
    keyResults: [
      { metric: "Revenue Growth", value: "300%", icon: TrendingUp },
      { metric: "CAC Payback", value: "40%", icon: DollarSign },
      { metric: "Team Size", value: "2.5x", icon: Users },
    ],
  },
  {
    id: "2",
    title: "Manufacturing Company Operational Excellence",
    thumbnail: "/images/case-study-thumb-2.jpg",
    problem: "A mid-size manufacturing company faced declining margins, operational inefficiencies, and increasing competition. They needed to transform operations to remain competitive.",
    solution: "Conducted comprehensive operational assessment and implemented lean manufacturing principles, supply chain optimization, and quality management systems. Redesigned organizational structure and performance metrics.",
    outcome: "Reduced operational costs by 25%, improved on-time delivery to 98%, and increased profit margins by 15%. The company is now positioned as an industry leader.",
    metrics: "25% cost reduction, 98% on-time delivery, 15% margin improvement",
    industry: "Manufacturing",
    keyResults: [
      { metric: "Cost Reduction", value: "25%", icon: DollarSign },
      { metric: "On-Time Delivery", value: "98%", icon: Award },
      { metric: "Margin Improvement", value: "15%", icon: TrendingUp },
    ],
  },
  {
    id: "3",
    title: "Retail Chain Digital Transformation",
    thumbnail: "/images/case-study-thumb-3.jpg",
    problem: "A traditional retail chain with 50+ locations was losing market share to e-commerce competitors. They needed a digital transformation strategy to remain relevant.",
    solution: "Developed an omnichannel strategy combining e-commerce platform, mobile app, in-store technology integration, and data analytics. Created customer experience roadmap and change management plan.",
    outcome: "Launched successful e-commerce platform achieving 40% of total sales online within 12 months. Improved customer retention by 35% and increased average order value by 20%.",
    metrics: "40% online sales, 35% retention improvement, 20% AOV increase",
    industry: "Retail",
    keyResults: [
      { metric: "Online Sales", value: "40%", icon: TrendingUp },
      { metric: "Customer Retention", value: "35%", icon: Users },
      { metric: "AOV Increase", value: "20%", icon: DollarSign },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
}

export default function CaseStudies() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleViewDetails = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy)
  }

  return (
    <>
      <section id="case-studies" className="py-24 bg-[#1e293b] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
              <Award className="h-4 w-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Proven Results
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Real transformations from businesses we've helped achieve their strategic objectives
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {caseStudies.map((study, index) => (
              <motion.div key={study.id} variants={itemVariants}>
                <Card className="flex flex-col bg-[#0f172a] border border-slate-700/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group h-full">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block text-xs bg-primary/90 text-white px-3 py-1.5 rounded-full font-medium backdrop-blur-sm">
                        {study.industry}
                      </span>
                    </div>
                    {/* Key Metrics Preview */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {study.keyResults.slice(0, 2).map((result, idx) => {
                        const Icon = result.icon
                        return (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20"
                          >
                            <Icon className="h-4 w-4 text-primary" />
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
                      {study.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-primary mb-1">Challenge:</p>
                      <CardDescription className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                        {study.problem}
                      </CardDescription>
                    </div>
                    <div className="pt-2 border-t border-slate-700/50">
                      <p className="text-sm font-semibold text-primary mb-2">Key Results:</p>
                      <div className="flex flex-wrap gap-3">
                        {study.keyResults.map((result, idx) => {
                          const Icon = result.icon
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + idx * 0.05 }}
                              className="flex items-center gap-1.5 text-xs text-slate-300"
                            >
                              <Icon className="h-3.5 w-3.5 text-primary" />
                              <span className="font-semibold text-white">{result.value}</span>
                              <span className="text-slate-400">{result.metric}</span>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                        onClick={() => handleViewDetails(study)}
                      >
                        View Case Study
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <Dialog open={!!selectedCaseStudy} onOpenChange={(open) => !open && setSelectedCaseStudy(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1e293b] border-slate-700">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/30 font-medium">
                      {selectedCaseStudy.industry}
                    </span>
                  </div>
                  <DialogTitle className="text-3xl text-white">{selectedCaseStudy.title}</DialogTitle>
                  <DialogDescription className="text-base text-slate-400">
                    Complete case study details
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Key Results Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {selectedCaseStudy.keyResults.map((result, idx) => {
                      const Icon = result.icon
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white">{result.value}</div>
                              <div className="text-xs text-slate-400">{result.metric}</div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>

                  {/* Problem */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      The Challenge
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{selectedCaseStudy.problem}</p>
                  </motion.div>

                  {/* Solution */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Our Solution
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{selectedCaseStudy.solution}</p>
                  </motion.div>

                  {/* Outcome */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      The Outcome
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">{selectedCaseStudy.outcome}</p>
                    <div className="pt-4 border-t border-primary/20">
                      <p className="text-primary font-semibold text-lg">{selectedCaseStudy.metrics}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
