import Link from "next/link";
import { Clinic, Condition, CONDITIONS } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

interface ClinicCardProps {
  clinic: Clinic;
  condition?: Condition;
}

export default function ClinicCard({ clinic, condition }: ClinicCardProps) {
  const isPaid = clinic.tier === "featured" || clinic.tier === "premium";
  const priceKey = condition
    ? `${condition}_adult`
    : clinic.conditions.includes("adhd")
      ? "adhd_adult"
      : "autism_adult";

  return (
    <div
      className={`bg-white rounded-2xl border ${
        isPaid
          ? "border-blue-200/60 shadow-md ring-1 ring-blue-100/50"
          : "border-gray-200/60"
      } p-6 card-hover relative group`}
    >
      {clinic.tier === "premium" && (
        <div className="absolute -top-3 left-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-sm">
          Premium Clinic
        </div>
      )}
      {clinic.tier === "featured" && (
        <div className="absolute -top-3 left-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold px-3.5 py-1 rounded-full shadow-sm">
          Featured
        </div>
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <Link href={`/clinic/${clinic.slug}/`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {clinic.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {clinic.city} &middot; {clinic.postcode}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(
              clinic.pricing[priceKey as keyof typeof clinic.pricing]
            )}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {condition === "autism" ? "Autism" : "ADHD"} assessment
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-relaxed">
        {clinic.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {clinic.conditions.map((c) => (
          <span
            key={c}
            className={`text-xs px-2.5 py-1 rounded-lg font-medium ${
              c === "adhd"
                ? "bg-blue-50 text-blue-700"
                : "bg-purple-50 text-purple-700"
            }`}
          >
            {CONDITIONS[c].name}
          </span>
        ))}
        <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
          {clinic.wait_time} wait
        </span>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
        <div className="flex gap-4">
          {clinic.phone && (
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </a>
          )}
          {clinic.website && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Website
            </a>
          )}
        </div>
        <Link
          href={`/clinic/${clinic.slug}/`}
          className="text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-sm hover:shadow-md"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
