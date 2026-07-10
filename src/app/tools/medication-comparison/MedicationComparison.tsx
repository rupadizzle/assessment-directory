"use client";

import { useState } from "react";

const medications = [
  { name: "Methylphenidate IR", brand: "Ritalin, Medikinet", type: "stimulant", class: "Methylphenidate", duration: "3-4 hours", onset: "20-30 min", dosing: "2-3 times daily", commonSideEffects: "Reduced appetite, insomnia, headache, dry mouth", notes: "Short-acting, allows flexible dosing. Often used to find the right dose before switching to extended-release." },
  { name: "Methylphenidate XR", brand: "Concerta XL, Equasym XL, Xaggitin XL", type: "stimulant", class: "Methylphenidate", duration: "8-12 hours", onset: "30-60 min", dosing: "Once daily (morning)", commonSideEffects: "Reduced appetite, insomnia, headache, increased heart rate", notes: "Extended-release. Most commonly prescribed first-line ADHD medication in the UK. Concerta XL uses OROS technology for gradual release." },
  { name: "Lisdexamfetamine", brand: "Elvanse (Vyvanse)", type: "stimulant", class: "Amphetamine", duration: "10-14 hours", onset: "1-2 hours", dosing: "Once daily (morning)", commonSideEffects: "Reduced appetite, insomnia, dry mouth, anxiety", notes: "Pro-drug (converted to dexamfetamine in the body). Smooth onset and offset. Often preferred when methylphenidate doesn't work well." },
  { name: "Dexamfetamine", brand: "Amfexa, Dexedrine", type: "stimulant", class: "Amphetamine", duration: "4-6 hours", onset: "20-30 min", dosing: "2-3 times daily", commonSideEffects: "Reduced appetite, insomnia, dry mouth, weight loss", notes: "Short-acting amphetamine. Used when longer-acting options aren't suitable or as a top-up alongside Elvanse." },
  { name: "Atomoxetine", brand: "Strattera", type: "non-stimulant", class: "SNRI", duration: "24 hours", onset: "4-6 weeks for full effect", dosing: "Once or twice daily", commonSideEffects: "Nausea, reduced appetite, fatigue, mood changes", notes: "Non-stimulant option. Takes weeks to reach full effect. Often used when stimulants aren't tolerated or there's a history of substance misuse." },
  { name: "Guanfacine XR", brand: "Intuniv", type: "non-stimulant", class: "Alpha-2 agonist", duration: "24 hours", onset: "1-2 weeks", dosing: "Once daily", commonSideEffects: "Drowsiness, low blood pressure, fatigue, headache", notes: "Non-stimulant, primarily licensed for children/adolescents in the UK. Can be used alongside stimulants. Helps with emotional dysregulation." },
];

export default function MedicationComparison() {
  const [filter, setFilter] = useState<"all" | "stimulant" | "non-stimulant">("all");

  const filtered = filter === "all" ? medications : medications.filter((m) => m.type === filter);

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800"><span className="font-medium">Important:</span> This is general information only. Medication decisions should always be made with a qualified prescriber who knows your medical history. Never start, stop, or change medication without professional guidance.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "stimulant", "non-stimulant"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
            {f === "all" ? "All" : f === "stimulant" ? "Stimulant" : "Non-Stimulant"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((med) => (
          <div key={med.name} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{med.name}</h3>
                <p className="text-xs text-gray-500">{med.brand}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${med.type === "stimulant" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                {med.type === "stimulant" ? "Stimulant" : "Non-Stimulant"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div><p className="text-xs text-gray-500">Duration</p><p className="text-sm font-medium text-gray-900">{med.duration}</p></div>
              <div><p className="text-xs text-gray-500">Onset</p><p className="text-sm font-medium text-gray-900">{med.onset}</p></div>
              <div><p className="text-xs text-gray-500">Dosing</p><p className="text-sm font-medium text-gray-900">{med.dosing}</p></div>
              <div><p className="text-xs text-gray-500">Class</p><p className="text-sm font-medium text-gray-900">{med.class}</p></div>
            </div>
            <div className="mb-2"><p className="text-xs text-gray-500 mb-0.5">Common side effects</p><p className="text-sm text-gray-600">{med.commonSideEffects}</p></div>
            <div><p className="text-xs text-gray-500 mb-0.5">Notes</p><p className="text-sm text-gray-600">{med.notes}</p></div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 text-sm mb-2">Key things to know</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium text-gray-700">First-line treatment:</span> NICE recommends methylphenidate (e.g. Concerta XL) as first-line medication for adults with ADHD, with lisdexamfetamine (Elvanse) as second-line.</p>
          <p><span className="font-medium text-gray-700">Shared care:</span> After initial titration by a specialist, medication management can be transferred to your GP under a shared care agreement.</p>
          <p><span className="font-medium text-gray-700">Prescriptions:</span> ADHD stimulant medications are controlled drugs requiring specialist prescribing. They cannot be prescribed by a GP without a shared care agreement.</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400 leading-relaxed">Information based on NICE guidelines and BNF data. Side effects listed are common but not exhaustive. Individual responses to medication vary significantly.</p>
    </div>
  );
}
