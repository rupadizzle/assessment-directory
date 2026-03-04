import { Metadata } from "next";
import towns from "@/data/towns.json";
import { Town, Condition } from "@/lib/types";
import TownGrid from "@/components/TownGrid";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Autism Assessment Clinics Across the UK",
  description:
    "Find private autism assessment clinics near you. Comprehensive ADOS-2 diagnostic assessments for adults and children. Skip the multi-year NHS wait.",
};

const allTowns = towns as Town[];
const condition: Condition = "autism";

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

export default function AutismLandingPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Private Autism Assessment Clinics
          </h1>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Find a trusted autism assessment clinic near you. Comprehensive
            diagnostic assessments for adults and children using ADOS-2.
          </p>
          <SearchBar towns={townOptions} defaultCondition="autism" />
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
            About Private Autism Assessments
          </h2>
          <div className="prose prose-sm text-gray-600">
            <p>
              Autism spectrum condition (ASC) affects around 1-2% of the
              population. Many adults are only now seeking diagnosis, leading to
              NHS waiting times of 3-5 years in some areas.
            </p>
            <p>
              A private autism assessment is a comprehensive process costing
              between £1,200 and £3,000. It typically involves 2-4 sessions
              using gold-standard tools like ADOS-2 and ADI-R, conducted by
              clinical psychologists or specialist psychiatrists.
            </p>
            <p>
              A private diagnosis is fully recognised by the NHS and can be used
              to access support at work, in education, and for benefits.
            </p>
          </div>
          <div className="flex gap-4 mt-6">
            <Link
              href="/guides/how-long-does-autism-assessment-take/"
              className="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              How Long Does Assessment Take? →
            </Link>
            <Link
              href="/guides/signs-of-autism-in-adults/"
              className="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              Signs of Autism in Adults →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
