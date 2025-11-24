// components/FeaturesBenefitsDetailed.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Award, 
  CheckCircle2, 
  Star, 
  TrendingUp,
  Shield,
  Users,
  Target,
  Zap,
  ArrowRight,
  Quote,
  FileText,
  BadgeCheck
} from "lucide-react"
import Link from "next/link"

const productDetails = [
  {
    icon: Target,
    title: "Strategic Planning Framework",
    description: "Comprehensive 360-degree business analysis and strategic roadmap development using proven methodologies.",
    benefits: [
      "Market positioning analysis",
      "Competitive landscape assessment",
      "SWOT analysis",
      "Growth opportunity identification",
    ],
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: TrendingUp,
    title: "Revenue Optimization System",
    description: "Data-driven approach to identify and capitalize on revenue growth opportunities across all channels.",
    benefits: [
      "Pricing strategy optimization",
      "Sales funnel enhancement",
      "Customer lifetime value maximization",
      "Revenue stream diversification",
    ],
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Zap,
    title: "Operational Excellence Program",
    description: "Streamline operations, reduce costs, and improve efficiency through process optimization and automation.",
    benefits: [
      "Process mapping and optimization",
      "Cost reduction strategies",
      "Efficiency improvement",
      "Quality management systems",
    ],
    color: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-400",
  },
  {
    icon: Users,
    title: "Organizational Development",
    description: "Build high-performing teams and create a culture that drives sustainable business growth.",
    benefits: [
      "Team structure optimization",
      "Leadership development",
      "Culture transformation",
      "Performance management",
    ],
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
  },
]

const quickTestimonials = [
  {
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Inc.",
    quote: "Transformed our revenue from £50K to £150K monthly in just 6 months.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "COO",
    company: "Manufacturing Solutions",
    quote: "The operational improvements saved us £200K annually while improving quality.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "VP Strategy",
    company: "Global Retail Group",
    quote: "Best strategic investment we've made. ROI was visible within the first quarter.",
    rating: 5,
  },
]

const quickCaseStudies = [
  {
    title: "SaaS Startup Growth",
    result: "300% revenue growth",
    timeframe: "18 months",
    industry: "Technology",
  },
  {
    title: "Manufacturing Efficiency",
    result: "25% cost reduction",
    timeframe: "12 months",
    industry: "Manufacturing",
  },
  {
    title: "Retail Transformation",
    result: "40% online sales",
    timeframe: "12 months",
    industry: "Retail",
  },
]

const certifications = [
  {
    name: "Forbes Business Council",
    description: "Official Member",
    icon: Award,
  },
  {
    name: "ISO 9001 Certified",
    description: "Quality Management",
    icon: BadgeCheck,
  },
  {
    name: "GDPR Compliant",
    description: "Data Protection",
    icon: Shield,
  },
  {
    name: "15+ Years Experience",
    description: "Proven Track Record",
    icon: Star,
  },
]

export default function FeaturesBenefitsDetailed() {
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
    <section id="features-detailed" className="py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden">
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
            <Award className="h-4 w-4" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Everything You Need to
            <span className="bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent"> Transform Your Business</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Detailed product features, proven results, and trusted credentials
          </p>
        </motion.div>

        {/* Product Details Showcase */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {productDetails.map((product, index) => {
            const Icon = product.icon
            return (
              <motion.div key={product.title} variants={itemVariants}>
                <Card className="h-full bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50 hover:border-primary/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center border border-slate-700/50 group-hover:border-primary/30 transition-all duration-300`}
                      >
                        <Icon className={`h-8 w-8 ${product.iconColor}`} />
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white mb-2 group-hover:text-primary transition-colors">
                          {product.title}
                        </CardTitle>
                        <CardDescription className="text-slate-300 leading-relaxed">
                          {product.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-center gap-2 text-sm text-slate-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social Proof Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Quick Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Quote className="h-5 w-5 text-primary" />
                  Client Success Stories
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Real results from businesses we've transformed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-4"
                  >
                    <div className="flex gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-slate-300 italic mb-3 text-sm">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-slate-400 text-xs">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Link href="#testimonials">
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                    View All Testimonials
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Case Studies */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Proven Results
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Measurable outcomes from our strategic consulting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickCaseStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#0f172a] border border-slate-700/50 rounded-lg p-4 hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-semibold group-hover:text-primary transition-colors">
                        {study.title}
                      </h4>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30">
                        {study.industry}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <p className="text-primary font-bold text-lg">{study.result}</p>
                        <p className="text-slate-400 text-xs">Achieved</p>
                      </div>
                      <div className="w-px h-8 bg-slate-700"></div>
                      <div>
                        <p className="text-white font-semibold">{study.timeframe}</p>
                        <p className="text-slate-400 text-xs">Timeframe</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Link href="#case-studies">
                  <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-700">
                    View All Case Studies
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trust Badges and Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Trusted & Certified
            </h3>
            <p className="text-slate-400">
              Official credentials and industry recognition
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {certifications.map((cert, index) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-white font-semibold mb-1 text-sm group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-slate-400 text-xs">{cert.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">500+</div>
                  <div className="text-slate-300 text-sm">Companies Served</div>
                </div>
                <div className="hidden md:block w-px bg-slate-700"></div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">95%</div>
                  <div className="text-slate-300 text-sm">Success Rate</div>
                </div>
                <div className="hidden md:block w-px bg-slate-700"></div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
                  <div className="text-slate-300 text-sm">Average Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Experience These Benefits?
            </h3>
            <p className="text-slate-300 mb-6">
              Join 500+ successful businesses that have transformed their growth with our proven strategies.
            </p>
            <Link href="#contact">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


