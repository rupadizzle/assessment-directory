import { Metadata } from "next";
import Link from "next/link";
import MedicationComparison from "./MedicationComparison";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "ADHD Medication Comparison — UK Medications Guide",
  description: "Compare ADHD medications available in the UK. See how stimulant and non-stimulant options differ in type, duration, common side effects, and typical dosing.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/medication-comparison/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "ADHD Medication Comparison — UK Medications Guide",
    description:
      "Compare ADHD medications available in the UK. See how stimulant and non-stimulant options differ in type, duration, common side effects, and typical dosing.",
    url: "https://assessmentdirectory.co.uk/tools/medication-comparison/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            All Tools
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">ADHD Medication Comparison</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Compare ADHD medications available in the UK. Understand the differences between stimulant and non-stimulant options to have an informed conversation with your prescriber.</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-10"><MedicationComparison /></section>
      <ToolSeoContent slug="medication-comparison" />
    </div>
  );
}
