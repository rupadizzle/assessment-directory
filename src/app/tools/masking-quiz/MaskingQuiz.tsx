"use client";
import { useState } from "react";
import Link from "next/link";

const questions = [
  "I rehearse conversations or social responses in advance",
  "I consciously copy other people's facial expressions or gestures",
  "I suppress the urge to stim (e.g. hand-flapping, rocking) in public",
  "I force myself to maintain eye contact even though it feels uncomfortable",
  "I feel exhausted after social interactions, even enjoyable ones",
  "I have a different 'persona' I use in social or work settings",
  "I monitor my tone of voice and adjust it to match the situation",
  "I hide my true interests because I worry they seem unusual",
  "I often say what I think others want to hear rather than what I really think",
  "I use scripts or learned phrases in everyday conversation",
  "I study social rules by watching TV shows, videos, or observing others",
  "I feel like nobody really knows the 'real me'",
  "I experience shutdowns or meltdowns after periods of sustained masking",
  "I over-prepare for situations that others seem to handle spontaneously",
  "I suppress sensory discomfort to avoid drawing attention to myself",
];

const options = [
  { label: "Never", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Almost always", value: 3 },
];

export default function MaskingQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [show, setShow] = useState(false);
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);
  const score = Object.values(answers).reduce((s, v) => s + v, 0);
  const max = questions.length * 3;
  const pct = Math.round((score / max) * 100);

  const getResult = () => {
    if (pct >= 70) return { level: "High", color: "purple", desc: "Your responses suggest significant masking behaviour. This level of masking is commonly associated with autistic burnout, anxiety, and loss of identity. It's especially common in women and those diagnosed later in life." };
    if (pct >= 40) return { level: "Moderate", color: "blue", desc: "You show a moderate level of masking. You likely adapt your behaviour in social settings more than average, which can be tiring. Consider which situations require the most masking and whether adjustments could help." };
    return { level: "Low", color: "gray", desc: "Your masking levels appear relatively low. This could mean you feel comfortable being yourself in most situations, or that masking has become so automatic you don't notice it." };
  };

  if (show) {
    const r = getResult();
    return (
      <div>
        <div className={`rounded-xl border p-6 mb-6 ${r.color === "purple" ? "bg-purple-50 border-purple-200" : r.color === "blue" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Masking Level</p>
            <p className="text-sm font-medium text-gray-700">{score}/{max} ({pct}%)</p>
          </div>
          <p className={`text-2xl font-bold mb-2 ${r.color === "purple" ? "text-purple-700" : r.color === "blue" ? "text-blue-700" : "text-gray-700"}`}>{r.level} Masking</p>
          <p className="text-sm text-gray-600">{r.desc}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Understanding masking</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>Masking is a survival strategy, not a character flaw. Many autistic people learn to mask from childhood without realising it.</p>
            <p>While masking can help navigate social situations, sustained masking is linked to burnout, depression, anxiety, and a reduced sense of identity.</p>
            <p>Reducing masking often means finding safe environments and people where you can be more authentically yourself — it doesn&apos;t have to be all-or-nothing.</p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 text-sm mb-2">Next steps</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• If you score high and haven&apos;t been assessed, consider an autism screening</p>
            <p>• Talk to a therapist experienced with autism and masking</p>
            <p>• Find autistic-led community spaces where masking isn&apos;t expected</p>
            <p>• Practice small acts of unmasking in safe settings</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/tools/autism-screening/" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm">Take Autism Screening</Link>
          <Link href="/tools/sensory-profile/" className="inline-flex items-center gap-2 bg-white text-purple-600 border border-purple-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-purple-50 transition-all">Sensory Profile Quiz</Link>
        </div>
        <button onClick={() => { setShow(false); setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Start again</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Disclaimer:</span> This is a self-reflection tool, not a clinical assessment. It cannot diagnose autism or any other condition. If you recognise yourself in these questions, consider seeking a formal assessment from a qualified professional.</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{Object.keys(answers).length} of {questions.length} answered</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} /></div>
      </div>
      <div className="space-y-4 mb-8">
        {questions.map((q, i) => (
          <div key={i} className={`bg-white rounded-xl border p-4 transition-all ${answers[i] !== undefined ? "border-purple-200 bg-purple-50/30" : "border-gray-200"}`}>
            <p className="font-medium text-gray-900 text-sm mb-3"><span className="text-purple-600 mr-1">{i + 1}.</span>{q}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {options.map(o => (
                <button key={o.value} onClick={() => setAnswers(p => ({ ...p, [i]: o.value }))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[i] === o.value ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{o.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={() => { if (allAnswered) { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!allAnswered} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${allAnswered ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>See My Results</button>
      </div>
    </div>
  );
}
