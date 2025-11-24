// components/SocialProof.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Calendar, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Youtube,
  X,
  Award,
  CheckCircle2,
  TrendingUp,
  Users,
  Star
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

const socialLinks = [
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
    color: "text-blue-600"
  },
  { 
    icon: Youtube, 
    href: "https://youtube.com/@strategicconsulting", 
    label: "YouTube",
    qrValue: "https://youtube.com/@strategicconsulting",
    color: "text-red-500"
  },
]

const credentials = [
  {
    icon: Award,
    title: "Forbes Business Council Member",
    description: "Official member of the exclusive Forbes Business Council",
  },
  {
    icon: TrendingUp,
    title: "15+ Years Experience",
    description: "Helping businesses scale from 5 to 6 figures monthly",
  },
  {
    icon: Users,
    title: "500+ Companies Served",
    description: "Trusted by businesses worldwide",
  },
  {
    icon: Star,
    title: "95% Client Satisfaction",
    description: "Proven track record of success",
  },
]

export default function SocialProof() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const handleBookCall = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Attention-Grabbing Banner */}
      <section className="relative bg-gradient-to-r from-primary via-primary/90 to-primary py-6 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Book a FREE Strategy Call with an Official Member of the Forbes Council
                </h3>
                <p className="text-sm text-white/90 mt-1">
                  Join 500+ successful businesses that have transformed their growth
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                onClick={handleBookCall}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Call
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Side Panel - Desktop Only */}
      <AnimatePresence>
        {isSidePanelOpen && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-l-2xl p-4 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => setIsSidePanelOpen(false)}
                className="absolute -left-3 top-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                aria-label="Close panel"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              <div className="flex flex-col gap-3">
                <div className="text-center mb-2">
                  <p className="text-xs text-white/80 font-medium mb-1">Follow Us</p>
                  <div className="w-12 h-0.5 bg-primary mx-auto"></div>
                </div>

                {/* Social Media Icons */}
                {socialLinks.map((social) => {
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
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-300 group"
                          aria-label={social.label}
                        >
                          <Icon className={`h-5 w-5 ${social.color} group-hover:scale-110 transition-transform`} />
                        </motion.a>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-48 p-4 bg-[#1e293b]/95 backdrop-blur-md border-slate-700 mr-2"
                        side="left"
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
                          <p className="text-xs text-white/80 text-center">
                            Scan to visit {social.label}
                          </p>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Reopen Button (when closed) */}
        {!isSidePanelOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsSidePanelOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block w-12 h-20 bg-primary/80 hover:bg-primary backdrop-blur-sm rounded-l-2xl flex items-center justify-center border border-primary/30 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Open social panel"
          >
            <div className="flex flex-col gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full" />
              ))}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Trust Indicators and Credentials */}
      <section className="py-16 bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Trusted & Credentialed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
              Why Businesses Trust Us
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Official credentials and proven track record of success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {credentials.map((credential, index) => {
              const Icon = credential.icon
              return (
                <motion.div
                  key={credential.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-[#1e293b]/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 border border-primary/30">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {credential.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {credential.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Additional Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="text-2xl font-bold text-white mb-1">FORBES</div>
              <div className="text-xs text-white/60">Business Council</div>
            </div>
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-semibold">4.9/5</span>
                <span className="text-white/60 text-sm">Rating</span>
              </div>
            </div>
            <div className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="text-white font-semibold">500+</div>
              <div className="text-xs text-white/60">Success Stories</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

