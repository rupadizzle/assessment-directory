"use client";
import { useState } from "react";
import Link from "next/link";

const senses = [
  { name: "Sound", icon: "🔊", questions: [
    "Sudden or loud noises cause me distress",
    "I notice sounds others don't seem to hear",
    "Background noise makes it hard to concentrate or follow conversation",
  ], tips: ["Use noise-cancelling headphones or earplugs in busy environments", "Ask for a quiet workspace", "Use white noise or nature sounds to mask unpredictable background noise"] },
  { name: "Sight", icon: "👁", questions: [
    "Bright or fluorescent lighting bothers me",
    "I get overwhelmed in visually busy environments (supermarkets, crowds)",
    "I notice small visual details that others miss",
  ], tips: ["Wear tinted or FL-41 glasses to reduce light sensitivity", "Reduce screen brightness and use dark mode", "Choose calm, low-clutter environments when possible"] },
  { name: "Touch", icon: "✋", questions: [
    "Certain fabrics or clothing tags irritate me",
    "Unexpected touch (even friendly) feels unpleasant",
    "I'm very particular about the texture of things I touch",
  ], tips: ["Remove clothing tags and choose soft, tagless fabrics", "Communicate touch preferences to people close to you", "Use deep pressure (weighted blanket) for calming input"] },
  { name: "Taste & Smell", icon: "👃", questions: [
    "Strong smells can make me feel nauseous or overwhelmed",
    "I have a limited diet partly due to food textures or tastes",
    "I notice smells that others don't seem to detect",
  ], tips: ["Carry a scent you find calming (essential oil, scarf)", "Prepare for restaurants by checking menus in advance", "Don't force yourself to eat foods that cause distress — work with, not against, your sensory needs"] },
  { name: "Movement & Balance", icon: "🏃", questions: [
    "I feel uneasy on escalators, lifts, or in moving vehicles",
    "I need to move or fidget to concentrate",
    "I seek out physical movement (rocking, spinning, swinging) for comfort",
  ], tips: ["Use fidget tools during meetings or focused work", "Build regular movement breaks into your day", "Try a wobble cushion or standing desk for proprioceptive input"] },
];

const options = [
  { label: "Not at all", value: 0 },
  { label: "A little", value: 1 },
  { label: "Moderately", value: 2 },
  { label: "Very much", value: 3 },
];

export default function SensoryProfile() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [show, setShow] = useState(false);
  const allQ = senses.flatMap((s, si) => s.questions.map((_, qi) => `${si}-${qi}`));
  const allAnswered = allQ.every(k => answers[k] !== undefined);

  const getSenseScore = (si: number) => senses[si].questions.reduce((s, _, qi) => s + (answers[`${si}-${qi}`] || 0), 0);
  const getSenseMax = (si: number) => senses[si].questions.length * 3;
  const getLevel = (score: number, max: number) => {
    const p = (score / max) * 100;
    if (p >= 67) return { label: "High sensitivity", color: "purple" };
    if (p >= 34) return { label: "Moderate sensitivity", color: "blue" };
    return { label: "Low sensitivity", color: "gray" };
  };

  if (show) {
    const results = senses.map((s, i) => ({ ...s, score: getSenseScore(i), max: getSenseMax(i), level: getLevel(getSenseScore(i), getSenseMax(i)) }));
    const totalScore = results.reduce((s, r) => s + r.score, 0);
    const totalMax = results.reduce((s, r) => s + r.max, 0);
    return (
      <div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-6 text-center">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Overall Sensory Sensitivity</p>
          <p className="text-3xl font-bold text-gray-900">{totalScore}/{totalMax}</p>
          <p className="text-sm text-gray-600 mt-1">{getLevel(totalScore, totalMax).label}</p>
        </div>
        <div className="space-y-4 mb-6">
          {results.map(r => {
            const pct = (r.score / r.max) * 100;
            return (
              <div key={r.name} className={`rounded-xl border p-4 ${r.level.color === "purple" ? "bg-purple-50 border-purple-200" : r.level.color === "blue" ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{r.icon} {r.name}</h3>
                  <span className={`text-sm font-medium ${r.level.color === "purple" ? "text-purple-600" : r.level.color === "blue" ? "text-blue-600" : "text-gray-500"}`}>{r.score}/{r.max}</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 mb-2"><div className={`h-2 rounded-full ${pct >= 67 ? "bg-purple-500" : pct >= 34 ? "bg-blue-400" : "bg-gray-300"}`} style={{ width: `${pct}%` }} /></div>
                <p className={`text-xs font-medium mb-2 ${r.level.color === "purple" ? "text-purple-600" : r.level.color === "blue" ? "text-blue-600" : "text-gray-500"}`}>{r.level.label}</p>
                {pct >= 34 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs font-medium text-gray-700">Coping strategies:</p>
                    {r.tips.map((tip, i) => <p key={i} className="text-xs text-gray-600">• {tip}</p>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/tools/autism-screening/" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm">Autism Screening</Link>
          <Link href="/tools/masking-quiz/" className="inline-flex items-center gap-2 bg-white text-purple-600 border border-purple-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-purple-50 transition-all">Masking Quiz</Link>
          <Link href="/tools/workplace-adjustments/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Workplace Adjustments</Link>
        </div>
        <button onClick={() => { setShow(false); setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Start again</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Disclaimer:</span> This is a self-reflection tool, not a clinical assessment. Sensory differences are common in both autism and ADHD. If sensory issues significantly affect your daily life, consider discussing them with a healthcare professional.</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">{Object.keys(answers).length} of {allQ.length} answered</p></div>
        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / allQ.length) * 100}%` }} /></div>
      </div>
      {senses.map((s, si) => (
        <div key={s.name} className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">{s.icon} {s.name}</h3>
          <div className="space-y-3">
            {s.questions.map((q, qi) => {
              const key = `${si}-${qi}`;
              return (
                <div key={key} className={`bg-white rounded-xl border p-4 transition-all ${answers[key] !== undefined ? "border-purple-200 bg-purple-50/30" : "border-gray-200"}`}>
                  <p className="font-medium text-gray-900 text-sm mb-3">{q}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {options.map(o => (
                      <button key={o.value} onClick={() => setAnswers(p => ({ ...p, [key]: o.value }))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[key] === o.value ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{o.label}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button onClick={() => { if (allAnswered) { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!allAnswered} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${allAnswered ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>See My Sensory Profile</button>
      </div>
    </div>
  );
}
