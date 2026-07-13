import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free ADHD & Autism Tools — UK Assessment Directory",
  description:
    "24 free tools including screening quizzes, NHS wait time checker, cost calculator, letter generators, and more. Navigate ADHD and autism assessments in the UK.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/tools/",
  },
  openGraph: {
    title: "Free ADHD & Autism Tools — UK Assessment Directory",
    description:
      "24 free tools including screening quizzes, NHS wait time checker, cost calculator, and more. Navigate ADHD and autism assessments in the UK.",
    url: "https://assessmentdirectory.co.uk/tools/",
    siteName: "UK Assessment Directory",
    type: "website",
  },
};

const iconDoc = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const iconBrain = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
);
const iconHeart = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const iconClock = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const iconMoney = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const iconCheck = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
);
const iconUser = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const iconGrid = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
);
const iconStar = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
);

const sections = [
  {
    title: "Screening & Self-Assessment",
    tools: [
      { title: "ADHD Self-Screening Quiz", description: "Based on the WHO Adult ADHD Self-Report Scale (ASRS-v1.1). 6 quick questions.", href: "/tools/adhd-screening/", condition: "adhd" as const, icon: iconBrain, time: "2 min" },
      { title: "Autism Self-Screening Quiz", description: "Based on the Autism Quotient (AQ-10) by Baron-Cohen et al. 10 questions used by GPs.", href: "/tools/autism-screening/", condition: "autism" as const, icon: iconHeart, time: "3 min" },
      { title: "ADHD in Women Screener", description: "12 questions focused on how ADHD presents differently in women — masking, emotional dysregulation, inattentive type.", href: "/tools/adhd-in-women/", condition: "adhd" as const, icon: iconUser, time: "4 min" },
      { title: "Executive Function Assessment", description: "Self-assess across 6 key executive function domains: working memory, task initiation, planning, time management, emotional regulation, and flexibility.", href: "/tools/executive-function/", condition: "both" as const, icon: iconBrain, time: "5 min" },
      { title: "Autism Masking Quiz", description: "Explore how much you might be masking autistic traits. 15 questions on social camouflaging and burnout.", href: "/tools/masking-quiz/", condition: "autism" as const, icon: iconHeart, time: "5 min" },
      { title: "Sensory Profile Quiz", description: "Discover your sensory sensitivities across sound, sight, touch, taste/smell, and movement with coping strategies.", href: "/tools/sensory-profile/", condition: "autism" as const, icon: iconStar, time: "5 min" },
      { title: "ADHD vs Anxiety Checker", description: "ADHD and anxiety share many symptoms. Explore which pattern fits your experience — or whether it's both.", href: "/tools/adhd-vs-anxiety/", condition: "adhd" as const, icon: iconBrain, time: "5 min" },
    ],
  },
  {
    title: "NHS & Assessment Navigation",
    tools: [
      { title: "NHS Wait Time Checker", description: "Look up estimated NHS ADHD and autism assessment waiting times in your area.", href: "/tools/nhs-wait-times/", condition: "both" as const, icon: iconClock, time: "1 min" },
      { title: "Assessment Cost Calculator", description: "Compare private assessment costs across clinics. See typical prices for ADHD and autism assessments.", href: "/tools/cost-calculator/", condition: "both" as const, icon: iconMoney, time: "2 min" },
      { title: "Assessment Type Explainer", description: "Understand NHS vs private, online vs in-person, RTC, and comprehensive assessments. Compare pros and cons.", href: "/tools/assessment-types/", condition: "both" as const, icon: iconGrid, time: "3 min" },
      { title: "Clinic Comparison Tool", description: "Compare private assessment providers side-by-side on price, features, and services.", href: "/tools/clinic-comparison/", condition: "both" as const, icon: iconGrid, time: "5 min" },
      { title: "Waiting List Tracker", description: "Track your NHS referral waiting time. Log key dates and know your rights.", href: "/tools/waiting-list-tracker/", condition: "both" as const, icon: iconClock, time: "2 min" },
    ],
  },
  {
    title: "Assessment Preparation",
    tools: [
      { title: "Assessment Prep Checklist", description: "24-item interactive checklist covering documents, information, and practical preparation for your assessment.", href: "/tools/assessment-prep/", condition: "both" as const, icon: iconCheck, time: "10 min" },
      { title: "Evidence Builder", description: "Build a structured evidence document covering 8 life areas to bring to your assessment.", href: "/tools/evidence-builder/", condition: "both" as const, icon: iconDoc, time: "15 min" },
      { title: "GP Script Generator", description: "Generate personalised talking points for your GP appointment about ADHD or autism.", href: "/tools/gp-script/", condition: "both" as const, icon: iconDoc, time: "3 min" },
    ],
  },
  {
    title: "Letters & Documents",
    tools: [
      { title: "Right to Choose Letter", description: "Generate a letter to your GP requesting referral to a private provider under NHS Right to Choose.", href: "/tools/right-to-choose-letter/", condition: "adhd" as const, icon: iconDoc, time: "3 min" },
      { title: "Shared Care Letter", description: "Generate a letter requesting your GP takes over prescribing from your private provider.", href: "/tools/shared-care-letter/", condition: "adhd" as const, icon: iconDoc, time: "3 min" },
      { title: "Workplace Adjustments Letter", description: "Request reasonable adjustments at work under the Equality Act 2010 for ADHD or autism.", href: "/tools/workplace-adjustments/", condition: "both" as const, icon: iconDoc, time: "5 min" },
      { title: "University Support Letter", description: "Request disability support at university — exam adjustments, DSA, and reasonable adjustments.", href: "/tools/university-support/", condition: "both" as const, icon: iconDoc, time: "5 min" },
    ],
  },
  {
    title: "Post-Diagnosis & Daily Life",
    tools: [
      { title: "Post-Diagnosis Action Plan", description: "Create a personalised action plan with next steps for medical, work, financial, and personal areas.", href: "/tools/post-diagnosis-plan/", condition: "both" as const, icon: iconCheck, time: "10 min" },
      { title: "Medication Comparison", description: "Compare 6 UK ADHD medications — dosing, duration, side effects, and NICE guidance.", href: "/tools/medication-comparison/", condition: "adhd" as const, icon: iconGrid, time: "3 min" },
      { title: "ADHD Tax Calculator", description: "Calculate the hidden financial cost of ADHD — impulse spending, late fees, forgotten subscriptions.", href: "/tools/adhd-tax-calculator/", condition: "adhd" as const, icon: iconMoney, time: "3 min" },
      { title: "PIP Eligibility Checker", description: "Check whether your ADHD or autism symptoms might qualify you for Personal Independence Payment.", href: "/tools/pip-checker/", condition: "both" as const, icon: iconMoney, time: "5 min" },
      { title: "ADHD-Friendly Daily Planner", description: "Plan your day around energy levels with time blocking, task prioritisation, and built-in breaks.", href: "/tools/adhd-planner/", condition: "adhd" as const, icon: iconCheck, time: "5 min" },
    ],
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
            24 Free Tools — No Sign-Up Required
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            Free ADHD & Autism Tools
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Screening quizzes, letter generators, cost comparisons, and practical
            daily tools to help you navigate the assessment process in the UK.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        {sections.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h2>
            <div className="grid gap-3">
              {section.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-white rounded-xl border border-gray-200/60 p-5 hover:shadow-md hover:border-blue-200 transition-all group flex items-start gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
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
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
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
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
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
          </div>
        ))}
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
