import { Metadata } from "next";
import { Condition, CONDITIONS } from "./types";

const SITE_NAME = "UK Assessment Directory";
const SITE_URL = "https://assessmentdirectory.co.uk";

export function generateTownPageMeta(
  townName: string,
  county: string,
  condition: Condition
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
      url: `${SITE_URL}/${config.slug}/${townName.toLowerCase().replace(/\s+/g, "-")}/`,
      siteName: SITE_NAME,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/${config.slug}/${townName.toLowerCase().replace(/\s+/g, "-")}/`,
    },
  };
}

export function generateClinicPageMeta(
  clinicName: string,
  city: string,
  conditions: string[]
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
      siteName: SITE_NAME,
      type: "website",
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

export function generateLocalBusinessSchema(
  clinicName: string,
  address: string,
  city: string,
  postcode: string,
  phone: string,
  url: string,
  lat: number,
  lng: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: clinicName,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      postalCode: postcode,
      addressCountry: "GB",
    },
    telephone: phone,
    url: url,
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
  };
}

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
