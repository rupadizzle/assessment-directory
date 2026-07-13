"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "impulse", label: "Impulse purchases you regret", sublabel: "Monthly spending on things you didn't need", icon: "🛒", placeholder: "e.g. 50" },
  { id: "late", label: "Late fees & penalties", sublabel: "Bills paid late, parking fines, library fines per month", icon: "⏰", placeholder: "e.g. 20" },
  { id: "subscriptions", label: "Forgotten subscriptions", sublabel: "Monthly cost of subscriptions you forgot to cancel", icon: "💳", placeholder: "e.g. 15" },
  { id: "food", label: "Food waste & takeaways", sublabel: "Extra monthly cost from forgotten groceries, unplanned takeaways", icon: "🍕", placeholder: "e.g. 40" },
  { id: "lost", label: "Lost or broken items", sublabel: "Monthly cost replacing lost keys, phones, glasses, etc.", icon: "🔑", placeholder: "e.g. 10" },
  { id: "transport", label: "Transport costs", sublabel: "Missed trains, last-minute taxis, parking tickets per month", icon: "🚕", placeholder: "e.g. 25" },
  { id: "duplicate", label: "Duplicate purchases", sublabel: "Buying things you already have because you can't find them", icon: "📦", placeholder: "e.g. 10" },
  { id: "rush", label: "Rush/express fees", sublabel: "Paying extra for last-minute delivery, express services", icon: "⚡", placeholder: "e.g. 15" },
];

export default function AdhdTaxCalculator() {
  const [values, setValues] = useState<Record<string, number>>({});
  const [show, setShow] = useState(false);

  const monthly = categories.reduce((sum, c) => sum + (values[c.id] || 0), 0);
  const yearly = monthly * 12;
  const fiveYear = yearly * 5;

  if (show) {
    const sorted = categories.filter(c => values[c.id] > 0).sort((a, b) => (values[b.id] || 0) - (values[a.id] || 0));
    return (
      <div>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Monthly</p>
            <p className="text-2xl font-bold text-gray-900">£{monthly.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Yearly</p>
            <p className="text-2xl font-bold text-blue-600">£{yearly.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Over 5 years</p>
            <p className="text-2xl font-bold text-gray-900">£{fiveYear.toLocaleString()}</p>
          </div>
        </div>

        {sorted.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Breakdown (biggest costs first)</h3>
            <div className="space-y-2">
              {sorted.map(c => {
                const pct = monthly > 0 ? Math.round(((values[c.id] || 0) / monthly) * 100) : 0;
                return (
                  <div key={c.id} className="flex items-center gap-3">
                    <span className="text-lg">{c.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm"><span className="text-gray-700">{c.label}</span><span className="font-medium text-gray-900">£{values[c.id]}/mo</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} /></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 text-sm mb-2">Tips to reduce your ADHD tax</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Set up automatic payments for all bills to avoid late fees</p>
            <p>• Use a subscription tracker app and review monthly</p>
            <p>• Implement a 24-hour rule for non-essential purchases over £20</p>
            <p>• Designate specific spots for keys, wallet, and phone</p>
            <p>• Meal plan on Sundays to reduce food waste and takeaway spending</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <Link href="/tools/adhd-screening/" className="text-sm text-blue-600 hover:text-blue-800 underline">Take the ADHD Screening</Link>
          <Link href="/tools/pip-checker/" className="text-sm text-blue-600 hover:text-blue-800 underline">Check PIP Eligibility</Link>
        </div>
        <button onClick={() => { setShow(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-sm text-gray-500 hover:text-gray-700 underline">Recalculate</button>
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Note:</span> This calculator is for awareness purposes only. The actual financial impact of ADHD varies widely between individuals. These figures can be useful when applying for PIP or discussing workplace adjustments.</p></div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800">Enter your estimated <strong>monthly</strong> spending in each category. Leave categories at £0 if they don&apos;t apply to you.</p>
      </div>
      <div className="space-y-3 mb-8">
        {categories.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <span className="text-2xl">{c.icon}</span>
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{c.label}</p>
              <p className="text-xs text-gray-500">{c.sublabel}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-sm">£</span>
              <input type="number" min={0} value={values[c.id] || ""} onChange={e => setValues(p => ({ ...p, [c.id]: Math.max(0, parseInt(e.target.value) || 0) }))} placeholder={c.placeholder} className="w-20 px-2 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm text-right" />
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-3">Running total: <span className="font-semibold text-gray-900">£{monthly}/month</span> (£{yearly}/year)</p>
        <button onClick={() => { setShow(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="px-8 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm transition-all">See My ADHD Tax</button>
      </div>
    </div>
  );
}
