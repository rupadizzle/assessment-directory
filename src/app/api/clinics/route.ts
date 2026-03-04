import { NextRequest, NextResponse } from "next/server";
import clinics from "@/data/clinics.json";
import { Clinic } from "@/lib/types";

const allClinics = clinics as unknown as Clinic[];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const condition = searchParams.get("condition");
  const town = searchParams.get("town");

  let results = allClinics;

  if (condition) {
    results = results.filter((c) =>
      c.conditions.includes(condition as "adhd" | "autism")
    );
  }

  if (town) {
    results = results.filter((c) => c.towns_served.includes(town));
  }

  // Sort by tier
  results.sort((a, b) => {
    const tierOrder = { premium: 0, featured: 1, free: 2 };
    return tierOrder[a.tier] - tierOrder[b.tier];
  });

  return NextResponse.json(results);
}
