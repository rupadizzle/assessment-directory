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

const condition: Condition = "autism";
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

export default function AutismTownPage({ params }: PageProps) {
  const townSlug = params.town;
  const town = allTowns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const nearbyClinics = findClinicsNearTown(town, allClinics, condition, 50, 10);
  const nearbyTowns = findNearbyTowns(town, allTowns, 30, 12);
  const stats = getClinicStats(nearbyClinics, condition);

  const faqs = [
    {
      question: `How much does a private autism assessment cost in ${town.name}?`,
      answer: `Private autism assessments near ${town.name} typically cost between £1,200 and £3,000 for adults, and £1,000-£2,500 for children. The higher cost reflects the comprehensive nature of autism assessments, which often involve multiple sessions and detailed reporting.`,
    },
    {
      question: `How long does an autism assessment take?`,
      answer: `A private autism assessment typically involves 2-4 sessions over several weeks. The initial consultation lasts 1-2 hours, followed by additional assessments using tools like ADOS-2 and ADI-R. You'll usually receive your diagnostic report within 2-4 weeks of the final session. The total process from booking to report is usually 4-8 weeks.`,
    },
    {
      question: `What is the NHS waiting time for autism assessment in ${town.name}?`,
      answer: `NHS waiting times for autism assessment in the ${town.county} area typically range from 2-5 years. Some areas have even longer waits. This is why many people choose to pursue a private autism assessment, which can be completed in 4-8 weeks.`,
    },
    {
      question: `Is a private autism diagnosis recognised by the NHS?`,
      answer: `Yes, a private autism diagnosis from a qualified clinician is recognised by the NHS and other organisations. It can be used to access support at work, school, or university, and to apply for benefits like PIP. Your GP should record the diagnosis in your medical records.`,
    },
    {
      question: `What tools are used in an autism assessment?`,
      answer: `Most comprehensive autism assessments use the ADOS-2 (Autism Diagnostic Observation Schedule) and/or ADI-R (Autism Diagnostic Interview). These are gold-standard diagnostic tools recommended by NICE guidelines. The assessment will also include a detailed developmental history, cognitive assessment, and observation of social interaction.`,
    },
  ];

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Autism Assessment", url: `${SITE_URL}/autism-assessment/` },
    { name: town.name, url: `${SITE_URL}/autism-assessment/${town.slug}/` },
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

      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/autism-assessment/" className="hover:text-purple-600 transition-colors">Autism Assessment</Link>
        <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{town.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Private Autism Assessment in {town.name}
        </h1>
        <p className="text-lg text-gray-500 max-w-3xl leading-relaxed">
          Find trusted private autism assessment clinics near {town.name},{" "}
          {town.county}. Comprehensive diagnostic assessments for adults and
          children. Skip the multi-year NHS waiting list.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">{nearbyClinics.length}</p>
          <p className="text-xs text-gray-500 mt-1.5">Clinics Found</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">{stats.lowestPrice}</p>
          <p className="text-xs text-gray-500 mt-1.5">Assessment Cost</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">{stats.waitRange}</p>
          <p className="text-xs text-gray-500 mt-1.5">Total Process Time</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">ADOS-2</p>
          <p className="text-xs text-gray-500 mt-1.5">Gold Standard Tools</p>
        </div>
      </div>

      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">
          Autism Assessment Clinics Near {town.name}
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
              We&apos;re still building our directory of autism clinics near{" "}
              {town.name}. In the meantime, try searching a nearby city or
              explore our online assessment options.
            </p>
            <Link href="/autism-assessment/" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center gap-1">
              Browse all autism assessment locations
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Autism Assessment Cost in {town.name}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Private autism assessments near {town.name} typically cost more than
            ADHD assessments due to the comprehensive nature of the diagnostic
            process.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-5 not-prose">
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-5 border border-purple-100/50">
              <p className="font-medium text-gray-900">Adult Autism Assessment</p>
              <p className="text-xl font-bold text-purple-600 mt-1">£1,200 - £3,000</p>
              <p className="text-xs text-gray-500 mt-1.5">ADOS-2 + comprehensive report</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-5 border border-purple-100/50">
              <p className="font-medium text-gray-900">Child Autism Assessment</p>
              <p className="text-xl font-bold text-purple-600 mt-1">£1,000 - £2,500</p>
              <p className="text-xs text-gray-500 mt-1.5">Includes school observation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-blue-50/30 rounded-2xl border border-blue-100/60 p-7 mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Looking for ADHD Assessment in {town.name}?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We also list private ADHD assessment clinics near {town.name}.
        </p>
        <Link href={`/adhd-assessment/${town.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1 transition-colors">
          View ADHD Assessments in {town.name}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      <section className="mb-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Frequently Asked Questions</h2>
        <FAQ items={faqs} />
      </section>

      <section className="mb-14">
        <NearbyTowns towns={nearbyTowns} condition={condition} currentTown={town.name} />
      </section>

      <section className="bg-gray-950 text-white rounded-2xl p-10 text-center">
        <h2 className="text-xl font-bold mb-3 tracking-tight">Are You a Clinic in {town.name}?</h2>
        <p className="text-gray-400 text-sm mb-6">
          Get listed on our autism assessment directory. Free basic listing available.
        </p>
        <Link href="/list-your-clinic/" className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-7 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/20">
          List Your Clinic Free
        </Link>
      </section>
    </div>
  );
}
