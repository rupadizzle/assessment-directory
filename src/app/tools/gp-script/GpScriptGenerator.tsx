"use client";

import { useState, useRef } from "react";

const symptomOptions = {
  adhd: [
    "Difficulty concentrating on tasks",
    "Frequently losing or misplacing things",
    "Trouble with organisation and time management",
    "Difficulty sitting still or feeling restless",
    "Impulsive decisions or interrupting others",
    "Starting tasks but struggling to finish them",
    "Forgetting appointments or obligations",
    "Difficulty following instructions or conversations",
    "Feeling overwhelmed by everyday tasks",
    "Procrastination despite consequences",
  ],
  autism: [
    "Difficulty reading social cues or body language",
    "Finding small talk exhausting or confusing",
    "Strong need for routine and predictability",
    "Sensory sensitivities (noise, light, textures, smells)",
    "Intense focus on specific interests",
    "Taking things literally or missing sarcasm",
    "Feeling drained after social interaction",
    "Difficulty making or maintaining friendships",
    "Stimming behaviours (rocking, fidgeting, hand movements)",
    "Meltdowns or shutdowns when overwhelmed",
  ],
};

export default function GpScriptGenerator() {
  const [condition, setCondition] = useState<"adhd" | "autism">("adhd");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [impact, setImpact] = useState("");
  const [duration, setDuration] = useState("");
  const [showScript, setShowScript] = useState(false);
  const scriptRef = useRef<HTMLDivElement>(null);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleGenerate = () => {
    if (selectedSymptoms.length > 0) {
      setShowScript(true);
      setTimeout(() => scriptRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const handleCopy = async () => {
    if (scriptRef.current) {
      try {
        await navigator.clipboard.writeText(scriptRef.current.innerText);
        alert("Script copied to clipboard");
      } catch {
        const range = document.createRange();
        range.selectNodeContents(scriptRef.current);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
    }
  };

  const conditionLabel = condition === "adhd" ? "ADHD" : "autism";

  if (showScript) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleCopy} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            Copy Script
          </button>
          <button onClick={() => { setShowScript(false); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Edit answers</button>
        </div>

        <div ref={scriptRef} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-4 text-sm text-gray-800 leading-relaxed">
          <p className="font-semibold text-gray-900 text-base">Your GP Appointment Script — {conditionLabel.toUpperCase()}</p>

          <p>&ldquo;Hello Doctor, thank you for seeing me today. I&rsquo;d like to discuss some concerns I have about {conditionLabel === "ADHD" ? "attention and focus" : "social communication and sensory processing"} that have been affecting my daily life. I believe I may have {conditionLabel} and I&rsquo;d like to explore the possibility of a formal assessment.&rdquo;</p>

          <p className="font-medium text-gray-900">Key symptoms I experience:</p>
          <ul className="list-disc pl-5 space-y-1">
            {selectedSymptoms.map((s) => (<li key={s}>{s.toLowerCase()}</li>))}
          </ul>

          {impact && (
            <>
              <p className="font-medium text-gray-900">How this affects my life:</p>
              <p>&ldquo;{impact}&rdquo;</p>
            </>
          )}

          {duration && (
            <p>&ldquo;I&rsquo;ve been experiencing these difficulties for {duration}. {condition === "adhd" ? "I understand ADHD symptoms need to have been present since childhood, and looking back, I can see these patterns have been there for a long time." : "These difficulties have been present throughout my life, though I may have learned to mask or compensate for them."}&rdquo;</p>
          )}

          <p>&ldquo;I&rsquo;d like to request a referral for a formal {conditionLabel} assessment. {condition === "adhd" ? "I understand that under the NHS Right to Choose, I can be referred to an approved private provider if the NHS waiting list is long. Could you help me with this?" : "I understand the NHS waiting list can be very long. Could you tell me what the expected wait time is in our area, and discuss what options are available to me?"}&rdquo;</p>

          <p>&ldquo;I&rsquo;ve also completed a screening questionnaire which suggested my symptoms are consistent with {conditionLabel}. I can share those results with you if helpful.&rdquo;</p>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed"><span className="font-medium">Tip:</span> You don&rsquo;t need to read this word-for-word. Use it as a guide to make sure you cover the key points. GPs see many patients and appreciate clear, specific descriptions of your symptoms and how they affect you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-3">What do you want to discuss with your GP?</label>
        <div className="flex gap-2">
          <button onClick={() => { setCondition("adhd"); setSelectedSymptoms([]); }} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${condition === "adhd" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>ADHD</button>
          <button onClick={() => { setCondition("autism"); setSelectedSymptoms([]); }} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${condition === "autism" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>Autism</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-3">Which symptoms do you experience? <span className="text-gray-400 font-normal">(select all that apply)</span></label>
        <div className="grid sm:grid-cols-2 gap-2">
          {symptomOptions[condition].map((s) => (
            <button key={s} onClick={() => toggleSymptom(s)} className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all ${selectedSymptoms.includes(s) ? (condition === "adhd" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-purple-50 text-purple-700 border border-purple-200") : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">How do these symptoms affect your daily life? <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea value={impact} onChange={(e) => setImpact(e.target.value)} placeholder="e.g. I struggle at work, my relationships are affected, I can't keep on top of household tasks..." rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">How long have you experienced these symptoms? <span className="text-gray-400 font-normal">(optional)</span></label>
        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. as long as I can remember, since childhood, for the last 5 years" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
      </div>

      <div className="flex justify-center">
        <button onClick={handleGenerate} disabled={selectedSymptoms.length === 0} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${selectedSymptoms.length > 0 ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
          Generate My Script
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">Your answers stay in your browser — nothing is stored or sent anywhere.</p>
    </div>
  );
}
