"use client";

import { useState, useRef } from "react";

const categories = [
  { id: "work", label: "Work / Career", prompt: "Describe difficulties at work — e.g. missing deadlines, difficulty prioritising, trouble in meetings, conflict with colleagues, job changes." },
  { id: "education", label: "Education", prompt: "Describe difficulties in education — e.g. struggling to study, poor grades despite intelligence, trouble with coursework deadlines, difficulty in lectures." },
  { id: "relationships", label: "Relationships", prompt: "Describe how symptoms affect relationships — e.g. forgetting important events, difficulty listening, emotional reactivity, social misunderstandings." },
  { id: "daily-life", label: "Daily Life", prompt: "Describe everyday difficulties — e.g. household tasks, cooking, cleaning, paying bills, managing appointments, personal hygiene routines." },
  { id: "emotional", label: "Emotional Wellbeing", prompt: "Describe emotional difficulties — e.g. mood swings, rejection sensitivity, anxiety, overwhelm, burnout, low self-esteem." },
  { id: "childhood", label: "Childhood", prompt: "Describe childhood experiences — e.g. school reports, behaviour issues, daydreaming, social difficulties, sensory sensitivities, special interests." },
  { id: "sensory", label: "Sensory Experiences", prompt: "Describe sensory sensitivities — e.g. noise, light, textures, smells, taste, need for pressure or movement." },
  { id: "coping", label: "Coping Strategies", prompt: "Describe strategies you use to manage — e.g. lists, alarms, avoiding situations, masking, over-preparing, relying on others." },
];

export default function EvidenceBuilder() {
  const [entries, setEntries] = useState<Record<string, string>>({});
  const [showOutput, setShowOutput] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const filledCount = Object.values(entries).filter((v) => v.trim()).length;

  const handleCopy = async () => {
    if (outputRef.current) {
      try {
        await navigator.clipboard.writeText(outputRef.current.innerText);
        alert("Evidence document copied to clipboard");
      } catch {
        const range = document.createRange();
        range.selectNodeContents(outputRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
  };

  if (showOutput) {
    const filledCategories = categories.filter((c) => entries[c.id]?.trim());
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleCopy} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Copy Document</button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">Print</button>
          <button onClick={() => setShowOutput(false)} className="text-sm text-gray-500 hover:text-gray-700 underline">Edit</button>
        </div>
        <div ref={outputRef} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 print:border-0 print:p-0">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Symptom Evidence Summary</h2>
          <p className="text-xs text-gray-500 mb-6">Prepared for assessment — {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          {filledCategories.map((cat) => (
            <div key={cat.id} className="mb-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.label}</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{entries[cat.id]}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">This document is generated in your browser. Nothing is sent to any server. Consider sharing this with your clinician before or at your assessment appointment.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">Fill in as many sections as you can. You don&apos;t need to complete every section — focus on the areas where you experience the most difficulty. Specific examples are more helpful than general statements.</p>
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <label className="block text-sm font-medium text-gray-900 mb-1">{cat.label}</label>
            <p className="text-xs text-gray-500 mb-3">{cat.prompt}</p>
            <textarea value={entries[cat.id] || ""} onChange={(e) => setEntries((p) => ({ ...p, [cat.id]: e.target.value }))} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" placeholder="Describe your experience here..." />
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-3">
        <button onClick={() => { if (filledCount > 0) { setShowOutput(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={filledCount === 0} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${filledCount > 0 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
          Generate Evidence Document ({filledCount} section{filledCount !== 1 ? "s" : ""})
        </button>
        <p className="text-xs text-gray-400">Everything stays in your browser</p>
      </div>
    </div>
  );
}
