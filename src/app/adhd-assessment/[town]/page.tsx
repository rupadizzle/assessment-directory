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
  return generateTownPageMeta(town.name, town.county, condition);
}

export default function ADHDTownPage({ params }: PageProps) {
  const townSlug = params.town;
  const town = allTowns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const nearbyClinics = findClinicsNearTown(town, allClinics, condition, 50, 10);
  const nearbyTowns = findNearbyTowns(town, allTowns, 30, 12);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        {" / "}
        <Link href="/adhd-assessment/" className="hover:text-blue-600">
          ADHD Assessment
        </Link>
        {" / "}
        <span className="text-gray-900">{town.name}</span>
      </nav>

      {/* H1 */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Private ADHD Assessment in {town.name}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Find trusted private ADHD assessment clinics near {town.name},{" "}
          {town.county}. Compare prices, waiting times and book your assessment
          today. Skip the NHS waiting list.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{nearbyClinics.length}</p>
          <p className="text-xs text-gray-500 mt-1">Clinics Found</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">From £495</p>
          <p className="text-xs text-gray-500 mt-1">Assessment Cost</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">1-4 weeks</p>
          <p className="text-xs text-gray-500 mt-1">Typical Wait</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">Adults & Children</p>
          <p className="text-xs text-gray-500 mt-1">Assessments Available</p>
        </div>
      </div>

      {/* Clinic listings */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ADHD Assessment Clinics Near {town.name}
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
              We&apos;re still building our directory of ADHD clinics near{" "}
              {town.name}. In the meantime, try searching a nearby city or
              explore our online assessment options.
            </p>
            <Link
              href="/adhd-assessment/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse all ADHD assessment locations
            </Link>
          </div>
        )}
      </section>

      {/* Cost guide */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ADHD Assessment Cost in {town.name}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Private ADHD assessments near {town.name} typically cost between
            £495 and £1,500, depending on the clinic and type of assessment. Here
            is a typical breakdown:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4 not-prose">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">Adult ADHD Assessment</p>
              <p className="text-lg font-bold text-blue-600 mt-1">£495 - £1,500</p>
              <p className="text-xs text-gray-500 mt-1">
                1-2 hour consultation with psychiatrist
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">Child ADHD Assessment</p>
              <p className="text-lg font-bold text-blue-600 mt-1">£400 - £1,200</p>
              <p className="text-xs text-gray-500 mt-1">
                Includes school observation report
              </p>
            </div>
          </div>
          <p className="mt-4">
            Many clinics offer payment plans and some accept Right to Choose
            referrals, meaning your assessment could be funded by the NHS. Check
            individual clinic profiles for details.
          </p>
        </div>
      </section>

      {/* Also consider autism */}
      <section className="bg-purple-50 rounded-xl border border-purple-100 p-6 mb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Looking for Autism Assessment in {town.name}?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We also list private autism assessment clinics near {town.name}.
        </p>
        <Link
          href={`/autism-assessment/${town.slug}/`}
          className="text-purple-600 hover:text-purple-800 font-medium text-sm"
        >
          View Autism Assessments in {town.name} →
        </Link>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <FAQ items={faqs} />
      </section>

      {/* Nearby towns */}
      <section className="mb-12">
        <NearbyTowns towns={nearbyTowns} condition={condition} currentTown={town.name} />
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white rounded-xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Are You a Clinic in {town.name}?</h2>
        <p className="text-gray-300 text-sm mb-4">
          Get listed on the UK&apos;s leading ADHD assessment directory. Free basic listing available.
        </p>
        <Link
          href="/list-your-clinic/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          List Your Clinic Free
        </Link>
      </section>
    </div>
  );
}
