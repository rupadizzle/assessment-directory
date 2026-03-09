import { Metadata } from "next";
import guides from "@/data/guides.json";
import { Guide } from "@/lib/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Assessment Guides — ADHD & Autism Resources",
  description:
    "Free guides about private ADHD and autism assessments in the UK. Learn about costs, processes, Right to Choose, and what to expect from your assessment.",
  alternates: {
    canonical: "https://assessmentdirectory.co.uk/guides/",
  },
};

const allGuides = guides as Guide[];

export default function GuidesIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Assessment Guides
      </h1>
      <p className="text-lg text-gray-600 mb-10 max-w-2xl">
        Free resources to help you understand private ADHD and autism
        assessments, your rights, and what to expect throughout the process.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {allGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}/`}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <span
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-3 ${
                guide.condition === "adhd"
                  ? "bg-blue-100 text-blue-700"
                  : guide.condition === "autism"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {guide.condition === "both"
                ? "ADHD & Autism"
                : guide.condition.toUpperCase()}
            </span>
            <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
              {guide.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-3">
              {guide.meta_description}
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Updated{" "}
              {new Date(guide.created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
