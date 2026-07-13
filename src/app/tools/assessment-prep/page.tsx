import { Metadata } from "next";
import Link from "next/link";
import AssessmentPrepChecklist from "./AssessmentPrepChecklist";

export const metadata: Metadata = {
  title: "Assessment Preparation Checklist — Get Ready for Your ADHD or Autism Assessment",
  description: "Interactive checklist to help you prepare for your ADHD or autism assessment. Know what to bring, what to expect, and how to get the most accurate result.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/assessment-prep/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Assessment Preparation Checklist — Get Ready for Your ADHD or Autism Assessment",
    description:
      "Interactive checklist to help you prepare for your ADHD or autism assessment. Know what to bring, what to expect, and how to get the most accurate result.",
    url: "https://assessmentdirectory.co.uk/tools/assessment-prep/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            All Tools
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Assessment Preparation Checklist</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Everything you need to prepare before your ADHD or autism assessment. Work through this interactive checklist so you feel confident and ready.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10">
        <AssessmentPrepChecklist />
      </section>
    </div>
  );
}
