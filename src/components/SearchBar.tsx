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
      <div className="flex gap-2 mb-3 justify-center">
        {(["adhd", "autism"] as Condition[]).map((c) => (
          <button
            key={c}
            onClick={() => setCondition(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              condition === c
                ? c === "adhd"
                  ? "bg-blue-600 text-white"
                  : "bg-purple-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:border-gray-400"
            }`}
          >
            {CONDITIONS[c].name} Assessment
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <svg
            className="w-5 h-5 text-gray-400 ml-4"
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
            className="bg-blue-600 text-white px-6 py-4 font-medium hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
            {suggestions.map((town) => (
              <button
                key={town.slug}
                onClick={() => navigateToTown(town.slug)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex justify-between items-center"
              >
                <span className="font-medium text-gray-900">{town.name}</span>
                <span className="text-sm text-gray-500">{town.county}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
