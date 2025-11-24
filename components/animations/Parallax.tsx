// components/animations/Parallax.tsx
"use client"

import { useEffect, useRef, ReactNode } from "react"
import { useScroll, useTransform, motion } from "framer-motion"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down"
}

export default function Parallax({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [0, -100 * speed] : [0, 100 * speed]
  )

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

