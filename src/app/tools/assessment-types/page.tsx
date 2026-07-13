import { Metadata } from "next";
import Link from "next/link";
import AssessmentTypes from "./AssessmentTypes";

export const metadata: Metadata = {
  title: "Assessment Type Explainer — ADHD & Autism Assessment Formats Explained",
  description: "Understand the different types of ADHD and autism assessments — NHS vs private, online vs in-person, NICE-compliant vs screening. Make an informed choice.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/assessment-types/" },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Assessment Type Explainer</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Not all assessments are the same. Understand the different types so you can make the right choice for your situation.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><AssessmentTypes /></section>
    </div>
  );
}
