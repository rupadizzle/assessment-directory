import { Metadata } from "next";
import Link from "next/link";
import EvidenceBuilder from "./EvidenceBuilder";

export const metadata: Metadata = {
  title: "Symptom Evidence Builder — Collect Proof for Your ADHD or Autism Assessment",
  description: "Build a structured evidence document of your ADHD or autism symptoms. Organised by life area to help clinicians understand how symptoms affect your daily life.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/evidence-builder/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Symptom Evidence Builder — Collect Proof for Your ADHD or Autism Assessment",
    description:
      "Build a structured evidence document of your ADHD or autism symptoms. Organised by life area to help clinicians understand how symptoms affect your daily life.",
    url: "https://assessmentdirectory.co.uk/tools/evidence-builder/",
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Symptom Evidence Builder</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Collect and organise evidence of your symptoms across different life areas. Create a document you can share with your assessor or GP.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><EvidenceBuilder /></section>
    </div>
  );
}
