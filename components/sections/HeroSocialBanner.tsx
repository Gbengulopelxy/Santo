// components/sections/HeroSocialBanner.tsx
"use client"

import { motion } from "framer-motion"
import SocialLinks from "@/components/shared/SocialLinks"

export default function HeroSocialBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4"
    >
      <SocialLinks
        variant="banner"
        showQR={true}
        orientation="horizontal"
        iconSize="lg"
      />
    </motion.div>
  )
}



