"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface ClinicPricing {
  name: string;
  slug: string;
  city: string;
  adhd_adult?: number;
  adhd_child?: number;
  autism_adult?: number;
  autism_child?: number;
  wait_time: string;
}

interface CostCalculatorProps {
  clinics: ClinicPricing[];
}

export default function CostCalculator({ clinics }: CostCalculatorProps) {
  const [condition, setCondition] = useState<"adhd" | "autism">("adhd");
  const [ageGroup, setAgeGroup] = useState<"adult" | "child">("adult");

  const priceKey = `${condition}_${ageGroup}` as keyof Omit<
    ClinicPricing,
    "name" | "slug" | "city" | "wait_time"
  >;

  const clinicsWithPrice = useMemo(() => {
    return clinics
      .filter((c) => c[priceKey] !== undefined && c[priceKey]! > 0)
      .sort((a, b) => (a[priceKey] || 0) - (b[priceKey] || 0));
  }, [clinics, priceKey]);

  const stats = useMemo(() => {
    if (clinicsWithPrice.length === 0) return null;
    const prices = clinicsWithPrice.map((c) => c[priceKey]!);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = Math.round(prices.reduce((s, p) => s + p, 0) / prices.length);
    const median = prices[Math.floor(prices.length / 2)];
    return { min, max, avg, median, count: prices.length };
  }, [clinicsWithPrice, priceKey]);

  const conditionLabel = condition === "adhd" ? "ADHD" : "Autism";
  const ageLabel = ageGroup === "adult" ? "Adult" : "Child";

  return (
    <div>
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setCondition("adhd")}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  condition === "adhd"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                ADHD
              </button>
              <button
                onClick={() => setCondition("autism")}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  condition === "autism"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Autism
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Group
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setAgeGroup("adult")}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  ageGroup === "adult"
                    ? "bg-gray-800 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Adult
              </button>
              <button
                onClick={() => setAgeGroup("child")}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  ageGroup === "child"
                    ? "bg-gray-800 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Child
              </button>
            </div>
          </div>
        </div>
      </div>

      {stats ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Lowest
              </p>
              <p className="text-xl font-bold text-gray-900">
                &pound;{stats.min.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Median
              </p>
              <p className="text-xl font-bold text-gray-900">
                &pound;{stats.median.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Average
              </p>
              <p className="text-xl font-bold text-gray-900">
                &pound;{stats.avg.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                Highest
              </p>
              <p className="text-xl font-bold text-gray-900">
                &pound;{stats.max.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm">
              {conditionLabel} {ageLabel} Assessment — Price Range
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Based on {stats.count} clinics in our directory
            </p>

            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${
                  condition === "adhd"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600"
                    : "bg-gradient-to-r from-purple-400 to-purple-600"
                }`}
                style={{ width: "100%" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  &pound;{stats.min.toLocaleString()} — &pound;{stats.max.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              <span>Budget</span>
              <span>Mid-range</span>
              <span>Premium</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">
                Clinics by price — {conditionLabel} {ageLabel}
              </h3>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {clinicsWithPrice.slice(0, 20).map((clinic) => (
                <Link
                  key={clinic.slug}
                  href={`/clinic/${clinic.slug}/`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {clinic.name}
                    </p>
                    <p className="text-xs text-gray-500">{clinic.city} &middot; {clinic.wait_time} wait</p>
                  </div>
                  <span
                    className={`text-sm font-semibold shrink-0 ml-4 ${
                      condition === "adhd" ? "text-blue-600" : "text-purple-600"
                    }`}
                  >
                    &pound;{clinic[priceKey]?.toLocaleString()}
                  </span>
                </Link>
              ))}
            </div>
            {clinicsWithPrice.length > 20 && (
              <div className="p-3 text-center border-t border-gray-100">
                <Link
                  href={`/${condition === "adhd" ? "adhd" : "autism"}-assessment/`}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all {clinicsWithPrice.length} clinics
                </Link>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">
              What affects the cost?
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-700">Location:</span>{" "}
                London and South East clinics tend to charge 20-30% more than
                clinics elsewhere in the UK.
              </p>
              <p>
                <span className="font-medium text-gray-700">Clinician type:</span>{" "}
                Assessments by consultant psychiatrists tend to cost more than
                those by clinical psychologists or specialist nurses.
              </p>
              <p>
                <span className="font-medium text-gray-700">Assessment format:</span>{" "}
                Online/remote assessments are typically cheaper than in-person.
                {condition === "autism" &&
                  " Autism assessments generally cost more than ADHD assessments as they involve multiple sessions and clinicians."}
              </p>
              <p>
                <span className="font-medium text-gray-700">Right to Choose:</span>{" "}
                In England, you may be able to get your assessment funded by the
                NHS through Right to Choose, even with a private provider.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">
            No pricing data available for {conditionLabel} {ageLabel} assessments.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${condition === "adhd" ? "adhd" : "autism"}-assessment/`}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all shadow-sm ${
            condition === "adhd"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          }`}
        >
          Browse {conditionLabel} Clinics
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/tools/nhs-wait-times/"
          className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all"
        >
          Check NHS Wait Times
        </Link>
      </div>

      <p className="mt-6 text-xs text-gray-400 leading-relaxed">
        Prices shown are based on clinic listing data and may not reflect current
        rates. Contact clinics directly to confirm current pricing. Some clinics
        offer payment plans or reduced rates.
      </p>
    </div>
  );
}
