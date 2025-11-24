// components/PricingDisplay.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useDecision } from "@/contexts/DecisionContext"
import { 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  Info,
  Shield,
  TrendingUp,
  Target,
  Rocket
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  pricePeriod: string
  features: string[]
  popular?: boolean
  icon: React.ComponentType<{ className?: string }>
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Strategy",
    description: "Perfect for small businesses ready to scale",
    price: 2500,
    pricePeriod: "one-time",
    features: [
      "Initial business assessment",
      "Strategic roadmap development",
      "3 months of email support",
      "Growth opportunity analysis",
      "Implementation guide",
    ],
    icon: Target,
  },
  {
    id: "growth",
    name: "Growth Accelerator",
    description: "Comprehensive strategy for rapid expansion",
    price: 7500,
    pricePeriod: "one-time",
    features: [
      "Everything in Starter",
      "6 months of ongoing support",
      "Quarterly strategy reviews",
      "Team training sessions",
      "Performance tracking dashboard",
      "Priority consultation access",
    ],
    popular: true,
    icon: TrendingUp,
  },
  {
    id: "enterprise",
    name: "Enterprise Transformation",
    description: "Full-scale transformation with dedicated support",
    price: 15000,
    pricePeriod: "one-time",
    features: [
      "Everything in Growth",
      "12 months of dedicated support",
      "Monthly strategy sessions",
      "Custom implementation plan",
      "Dedicated account manager",
      "24/7 priority support",
      "Success guarantee",
    ],
    icon: Rocket,
  },
]

const VAT_RATE = 0.20 // 20% UK VAT rate

interface PricingDisplayProps {
  selectedCountry?: string
}

export default function PricingDisplay({ selectedCountry = "GB" }: PricingDisplayProps) {
  const { vatDecision, setVatDecision } = useDecision()
  const [showVATInfo, setShowVATInfo] = useState(false)
  const [showLegalNotice, setShowLegalNotice] = useState(false)
  
  // Use context value or local state fallback
  const includeVAT = vatDecision

  // Countries that require VAT
  const vatRequiredCountries = ["GB", "IM", "JE"] // UK, Isle of Man, Jersey

  const requiresVAT = vatRequiredCountries.includes(selectedCountry)

  const calculatePrice = (basePrice: number) => {
    if (includeVAT === null) return basePrice
    if (includeVAT) {
      return basePrice * (1 + VAT_RATE)
    }
    return basePrice
  }

  const calculateVAT = (basePrice: number) => {
    if (!requiresVAT || !includeVAT) return 0
    return basePrice * VAT_RATE
  }

  const handleBookCall = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-[#1e293b] to-[#0f172a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Choose Your Growth Path
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Clear, upfront pricing with no hidden fees. All prices are transparent and include everything listed.
          </p>
        </motion.div>

        {/* VAT Decision Flow */}
        {includeVAT === null && requiresVAT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card className="bg-[#1e293b]/80 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  VAT Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Please confirm if you need VAT included in the pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    Based on your selected region ({selectedCountry === "GB" ? "United Kingdom" : selectedCountry === "IM" ? "Isle of Man" : "Jersey"}), 
                    VAT may apply to your purchase.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setVatDecision(true)}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    >
                      Yes, Include VAT (20%)
                    </Button>
                    <Button
                      onClick={() => setVatDecision(false)}
                      variant="outline"
                      className="flex-1 border-slate-600 text-white hover:bg-slate-700"
                    >
                      No, Exclude VAT
                    </Button>
                  </div>
                  <button
                    onClick={() => setShowVATInfo(true)}
                    className="text-sm text-primary hover:text-primary/80 underline"
                  >
                    Learn more about VAT
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon
            const finalPrice = calculatePrice(tier.price)
            const vatAmount = calculateVAT(tier.price)
            const basePrice = tier.price

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <Card
                  className={`h-full flex flex-col bg-[#1e293b]/80 backdrop-blur-sm border ${
                    tier.popular
                      ? "border-primary/50 shadow-2xl shadow-primary/20"
                      : "border-slate-700/50"
                  } hover:border-primary/50 transition-all duration-300`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader>
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 border border-primary/30">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl text-white mb-2">{tier.name}</CardTitle>
                    <CardDescription className="text-slate-400">{tier.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    {/* Price Display */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          {includeVAT !== null && requiresVAT && includeVAT
                            ? `£${finalPrice.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : `£${basePrice.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        </span>
                        <span className="text-slate-400 text-sm">/{tier.pricePeriod}</span>
                      </div>

                      {/* VAT Breakdown */}
                      {includeVAT !== null && requiresVAT && includeVAT && (
                        <div className="mt-2 text-sm text-slate-400 space-y-1">
                          <div className="flex justify-between">
                            <span>Base Price:</span>
                            <span>£{basePrice.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VAT (20%):</span>
                            <span>£{vatAmount.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-slate-700">
                            <span className="font-semibold text-white">Total:</span>
                            <span className="font-semibold text-white">
                              £{finalPrice.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                      )}

                      {includeVAT !== null && requiresVAT && !includeVAT && (
                        <div className="mt-2 text-sm text-slate-400">
                          <p>Excluding VAT</p>
                          <p className="text-xs mt-1">VAT will be added at checkout if applicable</p>
                        </div>
                      )}

                      {!requiresVAT && (
                        <div className="mt-2 text-sm text-slate-400">
                          <p>No VAT applicable</p>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={handleBookCall}
                      className={`w-full ${
                        tier.popular
                          ? "bg-primary hover:bg-primary/90 text-white"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                      size="lg"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Strategy Call
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* VAT Disclaimer */}
        {includeVAT !== null && requiresVAT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-300">
                    <p className="font-semibold text-white mb-2">VAT Information</p>
                    <p className="mb-2">
                      {includeVAT
                        ? "Prices shown include VAT at the standard UK rate of 20%. The final amount you pay is the total displayed price."
                        : "Prices shown exclude VAT. If you are a UK-based business or individual, VAT at 20% will be added at checkout. VAT-registered businesses may be able to reclaim VAT."}
                    </p>
                    <p>
                      For businesses outside the UK, Isle of Man, or Jersey, VAT may not apply. Please contact us for clarification on your specific situation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Legal Requirement Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-[#1e293b]/80 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Legal & Transparency Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-white mb-2">Pricing Transparency</p>
                <p>
                  All prices are displayed in British Pounds (GBP). Prices are fixed for the duration of the engagement 
                  as specified in your service agreement. No hidden fees or surprise charges.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white mb-2">Payment Terms</p>
                <p>
                  Payment terms will be clearly outlined in your service agreement. Typically, a deposit is required to 
                  commence work, with the balance due upon completion or as per agreed milestones.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white mb-2">Refund Policy</p>
                <p>
                  We offer a satisfaction guarantee. If you're not satisfied with our services within the first 30 days, 
                  we'll work with you to make it right or provide a partial refund as outlined in our terms of service.
                </p>
              </div>

              <div>
                <p className="font-semibold text-white mb-2">Consumer Rights</p>
                <p>
                  Under UK consumer law, you have the right to cancel within 14 days of purchase (cooling-off period) 
                  if you are a consumer. Business-to-business transactions are subject to the terms agreed in your contract.
                </p>
              </div>

              <button
                onClick={() => setShowLegalNotice(true)}
                className="text-primary hover:text-primary/80 underline text-sm mt-2"
              >
                View full terms and conditions
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-3">
              Not Sure Which Plan Is Right For You?
            </h3>
            <p className="text-slate-300 mb-6">
              Book a free strategy call and we'll help you determine the best approach for your business.
            </p>
            <Button
              onClick={handleBookCall}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/60 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* VAT Information Dialog */}
      <Dialog open={showVATInfo} onOpenChange={setShowVATInfo}>
        <DialogContent className="max-w-2xl bg-[#1e293b] border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Understanding VAT</DialogTitle>
            <DialogDescription className="text-slate-400">
              Information about Value Added Tax (VAT) and how it applies to your purchase
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-slate-300">
            <div>
              <h4 className="font-semibold text-white mb-2">What is VAT?</h4>
              <p>
                Value Added Tax (VAT) is a consumption tax charged on most goods and services in the UK. 
                The standard rate is currently 20%.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">When does VAT apply?</h4>
              <p>
                VAT applies to purchases made by individuals and businesses located in the UK, Isle of Man, 
                or Jersey. If you are VAT-registered, you may be able to reclaim VAT paid on business expenses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">International Customers</h4>
              <p>
                If you are located outside the UK, Isle of Man, or Jersey, VAT may not apply. However, 
                you may be subject to local taxes in your jurisdiction. Please consult with a tax advisor 
                in your country for guidance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Need Help?</h4>
              <p>
                If you're unsure about VAT applicability for your situation, please contact us and we'll 
                be happy to assist you.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Legal Notice Dialog */}
      <Dialog open={showLegalNotice} onOpenChange={setShowLegalNotice}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1e293b] border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Terms and Conditions</DialogTitle>
            <DialogDescription className="text-slate-400">
              Full terms and conditions for our services
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 text-slate-300 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-2">1. Service Agreement</h4>
              <p>
                All services are provided subject to a written service agreement that will be provided 
                before commencement of work. The agreement will specify deliverables, timelines, and payment terms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">2. Payment Terms</h4>
              <p>
                Payment is due as specified in your service agreement. Late payments may incur interest 
                charges as permitted by law. All prices are in GBP unless otherwise stated.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">3. Cancellation and Refunds</h4>
              <p>
                Consumers have a 14-day cooling-off period from the date of purchase. Business customers 
                are subject to the cancellation terms in their service agreement. Refund eligibility is 
                determined on a case-by-case basis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">4. Intellectual Property</h4>
              <p>
                Upon full payment, you will receive ownership of the deliverables as specified in your 
                service agreement. We retain the right to use anonymized case studies for marketing purposes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">5. Limitation of Liability</h4>
              <p>
                Our liability is limited to the value of the services provided. We are not liable for 
                indirect or consequential damages. Full terms are available in your service agreement.
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mt-4">
                These terms are a summary. Full terms and conditions will be provided in your service agreement. 
                For questions, please contact us at legal@strategicconsulting.com
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}

