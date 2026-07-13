"use client";
import { useState } from "react";
import Link from "next/link";

const features = [
  { id: "rtc", label: "Right to Choose (NHS-funded)" },
  { id: "online", label: "Online assessments available" },
  { id: "inperson", label: "In-person assessments available" },
  { id: "child", label: "Assesses children" },
  { id: "adult", label: "Assesses adults" },
  { id: "meds", label: "Prescribes medication" },
  { id: "shared", label: "Supports shared care" },
  { id: "followup", label: "Includes follow-up appointments" },
  { id: "report", label: "Comprehensive written report" },
  { id: "fast", label: "Fast turnaround (under 4 weeks)" },
];

type Clinic = { name: string; features: Record<string, boolean | null>; priceRange: string; notes: string };

const sampleClinics: Clinic[] = [
  { name: "Psychiatry-UK", features: { rtc: true, online: true, inperson: false, child: false, adult: true, meds: true, shared: true, followup: true, report: true, fast: false }, priceRange: "NHS (RTC) or £995", notes: "Largest RTC provider. Long waiting lists for RTC referrals." },
  { name: "Clinical Partners", features: { rtc: false, online: true, inperson: true, child: true, adult: true, meds: true, shared: true, followup: true, report: true, fast: true }, priceRange: "£1,500-£2,500", notes: "Wide network of clinicians across the UK." },
  { name: "ADHD 360", features: { rtc: true, online: true, inperson: false, child: false, adult: true, meds: true, shared: true, followup: true, report: true, fast: false }, priceRange: "NHS (RTC) or £895", notes: "RTC provider with online-only model." },
];

export default function ClinicComparison() {
  const [clinics, setClinics] = useState<Clinic[]>(sampleClinics);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newFeatures, setNewFeatures] = useState<Record<string, boolean | null>>({});
  const [newPrice, setNewPrice] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const addClinic = () => {
    if (!newName.trim()) return;
    setClinics(p => [...p, { name: newName.trim(), features: newFeatures, priceRange: newPrice || "Not specified", notes: newNotes }]);
    setNewName(""); setNewFeatures({}); setNewPrice(""); setNewNotes(""); setShowAdd(false);
  };

  const removeClinic = (i: number) => setClinics(p => p.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">This tool includes sample data for popular providers. Add your own clinics to compare or remove ones that aren&apos;t relevant to you. For full clinic details, visit our <Link href="/clinics/" className="underline font-medium">clinic directory</Link>.</p>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-500 text-xs uppercase tracking-wide w-40">Feature</th>
              {clinics.map((c, i) => (
                <th key={i} className="text-center py-3 px-2 min-w-[140px]">
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-semibold text-gray-900 text-xs">{c.name}</span>
                    <button onClick={() => removeClinic(i)} className="text-gray-400 hover:text-red-500 text-xs ml-1">✕</button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="py-2 px-2 font-medium text-gray-700 text-xs">Price range</td>
              {clinics.map((c, i) => (
                <td key={i} className="py-2 px-2 text-center text-xs font-medium text-gray-900">{c.priceRange}</td>
              ))}
            </tr>
            {features.map(f => (
              <tr key={f.id} className="border-b border-gray-100">
                <td className="py-2 px-2 text-gray-700 text-xs">{f.label}</td>
                {clinics.map((c, i) => (
                  <td key={i} className="py-2 px-2 text-center">
                    {c.features[f.id] === true && <span className="text-green-600 font-bold">✓</span>}
                    {c.features[f.id] === false && <span className="text-red-400">✗</span>}
                    {c.features[f.id] === null || c.features[f.id] === undefined ? <span className="text-gray-300">—</span> : null}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td className="py-2 px-2 font-medium text-gray-700 text-xs">Notes</td>
              {clinics.map((c, i) => (
                <td key={i} className="py-2 px-2 text-center text-xs text-gray-500">{c.notes}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {showAdd ? (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 space-y-4">
          <h3 className="font-semibold text-gray-900 text-sm">Add a clinic to compare</h3>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Clinic name" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
          <input type="text" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="Price range (e.g. £800-£1,200)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
          <div className="space-y-2">
            {features.map(f => (
              <div key={f.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{f.label}</span>
                <div className="flex gap-1">
                  <button onClick={() => setNewFeatures(p => ({ ...p, [f.id]: true }))} className={`px-2 py-1 rounded text-xs ${newFeatures[f.id] === true ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>Yes</button>
                  <button onClick={() => setNewFeatures(p => ({ ...p, [f.id]: false }))} className={`px-2 py-1 rounded text-xs ${newFeatures[f.id] === false ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"}`}>No</button>
                </div>
              </div>
            ))}
          </div>
          <input type="text" value={newNotes} onChange={e => setNewNotes(e.target.value)} placeholder="Notes (optional)" className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
          <div className="flex gap-2">
            <button onClick={addClinic} className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Add Clinic</button>
            <button onClick={() => setShowAdd(false)} className="text-sm text-gray-500 hover:text-gray-700 underline">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAdd(true)} className="mb-6 px-4 py-2 rounded-xl bg-white text-blue-600 border border-blue-200 text-sm font-medium hover:bg-blue-50 transition-all">+ Add a clinic to compare</button>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/clinics/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Browse Full Directory</Link>
        <Link href="/tools/cost-calculator/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Cost Calculator</Link>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Note:</span> Clinic details can change. Always verify prices, services, and availability directly with the provider. This tool is for comparison purposes only.</p></div>
    </div>
  );
}
