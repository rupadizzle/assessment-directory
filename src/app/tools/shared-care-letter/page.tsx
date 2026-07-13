import { Metadata } from "next";
import Link from "next/link";
import SharedCareLetter from "./SharedCareLetter";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Shared Care Letter Generator — Ask Your GP to Prescribe ADHD Medication",
  description: "Generate a letter requesting your GP enter a shared care agreement to prescribe ADHD medication after private diagnosis. Free template for UK patients.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/shared-care-letter/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Shared Care Letter Generator — Ask Your GP to Prescribe ADHD Medication",
    description:
      "Generate a letter requesting your GP enter a shared care agreement to prescribe ADHD medication after private diagnosis. Free template for UK patients.",
    url: "https://assessmentdirectory.co.uk/tools/shared-care-letter/",
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Shared Care Agreement Letter</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">After a private ADHD diagnosis, your GP can prescribe your medication under a shared care agreement. Generate a letter to start this conversation.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><SharedCareLetter /></section>
      <ToolSeoContent slug="shared-care-letter" />
    </div>
  );
}
