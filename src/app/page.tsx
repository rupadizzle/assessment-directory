import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import TownGrid from "@/components/TownGrid";
import towns from "@/data/towns.json";
import { Town, Condition } from "@/lib/types";

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

const majorTowns = (towns as Town[])
  .filter((t) => topCities.includes(t.slug))
  .sort((a, b) => b.population - a.population);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
            Find Private ADHD & Autism
            <br />
            Assessments Near You
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            NHS waiting list too long? Compare trusted private assessment
            clinics across the UK. View prices, waiting times and book today.
          </p>
          <SearchBar towns={townOptions} />
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">60+</p>
            <p className="text-sm text-gray-500">Verified Clinics</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">1,200+</p>
            <p className="text-sm text-gray-500">UK Towns Covered</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">2-4 weeks</p>
            <p className="text-sm text-gray-500">Average Wait Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">Free</p>
            <p className="text-sm text-gray-500">To Search & Compare</p>
          </div>
        </div>
      </section>

      {/* Condition cards */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          What Assessment Are You Looking For?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link
            href="/adhd-assessment/"
            className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg hover:border-blue-300 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
              ADHD Assessment
            </h3>
            <p className="text-gray-600 text-sm">
              Private ADHD assessments for adults and children. Get diagnosed in
              as little as 2 weeks instead of the 2+ year NHS wait.
            </p>
            <p className="text-sm text-gray-500 mt-3">From £495</p>
          </Link>

          <Link
            href="/autism-assessment/"
            className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg hover:border-purple-300 transition-all group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🧩</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 mb-2">
              Autism Assessment
            </h3>
            <p className="text-gray-600 text-sm">
              Comprehensive autism diagnostic assessments by experienced
              clinicians. Adult and child assessments available.
            </p>
            <p className="text-sm text-gray-500 mt-3">From £1,200</p>
          </Link>
        </div>
      </section>

      {/* Top cities */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <TownGrid
          towns={majorTowns}
          condition={"adhd" as Condition}
          title="Find ADHD Assessments by City"
          limit={20}
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        <TownGrid
          towns={majorTowns}
          condition={"autism" as Condition}
          title="Find Autism Assessments by City"
          limit={20}
        />
      </section>

      {/* How it works */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Search Your Area
              </h3>
              <p className="text-sm text-gray-600">
                Enter your town or city to find assessment clinics near you.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Compare Clinics
              </h3>
              <p className="text-sm text-gray-600">
                View prices, waiting times and services to find the right fit.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Book Your Assessment
              </h3>
              <p className="text-sm text-gray-600">
                Contact the clinic directly to book your private assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Are You a Clinic?</h2>
          <p className="text-gray-300 mb-6">
            Join the UK&apos;s fastest-growing assessment directory. Get your
            clinic in front of thousands of people searching for private
            assessments.
          </p>
          <Link
            href="/list-your-clinic/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            List Your Clinic — It&apos;s Free
          </Link>
        </div>
      </section>
    </div>
  );
}
