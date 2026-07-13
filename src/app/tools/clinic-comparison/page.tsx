import { Metadata } from "next";
import Link from "next/link";
import ClinicComparison from "./ClinicComparison";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Clinic Comparison Tool — Compare Private ADHD & Autism Assessment Providers",
  description: "Compare private ADHD and autism assessment clinics side-by-side. Filter by condition, price, and features to find the right provider for you.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/clinic-comparison/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Clinic Comparison Tool — Compare Private ADHD & Autism Assessment Providers",
    description:
      "Compare private ADHD and autism assessment clinics side-by-side. Filter by condition, price, and features to find the right provider for you.",
    url: "https://assessmentdirectory.co.uk/tools/clinic-comparison/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Clinic Comparison Tool</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Compare key features of private assessment providers to help you decide. Use alongside our full clinic directory for detailed profiles.</p>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-4 py-10"><ClinicComparison /></section>
      <ToolSeoContent slug="clinic-comparison" />
    </div>
  );
}
