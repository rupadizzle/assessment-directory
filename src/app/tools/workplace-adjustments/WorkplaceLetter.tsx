"use client";

import { useState, useRef } from "react";

const adjustmentOptions = {
  adhd: [
    "Flexible working hours to manage energy levels",
    "Permission to use noise-cancelling headphones",
    "Written instructions for tasks (not just verbal)",
    "Regular short breaks to maintain focus",
    "A quiet workspace or option to work from home",
    "Extended deadlines when tasks are complex",
    "Use of task management apps during meetings",
    "Breaking large projects into smaller milestones",
    "Regular 1:1 check-ins with manager",
    "Permission to fidget (standing desk, fidget tools)",
  ],
  autism: [
    "Advance notice of changes to routine or schedule",
    "Written agendas before meetings",
    "A designated quiet space for breaks",
    "Clear, explicit communication (avoiding ambiguity)",
    "Reduced sensory stimulation in workspace",
    "Permission to wear ear defenders or sunglasses",
    "Flexible social obligations (optional team events)",
    "Consistent working patterns and predictable scheduling",
    "Extra processing time for instructions",
    "Communication preference accommodated (email over phone)",
  ],
};

export default function WorkplaceLetter() {
  const [form, setForm] = useState({ name: "", condition: "adhd" as "adhd" | "autism", manager: "", company: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState("");
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const toggle = (s: string) => setSelected((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const ready = form.name && form.manager && selected.length > 0;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const condLabel = form.condition === "adhd" ? "ADHD" : "autism";
  const allAdjustments = [...selected, ...(custom.trim() ? [custom.trim()] : [])];

  const copy = async () => { if (ref.current) { try { await navigator.clipboard.writeText(ref.current.innerText); alert("Copied"); } catch { const r = document.createRange(); r.selectNodeContents(ref.current); window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(r); } } };

  if (show) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={copy} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Copy</button>
          <button onClick={() => window.print()} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">Print</button>
          <button onClick={() => setShow(false)} className="text-sm text-gray-500 hover:text-gray-700 underline">Edit</button>
        </div>
        <div ref={ref} className="bg-white rounded-xl border border-gray-200 p-8 space-y-5 text-sm text-gray-800 leading-relaxed print:border-0 print:p-0">
          <p>{today}</p>
          <p>Dear {form.manager},</p>
          <p><strong>Re: Request for Reasonable Adjustments — {condLabel}</strong></p>
          <p>I am writing to formally request reasonable adjustments to my working arrangements under the Equality Act 2010. I have a diagnosis of {condLabel}, which is classified as a disability under the Act as it is a condition that has a substantial and long-term adverse effect on my ability to carry out normal day-to-day activities.</p>
          <p>I would like to request the following adjustments to help me perform at my best:</p>
          <ul className="list-disc pl-5 space-y-1">{allAdjustments.map((a, i) => <li key={i}>{a}</li>)}</ul>
          <p>These adjustments would help me manage the specific challenges I face due to my {condLabel} and enable me to work more effectively. I am happy to discuss these in more detail and to find solutions that work for both me and the team.</p>
          <p>Under the Equality Act 2010, employers have a legal duty to make reasonable adjustments for employees with disabilities. I am happy to provide supporting documentation from my clinician if required.</p>
          <p>I would welcome the opportunity to discuss this at your earliest convenience. Thank you for your understanding and support.</p>
          <p>Yours sincerely,</p>
          <p>{form.name}</p>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Tip:</span> Consider requesting an Occupational Health assessment through your employer — they can provide independent recommendations that carry more weight. You can also contact Access to Work (gov.uk) for additional support.</p></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label><input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Manager / HR Contact Name <span className="text-red-500">*</span></label><input type="text" value={form.manager} onChange={(e) => set("manager", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" /></div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
          <div className="flex gap-2">
            <button onClick={() => { set("condition", "adhd"); setSelected([]); }} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${form.condition === "adhd" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>ADHD</button>
            <button onClick={() => { set("condition", "autism"); setSelected([]); }} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${form.condition === "autism" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>Autism</button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-3">Select adjustments to request <span className="text-red-500">*</span></label>
        <div className="space-y-2">
          {adjustmentOptions[form.condition].map((a) => (
            <button key={a} onClick={() => toggle(a)} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${selected.includes(a) ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"}`}>{a}</button>
          ))}
        </div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-1">Other adjustments</label><input type="text" value={custom} onChange={(e) => setCustom(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="Add any other adjustments..." /></div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => { if (ready) { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!ready} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${ready ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>Generate Letter</button>
      </div>
    </div>
  );
}
