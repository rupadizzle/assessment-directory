"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-white font-bold text-sm tracking-tight">AD</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-gray-900 text-lg tracking-tight">
                UK Assessment Directory
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/adhd-assessment/"
              className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all text-sm"
            >
              ADHD Assessment
            </Link>
            <Link
              href="/autism-assessment/"
              className="px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-all text-sm"
            >
              Autism Assessment
            </Link>
            <Link
              href="/guides/"
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-all text-sm"
            >
              Guides
            </Link>
            <div className="w-px h-6 bg-gray-200 mx-2" />
            <Link
              href="/list-your-clinic/"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md text-sm"
            >
              List Your Clinic
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100/50 animate-fade-in">
            <nav className="flex flex-col gap-1 pt-3">
              <Link
                href="/adhd-assessment/"
                className="px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all"
                onClick={() => setMenuOpen(false)}
              >
                ADHD Assessment
              </Link>
              <Link
                href="/autism-assessment/"
                className="px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl font-medium transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Autism Assessment
              </Link>
              <Link
                href="/guides/"
                className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-medium transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Guides
              </Link>
              <Link
                href="/list-your-clinic/"
                className="mx-3 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-xl font-medium text-center hover:from-blue-700 hover:to-blue-800 shadow-sm"
                onClick={() => setMenuOpen(false)}
              >
                List Your Clinic
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
