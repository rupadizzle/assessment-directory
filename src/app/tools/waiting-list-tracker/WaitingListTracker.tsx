"use client";
import { useState } from "react";
import Link from "next/link";

export default function WaitingListTracker() {
  const [referralDate, setReferralDate] = useState("");
  const [condition, setCondition] = useState<"adhd" | "autism">("adhd");
  const [notes, setNotes] = useState<{ date: string; text: string }[]>([]);
  const [noteDate, setNoteDate] = useState("");
  const [noteText, setNoteText] = useState("");

  const ref = referralDate ? new Date(referralDate) : null;
  const now = new Date();
  const diffMs = ref ? now.getTime() - ref.getTime() : 0;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);

  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes(p => [...p, { date: noteDate || new Date().toISOString().split("T")[0], text: noteText.trim() }].sort((a, b) => a.date.localeCompare(b.date)));
    setNoteText("");
    setNoteDate("");
  };

  const nhsTarget = 18; // weeks
  const overTarget = diffWeeks > nhsTarget;
  const pctOfTarget = Math.min((diffWeeks / nhsTarget) * 100, 100);

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Condition referred for</label>
          <div className="flex gap-2">
            <button onClick={() => setCondition("adhd")} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${condition === "adhd" ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>ADHD</button>
            <button onClick={() => setCondition("autism")} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${condition === "autism" ? "bg-purple-600 text-white" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>Autism</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of GP referral</label>
          <input type="date" value={referralDate} onChange={e => setReferralDate(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" />
        </div>
      </div>

      {ref && (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Days waiting</p>
              <p className="text-2xl font-bold text-gray-900">{diffDays}</p>
            </div>
            <div className={`rounded-xl border p-4 text-center ${overTarget ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}`}>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Weeks waiting</p>
              <p className={`text-2xl font-bold ${overTarget ? "text-red-600" : "text-gray-900"}`}>{diffWeeks}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Months waiting</p>
              <p className="text-2xl font-bold text-gray-900">{diffMonths}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">NHS 18-week target</p>
              <p className={`text-sm font-medium ${overTarget ? "text-red-600" : "text-blue-600"}`}>{diffWeeks}/{nhsTarget} weeks</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3"><div className={`h-3 rounded-full transition-all duration-300 ${overTarget ? "bg-red-500" : "bg-blue-500"}`} style={{ width: `${pctOfTarget}%` }} /></div>
            {overTarget && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800 font-medium">You have exceeded the NHS 18-week target by {diffWeeks - nhsTarget} weeks.</p>
                <p className="text-xs text-red-700 mt-1">You have the right to ask your GP about faster options including the Right to Choose. Many patients who have waited over 18 weeks successfully use RTC to access private providers at NHS expense.</p>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">Your rights while waiting</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>Right to Choose:</strong> You can request assessment by an approved private provider at NHS expense (ADHD only in most areas)</p>
              <p>• <strong>18-week target:</strong> The NHS Constitution says you should wait no longer than 18 weeks from referral to treatment</p>
              <p>• <strong>PALS:</strong> If you&apos;re unhappy with your wait, contact your local Patient Advice and Liaison Service</p>
              <p>• <strong>Private route:</strong> You can pay privately for faster assessment while keeping your NHS referral</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Timeline notes</h3>
            <p className="text-xs text-gray-500 mb-3">Log key dates (e.g. chased GP, received letter, contacted PALS)</p>
            <div className="flex gap-2 mb-3">
              <input type="date" value={noteDate} onChange={e => setNoteDate(e.target.value)} className="px-2 py-2 rounded-lg border border-gray-300 text-xs" />
              <input type="text" value={noteText} onChange={e => setNoteText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addNote(); }} placeholder="What happened?" className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm" />
              <button onClick={addNote} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700">Add</button>
            </div>
            {notes.length > 0 && (
              <div className="space-y-2">
                {notes.map((n, i) => (
                  <div key={i} className="flex gap-3 text-sm items-start">
                    <span className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{new Date(n.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <p className="text-gray-700">{n.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link href="/tools/right-to-choose-letter/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Generate RTC Letter</Link>
            <Link href="/tools/nhs-wait-times/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">Check Area Wait Times</Link>
            <Link href="/tools/gp-script/" className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all">GP Script Generator</Link>
          </div>
        </>
      )}

      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Privacy:</span> All data stays in your browser. Nothing is saved or sent anywhere. Your waiting times and notes will be lost if you clear your browser data.</p></div>
    </div>
  );
}
