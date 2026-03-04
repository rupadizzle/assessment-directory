import { Metadata } from "next";
import towns from "@/data/towns.json";
import { Town, Condition } from "@/lib/types";
import TownGrid from "@/components/TownGrid";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private ADHD Assessment Clinics Across the UK",
  description:
    "Find private ADHD assessment clinics near you. Compare prices from £495, check waiting times and book your ADHD assessment. Skip the 2+ year NHS wait.",
};

const allTowns = towns as Town[];
const condition: Condition = "adhd";

const regions = [
  "London",
  "South East",
  "South West",
  "East of England",
  "West Midlands",
  "East Midlands",
  "North West",
  "North East",
  "Yorkshire and the Humber",
  "Wales",
  "Scotland",
  "Northern Ireland",
];

const townOptions = allTowns.map((t) => ({
  slug: t.slug,
  name: t.name,
  county: t.county,
}));

export default function ADHDLandingPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Private ADHD Assessment Clinics
          </h1>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Find a trusted ADHD assessment clinic near you. Compare prices,
            waiting times and get assessed in as little as 2 weeks.
          </p>
          <SearchBar towns={townOptions} defaultCondition="adhd" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Browse by Region
        </h2>
        {regions.map((region) => {
          const regionTowns = allTowns
            .filter((t) => t.region === region)
            .sort((a, b) => b.population - a.population);
          return (
            <div key={region} className="mb-10">
              <TownGrid
                towns={regionTowns}
                condition={condition}
                title={`${region}`}
                limit={15}
              />
            </div>
          );
        })}
      </section>

      <section className="bg-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About Private ADHD Assessments
          </h2>
          <div className="prose prose-sm text-gray-600">
            <p>
              ADHD (Attention Deficit Hyperactivity Disorder) affects around 5%
              of adults in the UK. With NHS waiting times stretching to 2-5
              years in many areas, a private ADHD assessment offers a faster
              route to diagnosis and treatment.
            </p>
            <p>
              A private ADHD assessment typically costs between £495 and £1,500
              and involves a 1-2 hour consultation with a specialist psychiatrist.
              Most clinics can see you within 1-4 weeks of booking.
            </p>
            <p>
              You may also be eligible for the Right to Choose, which allows
              your GP to refer you to a private ADHD provider funded by the NHS.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <Link
              href="/guides/how-much-does-private-adhd-assessment-cost/"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              ADHD Assessment Cost Guide →
            </Link>
            <Link
              href="/guides/right-to-choose-adhd/"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Right to Choose Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
