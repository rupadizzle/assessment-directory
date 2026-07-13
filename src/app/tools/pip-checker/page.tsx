import { Metadata } from "next";
import Link from "next/link";
import PipChecker from "./PipChecker";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "PIP Eligibility Checker — Could Your ADHD or Autism Qualify for PIP?",
  description: "Check whether your ADHD or autism symptoms might qualify you for Personal Independence Payment (PIP). Free informational tool covering all 12 PIP activities.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/pip-checker/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "PIP Eligibility Checker — Could Your ADHD or Autism Qualify for PIP?",
    description:
      "Check whether your ADHD or autism symptoms might qualify you for Personal Independence Payment (PIP). Free informational tool covering all 12 PIP activities.",
    url: "https://assessmentdirectory.co.uk/tools/pip-checker/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">PIP Eligibility Checker</h1>
          <p className="text-gray-300 leading-relaxed max-w-xl">Find out whether your ADHD or autism symptoms might qualify you for Personal Independence Payment. This is an informational guide, not an official assessment.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><PipChecker /></section>
      <ToolSeoContent slug="pip-checker" />
    </div>
  );
}
