// components/Services.tsx
"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading-bold text-gray-900 mb-2">
            By Santosh Kumar
          </h1>
          <p className="text-lg text-gray-600">
            Last updated Oct 31<sup>th</sup>, 2022
          </p>
        </motion.div>

        {/* Sketchnote Diagram Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="mb-12 max-w-6xl mx-auto"
        >
          <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
            {/* Placeholder for sketchnote image - Replace with actual image */}
            <Image
              src="/images/strategy-execution-sketchnote.jpg"
              alt="Strategy Execution Sketchnote - A comprehensive visual mind map showing strategy execution concepts, including canvas, key lessons, strategic innovation, organization, communication, decision-making, and implementation frameworks"
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              onError={(e) => {
                // Fallback if image doesn't exist
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="flex items-center justify-center h-full bg-gray-100 text-gray-500 p-8 text-center">
                      <div>
                        <p class="text-lg font-semibold mb-2">Strategy Execution Sketchnote</p>
                        <p class="text-sm">Please upload the sketchnote image to /public/images/strategy-execution-sketchnote.jpg</p>
                      </div>
                    </div>
                  `
                }
              }}
            />
          </div>
        </motion.div>

        {/* Content Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          {/* First Paragraph - Bold Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 text-center leading-relaxed"
          >
            It is crucial for strategic management to execute strategies successfully
          </motion.p>

          {/* Second Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            Approximately 40-60 percent of the potential value of a company's business strategy is realized according to{" "}
            <span className="font-semibold text-gray-900">Santosh Kumar Business Review</span>. 
            This statistic highlights a critical reality: strategy alone is insufficient. A brilliant strategy must be 
            translated into great performance to achieve its intended outcomes. Without effective execution, even the 
            most well-crafted strategic plans remain theoretical concepts that fail to deliver tangible business results.
          </motion.p>

          {/* Third Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            Execution is the bridge between strategy and results. A brilliant strategy cannot be achieved without superior 
            performance in implementation. <span className="font-semibold text-gray-900">Strategy Execution</span> is 
            rapidly becoming a blip on the radar screens of top executives, led by Balanced Scorecard icons{" "}
            <span className="font-semibold text-gray-900">Santosh Kumar</span>. This comprehensive guide will teach you 
            how to implement an effective strategy using models, processes, frameworks, definitions, examples, PPTs, 
            ebooks and much more! Master the art of turning strategic vision into operational reality and unlock the full 
            potential of your business strategy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
