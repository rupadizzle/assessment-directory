import { Metadata } from "next";
import Link from "next/link";
import PostDiagnosisPlan from "./PostDiagnosisPlan";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Post-Diagnosis Action Plan — What to Do After an ADHD or Autism Diagnosis",
  description: "Create a personalised action plan after receiving an ADHD or autism diagnosis. Covers medication, workplace rights, GP shared care, PIP, and more.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/post-diagnosis-plan/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Post-Diagnosis Action Plan — What to Do After an ADHD or Autism Diagnosis",
    description:
      "Create a personalised action plan after receiving an ADHD or autism diagnosis. Covers medication, workplace rights, GP shared care, PIP, and more.",
    url: "https://assessmentdirectory.co.uk/tools/post-diagnosis-plan/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Post-Diagnosis Action Plan</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Just been diagnosed? Create a personalised action plan with the next steps that matter most to you.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><PostDiagnosisPlan /></section>
      <ToolSeoContent slug="post-diagnosis-plan" />
    </div>
  );
}
