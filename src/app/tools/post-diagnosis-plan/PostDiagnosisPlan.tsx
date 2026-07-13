"use client";
import { useState, useRef } from "react";
import Link from "next/link";

const sections = [
  { title: "Medical & Treatment", items: [
    { id: "gp", label: "Share diagnosis with your GP", detail: "Book a double appointment. Bring your diagnostic report. Ask about shared care for medication." },
    { id: "meds", label: "Discuss medication options", detail: "If appropriate, ask about stimulant and non-stimulant options. See our medication comparison tool." },
    { id: "shared", label: "Request shared care agreement", detail: "Ask your GP to take over prescribing from your private provider to save on costs." },
    { id: "therapy", label: "Explore therapy or coaching", detail: "CBT adapted for ADHD/autism, occupational therapy, or specialist coaching can help alongside medication." },
    { id: "comorbid", label: "Screen for co-occurring conditions", detail: "ADHD and autism commonly co-occur with anxiety, depression, sleep disorders, and sensory processing differences." },
  ]},
  { title: "Work & Education", items: [
    { id: "work", label: "Request workplace adjustments", detail: "You're protected under the Equality Act 2010. Use our workplace adjustments letter generator." },
    { id: "atw", label: "Apply for Access to Work", detail: "Government scheme that funds practical support for your job (equipment, coaching, travel)." },
    { id: "uni", label: "Register with university disability services", detail: "Request exam adjustments, study support, and apply for Disabled Students' Allowance (DSA)." },
    { id: "hr", label: "Decide whether to disclose at work", detail: "Disclosure is personal. You only need to share what's necessary to get adjustments." },
  ]},
  { title: "Financial Support", items: [
    { id: "pip", label: "Check PIP eligibility", detail: "Personal Independence Payment helps with extra costs of living with a disability. Not means-tested." },
    { id: "council", label: "Check council tax reduction", detail: "Some councils offer a disability reduction. Contact your local council to check eligibility." },
    { id: "prescriptions", label: "Get a prescription prepayment certificate", detail: "If you'll need regular medication, a PPC saves money (currently £31.25/3 months or £111.60/year)." },
  ]},
  { title: "Personal & Support", items: [
    { id: "community", label: "Join a peer support community", detail: "ADHD UK, Autistic UK, and local support groups offer connection with people who understand." },
    { id: "family", label: "Share diagnosis with family/friends", detail: "Consider who to tell and when. Some people find sharing gradually works best." },
    { id: "learn", label: "Learn about your condition", detail: "Books, podcasts, and reputable websites can help you understand yourself better." },
    { id: "self", label: "Allow yourself time to process", detail: "A diagnosis brings mixed emotions — relief, grief, anger. All of these are normal and valid." },
  ]},
];

export default function PostDiagnosisPlan() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [condition, setCondition] = useState<"adhd"|"autism">("adhd");
  const ref = useRef<HTMLDivElement>(null);
  const total = sections.reduce((n, s) => n + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const toggle = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }));

  const copy = async () => {
    const lines = [`Post-Diagnosis Action Plan (${condition.toUpperCase()})`, `Generated ${new Date().toLocaleDateString("en-GB")}`, ""];
    sections.forEach(s => { lines.push(s.title); s.items.forEach(i => { lines.push(`${checked[i.id] ? "[x]" : "[ ]"} ${i.label}`); lines.push(`    ${i.detail}`); }); lines.push(""); });
    try { await navigator.clipboard.writeText(lines.join("\n")); alert("Copied"); } catch {}
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setCondition("adhd")} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${condition === "adhd" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>ADHD</button>
        <button onClick={() => setCondition("autism")} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${condition === "autism" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>Autism</button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{done} of {total} steps completed</p>
          <p className="text-sm font-medium text-gray-700">{Math.round((done / total) * 100)}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(done / total) * 100}%` }} /></div>
      </div>

      <div ref={ref} className="space-y-6">
        {sections.map(s => {
          const sectionDone = s.items.every(i => checked[i.id]);
          return (
            <div key={s.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className={`flex items-center justify-between px-5 py-3 border-b ${sectionDone ? "bg-blue-50 border-blue-100" : "bg-gray-50 border-gray-200"}`}>
                <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                {sectionDone && <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">Complete</span>}
              </div>
              <div className="divide-y divide-gray-100">
                {s.items.map(i => (
                  <button key={i.id} onClick={() => toggle(i.id)} className="w-full text-left px-5 py-3 flex gap-3 hover:bg-gray-50 transition-colors">
                    <div className={`w-5 h-5 mt-0.5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${checked[i.id] ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                      {checked[i.id] && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${checked[i.id] ? "text-gray-400 line-through" : "text-gray-900"}`}>{i.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{i.detail}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3 mt-6 mb-4">
        <button onClick={copy} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Copy Plan</button>
        <button onClick={() => window.print()} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">Print</button>
      </div>

      <div className="flex flex-wrap gap-3 mt-6">
        <Link href="/tools/shared-care-letter/" className="text-sm text-blue-600 hover:text-blue-800 underline">Shared Care Letter</Link>
        <Link href="/tools/workplace-adjustments/" className="text-sm text-blue-600 hover:text-blue-800 underline">Workplace Adjustments</Link>
        <Link href="/tools/pip-checker/" className="text-sm text-blue-600 hover:text-blue-800 underline">PIP Checker</Link>
        <Link href="/tools/medication-comparison/" className="text-sm text-blue-600 hover:text-blue-800 underline">Medication Comparison</Link>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Remember:</span> There is no rush to do everything at once. Pick the steps that feel most important to you right now and work through them at your own pace. A diagnosis is the start of a journey, not a finish line.</p></div>
    </div>
  );
}
