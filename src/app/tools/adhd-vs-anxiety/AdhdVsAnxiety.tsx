"use client";
import { useState } from "react";
import Link from "next/link";

const questions = [
  { text: "I have trouble concentrating", adhd: "My mind wanders to random, unrelated thoughts", anxiety: "My mind is stuck worrying about specific things" },
  { text: "I struggle to sit still", adhd: "I feel a restless need for movement or stimulation", anxiety: "I feel physically tense and on edge" },
  { text: "I procrastinate on tasks", adhd: "I can't make myself start, even when I want to", anxiety: "I avoid starting because I'm afraid of doing it wrong" },
  { text: "I have trouble sleeping", adhd: "My brain won't switch off — racing through random ideas", anxiety: "I'm kept awake by worries about specific situations" },
  { text: "I'm forgetful", adhd: "I forget things randomly — keys, appointments, mid-sentence", anxiety: "I forget things because I'm preoccupied with worries" },
  { text: "I feel overwhelmed", adhd: "By too many tasks, not knowing where to start", anxiety: "By worst-case scenarios and 'what if' thoughts" },
  { text: "I'm easily distracted", adhd: "By anything interesting or novel in my environment", anxiety: "By internal thoughts, worries, or bodily sensations" },
  { text: "Social situations are difficult", adhd: "I interrupt, talk too much, or miss social cues", anxiety: "I overthink everything I say and worry about judgement" },
  { text: "I struggle with time management", adhd: "Time feels different to me — I genuinely lose track", anxiety: "I spend too long over-preparing or checking things" },
  { text: "I experience emotional intensity", adhd: "Quick, intense reactions that pass relatively fast", anxiety: "Persistent dread, worry, or tension that lingers" },
];

export default function AdhdVsAnxiety() {
  const [answers, setAnswers] = useState<Record<number, "adhd" | "anxiety" | "both" | "neither">>({});
  const [show, setShow] = useState(false);
  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  const adhdCount = Object.values(answers).filter(v => v === "adhd" || v === "both").length;
  const anxietyCount = Object.values(answers).filter(v => v === "anxiety" || v === "both").length;
  const bothCount = Object.values(answers).filter(v => v === "both").length;

  const getPattern = () => {
    if (adhdCount >= 7 && anxietyCount >= 7) return { label: "Possibly Both", color: "purple", desc: "Your responses suggest a mix of ADHD and anxiety patterns. This is extremely common — around 50% of adults with ADHD also have an anxiety disorder. The two conditions can feed into each other: ADHD difficulties create anxiety, and anxiety worsens ADHD symptoms." };
    if (adhdCount >= 6) return { label: "Primarily ADHD Pattern", color: "blue", desc: "Your responses align more with ADHD patterns. Your difficulties seem to stem more from attention, executive function, and stimulation-seeking rather than worry and fear. However, ADHD and anxiety frequently co-occur, so a professional assessment is important." };
    if (anxietyCount >= 6) return { label: "Primarily Anxiety Pattern", color: "yellow", desc: "Your responses align more with anxiety patterns. Your difficulties seem driven more by worry, fear, and tension rather than attention regulation. That said, undiagnosed ADHD can present as anxiety, so it's worth exploring both with a professional." };
    return { label: "Mixed / Unclear", color: "gray", desc: "Your responses don't clearly point to one pattern over the other. This could mean your difficulties come from a different source, or that you experience elements of both. A professional assessment would be the best next step." };
  };

  if (show) {
    const p = getPattern();
    return (
      <div>
        <div className={`rounded-xl border p-6 mb-6 ${p.color === "purple" ? "bg-purple-50 border-purple-200" : p.color === "blue" ? "bg-blue-50 border-blue-200" : p.color === "yellow" ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}>
          <p className={`text-2xl font-bold mb-2 ${p.color === "purple" ? "text-purple-700" : p.color === "blue" ? "text-blue-700" : p.color === "yellow" ? "text-yellow-700" : "text-gray-700"}`}>{p.label}</p>
          <p className="text-sm text-gray-600">{p.desc}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">ADHD Pattern</p>
            <p className="text-2xl font-bold text-blue-600">{adhdCount}/10</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Anxiety Pattern</p>
            <p className="text-2xl font-bold text-yellow-600">{anxietyCount}/10</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Both</p>
            <p className="text-2xl font-bold text-purple-600">{bothCount}/10</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Key differences</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b"><th className="text-left py-2 text-gray-500 text-xs">Symptom</th><th className="text-left py-2 text-blue-600 text-xs">ADHD</th><th className="text-left py-2 text-yellow-600 text-xs">Anxiety</th></tr></thead>
              <tbody>
                <tr className="border-b border-gray-100"><td className="py-2 text-gray-700">Root cause</td><td className="py-2 text-gray-600">Under-arousal / dopamine regulation</td><td className="py-2 text-gray-600">Over-arousal / threat detection</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 text-gray-700">Onset</td><td className="py-2 text-gray-600">Lifelong (since childhood)</td><td className="py-2 text-gray-600">Can develop at any age</td></tr>
                <tr className="border-b border-gray-100"><td className="py-2 text-gray-700">Focus issue</td><td className="py-2 text-gray-600">Random mind-wandering</td><td className="py-2 text-gray-600">Fixed on worries</td></tr>
                <tr><td className="py-2 text-gray-700">Restlessness</td><td className="py-2 text-gray-600">Seeks stimulation</td><td className="py-2 text-gray-600">Physical tension</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/tools/adhd-screening/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">ADHD Screening</Link>
          <Link href="/tools/executive-function/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Executive Function Check</Link>
          <Link href="/clinics/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Find a Clinic</Link>
        </div>
        <button onClick={() => { setShow(false); setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Start again</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Disclaimer:</span> This tool is for self-reflection only and cannot diagnose any condition. ADHD and anxiety commonly co-occur and can only be properly distinguished through professional assessment. If you&apos;re struggling, please seek support from a qualified clinician.</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">For each shared symptom, choose which description fits you best. If both apply, select &quot;Both&quot;.</p>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2"><p className="text-sm text-gray-500">{Object.keys(answers).length} of {questions.length} answered</p></div>
        <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }} /></div>
      </div>
      <div className="space-y-4 mb-8">
        {questions.map((q, i) => (
          <div key={i} className={`bg-white rounded-xl border p-4 transition-all ${answers[i] !== undefined ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}>
            <p className="font-semibold text-gray-900 text-sm mb-3"><span className="text-blue-600 mr-1">{i + 1}.</span>{q.text}</p>
            <div className="grid sm:grid-cols-2 gap-2 mb-2">
              <button onClick={() => setAnswers(p => ({ ...p, [i]: "adhd" }))} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all ${answers[i] === "adhd" ? "bg-blue-600 text-white" : "bg-blue-50 text-gray-700 border border-blue-100 hover:bg-blue-100"}`}><span className="font-medium text-xs block mb-0.5">{answers[i] === "adhd" ? "✓ " : ""}ADHD pattern</span>{q.adhd}</button>
              <button onClick={() => setAnswers(p => ({ ...p, [i]: "anxiety" }))} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all ${answers[i] === "anxiety" ? "bg-yellow-500 text-white" : "bg-yellow-50 text-gray-700 border border-yellow-100 hover:bg-yellow-100"}`}><span className="font-medium text-xs block mb-0.5">{answers[i] === "anxiety" ? "✓ " : ""}Anxiety pattern</span>{q.anxiety}</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setAnswers(p => ({ ...p, [i]: "both" }))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[i] === "both" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>Both apply</button>
              <button onClick={() => setAnswers(p => ({ ...p, [i]: "neither" }))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[i] === "neither" ? "bg-gray-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>Neither</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={() => { if (allAnswered) { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!allAnswered} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${allAnswered ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>See My Pattern</button>
      </div>
    </div>
  );
}
