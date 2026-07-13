import { Metadata } from "next";
import Link from "next/link";
import AdhdPlanner from "./AdhdPlanner";

export const metadata: Metadata = {
  title: "ADHD-Friendly Daily Planner — Plan Your Day in a Way That Works",
  description: "An ADHD-friendly daily planner with energy-based scheduling, time blocking, and built-in breaks. Plan your day around how your brain actually works.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/adhd-planner/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "ADHD-Friendly Daily Planner — Plan Your Day in a Way That Works",
    description:
      "An ADHD-friendly daily planner with energy-based scheduling, time blocking, and built-in breaks. Plan your day around how your brain actually works.",
    url: "https://assessmentdirectory.co.uk/tools/adhd-planner/",
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">ADHD-Friendly Daily Planner</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">Plan your day around energy levels, not just time. Add tasks, assign energy levels, and get a schedule that works with your brain.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><AdhdPlanner /></section>
    </div>
  );
}
