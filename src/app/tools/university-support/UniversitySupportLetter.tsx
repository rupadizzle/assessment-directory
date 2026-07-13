"use client";
import { useState, useRef } from "react";

const supportOptions = [
  "Extended deadlines for coursework (usually 5-10 extra working days)",
  "Extra time in exams (usually 25%)",
  "Use of a laptop in exams",
  "Note-taking support or recorded lectures",
  "Separate or quiet exam room",
  "Library study room access",
  "Mentor or study skills support",
  "Lecture slides provided in advance",
  "Flexibility with attendance monitoring",
  "Alternative assessment formats where possible",
  "Rest breaks during exams",
  "Assistive technology (text-to-speech, mind-mapping software)",
];

export default function UniversitySupportLetter() {
  const [form, setForm] = useState({ name: "", uni: "", course: "", advisor: "", condition: "adhd" as "adhd"|"autism" });
  const [selected, setSelected] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const toggle = (s: string) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const ready = form.name && form.uni && selected.length > 0;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const cond = form.condition === "adhd" ? "ADHD" : "autism";
  const copy = async () => { if(ref.current){try{await navigator.clipboard.writeText(ref.current.innerText);alert("Copied")}catch{const r=document.createRange();r.selectNodeContents(ref.current);window.getSelection()?.removeAllRanges();window.getSelection()?.addRange(r)}} };

  if (show) return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <button onClick={copy} className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm">Copy</button>
        <button onClick={() => window.print()} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">Print</button>
        <button onClick={() => setShow(false)} className="text-sm text-gray-500 hover:text-gray-700 underline">Edit</button>
      </div>
      <div ref={ref} className="bg-white rounded-xl border border-gray-200 p-8 space-y-5 text-sm text-gray-800 leading-relaxed print:border-0 print:p-0">
        <p>{today}</p>
        <p>Dear {form.advisor || "Disability Support Team"},</p>
        <p><strong>Re: Request for Disability Support — {cond} Diagnosis</strong></p>
        <p>Student: {form.name}{form.course && <>, Course: {form.course}</>}</p>
        <p>I am writing to register with the disability support service at {form.uni} following my diagnosis of {cond}. I would like to request reasonable adjustments to support me in my studies, as is my right under the Equality Act 2010.</p>
        <p>{cond} is a lifelong neurodevelopmental condition that affects my {form.condition === "adhd" ? "ability to concentrate, organise my work, manage time, and regulate my attention" : "ability to process social information, manage sensory input, adapt to changes in routine, and communicate in ways expected in academic settings"}. These difficulties have a substantial impact on my ability to study effectively.</p>
        <p>I would like to request the following adjustments:</p>
        <ul className="list-disc pl-5 space-y-1">{selected.map((s,i) => <li key={i}>{s}</li>)}</ul>
        <p>I am also aware of Disabled Students&apos; Allowance (DSA) and intend to apply for this funding to support any additional needs. I would appreciate guidance from your team on the DSA application process.</p>
        <p>I can provide my diagnostic report and any other documentation required. I would welcome the opportunity to meet with a disability advisor to discuss my support plan in detail.</p>
        <p>Thank you for your support.</p>
        <p>Yours sincerely,</p>
        <p>{form.name}</p>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Tip:</span> Apply for Disabled Students&apos; Allowance (DSA) through Student Finance England as soon as possible — it can fund specialist mentoring, assistive technology, and other support. Your university disability team can help with the application.</p></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label><input type="text" value={form.name} onChange={e => set("name", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">University <span className="text-red-500">*</span></label><input type="text" value={form.uni} onChange={e => set("uni", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm" placeholder="e.g. University of Manchester" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Course</label><input type="text" value={form.course} onChange={e => set("course", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Disability Advisor Name</label><input type="text" value={form.advisor} onChange={e => set("advisor", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-sm" placeholder="Leave blank if unknown" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <div className="flex gap-2">
            <button onClick={() => set("condition","adhd")} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${form.condition==="adhd"?"bg-blue-600 text-white":"bg-gray-50 text-gray-600 border border-gray-200"}`}>ADHD</button>
            <button onClick={() => set("condition","autism")} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${form.condition==="autism"?"bg-purple-600 text-white":"bg-gray-50 text-gray-600 border border-gray-200"}`}>Autism</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select adjustments to request <span className="text-red-500">*</span></label>
        <div className="space-y-2">{supportOptions.map(s => (
          <button key={s} onClick={() => toggle(s)} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${selected.includes(s) ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>{s}</button>
        ))}</div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => { if(ready){setShow(true);window.scrollTo({top:0,behavior:"smooth"})} }} disabled={!ready} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${ready?"bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-sm":"bg-gray-100 text-gray-400 cursor-not-allowed"}`}>Generate Letter</button>
      </div>
      <p className="text-xs text-gray-400 text-center">Your details stay in your browser.</p>
    </div>
  );
}
