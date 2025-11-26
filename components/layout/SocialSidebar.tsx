// components/layout/SocialSidebar.tsx
"use client"

import { motion } from "framer-motion"
import SocialLinks from "@/components/shared/SocialLinks"

export default function SocialSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 z-40"
      aria-label="Social media links"
    >
      <SocialLinks
        variant="sidebar"
        showQR={true}
        orientation="vertical"
        iconSize="md"
      />
    </motion.aside>
  )
}



