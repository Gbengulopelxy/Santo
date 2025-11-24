// components/shared/SocialLinks.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { QRCodeSVG } from "qrcode.react"
import { Linkedin, Twitter, Instagram, Facebook, Youtube } from "lucide-react"

export interface SocialLink {
  icon: typeof Linkedin
  href: string
  label: string
  qrValue: string
  color?: string
}

export const socialLinks: SocialLink[] = [
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/company/strategicconsulting", 
    label: "LinkedIn",
    qrValue: "https://linkedin.com/company/strategicconsulting",
    color: "text-blue-500"
  },
  { 
    icon: Twitter, 
    href: "https://twitter.com/strategicconsulting", 
    label: "Twitter",
    qrValue: "https://twitter.com/strategicconsulting",
    color: "text-sky-400"
  },
  { 
    icon: Instagram, 
    href: "https://instagram.com/strategicconsulting", 
    label: "Instagram",
    qrValue: "https://instagram.com/strategicconsulting",
    color: "text-pink-500"
  },
  { 
    icon: Facebook, 
    href: "https://facebook.com/strategicconsulting", 
    label: "Facebook",
    qrValue: "https://facebook.com/strategicconsulting",
    color: "text-blue-500"
  },
  { 
    icon: Youtube, 
    href: "https://youtube.com/@strategicconsulting", 
    label: "YouTube",
    qrValue: "https://youtube.com/@strategicconsulting",
    color: "text-red-500"
  },
]

interface SocialLinksProps {
  variant?: "desktop" | "mobile" | "footer"
  showQR?: boolean
  limit?: number
}

export default function SocialLinks({
  variant = "desktop",
  showQR = true,
  limit,
}: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const linksToShow = limit ? socialLinks.slice(0, limit) : socialLinks

  if (variant === "footer") {
    return (
      <div className="flex items-center space-x-3">
        {linksToShow.map((social) => {
          const Icon = social.icon
          return (
            <Popover key={social.label}>
              <PopoverTrigger asChild>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 flex items-center justify-center rounded-lg bg-white hover:bg-gray-50 border border-gray-200 hover:border-primary/50 transition-all duration-300 group shadow-sm"
                  aria-label={social.label}
                >
                  <Icon className={`h-5 w-5 ${social.color || "text-gray-600"} group-hover:text-primary transition-colors`} />
                </motion.a>
              </PopoverTrigger>
              {showQR && (
                <PopoverContent
                  className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg"
                  onMouseEnter={() => setHoveredSocial(social.label)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <QRCodeSVG
                      value={social.qrValue}
                      size={120}
                      level="H"
                      includeMargin={true}
                      className="bg-white p-2 rounded-lg"
                    />
                    <p className="text-xs text-gray-600 text-center">
                      Scan to visit {social.label}
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

  return (
    <div className={`flex items-center ${variant === "desktop" ? "space-x-2" : "space-x-3"}`}>
      {linksToShow.map((social) => {
        const Icon = social.icon
        return (
          <Popover key={social.label}>
            <PopoverTrigger asChild>
              <motion.a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center justify-center rounded-lg transition-colors ${
                  variant === "desktop"
                    ? "w-9 h-9 text-gray-600 hover:text-primary hover:bg-gray-100"
                    : "w-10 h-10 text-gray-600 hover:text-primary hover:bg-gray-100"
                }`}
                aria-label={social.label}
              >
                <Icon className={`h-4 w-4 ${variant === "mobile" ? "h-5 w-5" : ""}`} />
              </motion.a>
            </PopoverTrigger>
            {showQR && (
              <PopoverContent
                className="w-48 p-4 bg-white backdrop-blur-md border-gray-200 shadow-lg"
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <QRCodeSVG
                    value={social.qrValue}
                    size={120}
                    level="H"
                    includeMargin={true}
                    className="bg-white p-2 rounded-lg"
                  />
                  <p className="text-xs text-gray-600 text-center">
                    Scan to visit {social.label}
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

