import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import towns from "@/data/towns.json";
import guides from "@/data/guides.json";
import { Town, Guide } from "@/lib/types";

const topCities = [
  "london",
  "birmingham",
  "manchester",
  "leeds",
  "glasgow",
  "edinburgh",
  "liverpool",
  "bristol",
  "sheffield",
  "newcastle",
  "nottingham",
  "cardiff",
  "belfast",
  "leicester",
  "southampton",
  "brighton",
  "oxford",
  "cambridge",
  "york",
  "bath",
];

const townOptions = (towns as Town[]).map((t) => ({
  slug: t.slug,
  name: t.name,
  county: t.county,
}));

const allGuides = guides as Guide[];

const majorTowns = (towns as Town[])
  .filter((t) => topCities.includes(t.slug))
  .sort((a, b) => b.population - a.population);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20 sm:py-28 px-4 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            60+ Verified Clinics Across the UK
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight tracking-tight">
            Find Private ADHD & Autism
            <br />
            <span className="text-blue-200">Assessments Near You</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            NHS waiting list too long? Compare trusted private assessment
            clinics across the UK. View prices, waiting times and book today.
          </p>
          <SearchBar towns={townOptions} />
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">60+</p>
            <p className="text-sm text-gray-500 mt-1">Verified Clinics</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">1,200+</p>
            <p className="text-sm text-gray-500 mt-1">UK Towns Covered</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">2-4 weeks</p>
            <p className="text-sm text-gray-500 mt-1">Average Wait Time</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">Free</p>
            <p className="text-sm text-gray-500 mt-1">To Search & Compare</p>
          </div>
        </div>
      </section>

      {/* Condition cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          What Assessment Are You Looking For?
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          Choose the type of assessment you need and find clinics near you
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link
            href="/adhd-assessment/"
            className="bg-white rounded-2xl border border-gray-200/60 p-8 card-hover group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">
                ADHD Assessment
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Private ADHD assessments for adults and children. Get diagnosed in
                as little as 2 weeks instead of the 2+ year NHS wait.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">From £495</span>
                <span className="text-sm text-gray-400 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                  Browse clinics
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          <Link
            href="/autism-assessment/"
            className="bg-white rounded-2xl border border-gray-200/60 p-8 card-hover group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 mb-2 transition-colors">
                Autism Assessment
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comprehensive autism diagnostic assessments by experienced
                clinicians. Adult and child assessments available.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">From £1,200</span>
                <span className="text-sm text-gray-400 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                  Browse clinics
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Top cities — combined grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Browse Assessments by City
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          Find ADHD and autism assessment clinics in major UK cities
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {majorTowns.slice(0, 20).map((town) => (
            <div
              key={town.slug}
              className="bg-white border border-gray-200/60 rounded-xl px-4 py-4 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900 text-sm">{town.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 mb-3">{town.county}</p>
              <div className="flex gap-2">
                <Link
                  href={`/adhd-assessment/${town.slug}/`}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  ADHD
                </Link>
                <Link
                  href={`/autism-assessment/${town.slug}/`}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                >
                  Autism
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map CTA */}
      <section className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 mb-4">
            Or explore all clinics on our interactive map
          </p>
          <Link
            href="/clinics/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            View Clinic Map
          </Link>
        </div>
      </section>

      {/* Helpful Guides */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Assessment Guides
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          Free resources to help you understand the assessment process
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {allGuides.slice(0, 4).map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}/`}
              className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <span
                className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-3 ${
                  guide.condition === "adhd"
                    ? "bg-blue-100 text-blue-700"
                    : guide.condition === "autism"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {guide.condition === "both"
                  ? "ADHD & Autism"
                  : guide.condition.toUpperCase()}
              </span>
              <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1.5 line-clamp-2">
                {guide.title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {guide.meta_description}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/guides/"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1 transition-colors"
          >
            View all guides
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-gray-500 mb-12 max-w-lg mx-auto">
            Three simple steps to finding the right assessment for you
          </p>
          <div className="grid sm:grid-cols-3 gap-10">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Search Your Area
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Enter your town or city to find assessment clinics near you.
              </p>
            </div>
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="text-blue-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Compare Clinics
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                View prices, waiting times and services to find the right fit.
              </p>
            </div>
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="text-blue-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Book Your Assessment
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Contact the clinic directly to book your private assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About UK Assessment Directory
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            A free service helping people find trusted private ADHD and autism
            assessment clinics across the UK. NHS waiting times stretch to
            2-5 years in many areas — we list pricing, waiting times, and
            credentials in one place so you can compare private options.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every clinic is verified before listing. Paid listings are clearly
            labelled so you always know which clinics have paid for enhanced
            visibility.
          </p>
          <Link
            href="/about/"
            className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-4 inline-flex items-center gap-1 transition-colors"
          >
            Learn more about us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3 tracking-tight">Are You a Clinic?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            List your clinic on our assessment directory. Get in front of
            people searching for private assessments across the UK.
          </p>
          <Link
            href="/list-your-clinic/"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3.5 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
          >
            List Your Clinic — It&apos;s Free
          </Link>
        </div>
      </section>
    </div>
  );
}
