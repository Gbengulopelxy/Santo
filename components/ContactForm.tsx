// components/ContactForm.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, Calendar, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { useDecision } from "@/contexts/DecisionContext"
import { useEffect } from "react"
import { trackFormSubmission } from "@/components/analytics/Analytics"

// Enhanced Zod validation schema with phone and GDPR consent
const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100, "Full name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val || val === "") return true
      if (val.length < 10) return false
      if (val.length > 20) return false
      return /^[\d\s\-\+\(\)]+$/.test(val)
    }, {
      message: "Please enter a valid phone number (10-20 digits)",
    })
    .or(z.literal("")),
  company: z.string().max(100, "Company name is too long").optional().or(z.literal("")),
  budget: z.enum(["<25k", "25-100k", "100-500k", "500k+", ""]).optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing to submit this form",
  }),
  termsAccepted: z.boolean().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()
  const { setFormComplete, setShowPrimarySidebar, legalComplianceAccepted } = useDecision()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
    fullName: "",
    email: "",
      phone: "",
    company: "",
    budget: "",
    message: "",
      gdprConsent: false,
      termsAccepted: false,
      honeypot: "",
    },
  })

  // Watch form values for real-time validation feedback
  const watchedFields = watch()

  // Track form completion - Decision Point 2
  useEffect(() => {
    const requiredFieldsComplete = 
      watchedFields.fullName?.length >= 2 &&
      watchedFields.email?.includes("@") &&
      watchedFields.message?.length >= 10 &&
      watchedFields.gdprConsent === true

    setFormComplete(requiredFieldsComplete || false)
  }, [watchedFields.fullName, watchedFields.email, watchedFields.message, watchedFields.gdprConsent, setFormComplete])

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check
    if (data.honeypot) {
      console.warn("Honeypot field filled - potential spam submission")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // POST to /api/contact endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone?.trim() || undefined,
          company: data.company?.trim() || undefined,
          budget: data.budget || undefined,
          message: data.message.trim(),
          gdprConsent: data.gdprConsent,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form")
      }

      // Success state
      setSubmitStatus("success")
      trackFormSubmission("contact", true)
      setFormComplete(true) // Mark form as complete

      // Success toast
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      })

      // Reset form after delay
      setTimeout(() => {
        reset()
        setSubmitStatus("idle")
        setFormComplete(false) // Reset completion status
      }, 3000)
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
      trackFormSubmission("contact", false)
      
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Real-time validation helper
  const getFieldStatus = (fieldName: keyof ContactFormData) => {
    const hasError = errors[fieldName]
    const isTouched = touchedFields[fieldName]
    const hasValue = watchedFields[fieldName]

    if (hasError && isTouched) return "error"
    if (isTouched && !hasError && hasValue) return "success"
    return "default"
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            <Mail className="h-4 w-4" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading-bold mb-4 text-gray-900">
            Let's Discuss Your Strategy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Schedule a consultation or send us a message to get started.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Contact Info Cards */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white backdrop-blur-sm border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-gray-900 mb-1">Email Us</h3>
                        <p className="text-sm text-gray-600">info@strategicconsulting.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white backdrop-blur-sm border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-gray-900 mb-1">Call Us</h3>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white backdrop-blur-sm border border-gray-200 hover:border-primary/50 transition-all duration-300 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30 flex-shrink-0">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading text-gray-900 mb-1">Schedule</h3>
                        <p className="text-sm text-gray-600">Mon-Fri, 9 AM - 6 PM EST</p>
                      </div>
        </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="bg-white backdrop-blur-sm border border-gray-200 shadow-md">
            <CardHeader>
                    <CardTitle className="text-2xl font-heading text-gray-900">Send us a message</CardTitle>
              <CardDescription className="text-slate-400">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
                  <AnimatePresence mode="wait">
                    {submitStatus === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500/30"
                        >
                          <CheckCircle2 className="h-10 w-10 text-green-400" />
                        </motion.div>
                        <h3 className="text-2xl font-heading text-gray-900 mb-2">Message Sent Successfully!</h3>
                        <p className="text-slate-300 mb-4">
                          Thank you for your inquiry. We'll get back to you within 24 hours.
                        </p>
                        <p className="text-sm text-slate-400">
                          You can close this form or it will reset automatically.
                        </p>
                      </motion.div>
                    ) : submitStatus === "error" ? (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-red-400 mb-2">
                          <AlertCircle className="h-5 w-5" />
                          <span className="font-semibold">Submission Failed</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          Something went wrong. Please try again or contact us directly.
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot field - hidden from users */}
                <div className="hidden" aria-hidden="true">
                  <Label htmlFor="honeypot">Leave this field empty</Label>
                  <Input
                    id="honeypot"
                        {...register("honeypot")}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-900">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                        <div className="relative">
                  <Input
                    id="fullName"
                        {...register("fullName")}
                    placeholder="John Doe"
                    aria-required="true"
                    aria-invalid={errors.fullName ? "true" : "false"}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                          className={`bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 ${
                              getFieldStatus("fullName") === "error"
                                ? "border-destructive"
                                : getFieldStatus("fullName") === "success"
                                ? "border-green-500"
                                : ""
                            }`}
                          />
                          {getFieldStatus("fullName") === "success" && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                          )}
                          {getFieldStatus("fullName") === "error" && (
                            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <AnimatePresence>
                          {errors.fullName && touchedFields.fullName && (
                            <motion.p
                              id="fullName-error"
                              role="alert"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-sm text-destructive flex items-center gap-1"
                            >
                              <AlertCircle className="h-4 w-4" aria-hidden="true" />
                              {errors.fullName.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                </div>

                <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-900">
                    Email <span className="text-destructive">*</span>
                  </Label>
                        <div className="relative">
                  <Input
                    id="email"
                    type="email"
                            {...register("email")}
                    placeholder="john@company.com"
                            className={`bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 ${
                              getFieldStatus("email") === "error"
                                ? "border-destructive"
                                : getFieldStatus("email") === "success"
                                ? "border-green-500"
                                : ""
                            }`}
                          />
                          {getFieldStatus("email") === "success" && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                          )}
                          {getFieldStatus("email") === "error" && (
                            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <AnimatePresence>
                          {errors.email && touchedFields.email && (
                            <motion.p
                              id="email-error"
                              role="alert"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-sm text-destructive flex items-center gap-1"
                            >
                              <AlertCircle className="h-4 w-4" aria-hidden="true" />
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            placeholder="+44 20 1234 5678"
                            aria-invalid={errors.phone ? "true" : "false"}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={`bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 ${
                              getFieldStatus("phone") === "error"
                                ? "border-destructive"
                                : getFieldStatus("phone") === "success"
                                ? "border-green-500"
                                : ""
                            }`}
                          />
                          {getFieldStatus("phone") === "success" && (
                            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-400" />
                          )}
                          {getFieldStatus("phone") === "error" && (
                            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                          )}
                        </div>
                        <AnimatePresence>
                          {errors.phone && touchedFields.phone && (
                            <motion.p
                              id="phone-error"
                              role="alert"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-sm text-destructive flex items-center gap-1"
                            >
                              <AlertCircle className="h-4 w-4" aria-hidden="true" />
                              {errors.phone.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                </div>

                <div className="space-y-2">
                        <Label htmlFor="company" className="text-gray-900">Company</Label>
                  <Input
                    id="company"
                          {...register("company")}
                    placeholder="Acme Inc."
                          className="bg-[#0f172a] border-slate-700 text-white placeholder:text-slate-500"
                  />
                      </div>
                </div>

                <div className="space-y-2">
                      <Label htmlFor="budget" className="text-gray-900">Project Budget</Label>
                  <Select
                    id="budget"
                        {...register("budget")}
                        className="bg-[#0f172a] border-slate-700 text-white"
                  >
                    <option value="">Select budget range</option>
                        <option value="<25k">Less than £25,000</option>
                        <option value="25-100k">£25,000 - £100,000</option>
                        <option value="100-500k">£100,000 - £500,000</option>
                        <option value="500k+">£500,000+</option>
                  </Select>
                </div>

                <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-900">
                    Message <span className="text-destructive">*</span>
                  </Label>
                      <div className="relative">
                  <Textarea
                    id="message"
                          {...register("message")}
                          placeholder="Tell us about your business challenges and goals..."
                    rows={5}
                          className={`bg-[#0f172a] border-slate-700 text-white placeholder:text-slate-500 ${
                            getFieldStatus("message") === "error"
                              ? "border-destructive"
                              : getFieldStatus("message") === "success"
                              ? "border-green-500"
                              : ""
                          }`}
                        />
                        {getFieldStatus("message") === "success" && (
                          <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-green-400" />
                        )}
                        {getFieldStatus("message") === "error" && (
                          <AlertCircle className="absolute right-3 top-3 h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <AnimatePresence>
                          {errors.message && touchedFields.message && (
                            <motion.p
                              id="message-error"
                              role="alert"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-sm text-destructive flex items-center gap-1"
                            >
                              <AlertCircle className="h-4 w-4" aria-hidden="true" />
                              {errors.message.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <p className="text-xs text-slate-500 ml-auto">
                          {watchedFields.message?.length || 0}/1000 characters
                        </p>
                      </div>
                    </div>

                    {/* GDPR Consent Checkbox */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          id="gdprConsent"
                          {...register("gdprConsent")}
                          aria-required="true"
                          aria-invalid={errors.gdprConsent ? "true" : "false"}
                          aria-describedby={errors.gdprConsent ? "gdprConsent-error" : undefined}
                          className="mt-1 w-5 h-5 rounded border-gray-300 bg-white text-primary focus:ring-primary focus:ring-2"
                        />
                        <Label htmlFor="gdprConsent" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                          I consent to the processing of my personal data in accordance with the{" "}
                          <a href="/privacy" className="text-primary hover:text-primary/80 underline">
                            Privacy Policy
                          </a>
                          {" "}and{" "}
                          <a href="/data-protection" className="text-primary hover:text-primary/80 underline">
                            Data Protection Policy
                          </a>
                          . <span className="text-destructive">*</span>
                        </Label>
                      </div>
                      <AnimatePresence>
                        {errors.gdprConsent && (
                          <motion.p
                            id="gdprConsent-error"
                            role="alert"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-sm text-destructive flex items-center gap-1"
                          >
                            <AlertCircle className="h-4 w-4" aria-hidden="true" />
                            {errors.gdprConsent.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                </div>

                    {/* Legal Compliance Checkbox - Decision Point 3 */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <input
                          type="checkbox"
                          id="termsAccepted"
                          {...register("termsAccepted")}
                          onChange={(e) => {
                            register("termsAccepted").onChange(e)
                            if (e.target.checked) {
                              setShowPrimarySidebar(true)
                            }
                          }}
                          className="mt-1 w-5 h-5 rounded border-gray-300 bg-white text-primary focus:ring-primary focus:ring-2"
                        />
                        <Label htmlFor="termsAccepted" className="text-sm text-slate-300 leading-relaxed cursor-pointer">
                          I have read and agree to the{" "}
                          <button
                            type="button"
                            onClick={() => setShowPrimarySidebar(true)}
                            className="text-primary hover:text-primary/80 underline"
                          >
                            Terms of Service
                          </button>
                          {" "}and{" "}
                          <button
                            type="button"
                            onClick={() => setShowPrimarySidebar(true)}
                            className="text-primary hover:text-primary/80 underline"
                          >
                            Legal Terms & Conditions
                          </button>
                          . (Optional - Click to review)
                        </Label>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98, y: 0 }}>
                <Button
                  type="submit"
                        className="w-full bg-secondary hover:bg-secondary/90 text-white shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-micro"
                  size="lg"
                        disabled={isSubmitting || !isValid}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="mr-2"
                            >
                              <Send className="h-5 w-5" />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                </Button>
                    </motion.div>
              </form>
            </CardContent>
          </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
