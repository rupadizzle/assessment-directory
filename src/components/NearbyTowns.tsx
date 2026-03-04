import Link from "next/link";
import { Town, Condition, CONDITIONS } from "@/lib/types";

interface NearbyTownsProps {
  towns: Town[];
  condition: Condition;
  currentTown: string;
}

export default function NearbyTowns({
  towns,
  condition,
  currentTown,
}: NearbyTownsProps) {
  const config = CONDITIONS[condition];
  if (towns.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {config.name} Assessments Near {currentTown}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {towns.map((town) => (
          <Link
            key={town.slug}
            href={`/${config.slug}/${town.slug}/`}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
          >
            {town.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
