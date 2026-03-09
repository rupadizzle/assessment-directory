import { Metadata } from "next";
import { Clinic, Condition, CONDITIONS } from "./types";

const SITE_NAME = "UK Assessment Directory";
const SITE_URL = "https://assessmentdirectory.co.uk";

// ---------------------------------------------------------------------------
// Page metadata generators
// ---------------------------------------------------------------------------

export function generateTownPageMeta(
  townName: string,
  county: string,
  condition: Condition,
  townSlug: string
): Metadata {
  const config = CONDITIONS[condition];
  const title = `Private ${config.name} Assessment in ${townName} | ${SITE_NAME}`;
  const description = `Find trusted private ${config.name} assessment clinics near ${townName}, ${county}. Compare prices, waiting times and book your ${config.name.toLowerCase()} assessment today. NHS waiting list too long? Get assessed privately.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${config.slug}/${townSlug}/`,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${config.slug}/${townSlug}/`,
    },
  };
}

export function generateClinicPageMeta(
  clinicName: string,
  city: string,
  conditions: string[],
  clinicSlug: string
): Metadata {
  const condList = conditions
    .map((c) => CONDITIONS[c as Condition]?.name)
    .join(" & ");
  const title = `${clinicName} — Private ${condList} Assessments in ${city}`;
  const description = `Book a private ${condList.toLowerCase()} assessment at ${clinicName} in ${city}. View prices, waiting times, and professional credentials.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/clinic/${clinicSlug}/`,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/clinic/${clinicSlug}/`,
    },
  };
}

export function generateGuidePageMeta(
  title: string,
  metaDescription: string,
  slug: string
): Metadata {
  return {
    title: `${title} | ${SITE_NAME}`,
    description: metaDescription,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description: metaDescription,
      url: `${SITE_URL}/guides/${slug}/`,
      siteName: SITE_NAME,
      type: "article",
    },
    alternates: {
      canonical: `${SITE_URL}/guides/${slug}/`,
    },
  };
}

// ---------------------------------------------------------------------------
// Sitewide schemas (inject in root layout)
// ---------------------------------------------------------------------------

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "UK Assessment Directory helps people find trusted private ADHD and autism assessment clinics across the United Kingdom. Compare prices, waiting times and book your assessment.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "clinics@assessmentdirectory.co.uk",
      contactType: "customer service",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Find and compare private ADHD and autism assessment clinics across the UK.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

// ---------------------------------------------------------------------------
// Breadcrumb schema
// ---------------------------------------------------------------------------

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ---------------------------------------------------------------------------
// Clinic / MedicalClinic schema
// ---------------------------------------------------------------------------

export function generateMedicalClinicSchema(clinic: Clinic) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    description: clinic.description,
    url: `${SITE_URL}/clinic/${clinic.slug}/`,
    telephone: clinic.phone,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      postalCode: clinic.postcode,
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: clinic.lat,
      longitude: clinic.lng,
    },
    medicalSpecialty: clinic.conditions
      .map((c) => CONDITIONS[c]?.fullName)
      .join(", "),
  };

  if (clinic.website) {
    schema.sameAs = clinic.website;
  }

  const offers: Record<string, unknown>[] = [];
  if (clinic.pricing.adhd_adult) {
    offers.push({
      "@type": "Offer",
      name: "Adult ADHD Assessment",
      price: clinic.pricing.adhd_adult,
      priceCurrency: "GBP",
    });
  }
  if (clinic.pricing.adhd_child) {
    offers.push({
      "@type": "Offer",
      name: "Child ADHD Assessment",
      price: clinic.pricing.adhd_child,
      priceCurrency: "GBP",
    });
  }
  if (clinic.pricing.autism_adult) {
    offers.push({
      "@type": "Offer",
      name: "Adult Autism Assessment",
      price: clinic.pricing.autism_adult,
      priceCurrency: "GBP",
    });
  }
  if (clinic.pricing.autism_child) {
    offers.push({
      "@type": "Offer",
      name: "Child Autism Assessment",
      price: clinic.pricing.autism_child,
      priceCurrency: "GBP",
    });
  }
  if (offers.length > 0) {
    schema.makesOffer = offers;
  }

  return schema;
}

// ---------------------------------------------------------------------------
// Article schema (for guide pages)
// ---------------------------------------------------------------------------

export function generateArticleSchema(
  title: string,
  description: string,
  slug: string,
  datePublished: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/guides/${slug}/`,
    datePublished,
    dateModified: datePublished,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/guides/${slug}/`,
    },
  };
}

// ---------------------------------------------------------------------------
// FAQ schema
// ---------------------------------------------------------------------------

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export { SITE_URL, SITE_NAME };
