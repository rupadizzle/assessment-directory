"use client";

import { useState } from "react";

const sections = [
  {
    title: "Documents to Gather",
    items: [
      { id: "id", text: "Photo ID (passport, driving licence)" },
      { id: "gp-letter", text: "GP referral letter (if applicable)" },
      { id: "school-reports", text: "School reports from childhood (any you can find)" },
      { id: "prev-assessments", text: "Previous psychological or psychiatric assessments" },
      { id: "medication-list", text: "List of current medications" },
      { id: "screening-results", text: "Screening quiz results (ASRS, AQ-10, etc.)" },
    ],
  },
  {
    title: "Information to Prepare",
    items: [
      { id: "symptom-list", text: "Written list of your main symptoms and difficulties" },
      { id: "examples", text: "Specific real-life examples of how symptoms affect you" },
      { id: "childhood", text: "Notes about childhood behaviour and experiences" },
      { id: "timeline", text: "Timeline of when you first noticed difficulties" },
      { id: "family-history", text: "Family history of ADHD, autism, or related conditions" },
      { id: "coping", text: "Coping strategies you currently use" },
    ],
  },
  {
    title: "Practical Preparation",
    items: [
      { id: "informant", text: "Ask a parent/family member to provide childhood observations (many assessments require this)" },
      { id: "time-off", text: "Book time off work/commitments for the assessment day" },
      { id: "travel", text: "Plan your journey to the clinic (or test your video call setup for remote)" },
      { id: "questions", text: "Write down questions you want to ask the assessor" },
      { id: "comfort", text: "Plan comfort items (water, snacks, fidget tools, sunglasses for sensory sensitivities)" },
      { id: "support-person", text: "Consider bringing a trusted person for support (check with clinic first)" },
    ],
  },
  {
    title: "What to Expect",
    items: [
      { id: "duration", text: "Understand the assessment will take 1-3 hours (varies by condition and clinic)" },
      { id: "questions-types", text: "Be prepared for detailed questions about childhood, school, work, and relationships" },
      { id: "honesty", text: "Remember: be honest, not what you think they want to hear" },
      { id: "no-right-answer", text: "Know there are no 'right' answers — describe your genuine experience" },
      { id: "masking", text: "Try not to mask or compensate during the assessment" },
      { id: "result-timeline", text: "Ask when you'll receive the results and in what format" },
    ],
  },
];

export default function AssessmentPrepChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const totalItems = sections.reduce((s, sec) => s + sec.items.length, 0);
  const completedCount = checked.size;
  const pct = Math.round((completedCount / totalItems) * 100);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{completedCount} of {totalItems} completed</p>
          <p className="text-sm font-medium text-gray-700">{pct}%</p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className={`h-3 rounded-full transition-all duration-300 ${pct === 100 ? "bg-blue-600" : "bg-blue-400"}`} style={{ width: `${pct}%` }} />
        </div>
        {pct === 100 && (
          <p className="text-sm text-blue-600 font-medium mt-2">You&apos;re fully prepared — good luck with your assessment!</p>
        )}
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const sectionDone = section.items.every((item) => checked.has(item.id));
          return (
            <div key={section.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className={`px-5 py-3 border-b flex items-center justify-between ${sectionDone ? "bg-blue-50 border-blue-100" : "bg-gray-50 border-gray-100"}`}>
                <h3 className="font-semibold text-gray-900 text-sm">{section.title}</h3>
                {sectionDone && <span className="text-xs text-blue-600 font-medium">Complete</span>}
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                  <button key={item.id} onClick={() => toggle(item.id)} className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition-colors">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${checked.has(item.id) ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                      {checked.has(item.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      )}
                    </div>
                    <span className={`text-sm ${checked.has(item.id) ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed"><span className="font-medium">Note:</span> Requirements vary between clinics and assessment types. Check with your specific provider for their preparation guidelines. Your checklist progress stays in your browser.</p>
      </div>
    </div>
  );
}
