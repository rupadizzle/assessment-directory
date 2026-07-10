import { Metadata } from "next";
import Link from "next/link";
import NhsWaitTimeChecker from "@/components/NhsWaitTimeChecker";
import icbData from "@/data/nhs-icb.json";

export const metadata: Metadata = {
  title: "NHS ADHD & Autism Wait Times by Area — How Long Will I Wait?",
  description:
    "Check estimated NHS waiting times for ADHD and autism assessments in your area. Compare NHS waits with private assessment options across the UK.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/tools/nhs-wait-times/",
  },
  openGraph: {
    title: "NHS ADHD & Autism Wait Times by Area — How Long Will I Wait?",
    description:
      "Check estimated NHS waiting times for ADHD and autism assessments in your area. Compare NHS waits with private assessment options.",
    url: "https://assessmentdirectory.co.uk/tools/nhs-wait-times/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function NhsWaitTimesPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/tools/"
            className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            NHS Wait Time Checker
          </h1>
          <p className="text-gray-300 leading-relaxed max-w-xl">
            Look up estimated NHS ADHD and autism assessment waiting times in
            your area. Search by county, city, or region to see how long
            you might wait.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <NhsWaitTimeChecker icbData={icbData} />
      </section>
    </div>
  );
}
