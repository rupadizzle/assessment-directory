import { Metadata } from "next";
import { notFound } from "next/navigation";
import towns from "@/data/towns.json";
import clinics from "@/data/clinics.json";
import { Town, Clinic, Condition } from "@/lib/types";
import { findNearbyTowns, findClinicsNearTown, getClinicStats } from "@/lib/utils";
import { generateTownPageMeta, generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import ClinicCard from "@/components/ClinicCard";
import NearbyTowns from "@/components/NearbyTowns";
import FAQ from "@/components/FAQ";
import Link from "next/link";

const condition: Condition = "adhd";
const allTowns = towns as Town[];
const allClinics = clinics as unknown as Clinic[];

export function generateStaticParams() {
  return allTowns.map((town) => ({ town: town.slug }));
}

type PageProps = { params: { town: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const town = allTowns.find((t) => t.slug === params.town);
  if (!town) return {};

  const meta = generateTownPageMeta(town.name, town.county, condition, town.slug);
  const nearbyClinics = findClinicsNearTown(town, allClinics, condition, 50, 10);

  if (nearbyClinics.length === 0) {
    meta.robots = { index: false, follow: true };
  }

  return meta;
}

export default function ADHDTownPage({ params }: PageProps) {
  const townSlug = params.town;
  const town = allTowns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const nearbyClinics = findClinicsNearTown(town, allClinics, condition, 50, 10);
  const nearbyTowns = findNearbyTowns(town, allTowns, 30, 12);
  const stats = getClinicStats(nearbyClinics, condition);

  const faqs = [
    {
      question: `How much does a private ADHD assessment cost in ${town.name}?`,
      answer: `Private ADHD assessments near ${town.name} typically cost between £495 and £1,500 for adults, and £400-£1,200 for children. Prices vary by clinic, with some offering payment plans. Use our directory to compare prices from clinics serving the ${town.name} area.`,
    },
    {
      question: `How long is the NHS waiting list for ADHD assessment in ${town.name}?`,
      answer: `NHS waiting times for ADHD assessment in the ${town.county} area are typically 2-5 years. Many people choose private assessment to avoid this wait. You also have the Right to Choose, which allows your GP to refer you to a private provider funded by the NHS.`,
    },
    {
      question: `What happens during an ADHD assessment?`,
      answer: `A private ADHD assessment typically involves a 1-2 hour consultation with a psychiatrist or clinical psychologist. They'll discuss your symptoms, developmental history, and how ADHD affects your daily life. Some assessments include computerised attention tests. You'll usually receive a diagnosis and treatment recommendations on the same day or within a week.`,
    },
    {
      question: `Can I get ADHD medication after a private assessment?`,
      answer: `Yes. If diagnosed with ADHD through a private assessment, your clinician can prescribe medication. They will also write to your GP requesting a shared care agreement, which allows your GP to continue prescribing and monitoring your medication on the NHS, saving you the cost of ongoing private prescriptions.`,
    },
    {
      question: `Is a private ADHD diagnosis recognised by the NHS?`,
      answer: `Yes, a private ADHD diagnosis from a qualified clinician (psychiatrist or specialist nurse prescriber) is fully recognised by the NHS. Your GP should accept the diagnosis and enter into a shared care agreement for ongoing treatment and medication management.`,
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
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/adhd-assessment/" className="hover:text-blue-600 transition-colors">
          ADHD Assessment
        </Link>
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
          Find trusted private ADHD assessment clinics near {town.name},{" "}
          {town.county}. Compare prices, waiting times and book your assessment
          today. Skip the NHS waiting list.
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
          <p className="text-xs text-gray-500 mt-1.5">Assessment Cost</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-blue-600">{stats.waitRange}</p>
          <p className="text-xs text-gray-500 mt-1.5">Typical Wait</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-blue-600">Adults & Children</p>
          <p className="text-xs text-gray-500 mt-1.5">Assessments Available</p>
        </div>
      </div>

      {/* Clinic listings */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">
          ADHD Assessment Clinics Near {town.name}
        </h2>
        {nearbyClinics.length > 0 ? (
          <div className="space-y-5">
            {nearbyClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} condition={condition} />
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
              We&apos;re still building our directory of ADHD clinics near{" "}
              {town.name}. In the meantime, try searching a nearby city or
              explore our online assessment options.
            </p>
            <Link
              href="/adhd-assessment/"
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
            >
              Browse all ADHD assessment locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Cost guide */}
      <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ADHD Assessment Cost in {town.name}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Private ADHD assessments near {town.name} typically cost between
            £495 and £1,500, depending on the clinic and type of assessment. Here
            is a typical breakdown:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-5 not-prose">
            <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-5 border border-blue-100/50">
              <p className="font-medium text-gray-900">Adult ADHD Assessment</p>
              <p className="text-xl font-bold text-blue-600 mt-1">£495 - £1,500</p>
              <p className="text-xs text-gray-500 mt-1.5">
                1-2 hour consultation with psychiatrist
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-5 border border-blue-100/50">
              <p className="font-medium text-gray-900">Child ADHD Assessment</p>
              <p className="text-xl font-bold text-blue-600 mt-1">£400 - £1,200</p>
              <p className="text-xs text-gray-500 mt-1.5">
                Includes school observation report
              </p>
            </div>
          </div>
          <p className="mt-5">
            Many clinics offer payment plans and some accept Right to Choose
            referrals, meaning your assessment could be funded by the NHS. Check
            individual clinic profiles for details.
          </p>
        </div>
      </section>

      {/* Also consider autism */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-50/30 rounded-2xl border border-purple-100/60 p-7 mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Looking for Autism Assessment in {town.name}?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We also list private autism assessment clinics near {town.name}.
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

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">
          Frequently Asked Questions
        </h2>
        <FAQ items={faqs} />
      </section>

      {/* Nearby towns */}
      <section className="mb-14">
        <NearbyTowns towns={nearbyTowns} condition={condition} currentTown={town.name} />
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
