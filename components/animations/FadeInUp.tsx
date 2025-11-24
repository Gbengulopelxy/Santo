// components/animations/FadeInUp.tsx
"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

interface FadeInUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
}

export default function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
  amount = 0.3,
}: FadeInUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

