import { Metadata } from "next";
import { notFound } from "next/navigation";
import clinics from "@/data/clinics.json";
import guides from "@/data/guides.json";
import { Clinic, Guide, CONDITIONS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { generateClinicPageMeta, generateMedicalClinicSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import Link from "next/link";

const allClinics = clinics as unknown as Clinic[];
const allGuides = guides as Guide[];

export function generateStaticParams() {
  return allClinics.map((c) => ({ slug: c.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const clinic = allClinics.find((c) => c.slug === params.slug);
  if (!clinic) return {};
  return generateClinicPageMeta(clinic.name, clinic.city, clinic.conditions, clinic.slug);
}

export default function ClinicProfilePage({ params }: PageProps) {
  const slug = params.slug;
  const clinic = allClinics.find((c) => c.slug === slug);
  if (!clinic) notFound();

  const isPaid = clinic.tier === "featured" || clinic.tier === "premium";

  const relevantGuides = allGuides
    .filter((g) => clinic.conditions.includes(g.condition as "adhd" | "autism") || g.condition === "both")
    .slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: clinic.name, url: `${SITE_URL}/clinic/${clinic.slug}/` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMedicalClinicSchema(clinic)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />

      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{clinic.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {/* Header */}
        <div className={`p-7 sm:p-9 ${isPaid ? "bg-gradient-to-br from-blue-50/80 to-purple-50/60" : ""}`}>
          <div className="flex justify-between items-start">
            <div>
              {clinic.tier === "premium" && (
                <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3.5 py-1 rounded-full mb-4 shadow-sm">
                  Premium Clinic
                </span>
              )}
              {clinic.tier === "featured" && (
                <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold px-3.5 py-1 rounded-full mb-4 shadow-sm">
                  Featured
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {clinic.name}
              </h1>
              <p className="text-gray-500 mt-2 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {clinic.address}, {clinic.city} {clinic.postcode}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {clinic.conditions.map((c) => (
                  <Link
                    key={c}
                    href={`/${CONDITIONS[c].slug}/`}
                    className={`text-xs px-3.5 py-1.5 rounded-lg font-medium ${
                      c === "adhd" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                    } transition-colors`}
                  >
                    {CONDITIONS[c].name} Assessment
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-7 sm:p-9 space-y-9">
          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{clinic.description}</p>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {clinic.pricing.adhd_adult && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Adult ADHD Assessment</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(clinic.pricing.adhd_adult)}</p>
                </div>
              )}
              {clinic.pricing.adhd_child && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Child ADHD Assessment</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(clinic.pricing.adhd_child)}</p>
                </div>
              )}
              {clinic.pricing.autism_adult && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Adult Autism Assessment</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(clinic.pricing.autism_adult)}</p>
                </div>
              )}
              {clinic.pricing.autism_child && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">Child Autism Assessment</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(clinic.pricing.autism_child)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Wait time */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Waiting Time</h2>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-medium border border-emerald-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Current typical wait: {clinic.wait_time}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
            <div className="flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <span key={service} className="bg-gray-100 text-gray-700 text-sm px-3.5 py-1.5 rounded-lg border border-gray-200/50">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Professionals */}
          {clinic.professionals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Professionals</h2>
              <ul className="space-y-3">
                {clinic.professionals.map((prof) => (
                  <li key={prof} className="text-gray-600 text-sm flex items-center gap-2.5">
                    <div className="w-6 h-6 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {prof}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Last updated */}
          <p className="text-xs text-gray-400">
            Profile last updated: {new Date(clinic.updated_at).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Contact */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Contact This Clinic</h2>
            <div className="flex flex-wrap gap-3">
              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call {clinic.phone}
                </a>
              )}
              {clinic.email && (
                <a
                  href={`mailto:${clinic.email}`}
                  className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Clinic
                </a>
              )}
              {clinic.website && (
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related guides */}
      {relevantGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">Helpful Guides</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relevantGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}/`}
                className="bg-white rounded-2xl border border-gray-200/60 p-6 card-hover group"
              >
                <h3 className="font-medium text-gray-900 mb-1.5 text-sm group-hover:text-blue-600 transition-colors">{g.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{g.meta_description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
