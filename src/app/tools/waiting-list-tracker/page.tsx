import { Metadata } from "next";
import Link from "next/link";
import WaitingListTracker from "./WaitingListTracker";
import ToolSeoContent from "@/components/ToolSeoContent";

export const metadata: Metadata = {
  title: "NHS Waiting List Tracker — Track Your ADHD or Autism Referral",
  description: "Track your NHS ADHD or autism assessment waiting time. Log key dates, calculate how long you've waited, and know your rights including Right to Choose.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/waiting-list-tracker/" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "NHS Waiting List Tracker — Track Your ADHD or Autism Referral",
    description:
      "Track your NHS ADHD or autism assessment waiting time. Log key dates, calculate how long you've waited, and know your rights including Right to Choose.",
    url: "https://assessmentdirectory.co.uk/tools/waiting-list-tracker/",
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">NHS Waiting List Tracker</h1>
          <p className="text-gray-300 leading-relaxed max-w-xl">Enter your referral date to track how long you&apos;ve been waiting and understand your options, including the Right to Choose.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><WaitingListTracker /></section>
      <ToolSeoContent slug="waiting-list-tracker" />
    </div>
  );
}
