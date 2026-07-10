"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  { id: 1, text: "I often feel mentally exhausted even when I haven't done anything physically demanding." },
  { id: 2, text: "I tend to overthink things and replay conversations in my head." },
  { id: 3, text: "I feel like I have to work much harder than others to stay organised." },
  { id: 4, text: "I often forget things I intended to do (even important ones) unless I write them down." },
  { id: 5, text: "I feel overwhelmed by tasks that other people seem to handle easily." },
  { id: 6, text: "I have difficulty managing my emotions — I react more intensely than I feel I should." },
  { id: 7, text: "I often zone out during conversations or meetings, even when I want to pay attention." },
  { id: 8, text: "I tend to start new projects with enthusiasm but struggle to finish them." },
  { id: 9, text: "I use coping strategies (lists, alarms, routines) to compensate for difficulties others don't seem to have." },
  { id: 10, text: "I often feel like I'm 'masking' — performing a version of myself that seems more capable or together than I actually feel." },
  { id: 11, text: "I struggle with time — I'm frequently late, underestimate how long things take, or lose track of time completely." },
  { id: 12, text: "I experience periods of hyperfocus where I'm completely absorbed in something, losing hours without noticing." },
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Very Often", value: 3 },
];

export default function AdhdWomenScreener() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const score = Object.values(answers).reduce((s, v) => s + v, 0);
  const maxScore = questions.length * 3;
  const pct = Math.round((score / maxScore) * 100);

  const getResult = () => {
    if (pct >= 60) return { level: "high" as const, title: "Your responses suggest ADHD assessment may be beneficial", desc: "Many of the patterns you described are commonly associated with ADHD in women, particularly inattentive-type ADHD. Women are often diagnosed later in life because their symptoms are less 'visible' than the hyperactive presentation typically associated with ADHD. We strongly recommend speaking with a clinician who has experience with ADHD in women." };
    if (pct >= 35) return { level: "moderate" as const, title: "Your responses show some patterns associated with ADHD in women", desc: "You reported some experiences that can be associated with ADHD, though not enough to strongly indicate it from this screener alone. If these patterns are affecting your quality of life, it may still be worth discussing with a healthcare professional — particularly one experienced with ADHD in women." };
    return { level: "low" as const, title: "Your responses are not strongly consistent with ADHD", desc: "Based on your answers, your experiences do not appear strongly consistent with ADHD. However, this is a brief screening tool. If you have concerns about attention, emotional regulation, or executive function, please consult a healthcare professional." };
  };

  if (showResults) {
    const result = getResult();
    return (
      <div>
        <div className={`rounded-xl border p-6 sm:p-8 mb-6 ${result.level === "high" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{result.desc}</p>
          <p className="text-sm text-gray-500">Score: <span className="font-semibold text-gray-700">{score}</span> out of {maxScore} ({pct}%)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/adhd-screening/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Take the standard ADHD screener (ASRS)</Link>
            <Link href="/adhd-assessment/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Find ADHD Clinics</Link>
            <Link href="/guides/adhd-in-women-signs-diagnosis/" className="inline-flex items-center gap-2 text-blue-600 text-sm hover:text-blue-800">Read: ADHD in Women Guide</Link>
          </div>
        </div>
        <button onClick={() => { setAnswers({}); setShowResults(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Take again</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed"><span className="font-medium">Disclaimer:</span> This quiz is not a validated clinical instrument. It is designed to highlight ADHD patterns commonly seen in women and is for informational purposes only.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{Object.keys(answers).length} of {questions.length} answered</p>
          <p className="text-sm text-gray-400">~ 3 minutes</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} />
        </div>
      </div>
      <div className="space-y-5">
        {questions.map((q, i) => (
          <div key={q.id} className={`bg-white rounded-xl border p-5 transition-all ${answers[q.id] !== undefined ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}>
            <p className="font-medium text-gray-900 mb-3 text-sm"><span className="text-blue-600 mr-2">{i + 1}.</span>{q.text}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {options.map((opt) => (
                <button key={opt.value} onClick={() => setAnswers((p) => ({ ...p, [q.id]: opt.value }))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[q.id] === opt.value ? "bg-blue-600 text-white shadow-sm" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button onClick={() => { if (allAnswered) { setShowResults(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!allAnswered} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${allAnswered ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>View My Results</button>
      </div>
    </div>
  );
}
