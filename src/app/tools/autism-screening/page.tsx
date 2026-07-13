import { Metadata } from "next";
import Link from "next/link";
import AutismScreeningQuiz from "@/components/AutismScreeningQuiz";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Free Autism Self-Screening Quiz (AQ-10) — Am I Autistic?",
  description:
    "Take the free autism self-screening quiz based on the AQ-10 by Baron-Cohen et al. 10 quick questions used by GPs as a referral tool for autism assessment in the UK.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/tools/autism-screening/",
  },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Free Autism Self-Screening Quiz (AQ-10) — Am I Autistic?",
    description:
      "Take the free autism self-screening quiz based on the AQ-10. 10 quick questions used by GPs as a referral tool for autism assessment.",
    url: "https://assessmentdirectory.co.uk/tools/autism-screening/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function AutismScreeningPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/tools/"
            className="inline-flex items-center gap-1 text-purple-200 hover:text-white text-sm mb-4 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tools
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
            Autism Self-Screening Quiz
          </h1>
          <p className="text-purple-100 leading-relaxed max-w-xl">
            Based on the Autism Spectrum Quotient (AQ-10) by Baron-Cohen et al.
            Answer 10 quick questions — the same screening tool recommended by
            NICE for GP referrals.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-purple-800">
              This is a screening tool, not a diagnosis. Only a qualified
              clinician can determine whether you are autistic after a
              comprehensive assessment. Your answers stay in your browser —
              nothing is stored or sent anywhere.
            </p>
          </div>
        </div>

        <AutismScreeningQuiz />
      </section>
      <ToolSeoContent slug="autism-screening" />
    </div>
  );
}
