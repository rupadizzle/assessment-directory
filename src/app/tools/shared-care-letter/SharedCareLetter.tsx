"use client";

import { useState, useRef } from "react";

export default function SharedCareLetter() {
  const [form, setForm] = useState({ name: "", dob: "", gpName: "", surgery: "", provider: "", medication: "", diagnosisDate: "" });
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const ready = form.name && form.gpName && form.surgery;
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const copy = async () => { if (ref.current) { try { await navigator.clipboard.writeText(ref.current.innerText); alert("Copied"); } catch { const r = document.createRange(); r.selectNodeContents(ref.current); window.getSelection()?.removeAllRanges(); window.getSelection()?.addRange(r); } } };

  if (show) {
    return (
      <div>
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={copy} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Copy</button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">Print</button>
          <button onClick={() => setShow(false)} className="text-sm text-gray-500 hover:text-gray-700 underline">Edit</button>
        </div>
        <div ref={ref} className="bg-white rounded-xl border border-gray-200 p-8 space-y-5 text-sm text-gray-800 leading-relaxed print:border-0 print:p-0">
          <p>{today}</p>
          <div><p>{form.gpName}</p><p>{form.surgery}</p></div>
          <p>Dear {form.gpName},</p>
          <p><strong>Re: Request for Shared Care Agreement — ADHD Medication</strong></p>
          <p>Patient: {form.name}{form.dob && <>, DOB: {form.dob}</>}</p>
          <p>I am writing to request that you consider entering into a shared care agreement for the ongoing prescribing of my ADHD medication, following my diagnosis{form.diagnosisDate ? ` on ${form.diagnosisDate}` : ""}{form.provider ? ` by ${form.provider}` : " by a private specialist"}.</p>
          {form.medication && <p>I have been prescribed <strong>{form.medication}</strong> by my specialist, and the titration process has been completed. My specialist has confirmed that my medication is stable and suitable for shared care management.</p>}
          <p>Under NICE guideline NG87, shared care arrangements are the recommended model for ongoing ADHD medication management. The specialist retains clinical responsibility for the treatment plan, while the GP manages routine prescriptions and monitoring. Your local ICB should have a shared care protocol in place for ADHD medications.</p>
          <p>My specialist{form.provider ? ` (${form.provider})` : ""} is willing to provide a shared care agreement letter outlining the treatment plan, monitoring requirements, and their ongoing responsibilities. They can be contacted directly to discuss this arrangement.</p>
          <p>I understand that entering a shared care agreement is voluntary, but I would be very grateful for your support. Without shared care, I would need to continue paying privately for prescriptions, which places a significant financial burden on me. The shared care arrangement would allow me to receive my prescriptions on an NHS prescription.</p>
          <p>I am happy to provide any additional documentation or to arrange for my specialist to contact you directly. Thank you for considering this request.</p>
          <p>Yours sincerely,</p>
          <p>{form.name}</p>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500"><span className="font-medium">Note:</span> GPs are not obliged to enter shared care agreements, but NICE guidance supports this model. If your GP declines, ask them to put their reasons in writing and consider contacting your ICB&apos;s medicines management team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-800"><span className="font-medium">What is shared care?</span> After private ADHD diagnosis and medication titration, your GP can take over routine prescriptions under a shared care agreement. This means you get your medication on an NHS prescription instead of paying privately each time.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Your Details</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
          <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="Your full name" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label><input type="text" value={form.dob} onChange={(e) => set("dob", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="e.g. 15/03/1990" /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis Date</label><input type="text" value={form.diagnosisDate} onChange={(e) => set("diagnosisDate", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="e.g. March 2026" /></div>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">GP Details</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">GP Name <span className="text-red-500">*</span></label><input type="text" value={form.gpName} onChange={(e) => set("gpName", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="e.g. Dr Sarah Johnson" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Surgery Name <span className="text-red-500">*</span></label><input type="text" value={form.surgery} onChange={(e) => set("surgery", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="e.g. Riverside Medical Centre" /></div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
        <h3 className="font-semibold text-gray-900">Assessment Details</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Private Provider Name</label><input type="text" value={form.provider} onChange={(e) => set("provider", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="e.g. Psychiatry-UK" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Current Medication</label><input type="text" value={form.medication} onChange={(e) => set("medication", e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" placeholder="e.g. Elvanse 50mg" /></div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => { if (ready) { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); } }} disabled={!ready} className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${ready ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>Generate Letter</button>
      </div>
      <p className="text-xs text-gray-400 text-center">Your details stay in your browser — nothing is stored or sent anywhere.</p>
    </div>
  );
}
