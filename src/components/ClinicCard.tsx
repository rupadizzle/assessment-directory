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
      className={`bg-white rounded-xl border ${isPaid ? "border-blue-200 shadow-md" : "border-gray-200"} p-6 hover:shadow-lg transition-shadow relative`}
    >
      {clinic.tier === "premium" && (
        <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Premium Clinic
        </div>
      )}
      {clinic.tier === "featured" && (
        <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>
      )}

      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <Link href={`/clinic/${clinic.slug}/`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors truncate">
              {clinic.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {clinic.city} &middot; {clinic.postcode}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-bold text-gray-900">
            {formatPrice(
              clinic.pricing[priceKey as keyof typeof clinic.pricing]
            )}
          </p>
          <p className="text-xs text-gray-500">
            {condition === "autism" ? "Autism" : "ADHD"} assessment
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2">
        {clinic.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {clinic.conditions.map((c) => (
          <span
            key={c}
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              c === "adhd"
                ? "bg-blue-50 text-blue-700"
                : "bg-purple-50 text-purple-700"
            }`}
          >
            {CONDITIONS[c].name}
          </span>
        ))}
        <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium">
          {clinic.wait_time} wait
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex gap-3">
          {clinic.phone && (
            <a
              href={`tel:${clinic.phone.replace(/\s/g, "")}`}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Call
            </a>
          )}
          {clinic.website && (
            <a
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            >
              Website
            </a>
          )}
        </div>
        <Link
          href={`/clinic/${clinic.slug}/`}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
