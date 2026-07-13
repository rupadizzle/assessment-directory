import { Metadata } from "next";
import Link from "next/link";
import RightToChooseLetter from "@/components/RightToChooseLetter";

export const metadata: Metadata = {
  title:
    "Free Right to Choose Letter Generator — ADHD Assessment Referral Template",
  description:
    "Generate a personalised Right to Choose letter for your GP to request an NHS-funded ADHD assessment with a private provider. Free template — no sign-up required.",
  alternates: {
    canonical:
      "https://assessmentdirectory.co.uk/tools/right-to-choose-letter/",
  },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title:
      "Free Right to Choose Letter Generator — ADHD Assessment Referral",
    description:
      "Generate a personalised letter for your GP to request an NHS-funded ADHD assessment with a private provider under Right to Choose.",
    url: "https://assessmentdirectory.co.uk/tools/right-to-choose-letter/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function RightToChooseLetterPage() {
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
            Right to Choose Letter Generator
          </h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">
            Generate a personalised letter to give to your GP requesting a
            referral to a private ADHD assessment provider under the NHS Right to
            Choose.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10">
        <RightToChooseLetter />
      </section>
    </div>
  );
}
