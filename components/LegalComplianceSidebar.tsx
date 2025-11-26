// components/LegalComplianceSidebar.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Shield, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDecision } from "@/contexts/DecisionContext"

export default function LegalComplianceSidebar() {
  const { showPrimarySidebar, setShowPrimarySidebar, legalComplianceAccepted, setLegalComplianceAccepted } = useDecision()

  const handleAccept = () => {
    setLegalComplianceAccepted(true)
    setShowPrimarySidebar(false)
  }

  return (
    <AnimatePresence>
      {showPrimarySidebar && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPrimarySidebar(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1e293b] border-l border-slate-700 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold text-white">Legal Terms & Conditions</h2>
                </div>
                <button
                  onClick={() => setShowPrimarySidebar(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              {/* Terms Content */}
              <div className="space-y-6 text-sm text-slate-300">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Terms of Service
                  </h3>
                  <p className="leading-relaxed">
                    By using our services, you agree to be bound by these Terms of Service. Please read them carefully.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">1. Service Agreement</h4>
                  <p className="leading-relaxed mb-2">
                    All services are provided subject to a written service agreement that will be provided before commencement of work.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-slate-400">
                    <li>Deliverables and timelines specified in agreement</li>
                    <li>Payment terms clearly outlined</li>
                    <li>Intellectual property rights defined</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">2. Payment Terms</h4>
                  <p className="leading-relaxed">
                    Payment is due as specified in your service agreement. Late payments may incur interest charges as permitted by law.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">3. Cancellation Policy</h4>
                  <p className="leading-relaxed">
                    Consumers have a 14-day cooling-off period. Business customers are subject to cancellation terms in their service agreement.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">4. Limitation of Liability</h4>
                  <p className="leading-relaxed">
                    Our liability is limited to the value of services provided. We are not liable for indirect or consequential damages.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Privacy & Data Protection
                  </h4>
                  <p className="leading-relaxed mb-2">
                    We comply with GDPR and UK data protection laws. Your personal data is processed in accordance with our Privacy Policy.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-slate-400">
                    <li>Data used only for service delivery</li>
                    <li>Secure data storage and transmission</li>
                    <li>Right to access, modify, or delete your data</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3 pt-6 border-t border-slate-700">
                <Button
                  onClick={handleAccept}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  size="lg"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  I Accept Terms & Conditions
                </Button>
                <Button
                  onClick={() => setShowPrimarySidebar(false)}
                  variant="outline"
                  className="w-full border-slate-600 text-white hover:bg-slate-700"
                >
                  Close
                </Button>
              </div>

              {/* Links */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex flex-col gap-2 text-xs">
                  <a href="/terms" className="text-primary hover:text-primary/80 underline">
                    View Full Terms of Service
                  </a>
                  <a href="/privacy" className="text-primary hover:text-primary/80 underline">
                    View Privacy Policy
                  </a>
                  <a href="/data-protection" className="text-primary hover:text-primary/80 underline">
                    View Data Protection Policy
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}



