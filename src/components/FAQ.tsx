"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
            openIndex === index
              ? "border-blue-200/60 bg-blue-50/30 shadow-sm"
              : "border-gray-200/60 bg-white hover:border-gray-300/60"
          }`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left px-6 py-4 flex justify-between items-center transition-colors"
          >
            <span className="font-medium text-gray-900 pr-4">
              {item.question}
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                openIndex === index ? "bg-blue-100 rotate-180" : "bg-gray-100"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-colors ${
                  openIndex === index ? "text-blue-600" : "text-gray-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          <div
            className={`px-6 pb-5 text-gray-600 text-sm leading-relaxed ${
              openIndex === index ? "" : "hidden"
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
