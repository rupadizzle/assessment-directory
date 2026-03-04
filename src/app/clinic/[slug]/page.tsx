import { Metadata } from "next";
import { notFound } from "next/navigation";
import clinics from "@/data/clinics.json";
import { Clinic, CONDITIONS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { generateClinicPageMeta, generateLocalBusinessSchema } from "@/lib/seo";
import Link from "next/link";

const allClinics = clinics as unknown as Clinic[];

export function generateStaticParams() {
  return allClinics.map((c) => ({ slug: c.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const clinic = allClinics.find((c) => c.slug === params.slug);
  if (!clinic) return {};
  return generateClinicPageMeta(clinic.name, clinic.city, clinic.conditions);
}

export default function ClinicProfilePage({ params }: PageProps) {
  const slug = params.slug;
  const clinic = allClinics.find((c) => c.slug === slug);
  if (!clinic) notFound();

  const isPaid = clinic.tier === "featured" || clinic.tier === "premium";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateLocalBusinessSchema(
              clinic.name,
              clinic.address,
              clinic.city,
              clinic.postcode,
              clinic.phone,
              clinic.website,
              clinic.lat,
              clinic.lng
            )
          ),
        }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        {" / "}
        <span className="text-gray-900">{clinic.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className={`p-6 sm:p-8 ${isPaid ? "bg-gradient-to-r from-blue-50 to-purple-50" : ""}`}>
          <div className="flex justify-between items-start">
            <div>
              {clinic.tier === "premium" && (
                <span className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Premium Clinic
                </span>
              )}
              {clinic.tier === "featured" && (
                <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Featured
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {clinic.name}
              </h1>
              <p className="text-gray-600 mt-1">
                {clinic.address}, {clinic.city} {clinic.postcode}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {clinic.conditions.map((c) => (
                  <span
                    key={c}
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      c === "adhd" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {CONDITIONS[c].name} Assessment
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-600">{clinic.description}</p>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Pricing</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {clinic.pricing.adhd_adult && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Adult ADHD Assessment</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(clinic.pricing.adhd_adult)}</p>
                </div>
              )}
              {clinic.pricing.adhd_child && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Child ADHD Assessment</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(clinic.pricing.adhd_child)}</p>
                </div>
              )}
              {clinic.pricing.autism_adult && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Adult Autism Assessment</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(clinic.pricing.autism_adult)}</p>
                </div>
              )}
              {clinic.pricing.autism_child && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Child Autism Assessment</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(clinic.pricing.autism_child)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Wait time */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Waiting Time</h2>
            <p className="text-gray-600">Current typical wait: <strong>{clinic.wait_time}</strong></p>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Services</h2>
            <div className="flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <span key={service} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Professionals */}
          {clinic.professionals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Professionals</h2>
              <ul className="space-y-2">
                {clinic.professionals.map((prof) => (
                  <li key={prof} className="text-gray-600 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {prof}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact This Clinic</h2>
            <div className="flex flex-wrap gap-4">
              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Call {clinic.phone}
                </a>
              )}
              {clinic.email && (
                <a
                  href={`mailto:${clinic.email}`}
                  className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Email Clinic
                </a>
              )}
              {clinic.website && (
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
