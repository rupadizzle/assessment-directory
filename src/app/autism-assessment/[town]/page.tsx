import { Metadata } from "next";
import { notFound } from "next/navigation";
import towns from "@/data/towns.json";
import clinics from "@/data/clinics.json";
import { Town, Clinic, Condition } from "@/lib/types";
import { findNearbyTowns, findClinicsNearTown } from "@/lib/utils";
import { generateTownPageMeta, generateFAQSchema } from "@/lib/seo";
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
  return generateTownPageMeta(town.name, town.county, condition);
}

export default function AutismTownPage({ params }: PageProps) {
  const townSlug = params.town;
  const town = allTowns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const nearbyClinics = findClinicsNearTown(town, allClinics, condition, 50, 10);
  const nearbyTowns = findNearbyTowns(town, allTowns, 30, 12);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        {" / "}
        <Link href="/autism-assessment/" className="hover:text-purple-600">Autism Assessment</Link>
        {" / "}
        <span className="text-gray-900">{town.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Private Autism Assessment in {town.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Find trusted private autism assessment clinics near {town.name},{" "}
          {town.county}. Comprehensive diagnostic assessments for adults and
          children. Skip the multi-year NHS waiting list.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{nearbyClinics.length}</p>
          <p className="text-xs text-gray-500 mt-1">Clinics Found</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">From £1,200</p>
          <p className="text-xs text-gray-500 mt-1">Assessment Cost</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">4-8 weeks</p>
          <p className="text-xs text-gray-500 mt-1">Total Process Time</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">ADOS-2</p>
          <p className="text-xs text-gray-500 mt-1">Gold Standard Tools</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Autism Assessment Clinics Near {town.name}
        </h2>
        {nearbyClinics.length > 0 ? (
          <div className="space-y-4">
            {nearbyClinics.map((clinic) => (
              <ClinicCard key={clinic.id} clinic={clinic} condition={condition} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-4">
              We&apos;re still building our directory of autism clinics near{" "}
              {town.name}. In the meantime, try searching a nearby city or
              explore our online assessment options.
            </p>
            <Link href="/autism-assessment/" className="text-purple-600 hover:text-purple-800 font-medium">
              Browse all autism assessment locations
            </Link>
          </div>
        )}
      </section>

      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Autism Assessment Cost in {town.name}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Private autism assessments near {town.name} typically cost more than
            ADHD assessments due to the comprehensive nature of the diagnostic
            process.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4 not-prose">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">Adult Autism Assessment</p>
              <p className="text-lg font-bold text-purple-600 mt-1">£1,200 - £3,000</p>
              <p className="text-xs text-gray-500 mt-1">ADOS-2 + comprehensive report</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">Child Autism Assessment</p>
              <p className="text-lg font-bold text-purple-600 mt-1">£1,000 - £2,500</p>
              <p className="text-xs text-gray-500 mt-1">Includes school observation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 rounded-xl border border-blue-100 p-6 mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Looking for ADHD Assessment in {town.name}?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We also list private ADHD assessment clinics near {town.name}.
        </p>
        <Link href={`/adhd-assessment/${town.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View ADHD Assessments in {town.name} →
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <FAQ items={faqs} />
      </section>

      <section className="mb-12">
        <NearbyTowns towns={nearbyTowns} condition={condition} currentTown={town.name} />
      </section>

      <section className="bg-gray-900 text-white rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Are You a Clinic in {town.name}?</h2>
        <p className="text-gray-300 text-sm mb-4">
          Get listed on the UK&apos;s leading autism assessment directory. Free basic listing available.
        </p>
        <Link href="/list-your-clinic/" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
          List Your Clinic Free
        </Link>
      </section>
    </div>
  );
}
