import { Metadata } from "next";
import Link from "next/link";
import AdhdWomenScreener from "./AdhdWomenScreener";

export const metadata: Metadata = {
  title: "ADHD in Women Screening Quiz — Signs of ADHD in Females",
  description: "ADHD often presents differently in women and girls. Take this screening quiz focused on how ADHD commonly manifests in females — including inattentive symptoms often missed by standard tests.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/adhd-in-women/" },
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">ADHD in Women Screening Quiz</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">ADHD is frequently missed in women because symptoms often present differently. This quiz focuses on the patterns most common in females — including inattentive-type ADHD, emotional dysregulation, and masking.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-sm text-blue-800">This is a screening tool, not a diagnosis. ADHD affects people of all genders — this quiz highlights patterns more commonly seen in women. Your answers stay in your browser.</p>
          </div>
        </div>
        <AdhdWomenScreener />
      </section>
    </div>
  );
}
