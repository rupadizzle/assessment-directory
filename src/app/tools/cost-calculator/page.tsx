import { Metadata } from "next";
import Link from "next/link";
import CostCalculator from "@/components/CostCalculator";
import clinics from "@/data/clinics.json";

export const metadata: Metadata = {
  title: "ADHD & Autism Assessment Cost Calculator — UK Price Comparison",
  description:
    "Compare private ADHD and autism assessment costs across UK clinics. See price ranges, averages, and find the most affordable assessment options near you.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/tools/cost-calculator/",
  },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "ADHD & Autism Assessment Cost Calculator — UK Price Comparison",
    description:
      "Compare private ADHD and autism assessment costs across UK clinics. See price ranges, averages, and find affordable options.",
    url: "https://assessmentdirectory.co.uk/tools/cost-calculator/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function CostCalculatorPage() {
  const clinicData = (clinics as any[]).map((c) => ({
    name: c.name,
    slug: c.slug,
    city: c.city,
    adhd_adult: c.pricing?.adhd_adult,
    adhd_child: c.pricing?.adhd_child,
    autism_adult: c.pricing?.autism_adult,
    autism_child: c.pricing?.autism_child,
    wait_time: c.wait_time,
  }));

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/tools/"
            className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            Assessment Cost Calculator
          </h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">
            Compare private assessment costs across UK clinics. See typical
            prices for ADHD and autism assessments by age group.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <CostCalculator clinics={clinicData} />
      </section>
    </div>
  );
}
