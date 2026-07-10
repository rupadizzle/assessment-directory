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
} from "@/lib/utils";
import { generateTownPageMeta, generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import ClinicCard from "@/components/ClinicCard";
import NearbyTowns from "@/components/NearbyTowns";
import FAQ from "@/components/FAQ";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";

const condition: Condition = "autism";
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

export default function AutismTownPage({ params }: PageProps) {
  const townSlug = params.town;
  const town = allTowns.find((t) => t.slug === townSlug);
  if (!town) notFound();

  const clinicsWithDist = findClinicsNearTownWithDistance(town, allClinics, condition, 50, 10);
  const nearbyClinics = clinicsWithDist.map((c) => c.clinic);
  const nearbyTowns = findNearbyTowns(town, allTowns, 30, 12);
  const stats = getClinicStats(nearbyClinics, condition);
  const icb = findIcbForTown(town);
  const relevantGuides = allGuides
    .filter((g) => g.condition === "autism" || g.condition === "both")
    .slice(0, 3);

  const prices = nearbyClinics
    .map((c) => c.pricing.autism_adult)
    .filter((p): p is number => !!p);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 1200;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 3000;

  const nhsWaitText = icb ? formatWaitMonths(icb.autism_wait_months) : "2-5 years";

  const faqs = [
    {
      question: `How much does a private autism assessment cost in ${town.name}?`,
      answer: `Private autism assessments near ${town.name} typically cost between £${minPrice.toLocaleString()} and £${maxPrice.toLocaleString()} for adults, and £1,000-£2,500 for children. ${nearbyClinics.length > 0 ? `We found ${nearbyClinics.length} clinics serving the ${town.name} area.` : ""} The higher cost compared to ADHD assessments reflects the comprehensive, multi-session diagnostic process including ADOS-2 assessment and detailed clinical reporting.`,
    },
    {
      question: `What is the NHS waiting time for autism assessment in ${town.name}?`,
      answer: `NHS waiting times for autism assessment in the ${icb ? icb.short_name : town.county} area are currently around ${nhsWaitText}. ${icb?.rtc_status === "accepted" ? "While Right to Choose applies primarily to ADHD, some providers also offer NHS-funded autism assessments — ask your GP." : ""} Many people choose private assessment to avoid the lengthy NHS wait and receive a diagnosis sooner.`,
    },
    {
      question: `How long does a private autism assessment take?`,
      answer: `A private autism assessment typically involves 2-4 sessions over several weeks. The initial consultation lasts 1-2 hours, followed by ADOS-2 observation and detailed developmental history taking. You'll usually receive your comprehensive diagnostic report within 2-4 weeks of the final session. The total process from booking to report is usually 4-8 weeks — significantly faster than the ${nhsWaitText} NHS wait in ${icb ? icb.short_name : town.county}.`,
    },
    {
      question: `What diagnostic tools are used in an autism assessment near ${town.name}?`,
      answer: `Most reputable clinics near ${town.name} use NICE-recommended gold-standard tools: the ADOS-2 (Autism Diagnostic Observation Schedule) for observing social interaction and communication, and the ADI-R (Autism Diagnostic Interview-Revised) for developmental history. Some clinics also use the DISCO (Diagnostic Interview for Social and Communication Disorders). The assessment includes cognitive evaluation and a comprehensive clinical report.`,
    },
    {
      question: `Is a private autism diagnosis recognised by the NHS and employers?`,
      answer: `Yes, a private autism diagnosis from a qualified clinician (clinical psychologist or psychiatrist) is fully recognised by the NHS, employers, schools, universities, and HMRC. It can be used to access workplace reasonable adjustments under the Equality Act 2010, apply for benefits like PIP or Access to Work, get support at school or university, and access NHS post-diagnostic support services. Your GP should record the diagnosis in your medical records.`,
    },
    {
      question: `Can adults get an autism assessment in ${town.name}?`,
      answer: `Yes, private autism assessments are available for adults of all ages near ${town.name}. ${nearbyClinics.filter(c => c.services?.some(s => s.toLowerCase().includes("adult"))).length > 0 ? "Several clinics in our directory specifically offer adult autism assessments." : "Many clinics offer both adult and child assessments."} Late diagnosis in adulthood is increasingly common and can provide valuable understanding of lifelong experiences, access to support, and self-acceptance.`,
    },
    {
      question: `Are there autism support groups near ${town.name}?`,
      answer: `${icb?.support_groups ? `Local support resources include ${icb.support_groups.join(" and ")}. ` : ""}The National Autistic Society has a UK-wide branch network, and many areas have local peer support groups for autistic adults and parents. Your assessing clinician can recommend specific resources in the ${town.county} area. Online communities like the National Autistic Society forums also provide valuable peer support.`,
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
          Compare {nearbyClinics.length > 0 ? nearbyClinics.length : ""} private autism assessment clinics near {town.name}, {town.county}.
          {icb && ` NHS autism assessment waits in ${icb.short_name} are around ${nhsWaitText} — private clinics can complete your assessment within weeks.`}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">{nearbyClinics.length}</p>
          <p className="text-xs text-gray-500 mt-1.5">Clinics Found</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">{stats.lowestPrice}</p>
          <p className="text-xs text-gray-500 mt-1.5">Lowest Price</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-purple-600">{stats.waitRange}</p>
          <p className="text-xs text-gray-500 mt-1.5">Private Wait</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-red-500">{nhsWaitText}</p>
          <p className="text-xs text-gray-500 mt-1.5">NHS Wait</p>
        </div>
      </div>

      {/* NHS vs Private comparison */}
      {icb && (
        <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            NHS vs Private Autism Assessment in {town.name}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Your local NHS services are provided by {icb.local_nhs_provider} ({icb.short_name} area).
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-orange-50/50 rounded-xl p-5 border border-red-100/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">NHS Pathway</p>
              </div>
              <p className="text-2xl font-bold text-red-600 mb-1">{nhsWaitText}</p>
              <p className="text-xs text-gray-500">Average waiting time in {icb.short_name}</p>
              <p className="text-sm text-gray-600 mt-3">Free but very long waits. Multi-disciplinary team assessment via GP referral.</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-xl p-5 border border-green-100/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-900">Private Assessment</p>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">4-8 weeks</p>
              <p className="text-xs text-gray-500">Typical timeline from booking to report</p>
              <p className="text-sm text-gray-600 mt-3">{stats.lowestPrice}. ADOS-2 assessment with comprehensive diagnostic report.</p>
            </div>
          </div>
        </section>
      )}

      {/* Clinic listings with distance */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Autism Assessment Clinics Near {town.name}
          </h2>
          <Link
            href="/clinics/"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium hidden sm:inline-flex items-center gap-1"
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
              We&apos;re still building our directory of autism clinics near {town.name}. In the meantime, try searching a nearby city or explore our online assessment options.
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

      <section className="mb-14">
        <LeadCaptureForm condition="autism" townName={town.name} variant="inline" />
      </section>

      {/* Cost guide with dynamic data */}
      <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Autism Assessment Cost in {town.name}
        </h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            Private autism assessments near {town.name} typically cost between £{minPrice.toLocaleString()} and £{maxPrice.toLocaleString()} for adults. The cost is higher than ADHD assessments because autism diagnosis requires comprehensive multi-session evaluation using tools like the ADOS-2 and ADI-R, plus a detailed clinical report.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-5 not-prose">
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-5 border border-purple-100/50">
              <p className="font-medium text-gray-900">Adult Autism Assessment</p>
              <p className="text-xl font-bold text-purple-600 mt-1">£{minPrice.toLocaleString()} - £{maxPrice.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1.5">ADOS-2 + comprehensive diagnostic report</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-50/50 rounded-xl p-5 border border-purple-100/50">
              <p className="font-medium text-gray-900">Child Autism Assessment</p>
              <p className="text-xl font-bold text-purple-600 mt-1">£1,000 - £2,500</p>
              <p className="text-xs text-gray-500 mt-1.5">Includes school observation and multi-informant report</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local support and resources */}
      {icb && (
        <section className="bg-white rounded-2xl border border-gray-200/60 p-7 mb-14 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Autism Support &amp; Resources in {town.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Local Support Groups
              </h3>
              <ul className="space-y-2">
                {icb.support_groups.map((group) => (
                  <li key={group} className="text-sm text-gray-600 flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {group}
                  </li>
                ))}
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  National Autistic Society
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                NHS Services
              </h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {icb.local_nhs_provider}
                </li>
                <li className="text-sm text-gray-600 flex items-start gap-2">
                  <svg className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {icb.name}
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Also consider ADHD */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-50/30 rounded-2xl border border-blue-100/60 p-7 mb-14">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Looking for ADHD Assessment in {town.name}?
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          We also list private ADHD assessment clinics near {town.name}.
          {icb && ` NHS ADHD assessment waits in ${icb.short_name} are around ${formatWaitMonths(icb.adhd_wait_months)}.`}
          {icb?.rtc_status === "accepted" && " You may be eligible for a free assessment through the Right to Choose."}
        </p>
        <Link href={`/adhd-assessment/${town.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1 transition-colors">
          View ADHD Assessments in {town.name}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* Helpful Guides */}
      {relevantGuides.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Autism Assessment Guides
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {relevantGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}/`}
                className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-purple-200 transition-all group"
              >
                <h3 className="font-medium text-gray-900 text-sm group-hover:text-purple-600 transition-colors mb-1.5">
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
          Frequently Asked Questions About Autism Assessment in {town.name}
        </h2>
        <FAQ items={faqs} />
      </section>

      <section className="mb-14">
        <NearbyTowns towns={nearbyTowns} condition={condition} currentTown={town.name} />
      </section>

      <section className="mb-14">
        <LeadCaptureForm condition="autism" townName={town.name} variant="banner" />
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
