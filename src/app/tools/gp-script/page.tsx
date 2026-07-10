import { Metadata } from "next";
import Link from "next/link";
import GpScriptGenerator from "./GpScriptGenerator";

export const metadata: Metadata = {
  title: "GP Appointment Script — What to Say to Your Doctor About ADHD or Autism",
  description:
    "Generate a personalised script for your GP appointment about ADHD or autism concerns. Know exactly what to say to get taken seriously and get a referral.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/gp-script/" },
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">GP Appointment Script Generator</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Know exactly what to say at your GP appointment when asking about ADHD or autism. Build a personalised talking-points script you can take with you.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10">
        <GpScriptGenerator />
      </section>
    </div>
  );
}
