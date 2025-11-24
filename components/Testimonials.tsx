// components/Testimonials.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Sample data object
interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  logo?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Inc.",
    content: "Working with this consulting team transformed our business. Their strategic insights helped us achieve 300% revenue growth in just 18 months. The data-driven approach and clear execution roadmap made all the difference.",
    rating: 5,
    logo: "/images/logos/techflow.svg",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    role: "COO",
    company: "Manufacturing Solutions",
    content: "The operational excellence program they designed reduced our costs by 25% while improving quality. Their expertise in lean manufacturing and process optimization was exactly what we needed to stay competitive.",
    rating: 5,
    logo: "/images/logos/manufacturing-solutions.svg",
  },
  {
    id: "3",
    name: "Emily Watson",
    role: "VP of Strategy",
    company: "Global Retail Group",
    content: "Their digital transformation strategy helped us launch a successful e-commerce platform that now accounts for 40% of our sales. The team's guidance through the entire process was invaluable.",
    rating: 5,
    logo: "/images/logos/global-retail.svg",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Founder",
    company: "InnovateTech",
    content: "As a startup, we needed strategic direction to scale effectively. The growth strategy they developed gave us clarity on market positioning, pricing, and customer acquisition. Highly recommend!",
    rating: 5,
    logo: "/images/logos/innovatetech.svg",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    role: "President",
    company: "Anderson Industries",
    content: "The organizational development work they did transformed our company culture and improved team performance significantly. Their change management approach made the transition smooth and effective.",
    rating: 5,
    logo: "/images/logos/anderson-industries.svg",
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000) // Auto-rotate every 6 seconds

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1
    setDirection(newDirection)
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            See what our clients say about working with us
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div className="hidden md:block">
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x)

                    if (swipe < -swipeConfidenceThreshold) {
                      goToNext()
                    } else if (swipe > swipeConfidenceThreshold) {
                      goToPrevious()
                    }
                  }}
                  className="min-w-full px-4"
                >
                  <Card className="border-2 bg-[#1e293b]/80 backdrop-blur-sm border-slate-700/50 hover:border-primary/50 transition-all duration-300 shadow-2xl">
                    <CardContent className="pt-8 pb-8 px-8">
                      <div className="flex items-start gap-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="flex-shrink-0"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border border-primary/30">
                            <Quote className="h-8 w-8 text-primary" />
                          </div>
                        </motion.div>
                        <div className="flex-grow">
                          {/* Rating Stars */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-1 mb-4"
                          >
                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                              >
                                <Star className="h-5 w-5 fill-primary text-primary" />
                              </motion.div>
                            ))}
                          </motion.div>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl mb-6 text-white leading-relaxed italic"
                          >
                            "{testimonials[currentIndex].content}"
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="border-t border-slate-700 pt-6 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-semibold text-white text-lg">
                                {testimonials[currentIndex].name}
                              </p>
                              <p className="text-sm text-slate-400 mt-1">
                                {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                              </p>
                            </div>
                            {/* Company Logo Placeholder */}
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="w-20 h-20 bg-[#0f172a] rounded-xl flex items-center justify-center border border-slate-700/50"
                            >
                              {testimonials[currentIndex].logo ? (
                                <div className="relative w-20 h-20">
                                  <Image
                                    src={testimonials[currentIndex].logo}
                                    alt={testimonials[currentIndex].company}
                                    fill
                                    className="object-contain p-2"
                                    loading="lazy"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.style.display = "none"
                                    }}
                                  />
                                </div>
                              ) : (
                                <span className="text-lg text-slate-400 font-semibold">
                                  {testimonials[currentIndex].company.substring(0, 2).toUpperCase()}
                                </span>
                              )}
                            </motion.div>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-10 backdrop-blur-sm"
              aria-label="Previous testimonial"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-10 backdrop-blur-sm"
              aria-label="Next testimonial"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-slate-600/30 hover:bg-slate-600/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Stacked List */}
        <div className="md:hidden space-y-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-2 bg-[#1e293b]/80 backdrop-blur-sm border-slate-700/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary mb-4" />
                  <p className="text-sm mb-4 text-white italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    {/* Company Logo Placeholder */}
                    <div className="w-12 h-12 bg-[#0f172a] rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700/50">
                      {testimonial.logo ? (
                        <Image
                          src={testimonial.logo}
                          alt={testimonial.company}
                          width={48}
                          height={48}
                          className="max-w-full max-h-full object-contain p-1"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = "none"
                          }}
                        />
                      ) : (
                        <span className="text-xs text-slate-400 text-center px-2 font-semibold">
                          {testimonial.company.substring(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
