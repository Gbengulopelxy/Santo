// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"

// Resend is optional - only initialize if API key is provided
let resend: any = null
if (process.env.RESEND_API_KEY) {
  try {
    const { Resend } = require("resend")
    resend = new Resend(process.env.RESEND_API_KEY)
  } catch (error) {
    console.warn("Resend package not installed. Email notifications disabled.")
  }
}

interface ContactFormData {
  fullName: string
  email: string
  phone?: string
  company?: string
  budget?: string
  message: string
  gdprConsent: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()

    // Validate required fields
    if (!data.fullName || !data.email || !data.message || !data.gdprConsent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Email notification to admin
    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "onboarding@resend.dev",
          to: process.env.TO_EMAIL || "admin@strategicconsulting.com",
          subject: `New Contact Form Submission from ${data.fullName}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
            ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
            ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, "<br>")}</p>
            <hr>
            <p><small>GDPR Consent: ${data.gdprConsent ? "Yes" : "No"}</small></p>
            <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
          `,
        })

        // Confirmation email to user
        await resend.emails.send({
          from: process.env.FROM_EMAIL || "onboarding@resend.dev",
          to: data.email,
          subject: "Thank you for contacting Strategic Business Consulting",
          html: `
            <h2>Thank you for your inquiry!</h2>
            <p>Dear ${data.fullName},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <p>Your message:</p>
            <blockquote>${data.message.replace(/\n/g, "<br>")}</blockquote>
            <p>Best regards,<br>Strategic Business Consulting Team</p>
          `,
        })
      } catch (emailError) {
        console.error("Email sending error:", emailError)
        // Continue even if email fails
      }
    } else {
      console.warn("Resend API key not configured. Email notifications disabled.")
    }

    // Here you could also save to a database
    // await saveToDatabase(data)

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

