"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    text: "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?",
    threshold: 2,
  },
  {
    id: 2,
    text: "How often do you have difficulty getting things in order when you have to do a task that requires organisation?",
    threshold: 2,
  },
  {
    id: 3,
    text: "How often do you have problems remembering appointments or obligations?",
    threshold: 2,
  },
  {
    id: 4,
    text: "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?",
    threshold: 3,
  },
  {
    id: 5,
    text: "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?",
    threshold: 3,
  },
  {
    id: 6,
    text: "How often do you feel overly active and compelled to do things, like you were driven by a motor?",
    threshold: 3,
  },
];

const options = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Often", value: 3 },
  { label: "Very Often", value: 4 },
];

export default function AdhdScreeningQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const score = questions.reduce((total, q) => {
    const answer = answers[q.id];
    if (answer === undefined) return total;
    return total + (answer >= q.threshold ? 1 : 0);
  }, 0);

  const getResult = () => {
    if (score >= 4) {
      return {
        level: "high" as const,
        title: "Your responses are highly consistent with adult ADHD",
        description:
          "Your answers suggest symptoms that are consistent with ADHD in adults. This does not mean you have ADHD — only a qualified clinician can make a diagnosis after a comprehensive assessment. We strongly recommend speaking with your GP or booking a private assessment.",
      };
    } else if (score >= 2) {
      return {
        level: "moderate" as const,
        title: "Your responses show some indicators of ADHD",
        description:
          "You reported some symptoms that can be associated with ADHD, though not enough to strongly indicate it based on this screener alone. If these symptoms are affecting your daily life, it may still be worth discussing with a healthcare professional.",
      };
    } else {
      return {
        level: "low" as const,
        title: "Your responses are not strongly consistent with ADHD",
        description:
          "Based on your answers, your symptoms do not appear strongly consistent with ADHD. However, this is a brief screening tool and cannot rule out ADHD. If you have concerns about attention, focus, or hyperactivity, please consult a healthcare professional.",
      };
    }
  };

  const handleSubmit = () => {
    if (allAnswered) {
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (showResults) {
    const result = getResult();
    return (
      <div>
        <div
          className={`rounded-xl border p-6 sm:p-8 mb-6 ${
            result.level === "high"
              ? "bg-blue-50 border-blue-200"
              : result.level === "moderate"
              ? "bg-gray-50 border-gray-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                result.level === "high"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {result.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {result.description}
              </p>
              <p className="text-sm text-gray-500">
                Your score: <span className="font-semibold text-gray-700">{score}</span> out of 6 symptom indicators
              </p>
            </div>
          </div>
        </div>

        {result.level === "high" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Recommended Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Speak to your GP</span> — share your screening results and ask about an ADHD assessment referral.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Ask about Right to Choose</span> — in England, you can request a referral to a private provider funded by the NHS.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Consider a private assessment</span> — if you don&apos;t want to wait, private assessments are typically available within 2-4 weeks.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Find ADHD Assessment Clinics Near You</h3>
          <p className="text-sm text-gray-600 mb-4">
            Compare prices, waiting times, and credentials for private ADHD assessment clinics in your area.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/adhd-assessment/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm text-sm"
            >
              Browse ADHD Clinics
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/tools/right-to-choose-letter/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-5 py-2.5 rounded-xl font-medium hover:bg-blue-50 transition-all text-sm"
            >
              Generate Right to Choose Letter
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
          >
            Take the quiz again
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            <span className="font-medium">Disclaimer:</span> This screening tool is based on the
            World Health Organisation Adult ADHD Self-Report Scale (ASRS-v1.1)
            and is for informational purposes only. It is not a diagnostic tool.
            Only a qualified healthcare professional can diagnose ADHD after a
            comprehensive assessment. If you are in crisis, please contact the
            Samaritans on 116 123 or your local emergency services.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">
            {Object.keys(answers).length} of {questions.length} answered
          </p>
          <p className="text-sm text-gray-400">
            ~ 2 minutes
          </p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(Object.keys(answers).length / questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className={`bg-white rounded-xl border p-5 sm:p-6 transition-all ${
              answers[q.id] !== undefined
                ? "border-blue-200 bg-blue-50/30"
                : "border-gray-200"
            }`}
          >
            <p className="font-medium text-gray-900 mb-4 text-sm sm:text-base">
              <span className="text-blue-600 mr-2">{index + 1}.</span>
              {q.text}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                  }
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    answers[q.id] === opt.value
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`px-8 py-3 rounded-xl font-medium text-sm transition-all ${
            allAnswered
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          View My Results
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-medium">About this tool:</span> This quiz is
          based on the WHO Adult ADHD Self-Report Scale (ASRS-v1.1), a widely
          used screening instrument. It is not a diagnostic tool. Your answers
          are processed entirely in your browser and are never sent to any
          server.
        </p>
      </div>
    </div>
  );
}
