import { Metadata } from "next";
import Link from "next/link";
import AdhdScreeningQuiz from "@/components/AdhdScreeningQuiz";

export const metadata: Metadata = {
  title: "Free ADHD Self-Screening Quiz (ASRS-v1.1) — Do I Have ADHD?",
  description:
    "Take the free adult ADHD self-screening quiz based on the WHO ASRS-v1.1. 6 quick questions to help you decide whether to seek a formal ADHD assessment in the UK.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/tools/adhd-screening/",
  },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Free ADHD Self-Screening Quiz (ASRS-v1.1) — Do I Have ADHD?",
    description:
      "Take the free adult ADHD self-screening quiz based on the WHO ASRS-v1.1. 6 quick questions to help you decide whether to seek a formal ADHD assessment.",
    url: "https://assessmentdirectory.co.uk/tools/adhd-screening/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function AdhdScreeningPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
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
            ADHD Self-Screening Quiz
          </h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">
            Based on the World Health Organisation Adult ADHD Self-Report Scale
            (ASRS-v1.1). Answer 6 quick questions to see whether your symptoms
            may be consistent with ADHD.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-blue-800">
              This is a screening tool, not a diagnosis. Only a qualified
              clinician can diagnose ADHD after a comprehensive assessment. Your
              answers stay in your browser — nothing is stored or sent anywhere.
            </p>
          </div>
        </div>

        <AdhdScreeningQuiz />
      </section>
    </div>
  );
}
