"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg hidden sm:block">
              UK Assessment Directory
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/adhd-assessment/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              ADHD Assessment
            </Link>
            <Link
              href="/autism-assessment/"
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              Autism Assessment
            </Link>
            <Link
              href="/guides/how-much-does-private-adhd-assessment-cost/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/list-your-clinic/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              List Your Clinic
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
          <div className="md:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2 pt-3">
              <Link
                href="/adhd-assessment/"
                className="px-3 py-2 text-gray-600 hover:text-blue-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                ADHD Assessment
              </Link>
              <Link
                href="/autism-assessment/"
                className="px-3 py-2 text-gray-600 hover:text-purple-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Autism Assessment
              </Link>
              <Link
                href="/guides/how-much-does-private-adhd-assessment-cost/"
                className="px-3 py-2 text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Guides
              </Link>
              <Link
                href="/list-your-clinic/"
                className="mx-3 mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-center hover:bg-blue-700"
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
