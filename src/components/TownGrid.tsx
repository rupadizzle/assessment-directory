import Link from "next/link";
import { Town, Condition, CONDITIONS } from "@/lib/types";

interface TownGridProps {
  towns: Town[];
  condition: Condition;
  title?: string;
  limit?: number;
}

export default function TownGrid({
  towns,
  condition,
  title,
  limit = 20,
}: TownGridProps) {
  const config = CONDITIONS[condition];
  const displayed = towns.slice(0, limit);
  const isAdhd = condition === "adhd";

  return (
    <div>
      {title && (
        <h2 className="text-xl font-semibold text-gray-900 mb-5">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {displayed.map((town) => (
          <Link
            key={town.slug}
            href={`/${config.slug}/${town.slug}/`}
            className={`bg-white border border-gray-200/60 rounded-xl px-4 py-3.5 transition-all group card-hover ${
              isAdhd
                ? "hover:border-blue-200 hover:bg-blue-50/30"
                : "hover:border-purple-200 hover:bg-purple-50/30"
            }`}
          >
            <span
              className={`font-medium text-gray-900 text-sm transition-colors ${
                isAdhd
                  ? "group-hover:text-blue-600"
                  : "group-hover:text-purple-600"
              }`}
            >
              {town.name}
            </span>
            <span className="block text-xs text-gray-400 mt-0.5">
              {town.county}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
