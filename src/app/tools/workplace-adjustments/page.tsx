import { Metadata } from "next";
import Link from "next/link";
import WorkplaceLetter from "./WorkplaceLetter";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "Workplace Adjustments Letter — Request Reasonable Adjustments for ADHD or Autism",
  description: "Generate a letter requesting reasonable adjustments at work under the Equality Act 2010 for ADHD or autism. Free template for UK employees.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/workplace-adjustments/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Workplace Adjustments Letter — Request Reasonable Adjustments for ADHD or Autism",
    description:
      "Generate a letter requesting reasonable adjustments at work under the Equality Act 2010 for ADHD or autism. Free template for UK employees.",
    url: "https://assessmentdirectory.co.uk/tools/workplace-adjustments/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">Workplace Adjustments Letter</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Generate a professional letter requesting reasonable adjustments from your employer under the Equality Act 2010.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><WorkplaceLetter /></section>
      <ToolSeoContent slug="workplace-adjustments" />
    </div>
  );
}
