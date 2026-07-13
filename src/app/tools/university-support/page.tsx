import { Metadata } from "next";
import Link from "next/link";
import UniversitySupportLetter from "./UniversitySupportLetter";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "University Support Letter — Request Disability Adjustments for ADHD or Autism",
  description: "Generate a letter requesting disability support at university after ADHD or autism diagnosis. Covers exam adjustments, DSA, and reasonable adjustments under the Equality Act.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/university-support/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "University Support Letter — Request Disability Adjustments for ADHD or Autism",
    description:
      "Generate a letter requesting disability support at university after ADHD or autism diagnosis. Covers exam adjustments, DSA, and reasonable adjustments under the Equality Act.",
    url: "https://assessmentdirectory.co.uk/tools/university-support/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-purple-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">University Support Letter</h1>
          <p className="text-purple-100 leading-relaxed max-w-xl">Generate a letter to your university&apos;s disability service requesting adjustments for ADHD or autism under the Equality Act 2010.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><UniversitySupportLetter /></section>
      <ToolSeoContent slug="university-support" />
    </div>
  );
}
