// components/shared/SocialLinks.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { QRCodeSVG } from "qrcode.react"
import { socialLinks } from "@/lib/socialConfig"

interface SocialLinksProps {
  variant?: "desktop" | "mobile" | "footer" | "sidebar" | "banner"
  showQR?: boolean
  showLabels?: boolean
  limit?: number
  orientation?: "horizontal" | "vertical"
  iconSize?: "sm" | "md" | "lg"
}

export default function SocialLinks({
  variant = "desktop",
  showQR = true,
  showLabels = false,
  limit,
  orientation = "horizontal",
  iconSize = "md",
}: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const linksToShow = limit ? socialLinks.slice(0, limit) : socialLinks

  // Size configurations
  const sizeConfig = {
    sm: { container: "w-8 h-8", icon: "h-4 w-4" },
    md: { container: "w-10 h-10", icon: "h-5 w-5" },
    lg: { container: "w-12 h-12", icon: "h-6 w-6" },
  }

  const currentSize = sizeConfig[iconSize]

  // Footer variant with labels
  if (variant === "footer") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-gray-900 mb-4">
          Connect Me or Follow Me On Social Media
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {linksToShow.map((social, index) => {
            const Icon = social.icon
            return (
              <Popover key={social.name}>
                <PopoverTrigger asChild>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary/50 transition-all duration-300 group shadow-sm"
                    aria-label={social.label}
                  >
                    <div className={`${currentSize.container} flex items-center justify-center mb-2`}>
                      <Icon
                        className={`${currentSize.icon} transition-colors`}
                        style={{
                          color: hoveredSocial === social.name ? social.hoverColor : social.color,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                      {social.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">{social.username}</span>
                  </motion.a>
                </PopoverTrigger>
                {showQR && (
                  <PopoverContent
                    className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg"
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <QRCodeSVG
                        value={social.url}
                        size={150}
                        level="H"
                        includeMargin={true}
                        className="bg-white p-2 rounded-lg"
                      />
                      <p className="text-xs text-gray-600 text-center">
                        Scan to follow on {social.name}
                      </p>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            )
          })}
        </div>
      </div>
    )
  }

  // Sidebar variant (vertical)
  if (variant === "sidebar") {
    return (
      <div className={`flex flex-col ${orientation === "vertical" ? "space-y-4" : "space-x-2"}`}>
        {linksToShow.map((social, index) => {
          const Icon = social.icon
          return (
            <Popover key={social.name}>
              <PopoverTrigger asChild>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${currentSize.container} flex items-center justify-center rounded-full bg-white/80 hover:bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 group shadow-sm`}
                  aria-label={social.label}
                >
                  <Icon
                    className={`${currentSize.icon} transition-colors`}
                    style={{
                      color: hoveredSocial === social.name ? social.hoverColor : social.color,
                    }}
                  />
                </motion.a>
              </PopoverTrigger>
              {showQR && (
                <PopoverContent
                  className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg"
                  side="right"
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <QRCodeSVG
                      value={social.url}
                      size={150}
                      level="H"
                      includeMargin={true}
                      className="bg-white p-2 rounded-lg"
                    />
                    <p className="text-xs text-gray-600 text-center">
                      Scan to follow on {social.name}
                    </p>
                  </div>
                </PopoverContent>
              )}
            </Popover>
          )
        })}
      </div>
    )
  }

  // Banner variant
  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center space-y-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
      >
        <h3 className="text-lg font-heading text-gray-900">
          CONNECT ME OR FOLLOW ME ON SOCIAL MEDIA
        </h3>
        <div className="flex items-center space-x-4">
          {linksToShow.map((social, index) => {
            const Icon = social.icon
            return (
              <Popover key={social.name}>
                <PopoverTrigger asChild>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${currentSize.container} flex items-center justify-center rounded-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-primary/50 transition-all duration-300 group shadow-md`}
                    aria-label={social.label}
                  >
                    <Icon
                      className={`${currentSize.icon} transition-colors`}
                      style={{
                        color: hoveredSocial === social.name ? social.hoverColor : social.color,
                      }}
                    />
                  </motion.a>
                </PopoverTrigger>
                {showQR && (
                  <PopoverContent
                    className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg"
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <QRCodeSVG
                        value={social.url}
                        size={150}
                        level="H"
                        includeMargin={true}
                        className="bg-white p-2 rounded-lg"
                      />
                      <p className="text-xs text-gray-600 text-center">
                        Scan to follow on {social.name}
                      </p>
                    </div>
                  </PopoverContent>
                )}
              </Popover>
            )
          })}
        </div>
      </motion.div>
    )
  }

  // Default desktop/mobile variant
  const flexDirection = orientation === "vertical" ? "flex-col space-y-2" : "flex-row space-x-2"
  const spacing = variant === "desktop" ? "space-x-2" : "space-x-3"

  return (
    <div className={`flex items-center ${orientation === "vertical" ? "flex-col space-y-2" : spacing}`}>
      {linksToShow.map((social, index) => {
        const Icon = social.icon
        return (
          <Popover key={social.name}>
            <PopoverTrigger asChild>
              <motion.a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${currentSize.container} flex items-center justify-center rounded-lg transition-all duration-300 ${
                  variant === "desktop"
                    ? "text-gray-600 hover:bg-gray-100"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                aria-label={social.label}
              >
                <Icon
                  className={`${currentSize.icon} transition-colors`}
                  style={{
                    color: hoveredSocial === social.name ? social.hoverColor : social.color,
                  }}
                />
              </motion.a>
            </PopoverTrigger>
            {showQR && (
              <PopoverContent
                className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg animate-in fade-in zoom-in duration-200"
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <QRCodeSVG
                    value={social.url}
                    size={150}
                    level="H"
                    includeMargin={true}
                    className="bg-white p-2 rounded-lg"
                  />
                  <p className="text-xs text-gray-600 text-center">
                    Scan to follow on {social.name}
                  </p>
                </div>
              </PopoverContent>
            )}
          </Popover>
        )
      })}
    </div>
  )
}
