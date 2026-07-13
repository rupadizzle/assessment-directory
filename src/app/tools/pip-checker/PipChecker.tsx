"use client";
import { useState } from "react";
import Link from "next/link";

const dailyLiving = [
  { id: "food", label: "Preparing food", eg: "e.g. forgetting food is cooking, difficulty planning meals, unable to follow recipes" },
  { id: "nutrition", label: "Taking nutrition (eating and drinking)", eg: "e.g. forgetting to eat, needing prompting, sensory issues with food textures" },
  { id: "therapy", label: "Managing treatments or therapy", eg: "e.g. forgetting medication, missing appointments, difficulty managing side effects" },
  { id: "washing", label: "Washing and bathing", eg: "e.g. forgetting to wash, difficulty with routine, sensory issues with water" },
  { id: "toilet", label: "Managing toilet needs", eg: "e.g. difficulty with hygiene routines, needing prompting" },
  { id: "dressing", label: "Dressing and undressing", eg: "e.g. sensory issues with clothing, difficulty choosing appropriate clothes" },
  { id: "speaking", label: "Communicating verbally", eg: "e.g. difficulty expressing needs, word-finding problems, shutdowns" },
  { id: "reading", label: "Reading and understanding signs", eg: "e.g. difficulty concentrating on written information, processing delays" },
  { id: "social", label: "Engaging with other people face-to-face", eg: "e.g. social anxiety, difficulty reading social cues, meltdowns in social settings" },
  { id: "budgeting", label: "Making budgeting decisions", eg: "e.g. impulse spending, difficulty managing bills, inability to plan finances" },
];

const mobility = [
  { id: "journeys", label: "Planning and following journeys", eg: "e.g. getting lost, anxiety about new routes, difficulty with public transport" },
  { id: "moving", label: "Moving around", eg: "e.g. needing someone with you due to anxiety, difficulty navigating busy environments" },
];

const options = [
  { label: "No difficulty", value: 0 },
  { label: "Some difficulty", value: 1 },
  { label: "Significant difficulty", value: 2 },
  { label: "Cannot do without help", value: 3 },
];

export default function PipChecker() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [show, setShow] = useState(false);
  const allQuestions = [...dailyLiving, ...mobility];
  const allAnswered = allQuestions.every(q => answers[q.id] !== undefined);

  const dlScore = dailyLiving.reduce((s, q) => s + (answers[q.id] || 0), 0);
  const mobScore = mobility.reduce((s, q) => s + (answers[q.id] || 0), 0);

  const getDlRate = () => { if (dlScore >= 12) return "Enhanced"; if (dlScore >= 8) return "Standard"; return "Below threshold"; };
  const getMobRate = () => { if (mobScore >= 12) return "Enhanced"; if (mobScore >= 8) return "Standard"; return "Below threshold"; };

  if (show) {
    return (
      <div>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className={`rounded-xl border p-5 ${dlScore >= 8 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Daily Living</p>
            <p className="text-2xl font-bold text-gray-900">{dlScore} points</p>
            <p className={`text-sm font-medium mt-1 ${dlScore >= 12 ? "text-blue-600" : dlScore >= 8 ? "text-blue-600" : "text-gray-500"}`}>{getDlRate()} rate</p>
          </div>
          <div className={`rounded-xl border p-5 ${mobScore >= 8 ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Mobility</p>
            <p className="text-2xl font-bold text-gray-900">{mobScore} points</p>
            <p className={`text-sm font-medium mt-1 ${mobScore >= 12 ? "text-blue-600" : mobScore >= 8 ? "text-blue-600" : "text-gray-500"}`}>{getMobRate()} rate</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">What this means</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><span className="font-medium text-gray-700">Standard rate:</span> 8-11 points — you may qualify for the standard rate of PIP for that component.</p>
            <p><span className="font-medium text-gray-700">Enhanced rate:</span> 12+ points — you may qualify for the enhanced rate of PIP for that component.</p>
            <p><span className="font-medium text-gray-700">Below 8 points:</span> You may not score enough for PIP based on this component alone, but the actual assessment considers your specific circumstances in much more detail.</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">Important Next Steps</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>1. Get professional advice from <strong>Citizens Advice</strong> or a benefits advisor before applying</p>
            <p>2. Gather supporting evidence from your clinician, GP, and anyone involved in your care</p>
            <p>3. Describe your <strong>worst days</strong>, not your best — PIP assessors need to understand the full impact</p>
            <p>4. Consider asking for a <strong>paper-based assessment</strong> if face-to-face is difficult</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/tools/evidence-builder/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Build Evidence Document</Link>
          <Link href="/tools/post-diagnosis-plan/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Post-Diagnosis Plan</Link>
        </div>
        <button onClick={() => { setShow(false); setAnswers({}); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Start again</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Disclaimer:</span> This tool provides a rough indication only. The actual PIP assessment process is much more detailed and considers your specific circumstances, evidence, and how conditions affect you on your worst days. Always seek professional advice before applying.</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800"><span className="font-medium">How PIP works:</span> PIP is assessed on two components — Daily Living and Mobility. You need 8+ points on either component to qualify. Points are awarded based on the level of difficulty you have with specific activities.</p>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{Object.keys(answers).length} of {allQuestions.length} answered</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${(Object.keys(answers).length / allQuestions.length) * 100}%` }} />
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-3">Daily Living Activities</h3>
      <div className="space-y-4 mb-8">
        {dailyLiving.map((q, i) => (
          <div key={q.id} className={`bg-white rounded-xl border p-4 transition-all ${answers[q.id] !== undefined ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}>
            <p className="font-medium text-gray-900 text-sm mb-1"><span className="text-blue-600 mr-1">{i+1}.</span>{q.label}</p>
            <p className="text-xs text-gray-500 mb-3">{q.eg}</p>
            <div className="grid grid-cols-2 gap-2">
              {options.map(o => (
                <button key={o.value} onClick={() => setAnswers(p => ({...p, [q.id]: o.value}))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[q.id] === o.value ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{o.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-semibold text-gray-900 mb-3">Mobility Activities</h3>
      <div className="space-y-4 mb-8">
        {mobility.map((q, i) => (
          <div key={q.id} className={`bg-white rounded-xl border p-4 transition-all ${answers[q.id] !== undefined ? "border-blue-200 bg-blue-50/30" : "border-gray-200"}`}>
            <p className="font-medium text-gray-900 text-sm mb-1"><span className="text-blue-600 mr-1">{dailyLiving.length+i+1}.</span>{q.label}</p>
            <p className="text-xs text-gray-500 mb-3">{q.eg}</p>
            <div className="grid grid-cols-2 gap-2">
              {options.map(o => (
                <button key={o.value} onClick={() => setAnswers(p => ({...p, [q.id]: o.value}))} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${answers[q.id] === o.value ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>{o.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={() => { if(allAnswered){setShow(true);window.scrollTo({top:0,behavior:"smooth"})} }} disabled={!allAnswered} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${allAnswered ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>Check My Eligibility</button>
      </div>
    </div>
  );
}
