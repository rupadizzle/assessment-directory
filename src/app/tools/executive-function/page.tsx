import { Metadata } from "next";
import Link from "next/link";
import ExecutiveFunction from "./ExecutiveFunction";

export const metadata: Metadata = {
  title: "Executive Function Assessment — How Are Your Executive Functions?",
  description: "Self-assess your executive function skills across working memory, planning, emotional regulation, task initiation, and more. Free interactive assessment.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/executive-function/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Executive Function Assessment — How Are Your Executive Functions?",
    description:
      "Self-assess your executive function skills across working memory, planning, emotional regulation, task initiation, and more. Free interactive assessment.",
    url: "https://assessmentdirectory.co.uk/tools/executive-function/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Executive Function Assessment</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Executive functions are the brain&apos;s management system. Assess how yours are working across key areas affected by ADHD and autism.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><ExecutiveFunction /></section>
    </div>
  );
}
