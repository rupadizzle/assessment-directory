import { Metadata } from "next";
import Link from "next/link";
import AdhdVsAnxiety from "./AdhdVsAnxiety";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "ADHD vs Anxiety Checker — Which Am I Experiencing?",
  description: "ADHD and anxiety share many symptoms but have different causes. This interactive tool helps you explore which might be driving your difficulties.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/adhd-vs-anxiety/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "ADHD vs Anxiety Checker — Which Am I Experiencing?",
    description:
      "ADHD and anxiety share many symptoms but have different causes. This interactive tool helps you explore which might be driving your difficulties.",
    url: "https://assessmentdirectory.co.uk/tools/adhd-vs-anxiety/",
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">ADHD vs Anxiety Checker</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">ADHD and anxiety can look remarkably similar. This tool helps you explore which pattern fits your experience — or whether it might be both.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><AdhdVsAnxiety /></section>
      <ToolSeoContent slug="adhd-vs-anxiety" />
    </div>
  );
}
