"use client";
import { useState } from "react";

type Task = { id: number; text: string; energy: "high" | "medium" | "low"; duration: number; done: boolean };

const energyColors = {
  high: { bg: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-700", label: "High energy" },
  medium: { bg: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-700", label: "Medium energy" },
  low: { bg: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700", label: "Low energy" },
};

const templates = [
  { text: "Check and respond to emails", energy: "low" as const, duration: 20 },
  { text: "Deep focus work", energy: "high" as const, duration: 45 },
  { text: "Admin tasks", energy: "low" as const, duration: 15 },
  { text: "Exercise or movement break", energy: "medium" as const, duration: 30 },
  { text: "Meeting", energy: "medium" as const, duration: 30 },
  { text: "Creative work", energy: "high" as const, duration: 45 },
];

export default function AdhdPlanner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [energy, setEnergy] = useState<"high" | "medium" | "low">("medium");
  const [duration, setDuration] = useState(25);
  let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  const add = () => {
    if (!text.trim()) return;
    setTasks(p => [...p, { id: nextId++, text: text.trim(), energy, duration, done: false }]);
    setText("");
  };

  const addTemplate = (t: typeof templates[0]) => {
    setTasks(p => [...p, { id: nextId++, text: t.text, energy: t.energy, duration: t.duration, done: false }]);
  };

  const toggle = (id: number) => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = (id: number) => setTasks(p => p.filter(t => t.id !== id));

  const totalMin = tasks.reduce((s, t) => s + t.duration, 0);
  const doneMin = tasks.filter(t => t.done).reduce((s, t) => s + t.duration, 0);
  const breaks = Math.floor(totalMin / 50);
  const totalWithBreaks = totalMin + breaks * 10;

  const sorted = [...tasks].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.energy] - order[b.energy];
  });

  const copy = async () => {
    const lines = ["ADHD-Friendly Daily Plan", `Total: ${Math.floor(totalWithBreaks / 60)}h ${totalWithBreaks % 60}m (including ${breaks} breaks)`, ""];
    let elapsed = 0;
    sorted.forEach((t, i) => {
      lines.push(`${t.done ? "[x]" : "[ ]"} ${t.text} (${t.duration}min, ${t.energy} energy)`);
      elapsed += t.duration;
      if ((i + 1) % 2 === 0 && i < sorted.length - 1) lines.push("   --- 10min break ---");
    });
    try { await navigator.clipboard.writeText(lines.join("\n")); alert("Copied"); } catch {}
  };

  return (
    <div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-800"><span className="font-medium">ADHD planning tip:</span> Schedule your hardest tasks when your energy is highest (usually mid-morning). Take a 10-minute break every 50 minutes. Don&apos;t plan more than 4-5 hours of focused work per day.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-3">Add a task</h3>
        <div className="space-y-3">
          <input type="text" value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === "Enter") add(); }} placeholder="What do you need to do?" className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm" />
          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1">
              {(["high", "medium", "low"] as const).map(e => (
                <button key={e} onClick={() => setEnergy(e)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${energy === e ? energyColors[e].badge : "bg-gray-50 text-gray-500 border border-gray-200"}`}>{energyColors[e].label}</button>
              ))}
            </div>
            <select value={duration} onChange={e => setDuration(Number(e.target.value))} className="px-2 py-1.5 rounded-lg border border-gray-300 text-xs">
              <option value={10}>10 min</option>
              <option value={15}>15 min</option>
              <option value={20}>20 min</option>
              <option value={25}>25 min</option>
              <option value={30}>30 min</option>
              <option value={45}>45 min</option>
              <option value={60}>60 min</option>
            </select>
            <button onClick={add} className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-all">Add</button>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Quick add:</p>
        <div className="flex flex-wrap gap-1.5">
          {templates.map(t => (
            <button key={t.text} onClick={() => addTemplate(t)} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs hover:bg-gray-200 transition-all">{t.text}</button>
          ))}
        </div>
      </div>

      {tasks.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500">{tasks.filter(t => t.done).length}/{tasks.length} tasks done • {doneMin}/{totalMin} minutes</p>
            <p className="text-xs text-gray-400">~{Math.floor(totalWithBreaks / 60)}h {totalWithBreaks % 60}m with breaks</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-4"><div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${totalMin > 0 ? (doneMin / totalMin) * 100 : 0}%` }} /></div>

          <h3 className="font-semibold text-gray-900 text-sm mb-3">Your plan (sorted by energy level)</h3>
          <div className="space-y-2 mb-6">
            {sorted.map((t, i) => (
              <div key={t.id}>
                <div className={`rounded-xl border p-3 flex items-center gap-3 transition-all ${t.done ? "bg-gray-50 border-gray-200 opacity-60" : energyColors[t.energy].bg}`}>
                  <button onClick={() => toggle(t.id)} className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all ${t.done ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                    {t.done && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${t.done ? "line-through text-gray-400" : "text-gray-900"}`}>{t.text}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${energyColors[t.energy].badge}`}>{t.energy}</span>
                      <span className="text-xs text-gray-500">{t.duration} min</span>
                    </div>
                  </div>
                  <button onClick={() => remove(t.id)} className="text-gray-400 hover:text-red-500 text-sm">✕</button>
                </div>
                {(i + 1) % 2 === 0 && i < sorted.length - 1 && (
                  <div className="flex items-center gap-2 py-1 px-3"><div className="flex-1 border-t border-dashed border-gray-300" /><span className="text-xs text-gray-400">10min break</span><div className="flex-1 border-t border-dashed border-gray-300" /></div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={copy} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">Copy Plan</button>
            <button onClick={() => window.print()} className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all">Print</button>
            <button onClick={() => setTasks([])} className="text-sm text-gray-500 hover:text-gray-700 underline">Clear all</button>
          </div>
        </>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200"><p className="text-xs text-gray-500"><span className="font-medium">Tip:</span> Your plan stays in your browser only. Nothing is saved or sent anywhere. Bookmark this page and use it each morning for a quick daily planning session.</p></div>
    </div>
  );
}
