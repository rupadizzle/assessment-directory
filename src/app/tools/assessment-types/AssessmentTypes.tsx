"use client";
import { useState } from "react";
import Link from "next/link";

const types = [
  {
    id: "nhs",
    title: "NHS Assessment",
    route: "Public",
    condition: "both",
    time: "1-5+ years typical wait",
    cost: "Free",
    pros: ["No cost to you", "Automatically recognised by NHS services", "Follow-up care included", "Medication prescribing included"],
    cons: ["Extremely long waiting lists (often 2-5 years)", "Limited choice of assessor", "Cannot choose appointment times easily", "Some areas have closed referral lists"],
    format: "Usually face-to-face, multi-session. May include clinical interview, questionnaires, collateral history from family member, cognitive testing.",
    best: "Best if you can wait and want everything managed within the NHS.",
  },
  {
    id: "rtc",
    title: "Right to Choose (RTC)",
    route: "NHS-funded private",
    condition: "adhd",
    time: "3-18 months",
    cost: "Free (NHS-funded)",
    pros: ["Free at point of use", "Faster than NHS direct", "Assessed by specialist ADHD clinicians", "Diagnosis recognised by NHS"],
    cons: ["Currently only widely available for ADHD (not autism in most areas)", "Some GPs unfamiliar with RTC — may need to educate them", "Post-diagnosis care can be fragmented", "Some providers have growing waiting lists"],
    format: "Usually online video assessment. Single session (1-3 hours) plus questionnaires. May request informant report.",
    best: "Best for adults seeking ADHD assessment who want NHS-funded but faster than NHS direct.",
  },
  {
    id: "private",
    title: "Private Assessment",
    route: "Private",
    condition: "both",
    time: "1-8 weeks",
    cost: "£500-£2,500+",
    pros: ["Fastest option", "Choice of clinician and approach", "Flexible appointment times", "Often available online or in-person"],
    cons: ["Significant cost", "Some NHS GPs may not accept private diagnosis", "Shared care for medication not guaranteed", "Quality varies between providers"],
    format: "Varies by provider. Usually 1-3 hour clinical interview plus questionnaires. Some offer comprehensive multi-disciplinary assessment.",
    best: "Best if you need a fast answer and can afford the cost.",
  },
  {
    id: "screening",
    title: "Screening (Not Diagnosis)",
    route: "Self or GP",
    condition: "both",
    time: "Immediate (self) or at GP appointment",
    cost: "Free",
    pros: ["Instant results for self-screening", "Helps decide whether to pursue full assessment", "Can support GP referral request", "No commitment"],
    cons: ["Not a diagnosis — cannot be used for workplace adjustments, PIP, etc.", "May give false positives or negatives", "Self-report only (no clinical observation)", "Can cause anxiety while waiting for proper assessment"],
    format: "Standardised questionnaires (ASRS-v1.1 for ADHD, AQ-10 for autism). Takes 5-15 minutes.",
    best: "Best as a first step to decide whether formal assessment is worthwhile.",
  },
  {
    id: "comprehensive",
    title: "Comprehensive / Multi-Disciplinary",
    route: "Private (some NHS)",
    condition: "both",
    time: "2-6 weeks (private)",
    cost: "£1,500-£3,500+",
    pros: ["Most thorough assessment type", "Assesses for co-occurring conditions", "Includes cognitive testing", "Detailed written report", "Hardest for anyone to dispute"],
    cons: ["Most expensive option", "Takes multiple sessions", "May involve neuropsychological testing (can be tiring)", "Not always necessary for clear-cut cases"],
    format: "Multiple sessions over days/weeks. Clinical interview, cognitive testing (IQ, memory, attention), questionnaires, collateral history, observation. 20-40+ page report.",
    best: "Best for complex presentations, multiple possible conditions, or when you need the most robust report possible.",
  },
];

export default function AssessmentTypes() {
  const [filter, setFilter] = useState<"all" | "adhd" | "autism">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const filtered = types.filter(t => filter === "all" || t.condition === "both" || t.condition === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(["all", "adhd", "autism"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? (f === "autism" ? "bg-purple-600 text-white" : "bg-blue-600 text-white") : "bg-gray-50 text-gray-600 border border-gray-200"}`}>
            {f === "all" ? "All types" : f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <button onClick={() => setExpanded(expanded === t.id ? null : t.id)} className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{t.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{t.route}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>⏱ {t.time}</span>
                  <span>💰 {t.cost}</span>
                </div>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${expanded === t.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {expanded === t.id && (
              <div className="px-5 pb-5 border-t border-gray-100 pt-4 space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Format</p>
                  <p className="text-sm text-gray-600">{t.format}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">Advantages</p>
                    <ul className="text-sm text-gray-600 space-y-1">{t.pros.map((p, i) => <li key={i} className="flex gap-1.5"><span className="text-green-500 mt-0.5">✓</span>{p}</li>)}</ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-500 uppercase tracking-wide mb-1">Disadvantages</p>
                    <ul className="text-sm text-gray-600 space-y-1">{t.cons.map((c, i) => <li key={i} className="flex gap-1.5"><span className="text-red-400 mt-0.5">✗</span>{c}</li>)}</ul>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800"><span className="font-medium">Best for:</span> {t.best}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/clinics/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Browse Clinics</Link>
        <Link href="/tools/cost-calculator/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Cost Calculator</Link>
        <Link href="/tools/right-to-choose-letter/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">RTC Letter</Link>
      </div>
    </div>
  );
}
