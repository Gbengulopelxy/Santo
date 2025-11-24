// components/StructuredData.tsx
/**
 * JSON-LD Structured Data for SEO
 * 
 * Provides rich snippets for search engines:
 * - Organization schema
 * - WebSite schema
 * - BreadcrumbList schema (optional)
 */

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Strategic Business Consulting",
    url: "https://strategicconsulting.com",
    logo: "https://strategicconsulting.com/images/logo.png",
    description: "Expert business strategy consulting services to help you achieve sustainable growth, optimize operations, and unlock your company's full potential.",
    sameAs: [
      "https://linkedin.com/company/strategicconsulting",
      "https://twitter.com/strategicconsulting",
      "https://facebook.com/strategicconsulting",
      "https://instagram.com/strategicconsulting",
      "https://youtube.com/@strategicconsulting",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "Customer Service",
      email: "info@strategicconsulting.com",
      availableLanguage: ["English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "GB",
    },
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Strategic Business Consulting",
    url: "https://strategicconsulting.com",
    description: "Transform your business from 5 figures to 6 figures monthly with expert business strategy consulting from a Forbes Business Council member.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://strategicconsulting.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Business Strategy Consulting",
    provider: {
      "@type": "Organization",
      name: "Strategic Business Consulting",
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business Strategy Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Review & Assessment",
            description: "Comprehensive business analysis and strategic assessment",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Strategic Planning",
            description: "Develop winning strategies for business growth",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Revenue Growth Strategies",
            description: "Scale revenue from 5 to 6 figures monthly",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Enhancement",
            description: "Elevate brand positioning and market presence",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Keynote Speaking",
            description: "Expert business strategy keynote presentations",
          },
        },
      ],
    },
  }

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Strategic Business Consultant",
    jobTitle: "Forbes Business Council Member",
    description: "Official Forbes Business Counsellor with 15+ years of experience transforming businesses",
    memberOf: {
      "@type": "Organization",
      name: "Forbes Business Council",
    },
    knowsAbout: [
      "Business Strategy",
      "Revenue Growth",
      "Strategic Planning",
      "Business Transformation",
      "Corporate Strategy",
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}

