"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    text: "I often notice small sounds when others do not.",
    agreeScores: true,
  },
  {
    id: 2,
    text: "I usually concentrate more on the whole picture, rather than the small details.",
    agreeScores: false,
  },
  {
    id: 3,
    text: "I find it easy to do more than one thing at once.",
    agreeScores: false,
  },
  {
    id: 4,
    text: "If there is an interruption, I can switch back to what I was doing very quickly.",
    agreeScores: false,
  },
  {
    id: 5,
    text: "I find it easy to read between the lines when someone is talking to me.",
    agreeScores: false,
  },
  {
    id: 6,
    text: "I know how to tell if someone listening to me is getting bored.",
    agreeScores: false,
  },
  {
    id: 7,
    text: "When I’m reading a story, I find it difficult to work out the characters’ intentions.",
    agreeScores: true,
  },
  {
    id: 8,
    text: "I like to collect information about categories of things (e.g. types of car, bird, train, plant).",
    agreeScores: true,
  },
  {
    id: 9,
    text: "I find it easy to work out what someone is thinking or feeling just by looking at their face.",
    agreeScores: false,
  },
  {
    id: 10,
    text: "I find it difficult to work out people’s intentions.",
    agreeScores: true,
  },
];

const options = [
  { label: "Definitely Agree", value: "definitely_agree" },
  { label: "Slightly Agree", value: "slightly_agree" },
  { label: "Slightly Disagree", value: "slightly_disagree" },
  { label: "Definitely Disagree", value: "definitely_disagree" },
];

export default function AutismScreeningQuiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const score = questions.reduce((total, q) => {
    const answer = answers[q.id];
    if (!answer) return total;
    const isAgree = answer === "definitely_agree" || answer === "slightly_agree";
    if (q.agreeScores && isAgree) return total + 1;
    if (!q.agreeScores && !isAgree) return total + 1;
    return total;
  }, 0);

  const getResult = () => {
    if (score >= 6) {
      return {
        level: "high" as const,
        title: "Your responses suggest further autism assessment may be beneficial",
        description:
          "A score of 6 or above on the AQ-10 is the threshold at which the National Institute for Health and Care Excellence (NICE) recommends considering a referral for a comprehensive autism assessment. This does not mean you are autistic — only a qualified clinician can make that determination after a full diagnostic assessment.",
      };
    } else if (score >= 4) {
      return {
        level: "moderate" as const,
        title: "Your responses show some autistic traits",
        description:
          "Your score is below the NICE referral threshold but shows some traits that can be associated with autism. Many people have some autistic traits without meeting the criteria for a diagnosis. If these traits are affecting your daily life, it may still be worth discussing with a healthcare professional.",
      };
    } else {
      return {
        level: "low" as const,
        title: "Your responses do not strongly indicate autism",
        description:
          "Based on your answers, your score is below the threshold that would typically prompt a referral for autism assessment. However, the AQ-10 is a brief screening tool and cannot rule out autism. If you have concerns, please consult a healthcare professional who can carry out a more detailed assessment.",
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
              ? "bg-purple-50 border-purple-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                result.level === "high"
                  ? "bg-purple-100 text-purple-600"
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
                Your score: <span className="font-semibold text-gray-700">{score}</span> out of 10
                {score >= 6 && (
                  <span className="text-purple-600 ml-1">(above NICE referral threshold of 6)</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {result.level === "high" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Recommended Next Steps</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Speak to your GP</span> — share your screening results and ask for a referral to an autism diagnostic service.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Be prepared for long NHS waits</span> — autism assessment waiting lists can be 2-5 years in many areas.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">Consider a private assessment</span> — private autism assessments typically take 2-6 weeks and cost from around &pound;1,200.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Find Autism Assessment Clinics Near You</h3>
          <p className="text-sm text-gray-600 mb-4">
            Compare prices, waiting times, and credentials for private autism assessment clinics in your area.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/autism-assessment/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2.5 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm text-sm"
            >
              Browse Autism Clinics
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/tools/cost-calculator/"
              className="inline-flex items-center gap-2 bg-white text-purple-600 border border-purple-200 px-5 py-2.5 rounded-xl font-medium hover:bg-purple-50 transition-all text-sm"
            >
              Cost Calculator
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
            Autism Spectrum Quotient (AQ-10) developed by Baron-Cohen et al. at
            the Autism Research Centre, University of Cambridge. It is
            recommended by NICE as a screening tool but is not a diagnostic
            instrument. Only a qualified healthcare professional can diagnose
            autism after a comprehensive assessment. If you are in crisis, please
            contact the Samaritans on 116 123 or your local emergency services.
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
            ~ 3 minutes
          </p>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
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
                ? "border-purple-200 bg-purple-50/30"
                : "border-gray-200"
            }`}
          >
            <p className="font-medium text-gray-900 mb-4 text-sm sm:text-base">
              <span className="text-purple-600 mr-2">{index + 1}.</span>
              {q.text}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))
                  }
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    answers[q.id] === opt.value
                      ? "bg-purple-600 text-white shadow-sm"
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
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-sm hover:shadow-md"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          View My Results
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          <span className="font-medium">About this tool:</span> This quiz is
          based on the Autism Spectrum Quotient (AQ-10) developed by
          Baron-Cohen et al. It is recommended by NICE as a screening tool for
          adults. Your answers are processed entirely in your browser and are
          never sent to any server.
        </p>
      </div>
    </div>
  );
}
