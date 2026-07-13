"use client";
import { useState } from "react";
import Link from "next/link";

const domains = [
  { name: "Working Memory", desc: "Holding information in mind while using it", questions: [
    "I forget what I was about to say mid-sentence",
    "I walk into a room and forget why I went there",
    "I struggle to follow multi-step instructions",
  ]},
  { name: "Task Initiation", desc: "Getting started on tasks", questions: [
    "I put off starting tasks even when they're important",
    "I know what I need to do but can't make myself begin",
    "I need external pressure (deadlines, others watching) to start",
  ]},
  { name: "Planning & Organisation", desc: "Creating and following plans", questions: [
    "I struggle to break big tasks into smaller steps",
    "My living/working space is often disorganised",
    "I frequently lose track of important documents or items",
  ]},
  { name: "Time Management", desc: "Perceiving and managing time", questions: [
    "I'm frequently late despite trying not to be",
    "I badly underestimate how long tasks will take",
    "I lose track of time when focused on something interesting",
  ]},
  { name: "Emotional Regulation", desc: "Managing emotional responses", questions: [
    "I have intense emotional reactions that feel disproportionate",
    "I struggle to calm down once I'm frustrated or upset",
    "Small setbacks can feel overwhelming in the moment",
  ]},
  { name: "Flexibility", desc: "Adapting to change", questions: [
    "I find it difficult to switch between tasks",
    "Unexpected changes to plans cause significant distress",
    "I get stuck on one way of doing things even when it isn't working",
  ]},
];

const options = [
  { label: "Rarely", value: 0 },
  { label: "Sometimes", value: 1 },
  { label: "Often", value: 2 },
  { label: "Very often", value: 3 },
];

export default function ExecutiveFunction() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [show, setShow] = useState(false);
  const allQ = domains.flatMap((d, di) => d.questions.map((q, qi) => ({ key: `${di}-${qi}`, q, domain: d.name })));
  const allAnswered = allQ.every(q => answers[q.key] !== undefined);

  const getDomainScore = (di: number) => {
    const qs = domains[di].questions;
    return qs.reduce((s, _, qi) => s + (answers[`${di}-${qi}`] || 0), 0);
  };
  const getDomainMax = (di: number) => domains[di].questions.length * 3;
  const getLevel = (score: number, max: number) => {
    const p = (score / max) * 100;
    if (p >= 67) return { label: "Significant difficulty", color: "text-red-600", bg: "bg-red-50 border-red-200" };
    if (p >= 34) return { label: "Some difficulty", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
    return { label: "Minimal difficulty", color: "text-green-600", bg: "bg-green-50 border-green-200" };
  };

  if (show) {
    const results = domains.map((d, i) => ({ ...d, score: getDomainScore(i), max: getDomainMax(i), level: getLevel(getDomainScore(i), getDomainMax(i)) }));
    const totalScore = results.reduce((s, r) => s + r.score, 0);
    const totalMax = results.reduce((s, r) => s + r.max, 0);
    return (
      <div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-center">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Overall Score</p>
          <p className="text-3xl font-bold text-gray-900">{totalScore}/{totalMax}</p>
          <p className="text-sm text-gray-600 mt-1">{getLevel(totalScore, totalMax).label}</p>
        </div>
        <div className="space-y-3 mb-6">
          {results.map(r => (
            <div key={r.name} className={`rounded-xl border p-4 ${r.level.bg}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{r.name}</h3>
                <span className={`text-sm font-medium ${r.level.color}`}>{r.score}/{r.max}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{r.desc}</p>
              <div className="w-full bg-white/50 rounded-full h-2"><div className={`h-2 rounded-full ${r.score / r.max >= 0.67 ? "bg-red-400" : r.score / r.max >= 0.34 ? "bg-yellow-400" : "bg-green-400"}`} style={{ width: `${(r.score / r.max) * 100}%` }} /></div>
              <p className={`text-xs font-medium mt-1 ${r.level.color}`}>{r.level.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">What are executive functions?</h3>
          <p className="text-sm text-gray-600">Executive functions are cognitive processes that help us plan, focus, remember instructions, and juggle multiple tasks. They&apos;re like the brain&apos;s project manager. Both ADHD and autism commonly affect executive functioning, though in different ways.</p>
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/tools/adhd-screening/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">ADHD Screening</Link>
          <Link href="/tools/post-diagnosis-plan/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Post-Diagnosis Plan</Link>
        </div>
        <button onClick={() => { setShow(false); setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Start again</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Disclaimer:</span> This is a self-reflection tool, not a clinical assessment. It cannot diagnose ADHD, autism, or any other condition. If you&apos;re experiencing significant executive function difficulties, consider seeking a professional assessment.</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{Object.keys(answers).length} of {allQ.length} answered</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / allQ.length) * 100}%` }} /></div>
      </div>
      {domains.map((d, di) => (
        <div key={d.name} className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-1">{d.name}</h3>
          <p className="text-xs text-gray-500 mb-3">{d.desc}</p>
          <div className="space-y-3">
            {d.questions.map((q, qi) => {
              const key = `${di}-${qi}`;
              return (
                <div key={key} className={`bg-white rounded-xl border p-4 transition-all ${answers[key] !== undefined ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}>
                  <p className="font-medium text-gray-900 text-sm mb-3">{q}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {options.map(o => (
                      <button key={o.value} onClick={() => setAnswers(p => ({ ...p, [key]: o.value }))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[key] === o.value ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{o.label}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button onClick={() => { if (allAnswered) { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!allAnswered} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${allAnswered ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>See My Results</button>
      </div>
    </div>
  );
}
