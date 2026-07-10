import { Metadata } from "next";
import { notFound } from "next/navigation";
import clinics from "@/data/clinics.json";
import guides from "@/data/guides.json";
import towns from "@/data/towns.json";
import { Clinic, Guide, Town, CONDITIONS, Condition } from "@/lib/types";
import { formatPrice, findIcbForTown, formatWaitMonths } from "@/lib/utils";
import {
  generateClinicPageMeta,
  generateMedicalClinicSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  SITE_URL,
} from "@/lib/seo";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";

const allClinics = clinics as unknown as Clinic[];
const allGuides = guides as Guide[];
const allTowns = towns as Town[];

export function generateStaticParams() {
  return allClinics.map((c) => ({ slug: c.slug }));
}

type PageProps = { params: { slug: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const clinic = allClinics.find((c) => c.slug === params.slug);
  if (!clinic) return {};
  return generateClinicPageMeta(
    clinic.name,
    clinic.city,
    clinic.conditions,
    clinic.slug
  );
}

/* ---------- helpers ---------- */

function getConditionLabel(conditions: ("adhd" | "autism")[]): string {
  return conditions.map((c) => CONDITIONS[c].name).join(" & ");
}

function buildClinicFaqs(clinic: Clinic, icbWaitAdhd?: string, icbWaitAutism?: string) {
  const condLabel = getConditionLabel(clinic.conditions);
  const faqs: { question: string; answer: string }[] = [];

  faqs.push({
    question: `What types of assessment does ${clinic.name} offer?`,
    answer: `${clinic.name} offers private ${condLabel} assessments for ${
      clinic.pricing.adhd_child || clinic.pricing.autism_child
        ? "both adults and children"
        : "adults"
    }. Services include ${clinic.services.slice(0, 4).join(", ")}${
      clinic.services.length > 4
        ? `, and ${clinic.services.length - 4} more`
        : ""
    }.`,
  });

  faqs.push({
    question: `How much does an assessment at ${clinic.name} cost?`,
    answer: (() => {
      const parts: string[] = [];
      if (clinic.pricing.adhd_adult)
        parts.push(`Adult ADHD assessment: ${formatPrice(clinic.pricing.adhd_adult)}`);
      if (clinic.pricing.adhd_child)
        parts.push(`Child ADHD assessment: ${formatPrice(clinic.pricing.adhd_child)}`);
      if (clinic.pricing.autism_adult)
        parts.push(`Adult autism assessment: ${formatPrice(clinic.pricing.autism_adult)}`);
      if (clinic.pricing.autism_child)
        parts.push(`Child autism assessment: ${formatPrice(clinic.pricing.autism_child)}`);
      return parts.length > 0
        ? `Current pricing: ${parts.join(". ")}. Prices may vary — contact the clinic directly to confirm.`
        : "Contact the clinic directly for current pricing information.";
    })(),
  });

  faqs.push({
    question: `How long is the waiting time at ${clinic.name}?`,
    answer: `${clinic.name} currently has a typical waiting time of ${clinic.wait_time}. ${
      icbWaitAdhd
        ? `For comparison, the NHS waiting time in this area is approximately ${icbWaitAdhd} for ADHD${
            icbWaitAutism ? ` and ${icbWaitAutism} for autism` : ""
          }.`
        : "NHS waiting times in many areas exceed 2 years."
    }`,
  });

  faqs.push({
    question: `What happens during an assessment at ${clinic.name}?`,
    answer: `A private ${condLabel} assessment typically involves an initial screening questionnaire, a comprehensive clinical interview (usually 1.5–3 hours), ${
      clinic.conditions.includes("autism")
        ? "standardised tools such as ADOS-2 for autism, "
        : ""
    }a review of developmental history, and a detailed diagnostic report. ${clinic.name} follows NICE guidelines throughout.`,
  });

  if (
    clinic.services.some(
      (s) =>
        s.toLowerCase().includes("shared care") ||
        s.toLowerCase().includes("right to choose")
    )
  ) {
    faqs.push({
      question: `Does ${clinic.name} support shared care agreements?`,
      answer: `Yes — ${clinic.name} can work with your GP under a shared care agreement. This means your GP may agree to prescribe and monitor ongoing medication on the NHS after your private diagnosis, potentially reducing your long-term costs.`,
    });
  }

  faqs.push({
    question: `Is a private diagnosis from ${clinic.name} recognised by the NHS?`,
    answer: `A private ${condLabel} diagnosis from a qualified clinician is clinically valid. Most GPs will accept the diagnosis for their records, though individual GPs vary in whether they will enter a shared care agreement for ongoing prescribing. ${clinic.name}'s report is designed to facilitate this process.`,
  });

  faqs.push({
    question: `Who carries out assessments at ${clinic.name}?`,
    answer:
      clinic.professionals.length > 0
        ? `Assessments are conducted by qualified professionals including ${clinic.professionals
            .slice(0, 3)
            .join(", ")}${
            clinic.professionals.length > 3
              ? `, and ${clinic.professionals.length - 3} other specialists`
              : ""
          }. All clinicians follow NICE guidelines for ${condLabel} assessment.`
        : `Assessments at ${clinic.name} are conducted by qualified clinicians who follow NICE guidelines for ${condLabel} diagnosis.`,
  });

  return faqs;
}

/* ---------- What to Expect process steps ---------- */

const processSteps = [
  {
    step: 1,
    title: "Initial Enquiry",
    description:
      "Contact the clinic by phone, email, or their online form. They will answer your questions and help you decide which assessment is right for you.",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    step: 2,
    title: "Pre-Assessment Questionnaires",
    description:
      "You will receive screening questionnaires to complete before your appointment. These help the clinician prepare and make the most of your assessment time.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    step: 3,
    title: "Clinical Assessment",
    description:
      "A comprehensive evaluation lasting 1.5–3 hours, including a structured clinical interview, developmental history review, and standardised diagnostic tools.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    step: 4,
    title: "Diagnostic Report",
    description:
      "You will receive a detailed written report with your diagnosis, clinical findings, and personalised recommendations — usually within 2–4 weeks.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    step: 5,
    title: "Follow-Up & Support",
    description:
      "After diagnosis, the clinic can help with medication management, shared care agreements with your GP, and ongoing therapeutic support.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

/* ---------- page component ---------- */

export default function ClinicProfilePage({ params }: PageProps) {
  const slug = params.slug;
  const clinic = allClinics.find((c) => c.slug === slug);
  if (!clinic) notFound();

  const isPaid = clinic.tier === "featured" || clinic.tier === "premium";
  const condLabel = getConditionLabel(clinic.conditions);

  /* Related guides */
  const relevantGuides = allGuides
    .filter(
      (g) =>
        clinic.conditions.includes(g.condition as "adhd" | "autism") ||
        g.condition === "both"
    )
    .slice(0, 3);

  /* ICB data for the clinic's city */
  const clinicTown = allTowns.find(
    (t) => t.name.toLowerCase() === clinic.city.toLowerCase()
  );
  const icb = clinicTown ? findIcbForTown(clinicTown) : null;
  const icbWaitAdhd = icb ? formatWaitMonths(icb.adhd_wait_months) : null;
  const icbWaitAutism = icb ? formatWaitMonths(icb.autism_wait_months) : null;

  /* Towns this clinic serves — for cross-linking */
  const servedTowns = allTowns
    .filter((t) => clinic.towns_served.includes(t.slug))
    .slice(0, 12);

  /* Shared care support? */
  const hasSharedCare = clinic.services.some(
    (s) =>
      s.toLowerCase().includes("shared care") ||
      s.toLowerCase().includes("titration")
  );

  /* Right to Choose? */
  const hasRtc = clinic.services.some((s) =>
    s.toLowerCase().includes("right to choose")
  );

  /* FAQs */
  const faqs = buildClinicFaqs(
    clinic,
    icbWaitAdhd ?? undefined,
    icbWaitAutism ?? undefined
  );

  /* Breadcrumbs */
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: clinic.name, url: `${SITE_URL}/clinic/${clinic.slug}/` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Structured Data */}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />

      {/* Breadcrumb nav */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <svg
          className="w-3.5 h-3.5 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-700 font-medium">{clinic.name}</span>
      </nav>

      {/* ===== Main Card ===== */}
      <div className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm">
        {/* Header */}
        <div
          className={`p-7 sm:p-9 ${
            isPaid
              ? "bg-gradient-to-br from-blue-50/80 to-purple-50/60"
              : ""
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              {clinic.tier === "premium" && (
                <span className="inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white text-xs font-semibold px-3.5 py-1 rounded-full mb-4 shadow-sm">
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
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {clinic.address}, {clinic.city} {clinic.postcode}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {clinic.conditions.map((c) => (
                  <Link
                    key={c}
                    href={`/${CONDITIONS[c].slug}/`}
                    className={`text-xs px-3.5 py-1.5 rounded-lg font-medium ${
                      c === "adhd"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200"
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
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {clinic.description}
            </p>
          </div>

          {/* ===== Key Stats at a Glance ===== */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-medium">Wait Time</p>
              <p className="text-lg font-bold text-blue-800 mt-1">
                {clinic.wait_time}
              </p>
            </div>
            {icbWaitAdhd && clinic.conditions.includes("adhd") && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  NHS ADHD Wait
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {icbWaitAdhd}
                </p>
              </div>
            )}
            {icbWaitAutism && clinic.conditions.includes("autism") && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                <p className="text-xs text-gray-500 font-medium">
                  NHS Autism Wait
                </p>
                <p className="text-lg font-bold text-gray-800 mt-1">
                  {icbWaitAutism}
                </p>
              </div>
            )}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 text-center">
              <p className="text-xs text-blue-600 font-medium">Conditions</p>
              <p className="text-lg font-bold text-blue-800 mt-1">
                {condLabel}
              </p>
            </div>
          </div>

          {/* ===== Pricing ===== */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pricing
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {clinic.pricing.adhd_adult && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">
                    Adult ADHD Assessment
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatPrice(clinic.pricing.adhd_adult)}
                  </p>
                </div>
              )}
              {clinic.pricing.adhd_child && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">
                    Child ADHD Assessment
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatPrice(clinic.pricing.adhd_child)}
                  </p>
                </div>
              )}
              {clinic.pricing.autism_adult && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">
                    Adult Autism Assessment
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatPrice(clinic.pricing.autism_adult)}
                  </p>
                </div>
              )}
              {clinic.pricing.autism_child && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-50/50 rounded-xl p-5 border border-gray-100">
                  <p className="text-sm text-gray-500">
                    Child Autism Assessment
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {formatPrice(clinic.pricing.autism_child)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ===== What to Expect ===== */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              What to Expect
            </h2>
            <div className="space-y-0">
              {processSteps.map((step, i) => (
                <div key={step.step} className="flex gap-4">
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={step.icon}
                        />
                      </svg>
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="w-0.5 grow bg-blue-100 my-1" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 ${i === processSteps.length - 1 ? "pb-0" : ""}`}>
                    <p className="text-sm font-semibold text-gray-900">
                      Step {step.step}: {step.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Services ===== */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Services
            </h2>
            <div className="flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <span
                  key={service}
                  className="bg-gray-100 text-gray-700 text-sm px-3.5 py-1.5 rounded-lg border border-gray-200/50"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* ===== Professionals ===== */}
          {clinic.professionals.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Clinical Team
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {clinic.professionals.map((prof) => {
                  const parts = prof.split(", ");
                  const name = parts[0];
                  const role = parts.slice(1).join(", ");
                  return (
                    <div
                      key={prof}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3"
                    >
                      <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {name}
                        </p>
                        {role && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {role}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== NHS vs Private + Right to Choose + Shared Care ===== */}
          {icb && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                NHS vs Private in {clinic.city}
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50/40 rounded-2xl p-6 border border-blue-100/60">
                <p className="text-sm text-gray-700 leading-relaxed">
                  The local NHS services for {clinic.city} are managed by{" "}
                  <strong>{icb.name}</strong>
                  {icb.local_nhs_provider &&
                    `, with assessments delivered through ${icb.local_nhs_provider}`}
                  . Current NHS waiting times are approximately{" "}
                  <strong className="text-gray-800">
                    {icbWaitAdhd} for ADHD
                  </strong>
                  {icbWaitAutism && (
                    <>
                      {" "}and{" "}
                      <strong className="text-gray-800">
                        {icbWaitAutism} for autism
                      </strong>
                    </>
                  )}
                  . {clinic.name} offers a private alternative with a typical
                  wait of just{" "}
                  <strong className="text-blue-700">
                    {clinic.wait_time}
                  </strong>
                  .
                </p>
              </div>

              {/* Right to Choose */}
              {hasRtc && icb.rtc_status === "accepted" && (
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200/60">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Right to Choose Available
                      </p>
                      <p className="text-sm text-blue-800 mt-1 leading-relaxed">
                        {clinic.name} accepts NHS Right to Choose referrals.
                        Under NHS England guidelines, you can ask your GP to
                        refer you to this clinic for your ADHD assessment — the
                        NHS funds the assessment while you benefit from the
                        shorter private waiting time.{" "}
                        {icb.rtc_notes && icb.rtc_notes}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Shared Care */}
              {hasSharedCare && (
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200/60">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Shared Care Agreement Support
                      </p>
                      <p className="text-sm text-blue-800 mt-1 leading-relaxed">
                        {clinic.name} supports shared care agreements with your
                        GP. After diagnosis and medication stabilisation
                        (titration), they can transfer your prescribing to your
                        GP under a formal shared care arrangement — meaning your
                        ongoing medication is managed on the NHS, significantly
                        reducing your long-term costs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== FAQs ===== */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-medium text-gray-900 hover:bg-gray-100/60 transition-colors select-none">
                    {faq.question}
                    <svg
                      className="w-4 h-4 text-gray-400 shrink-0 ml-3 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Last updated */}
          <p className="text-xs text-gray-400">
            Profile last updated:{" "}
            {new Date(clinic.updated_at).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Lead Capture Form */}
          <LeadCaptureForm
            condition={clinic.conditions[0]}
            clinicId={clinic.id}
            clinicName={clinic.name}
            townName={clinic.city}
            variant="inline"
          />

          {/* ===== Direct Contact ===== */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-7 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Contact Directly
            </h2>
            <div className="flex flex-wrap gap-3">
              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone.replace(/\s/g, "")}`}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call {clinic.phone}
                </a>
              )}
              {clinic.email && (
                <a
                  href={`mailto:${clinic.email}`}
                  className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Areas Served — town cross-links ===== */}
      {servedTowns.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Areas Served by {clinic.name}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Find {condLabel.toLowerCase()} assessment information for towns near{" "}
            {clinic.city}:
          </p>
          <div className="flex flex-wrap gap-2">
            {servedTowns.map((town) => (
              <span key={town.slug} className="inline-flex gap-1.5">
                {clinic.conditions.map((cond) => (
                  <Link
                    key={`${town.slug}-${cond}`}
                    href={`/${CONDITIONS[cond as Condition].slug}/${town.slug}/`}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                      cond === "adhd"
                        ? "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                        : "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100"
                    }`}
                  >
                    {CONDITIONS[cond as Condition].name} in {town.name}
                  </Link>
                ))}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ===== Related Guides ===== */}
      {relevantGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Helpful Guides
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relevantGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}/`}
                className="bg-white rounded-2xl border border-gray-200/60 p-6 card-hover group"
              >
                <h3 className="font-medium text-gray-900 mb-1.5 text-sm group-hover:text-blue-600 transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {g.meta_description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
