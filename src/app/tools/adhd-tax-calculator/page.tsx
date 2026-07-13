import { Metadata } from "next";
import Link from "next/link";
import AdhdTaxCalculator from "./AdhdTaxCalculator";

export const metadata: Metadata = {
  title: "ADHD Tax Calculator — How Much Is ADHD Costing You?",
  description: "Calculate the hidden financial cost of ADHD — from impulse spending and late fees to forgotten subscriptions and lost items. Free interactive calculator.",
  alternates: { canonical: "https://assessmentdirectory.co.uk/tools/adhd-tax-calculator/" },
};

export default function Page() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/tools/" className="inline-flex items-center gap-1 text-blue-200 hover:text-white text-sm mb-4 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>All Tools</Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">ADHD Tax Calculator</h1>
          <p className="text-blue-100 leading-relaxed max-w-xl">The &quot;ADHD tax&quot; is the hidden financial cost of living with ADHD. Calculate how much it might be costing you each year.</p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10"><AdhdTaxCalculator /></section>
    </div>
  );
}
