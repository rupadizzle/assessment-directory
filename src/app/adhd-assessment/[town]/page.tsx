import { Metadata } from "next";
import { notFound } from "next/navigation";
import towns from "@/data/towns.json";
import clinics from "@/data/clinics.json";
import guides from "@/data/guides.json";
import { Town, Clinic, Condition, Guide } from "@/lib/types";
import {
  findNearbyTowns,
  findClinicsNearTownWithDistance,
  getClinicStats,
  findIcbForTown,
  formatWaitMonths,
  formatPrice,
  getDistance,
} from "@/lib/utils";
import { generateTownPageMeta, generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import ClinicCard from "@/components/ClinicCard";
import NearbyTowns from "@/components/NearbyTowns";
import FAQ from "@/components/FAQ";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";

const condition: Condition = "adhd";
const allTowns = towns as Town[];
const allClinics = clinics as unknown as Clinic[];
const allGuides = guides as Guide[];

export function generateStaticParams() {
  return allTowns.map((town) => ({ town: town.slug }));
}

type PageProps = { params: { town: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const town = allTowns.find((t) => t.slug === params.town);
  if (!town) return {};

  const meta = generateTownPageMeta(town.name, town.county, condition, town.slug);
  const clinicsWithDist = findClinicsNearTownWithDistance(town, allClinics, condition, 50, 10);

  if (clinicsWithDist.length === 0) {
    meta.robots = { index: false, follow: true };
  }

  return meta;
}

export default function ADHDTownPage({ params }: PageProps) {
  const townSlug = params.town;
  const town = allTowns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const clinicsWithDist = findClinicsNearTownWithDistance(town, allClinics, condition, 50, 10);
  const nearbyClinics = clinicsWithDist.map((c) => c.clinic);
  const nearbyTowns = findNearbyTowns(town, allTowns, 30, 12);
  const stats = getClinicStats(nearbyClinics, condition);
  const icb = findIcbForTown(town);
  const relevantGuides = allGuides
    .filter((g) => g.condition === "adhd" || g.condition === "both")
    .slice(0, 3);

  // Dynamic price range from actual clinic data
  const prices = nearbyClinics
    .map((c) => c.pricing.adhd_adult)
    .filter((p): p is number => !!p);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 495;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1500;

  const nhsWaitText = icb ? formatWaitMonths(icb.adhd_wait_months) : "2-5 years";
  const nhsWaitMonths = icb ? icb.adhd_wait_months : 36;

  const faqs = [
    {
      question: `How much does a private ADHD assessment cost in ${town.name}?`,
      answer: `Private ADHD assessments near ${town.name} typically cost between £${minPrice.toLocaleString()} and £${maxPrice.toLocaleString()} for adults. ${nearbyClinics.length > 0 ? `We found ${nearbyClinics.length} clinics serving the ${town.name} area` : `Use our directory to find clinics near ${town.name}`}. Many clinics offer payment plans, and some accept Right to Choose referrals funded by the NHS.`,
    },
    {
      question: `How long is the NHS waiting list for ADHD assessment in ${town.name}?`,
      answer: `NHS waiting times for ADHD assessment in the ${icb ? icb.short_name : town.county} area are currently around ${nhsWaitText}. ${icb?.rtc_status === "accepted" ? "You have the legal Right to Choose a private provider funded by the NHS — ask your GP for a referral." : "Private assessment is available as an alternative to the NHS wait."} Many people choose private assessment to get diagnosed and start treatment sooner.`,
    },
    {
      question: `What is the Right to Choose for ADHD in ${town.name}?`,
      answer: icb?.rtc_status === "accepted"
        ? `The Right to Choose is a legal right under the NHS Constitution that allows you to choose your healthcare provider. In the ${icb.short_name} area, your GP can refer you to an approved private ADHD assessment provider, and the NHS will fund the assessment. This means you can skip the ${nhsWaitText} NHS waiting list and get assessed within weeks, at no cost to you. Ask your GP to make a Right to Choose referral for ADHD assessment.`
        : `The Right to Choose applies in England only. In ${town.region}, the NHS has its own referral pathway for ADHD assessment. You can still access private assessment independently, which typically has much shorter waiting times than the NHS.`,
    },
    {
      question: `What happens during an ADHD assessment?`,
      answer: `A private ADHD assessment typically involves a 1-2 hour consultation with a psychiatrist or clinical psychologist. They'll review your symptoms, developmental history, and how ADHD affects your daily life. Some assessments include computerised attention tests (like the QbTest). You'll usually receive a diagnosis and treatment recommendations on the same day or within a week. If ADHD is confirmed, your clinician can prescribe medication immediately.`,
    },
    {
      question: `Can I get ADHD medication after a private assessment near ${town.name}?`,
      answer: `Yes. If diagnosed with ADHD through a private assessment, your clinician can prescribe medication such as methylphenidate (Concerta, Ritalin) or lisdexamfetamine (Elvanse). They will also write to your GP requesting a shared care agreement, which allows your GP to continue prescribing and monitoring your medication on the NHS. ${nearbyClinics.filter(c => c.services?.includes("Shared care")).length > 0 ? `Several clinics near ${town.name} specifically offer shared care agreements.` : "Most reputable clinics will arrange shared care with your GP."}`,
    },
    {
      question: `Is a private ADHD diagnosis recognised by the NHS?`,
      answer: `Yes, a private ADHD diagnosis from a qualified clinician (psychiatrist or specialist nurse prescriber) is fully recognised by the NHS. Your GP should accept the diagnosis and enter into a shared care agreement for ongoing medication management. This means after the initial private assessment, your ongoing care can continue through the NHS at no extra cost.`,
    },
    {
      question: `Are there ADHD support groups in ${town.name}?`,
      answer: `${icb?.support_groups ? `Local support groups include ${icb.support_groups.join(" and ")}. ` : ""}The ADHD Foundation and ADDISS both have UK-wide networks. Many areas also have local peer support groups that meet in person or online. Your assessing clinician can often recommend local support resources specific to the ${town.county} area.`,
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "ADHD Assessment", url: `${SITE_URL}/adhd-assessment/` },
    { name: town.name, url: `${SITE_URL}/adhd-assessment/${town.slug}/` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/adhd-assessment/" className="hover:text-blue-600 transition-colors">ADHD Assessment</Link>
        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{town.name}</span>
      </nav>

      {/* H1 */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Private ADHD Assessment in {town.name}
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
          Compare {nearbyClinics.length > 0 ? nearbyClinics.length : ""} private ADHD assessment clinics near {town.name}, {town.county}.
          {icb && ` NHS waiting times in ${icb.short_name} are currently around ${nhsWaitText} — private clinics can see you within weeks.`}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="stat-card">
          <p className="text-2xl font-bold text-blue-600">{nearbyClinics.length}</p>
          <p className="text-xs text-gray-500 mt-1.5">Clinics Found</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-blue-600">{stats.lowestPrice}</p>
          <p className="text-xs text-gray-500 mt-1.5">Lowest Price</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-blue-600">{stats.waitRange}</p>
          <p className="text-xs text-gray-500 mt-1.5">Private Wait</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-gray-700">{nhsWaitText}</p>
          <p className="text-xs text-gray-500 mt-1.5">NHS Wait</p>
        </div>
      </div>

      {/* NHS vs Private comparison */}
      {icb && (
        <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            NHS vs Private ADHD Assessment in {town.name}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Your local NHS services are provided by {icb.local_nhs_provider} ({icb.short_name} area).
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">NHS Pathway</p>
              </div>
              <p className="text-2xl font-bold text-gray-700 mb-1">{nhsWaitText}</p>
              <p className="text-xs text-gray-500">Average waiting time in {icb.short_name}</p>
              <p className="text-sm text-gray-600 mt-3">Free at point of use, but very long waiting lists. GP referral required.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">Private Assessment</p>
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-1">{stats.waitRange}</p>
              <p className="text-xs text-gray-500">Typical wait for private clinics near {town.name}</p>
              <p className="text-sm text-gray-600 mt-3">{stats.lowestPrice}. Diagnosis and treatment plan in a single appointment.</p>
            </div>
          </div>

          {/* Right to Choose box */}
          {icb.rtc_status === "accepted" && (
            <div className="mt-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100/50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Right to Choose — Get Assessed for Free</p>
                  <p className="text-sm text-blue-800/80 mt-1 leading-relaxed">
                    {icb.rtc_notes} This could save you £{minPrice.toLocaleString()}+ on your assessment while still being seen within weeks rather than waiting {nhsWaitText} on the NHS.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Clinic listings with distance */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            ADHD Assessment Clinics Near {town.name}
          </h2>
          <Link
            href="/clinics/"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium hidden sm:inline-flex items-center gap-1"
          >
            View map
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        {clinicsWithDist.length > 0 ? (
          <div className="space-y-5">
            {clinicsWithDist.map(({ clinic, distance, driveMinutes }) => (
              <div key={clinic.id} className="relative">
                {distance > 0 && clinic.city !== "Online" && clinic.city !== "Nationwide" && (
                  <div className="absolute -top-2.5 right-5 bg-gray-800 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full z-10 shadow-sm">
                    {distance} miles · ~{driveMinutes} min drive
                  </div>
                )}
                <ClinicCard clinic={clinic} condition={condition} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200/60 p-10 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">
              We&apos;re still building our directory of ADHD clinics near {town.name}. In the meantime, try searching a nearby city or explore our online assessment options.
            </p>
            <Link href="/adhd-assessment/" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1">
              Browse all ADHD assessment locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Lead Capture Form */}
      <section className="mb-14">
        <LeadCaptureForm condition="adhd" townName={town.name} variant="inline" />
      </section>

      {/* Cost guide with dynamic data */}
      <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ADHD Assessment Cost in {town.name}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Private ADHD assessments near {town.name} typically cost between £{minPrice.toLocaleString()} and £{maxPrice.toLocaleString()}, depending on the clinic and type of assessment. {icb?.rtc_status === "accepted" ? `Through the Right to Choose, your GP in the ${icb.short_name} area can refer you for a free NHS-funded private assessment.` : "Some clinics offer payment plans to help spread the cost."}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-5 not-prose">
            <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-5 border border-blue-100/50">
              <p className="font-medium text-gray-900">Adult ADHD Assessment</p>
              <p className="text-xl font-bold text-blue-600 mt-1">£{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1.5">1-2 hour consultation with psychiatrist</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-5 border border-blue-100/50">
              <p className="font-medium text-gray-900">Child ADHD Assessment</p>
              <p className="text-xl font-bold text-blue-600 mt-1">£400 - £1,200</p>
              <p className="text-xs text-gray-500 mt-1.5">Includes school observation report</p>
            </div>
          </div>
          {icb?.rtc_status === "accepted" && (
            <div className="bg-blue-50 rounded-xl p-4 mt-5 not-prose border border-blue-100/50">
              <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Right to Choose: You may be eligible for a free NHS-funded assessment through an approved private provider. Ask your GP.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Local support and resources */}
      {icb && (
        <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ADHD Support &amp; Resources in {town.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Local Support Groups
              </h3>
              <ul className="space-y-2">
                {icb.support_groups.map((group) => (
                  <li key={group} className="text-sm text-gray-600 flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {group}
                  </li>
                ))}
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ADHD Foundation (National)
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                NHS Services
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {icb.local_nhs_provider}
                </li>
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {icb.name}
                </li>
                {icb.rtc_status === "accepted" && (
                  <li className="text-sm text-blue-700 font-medium flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Right to Choose accepted ✓
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Also consider autism */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-50/30 rounded-2xl border border-purple-100/60 p-7 mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Looking for Autism Assessment in {town.name}?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We also list private autism assessment clinics near {town.name}.
          {icb && ` NHS autism assessment waits in ${icb.short_name} are around ${formatWaitMonths(icb.autism_wait_months)}.`}
        </p>
        <Link
          href={`/autism-assessment/${town.slug}/`}
          className="text-purple-600 hover:text-purple-800 font-medium text-sm inline-flex items-center gap-1 transition-colors"
        >
          View Autism Assessments in {town.name}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Helpful Guides */}
      {relevantGuides.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            ADHD Assessment Guides
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relevantGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}/`}
                className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1.5">
                  {g.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {g.meta_description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">
          Frequently Asked Questions About ADHD Assessment in {town.name}
        </h2>
        <FAQ items={faqs} />
      </section>

      {/* Nearby towns */}
      <section className="mb-14">
        <NearbyTowns towns={nearbyTowns} condition={condition} currentTown={town.name} />
      </section>

      {/* Lead Capture Banner */}
      <section className="mb-14">
        <LeadCaptureForm condition="adhd" townName={town.name} variant="banner" />
      </section>

      {/* CTA */}
      <section className="bg-gray-950 text-white rounded-2xl p-10 text-center">
        <h2 className="text-xl font-bold mb-3 tracking-tight">Are You a Clinic in {town.name}?</h2>
        <p className="text-gray-400 text-sm mb-6">
          Get listed on our ADHD assessment directory. Free basic listing available.
        </p>
        <Link
          href="/list-your-clinic/"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20"
        >
          List Your Clinic Free
        </Link>
      </section>
    </div>
  );
}
