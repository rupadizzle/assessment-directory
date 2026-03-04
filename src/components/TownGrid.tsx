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

  return (
    <div>
      {title && (
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {displayed.map((town) => (
          <Link
            key={town.slug}
            href={`/${config.slug}/${town.slug}/`}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <span className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
              {town.name}
            </span>
            <span className="block text-xs text-gray-500 mt-0.5">
              {town.county}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
