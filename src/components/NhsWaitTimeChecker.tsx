"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface IcbData {
  id: string;
  name: string;
  short_name: string;
  region: string;
  counties: string[];
  adhd_wait_months: number;
  autism_wait_months: number;
  rtc_status: string;
  rtc_notes: string;
  local_nhs_provider: string;
  support_groups: string[];
}

interface NhsWaitTimeCheckerProps {
  icbData: IcbData[];
}

export default function NhsWaitTimeChecker({ icbData }: NhsWaitTimeCheckerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIcb, setSelectedIcb] = useState<IcbData | null>(null);

  const allCounties = useMemo(() => {
    const counties: { county: string; icb: IcbData }[] = [];
    icbData.forEach((icb) => {
      icb.counties.forEach((county) => {
        counties.push({ county, icb });
      });
    });
    return counties.sort((a, b) => a.county.localeCompare(b.county));
  }, [icbData]);

  const filteredCounties = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return allCounties
      .filter(
        (c) =>
          c.county.toLowerCase().includes(term) ||
          c.icb.short_name.toLowerCase().includes(term) ||
          c.icb.region.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [searchTerm, allCounties]);

  const formatWait = (months: number) => {
    if (months >= 12) {
      const years = Math.floor(months / 12);
      const rem = months % 12;
      if (rem === 0) return `${years} year${years > 1 ? "s" : ""}`;
      return `${years} year${years > 1 ? "s" : ""} ${rem} month${rem > 1 ? "s" : ""}`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
  };

  const avgAdhdWait = Math.round(
    icbData.reduce((sum, icb) => sum + icb.adhd_wait_months, 0) / icbData.length
  );
  const avgAutismWait = Math.round(
    icbData.reduce((sum, icb) => sum + icb.autism_wait_months, 0) / icbData.length
  );

  if (selectedIcb) {
    return (
      <div>
        <button
          onClick={() => {
            setSelectedIcb(null);
            setSearchTerm("");
          }}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Search again
        </button>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {selectedIcb.short_name}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{selectedIcb.name}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-5">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                ADHD Assessment Wait
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatWait(selectedIcb.adhd_wait_months)}
              </p>
              <p className="text-xs text-gray-500 mt-1">estimated NHS waiting time</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-5">
              <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
                Autism Assessment Wait
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatWait(selectedIcb.autism_wait_months)}
              </p>
              <p className="text-xs text-gray-500 mt-1">estimated NHS waiting time</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Region</p>
              <p className="text-sm text-gray-600">{selectedIcb.region}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">NHS Provider</p>
              <p className="text-sm text-gray-600">{selectedIcb.local_nhs_provider}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Right to Choose</p>
              <p className="text-sm text-gray-600">{selectedIcb.rtc_notes}</p>
            </div>
            {selectedIcb.support_groups.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Local Support Groups</p>
                <p className="text-sm text-gray-600">
                  {selectedIcb.support_groups.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-2 text-sm">
            Don&apos;t want to wait {formatWait(selectedIcb.adhd_wait_months)}?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Private assessments are typically available within 2-4 weeks. Compare
            clinics in your area to find the right option.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/adhd-assessment/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
            >
              ADHD Clinics
            </Link>
            <Link
              href="/autism-assessment/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-xl font-medium text-sm hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm"
            >
              Autism Clinics
            </Link>
            <Link
              href="/tools/right-to-choose-letter/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-xl font-medium text-sm hover:bg-blue-50 transition-all"
            >
              Right to Choose Letter
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          Waiting times are estimates based on publicly available data and may
          vary. Contact your local NHS provider for the most up-to-date
          information.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-5 text-center">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
            Average ADHD Wait
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {formatWait(avgAdhdWait)}
          </p>
          <p className="text-xs text-gray-500 mt-1">across England</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5 text-center">
          <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
            Average Autism Wait
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {formatWait(avgAutismWait)}
          </p>
          <p className="text-xs text-gray-500 mt-1">across England</p>
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="area-search" className="block text-sm font-medium text-gray-700 mb-2">
          Search your area or county
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="area-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Birmingham, Kent, Greater Manchester..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
          />
        </div>

        {filteredCounties.length > 0 && (
          <div className="mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {filteredCounties.map((item) => (
              <button
                key={`${item.icb.id}-${item.county}`}
                onClick={() => setSelectedIcb(item.icb)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.county}</p>
                  <p className="text-xs text-gray-500">{item.icb.short_name} &middot; {item.icb.region}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs text-gray-500">
                    ADHD: <span className="font-medium text-gray-700">{item.icb.adhd_wait_months}mo</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Autism: <span className="font-medium text-gray-700">{item.icb.autism_wait_months}mo</span>
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {searchTerm.trim() && filteredCounties.length === 0 && (
          <p className="mt-3 text-sm text-gray-500">
            No areas found matching &ldquo;{searchTerm}&rdquo;. Try a county name like &ldquo;Kent&rdquo; or &ldquo;Greater Manchester&rdquo;.
          </p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Or browse by region</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Array.from(new Set(icbData.map((icb) => icb.region)))
            .sort()
            .map((region) => {
              const regionIcbs = icbData.filter((icb) => icb.region === region);
              const avgAdhd = Math.round(
                regionIcbs.reduce((s, i) => s + i.adhd_wait_months, 0) / regionIcbs.length
              );
              return (
                <button
                  key={region}
                  onClick={() => setSearchTerm(region)}
                  className="bg-white rounded-lg border border-gray-200 p-3 text-left hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                >
                  <p className="text-sm font-medium text-gray-900">{region}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ~{avgAdhd} month avg ADHD wait
                  </p>
                </button>
              );
            })}
        </div>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        Data covers NHS Integrated Care Boards (ICBs) in England. Waiting times
        are estimates and may vary by individual circumstances. Scotland, Wales,
        and Northern Ireland have separate NHS structures with different waiting
        times.
      </p>
    </div>
  );
}
