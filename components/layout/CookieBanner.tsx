// components/layout/CookieBanner.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Settings, Cookie, Shield, BarChart3, Users } from "lucide-react"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always true, cannot be disabled
  analytics: false,
  marketing: false,
  functional: false,
}

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(consent)
        setPreferences(savedPrefs)
      } catch (e) {
        // If parsing fails, use defaults
        setPreferences(defaultPreferences)
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    savePreferences(allAccepted)
    setIsVisible(false)
  }

  const handleDeclineAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    savePreferences(onlyNecessary)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    savePreferences(preferences)
    setIsVisible(false)
    setShowPreferences(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs))
    localStorage.setItem("cookieConsentDate", new Date().toISOString())
    
    // Here you would typically initialize or remove analytics/marketing scripts
    // based on the preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      console.log("Analytics cookies enabled")
    } else {
      // Disable analytics
      console.log("Analytics cookies disabled")
    }

    if (prefs.marketing) {
      // Initialize marketing tools
      console.log("Marketing cookies enabled")
    } else {
      // Disable marketing
      console.log("Marketing cookies disabled")
    }
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // Cannot disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
          >
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#1e293b]/95 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Icon and Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 flex-shrink-0">
                        <Cookie className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 id="cookie-banner-title" className="text-xl font-bold text-white mb-2">
                          We Value Your Privacy
                        </h3>
                        <p id="cookie-banner-description" className="text-slate-300 leading-relaxed mb-3">
                          We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                          By clicking "Accept All", you consent to our use of cookies. You can manage your preferences at any time.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <a
                            href="/privacy"
                            className="text-primary hover:text-primary/80 underline transition-colors"
                          >
                            Privacy Policy
                          </a>
                          <span className="text-slate-500">•</span>
                          <a
                            href="/data-protection"
                            className="text-primary hover:text-primary/80 underline transition-colors"
                          >
                            Data Protection
                          </a>
                          <span className="text-slate-500">•</span>
                          <button
                            onClick={() => setShowPreferences(true)}
                            className="text-primary hover:text-primary/80 underline transition-colors flex items-center gap-1"
                          >
                            <Settings className="h-4 w-4" />
                            Manage Preferences
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-shrink-0">
                    <Button
                      variant="outline"
                      onClick={handleDeclineAll}
                      className="border-slate-600 text-white hover:bg-slate-700 hover:text-white"
                    >
                      Decline All
                    </Button>
                    <Button
                      onClick={() => setShowPreferences(true)}
                      variant="outline"
                      className="border-slate-600 text-white hover:bg-slate-700 hover:text-white"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Preferences
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Management Modal */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1e293b] border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage your cookie preferences. You can enable or disable different types of cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Necessary Cookies */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Necessary Cookies
                    </h4>
                    <p className="text-sm text-slate-400">
                      These cookies are essential for the website to function properly. They cannot be disabled.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary"
                  />
                </div>
              </div>
              <div className="ml-[52px] text-xs text-slate-500">
                Used for: Authentication, security, site functionality
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Analytics Cookies
                    </h4>
                    <p className="text-sm text-slate-400">
                      Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference("analytics")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="ml-[52px] text-xs text-slate-500">
                Used for: Google Analytics, website performance monitoring
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 flex-shrink-0">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Marketing Cookies
                    </h4>
                    <p className="text-sm text-slate-400">
                      Used to deliver personalized advertisements and track campaign effectiveness.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => togglePreference("marketing")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="ml-[52px] text-xs text-slate-500">
                Used for: Advertising, remarketing, social media integration
              </div>
            </div>

            {/* Functional Cookies */}
            <div className="bg-[#0f172a] border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30 flex-shrink-0">
                    <Cookie className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      Functional Cookies
                    </h4>
                    <p className="text-sm text-slate-400">
                      Enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => togglePreference("functional")}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              <div className="ml-[52px] text-xs text-slate-500">
                Used for: Language preferences, region settings, user interface customization
              </div>
            </div>

            {/* Data Protection Information */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Data Protection
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                Your privacy is important to us. We comply with GDPR regulations and only collect data necessary for 
                website functionality and improvement. You have the right to access, modify, or delete your personal data at any time.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/privacy"
                  className="text-primary hover:text-primary/80 text-sm underline"
                >
                  Read Privacy Policy
                </a>
                <span className="text-slate-500">•</span>
                <a
                  href="/data-protection"
                  className="text-primary hover:text-primary/80 text-sm underline"
                >
                  Data Protection Information
                </a>
                <span className="text-slate-500">•</span>
                <a
                  href="/contact"
                  className="text-primary hover:text-primary/80 text-sm underline"
                >
                  Contact Data Protection Officer
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  handleDeclineAll()
                  setShowPreferences(false)
                }}
                className="border-slate-600 text-white hover:bg-slate-700 hover:text-white"
              >
                Decline All
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPreferences(false)}
                className="border-slate-600 text-white hover:bg-slate-700 hover:text-white flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePreferences}
                className="bg-primary hover:bg-primary/90 text-white flex-1"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

