"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Condition, CONDITIONS } from "@/lib/types";

interface TownOption {
  slug: string;
  name: string;
  county: string;
}

interface SearchBarProps {
  towns: TownOption[];
  defaultCondition?: Condition;
}

export default function SearchBar({
  towns,
  defaultCondition = "adhd",
}: SearchBarProps) {
  const [condition, setCondition] = useState<Condition>(defaultCondition);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<TownOption[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    if (value.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = towns
      .filter(
        (t) =>
          t.name.toLowerCase().includes(value.toLowerCase()) ||
          t.county.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 8);
    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }

  function navigateToTown(slug: string) {
    const condSlug = CONDITIONS[condition].slug;
    router.push(`/${condSlug}/${slug}/`);
    setShowSuggestions(false);
  }

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 mb-4 justify-center">
        {(["adhd", "autism"] as Condition[]).map((c) => (
          <button
            key={c}
            onClick={() => setCondition(c)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
              condition === c
                ? c === "adhd"
                  ? "bg-white text-blue-700 shadow-md"
                  : "bg-white text-purple-700 shadow-md"
                : "bg-white/20 text-white/90 hover:bg-white/30 border border-white/20"
            }`}
          >
            {CONDITIONS[c].name} Assessment
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center bg-white rounded-2xl shadow-xl border border-white/50 overflow-hidden">
          <svg
            className="w-5 h-5 text-gray-400 ml-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Enter your town or city..."
            className="flex-1 px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none text-lg"
          />
          <button
            onClick={() => {
              if (suggestions.length > 0) {
                navigateToTown(suggestions[0].slug);
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-4 font-medium hover:from-blue-700 hover:to-blue-800 transition-all m-1.5 rounded-xl"
          >
            Search
          </button>
        </div>

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
            {suggestions.map((town, i) => (
              <button
                key={town.slug}
                onClick={() => navigateToTown(town.slug)}
                className={`w-full text-left px-5 py-3.5 hover:bg-blue-50 flex justify-between items-center transition-colors ${
                  i !== suggestions.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-gray-900">{town.name}</span>
                </div>
                <span className="text-sm text-gray-400">{town.county}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
