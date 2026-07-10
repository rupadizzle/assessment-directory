import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free ADHD & Autism Tools — UK Assessment Directory",
  description:
    "Free screening quizzes, NHS wait time checker, cost calculator, and Right to Choose letter generator. Tools to help you navigate ADHD and autism assessments in the UK.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/tools/",
  },
  openGraph: {
    title: "Free ADHD & Autism Tools — UK Assessment Directory",
    description:
      "Free screening quizzes, NHS wait time checker, cost calculator, and more. Tools to help you navigate ADHD and autism assessments in the UK.",
    url: "https://assessmentdirectory.co.uk/tools/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

const tools = [
  {
    title: "ADHD Self-Screening Quiz",
    description:
      "Based on the WHO Adult ADHD Self-Report Scale (ASRS-v1.1). 6 quick questions to help you decide whether to seek a formal assessment.",
    href: "/tools/adhd-screening/",
    condition: "adhd" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    time: "2 min",
  },
  {
    title: "Autism Self-Screening Quiz",
    description:
      "Based on the Autism Quotient (AQ-10) by Baron-Cohen et al. 10 quick questions used by GPs as a referral tool for autism assessment.",
    href: "/tools/autism-screening/",
    condition: "autism" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    time: "3 min",
  },
  {
    title: "NHS Wait Time Checker",
    description:
      "Look up estimated NHS ADHD and autism assessment waiting times in your area. See how long you might wait and explore private alternatives.",
    href: "/tools/nhs-wait-times/",
    condition: "both" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    time: "1 min",
  },
  {
    title: "Assessment Cost Calculator",
    description:
      "Compare private assessment costs across clinics in your area. See typical prices for ADHD and autism assessments and what affects the cost.",
    href: "/tools/cost-calculator/",
    condition: "both" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    time: "2 min",
  },
  {
    title: "Right to Choose Letter Generator",
    description:
      "Generate a personalised letter to your GP requesting a referral to a private provider under the NHS Right to Choose for ADHD assessment.",
    href: "/tools/right-to-choose-letter/",
    condition: "adhd" as const,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    time: "3 min",
  },
];

export default function ToolsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            100% Free — No Sign-Up Required
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Free ADHD & Autism Tools
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Screening quizzes, cost comparisons, and practical tools to help you
            navigate the assessment process in the UK.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="bg-white rounded-xl border border-gray-200/60 p-6 hover:shadow-md hover:border-blue-200 transition-all group flex items-start gap-5"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  tool.condition === "adhd"
                    ? "bg-blue-50 text-blue-600"
                    : tool.condition === "autism"
                    ? "bg-purple-50 text-purple-600"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {tool.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h2>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      tool.condition === "adhd"
                        ? "bg-blue-100 text-blue-700"
                        : tool.condition === "autism"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tool.condition === "both"
                      ? "ADHD & Autism"
                      : tool.condition.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tool.time}
                  </span>
                  <span className="text-sm text-blue-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Start now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Important Disclaimer
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            These tools are for informational purposes only and are not a
            substitute for professional medical advice, diagnosis, or treatment.
            Screening quizzes indicate whether further assessment may be
            beneficial — they cannot diagnose ADHD or autism. Always consult a
            qualified healthcare professional for a formal assessment.
          </p>
        </div>
      </section>
    </div>
  );
}
